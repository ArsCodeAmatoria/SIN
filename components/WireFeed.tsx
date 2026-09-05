"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type Ref,
} from "react";
import {
  WIRE_POST_MAX,
  avatarTone,
  formatPostTime,
  handleFromName,
  initials,
  threadPosts,
  type WirePost,
} from "@/lib/wire-comments";

const PERSON_KEY = "wire-person";
const LIKED_KEY = "wire-liked";
const LEGACY_PERSON_KEY = "whoop-wire-person";
const LEGACY_LIKED_KEY = "whoop-wire-liked";

type Person = { name: string; handle: string };

function readPerson(): Person {
  try {
    const raw =
      localStorage.getItem(PERSON_KEY) || localStorage.getItem(LEGACY_PERSON_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Person;
      if (parsed.name && parsed.handle) {
        localStorage.setItem(PERSON_KEY, JSON.stringify(parsed));
        localStorage.removeItem(LEGACY_PERSON_KEY);
        return parsed;
      }
    }
  } catch {
    /* ignore */
  }
  return { name: "", handle: "" };
}

function readLiked(): Set<string> {
  try {
    const raw =
      localStorage.getItem(LIKED_KEY) || localStorage.getItem(LEGACY_LIKED_KEY);
    if (raw) {
      const ids = JSON.parse(raw) as string[];
      localStorage.setItem(LIKED_KEY, JSON.stringify(ids));
      localStorage.removeItem(LEGACY_LIKED_KEY);
      return new Set(ids);
    }
  } catch {
    /* ignore */
  }
  return new Set();
}

