"use client";

import { useEffect, useState } from "react";
import {
  CheckIcon,
  CopyIcon,
  FacebookIcon,
  LinkedinIcon,
  MailIcon,
  ShareIcon,
  TwitterIcon,
} from "@/components/icons/social";

const ICON = 22;

export function WireShare({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(title);
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`;
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${encoded}`;
  const x = `https://x.com/intent/tweet?text=${text}&url=${encoded}`;
  const email = `mailto:?subject=${text}&body=${encoded}`;

  useEffect(() => {
    setCanShare(typeof navigator.share === "function");
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  async function nativeShare() {
    if (!navigator.share) return;
    try {
      await navigator.share({ title, url });
    } catch {
      /* cancelled */
    }
  }

  return (
    <div className="wire-share">
      <p className="mono steel">SHARE</p>
      <nav className="wire-share-links" aria-label="Share this story">
        <a href={linkedin} rel="noreferrer" target="_blank" aria-label="LinkedIn">
          <LinkedinIcon size={ICON} />
        </a>
        <a href={facebook} rel="noreferrer" target="_blank" aria-label="Facebook">
          <FacebookIcon size={ICON} />
        </a>
        <a href={x} rel="noreferrer" target="_blank" aria-label="X">
          <TwitterIcon size={ICON} />
        </a>
        <a href={email} aria-label="Email">
          <MailIcon size={ICON} />
        </a>
        <button type="button" onClick={copy} aria-label={copied ? "Copied" : "Copy link"}>
          {copied ? <CheckIcon size={ICON} /> : <CopyIcon size={ICON} />}
        </button>
        {canShare ? (
          <button type="button" onClick={nativeShare} aria-label="Share">
            <ShareIcon size={ICON} />
          </button>
        ) : null}
      </nav>
    </div>
  );
}