export function WireFeed({ slug }: { slug: string }) {
  const [posts, setPosts] = useState<WirePost[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [person, setPerson] = useState<Person>({ name: "", handle: "" });
  const [draft, setDraft] = useState("");
  const [replyTo, setReplyTo] = useState<WirePost | null>(null);
  const [replyDraft, setReplyDraft] = useState("");
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const replyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setPerson(readPerson());
    setLiked(readLiked());
    fetch(`/api/whoopwire/comments?slug=${encodeURIComponent(slug)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok && Array.isArray(data.posts)) setPosts(data.posts);
      })
      .catch(() => setError("Could not load the wire."))
      .finally(() => setLoaded(true));
  }, [slug]);

  useEffect(() => {
    if (replyTo) replyRef.current?.focus();
  }, [replyTo]);

  const { roots, byParent } = useMemo(() => threadPosts(posts), [posts]);

  function savePerson(next: Person) {
    setPerson(next);
    try {
      localStorage.setItem(PERSON_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }

  function onName(name: string) {
    const next = {
      name,
      handle: person.handle || handleFromName(name),
    };
    savePerson(next);
  }

  async function submit(body: string, parentId: string | null) {
    const name = person.name.trim();
    const handle = person.handle.trim() || handleFromName(name);
    if (!name) {
      setError("Name the post.");
      return;
    }
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/whoopwire/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, name, handle, body, parentId }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Could not post.");
        return;
      }
      setPosts((current) => [data.post as WirePost, ...current]);
      if (!parentId) setDraft("");
      else {
        setReplyDraft("");
        setReplyTo(null);
      }
    } catch {
      setError("Could not post.");
    } finally {
      setSending(false);
    }
  }

  async function toggleLike(id: string) {
    const unlike = liked.has(id);
    const next = new Set(liked);
    if (unlike) next.delete(id);
    else next.add(id);
    setLiked(next);
    setPosts((current) =>
      current.map((post) =>
        post.id === id
          ? { ...post, likes: Math.max(0, post.likes + (unlike ? -1 : 1)) }
          : post
      )
    );
    try {
      localStorage.setItem(LIKED_KEY, JSON.stringify([...next]));
    } catch {
      /* ignore */
    }
    try {
      await fetch("/api/whoopwire/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: unlike ? "unlike" : "like", id }),
      });
    } catch {
      /* keep optimistic */
    }
  }

  function onPost(e: FormEvent, body: string, parentId: string | null) {
    e.preventDefault();
    if (!body.trim() || sending) return;
    void submit(body.trim(), parentId);
  }

  return (
    <section className="wire-feed" id="wire">
      <div className="wire-feed-head">
        <p className="mono kicker">THE WIRE</p>
        <p className="mono steel">
          {loaded ? `${posts.length} POST${posts.length === 1 ? "" : "S"}` : "—"}
        </p>
      </div>
      <p className="lede">
        Say it on the record. Replies, likes, the floor talking — like a jobsite
        channel, not a comments box.
      </p>

      <Composer
        person={person}
        body={draft}
        placeholder="Say it."
        sending={sending}
        onName={onName}
        onHandle={(handle) => savePerson({ ...person, handle })}
        onBody={setDraft}
        onSubmit={(e) => onPost(e, draft, null)}
      />

      {error ? <p className="wire-feed-error">{error}</p> : null}

      {!loaded ? (
        <p className="mono steel mt">LOADING THE WIRE…</p>
      ) : roots.length === 0 ? (
        <p className="lede mt">No posts yet. Say it first.</p>
      ) : (
        <ul className="wire-timeline">
          {roots.map((post) => (
            <li key={post.id}>
              <PostCard
                post={post}
                liked={liked.has(post.id)}
                onLike={() => toggleLike(post.id)}
                onReply={() => {
                  setReplyTo(post);
                  setReplyDraft("");
                }}
              />
              {(byParent.get(post.id) ?? []).map((reply) => (
                <div className="wire-thread" key={reply.id}>
                  <PostCard
                    post={reply}
                    liked={liked.has(reply.id)}
                    onLike={() => toggleLike(reply.id)}
                    onReply={() => {
                      setReplyTo(reply);
                      setReplyDraft("");
                    }}
                  />
                </div>
              ))}
              {replyTo &&
              (replyTo.id === post.id || replyTo.parentId === post.id) ? (
                <div className="wire-thread">
                  <p className="mono steel wire-replying">
                    REPLYING TO @{replyTo.handle}
                    <button
                      type="button"
                      className="wire-cancel"
                      onClick={() => setReplyTo(null)}
                    >
                      CANCEL
                    </button>
                  </p>
                  <Composer
                    compact
                    person={person}
                    body={replyDraft}
                    placeholder={`Reply to @${replyTo.handle}`}
                    sending={sending}
                    inputRef={replyRef}
                    onName={onName}
                    onHandle={(handle) => savePerson({ ...person, handle })}
                    onBody={setReplyDraft}
                    onSubmit={(e) => onPost(e, replyDraft, replyTo.id)}
                  />
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function Composer({
  person,
  body,
  placeholder,
  sending,
  compact = false,
  inputRef,
  onName,
  onHandle,
  onBody,
  onSubmit,
}: {
  person: Person;
  body: string;
  placeholder: string;
  sending: boolean;
  compact?: boolean;
  inputRef?: Ref<HTMLTextAreaElement>;
  onName: (name: string) => void;
  onHandle: (handle: string) => void;
  onBody: (body: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
  const left = WIRE_POST_MAX - body.length;
  const tone = avatarTone(person.handle || person.name || "wire");

  return (
    <form className={`wire-compose${compact ? " is-compact" : ""}`} onSubmit={onSubmit}>
      <span className={`wire-ava tone-${tone}`} aria-hidden>
        {initials(person.name || "WIRE")}
      </span>
      <div className="wire-compose-main">
        <div className="wire-id">
          <input
            className="wire-id-name"
            name="name"
            value={person.name}
            onChange={(e) => onName(e.target.value)}
            placeholder="Name"
            autoComplete="nickname"
            maxLength={40}
            required
            aria-label="Display name"
          />
          <span className="wire-at">@</span>
          <input
            className="wire-id-handle"
            name="handle"
            value={person.handle}
            onChange={(e) =>
              onHandle(
                e.target.value
                  .replace(/^@/, "")
                  .toLowerCase()
                  .replace(/[^a-z0-9_]/g, "")
                  .slice(0, 20)
              )
            }
            placeholder="handle"
            autoComplete="username"
            maxLength={20}
            aria-label="Handle"
          />
        </div>
        <textarea
          ref={inputRef}
          value={body}
          onChange={(e) => onBody(e.target.value.slice(0, WIRE_POST_MAX))}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
              e.currentTarget.form?.requestSubmit();
            }
          }}
          placeholder={placeholder}
          rows={compact ? 2 : 3}
          required
          aria-label="Post"
        />
        <div className="wire-compose-bar">
          <span className={`mono${left < 20 ? " wire-count-low" : " steel"}`}>
            {left}
          </span>
          <button
            className="btn btn-solid"
            type="submit"
            disabled={sending || !body.trim() || person.name.trim().length < 2}
          >
            POST
          </button>
        </div>
      </div>
    </form>
  );
}

function PostCard({
  post,
  liked,
  onLike,
  onReply,
}: {
  post: WirePost;
  liked: boolean;
  onLike: () => void;
  onReply: () => void;
}) {
  return (
    <article className="wire-post">
      <span className={`wire-ava tone-${avatarTone(post.handle)}`} aria-hidden>
        {initials(post.name)}
      </span>
      <div className="wire-post-body">
        <p className="wire-post-meta">
          <strong>{post.name}</strong>
          <span className="steel">@{post.handle}</span>
          <span className="steel">· {formatPostTime(post.created)}</span>
        </p>
        <p>{post.body}</p>
        <div className="wire-actions">
          <button type="button" onClick={onReply}>
            <ReplyIcon />
            REPLY
          </button>
          <button
            type="button"
            className={liked ? "is-liked" : undefined}
            onClick={onLike}
            aria-pressed={liked}
          >
            <HeartIcon filled={liked} />
            {post.likes || ""}
          </button>
        </div>
      </div>
    </article>
  );
}

function ReplyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path
        d="M14 3 4 12l10 9v-6c7 0 9 4 9 4s-1-10-9-10V3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 20s-7.2-4.4-9.3-8.2C1 9.2 2.2 6 5.4 6c1.9 0 3.2 1.1 3.9 2.2C10 7.1 11.3 6 13.2 6c3.2 0 4.4 3.2 2.7 5.8C13.8 15.6 12 20 12 20Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}
