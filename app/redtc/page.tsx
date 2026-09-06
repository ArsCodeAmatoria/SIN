import Link from "next/link";
import { ExamCluster } from "@/components/ExamCluster";
import { RedtcNav } from "@/components/redtc/RedtcNav";
import { allQuestions, CHARTS, RIGGING_CHARTS, theoryQuestions } from "@/lib/redtc/bank";
import {
  REDTC_AUTHORITIES,
  REDTC_CATEGORIES,
  REDTC_CHART_MODELS,
  REDTC_COVERS,
  REDTC_EXAM_TOPICS,
  REDTC_FEATURES,
  REDTC_PAPERS_STILL,
  REDTC_PATH,
  REDTC_RESOURCES,
} from "@/lib/redtc/copy";
import { EXAM_TRACKS, RSOS_MWA } from "@/lib/redtc/exam-tracks";
import { formatReviewed, LAST_REVIEWED } from "@/lib/reviewed";

export default function RedtcPage() {
  const bank = allQuestions().length;
  const theory = theoryQuestions().length;
  const chartCount = CHARTS.length;
  const chartQs = CHARTS.reduce((n, c) => n + c.questions.length, 0);
  const riggingQs = RIGGING_CHARTS.reduce((n, c) => n + c.questions.length, 0);
  const countLabel = bank.toLocaleString("en-CA");

  return (
    <>
      <header className="page-hero wrap">
        <p className="mono kicker">05 — BC RED SEAL · TOWER CRANE CERTIFICATION</p>
        <h1 className="display giant">
          MASTER YOUR
          <br />
          TOWER CRANE
          <br />
          EXAM.
        </h1>
        <p className="lede-lg mt-2">
          Practice with {countLabel} questions — {theory.toLocaleString("en-CA")}{" "}
          theory questions plus {chartQs.toLocaleString("en-CA")} manufacturer
          load-chart questions
          {riggingQs
            ? ` and ${riggingQs} BCACS sling-chart questions`
            : ""}{" "}
          — covering Fulford Level B, SkilledTradesBC Level 1 and 2, Red Seal IP
          and load-chart practice.
        </p>
        <RedtcNav />
        <div className="place mt-2">
          <article>
            <span className="mono steel">Questions</span>
            <h3 className="display">{countLabel}</h3>
          </article>
          <article>
            <span className="mono steel">Pass mark</span>
            <h3 className="display">70%</h3>
          </article>
          <article>
            <span className="mono steel">RSOS exam</span>
            <h3 className="display">2023</h3>
          </article>
        </div>
        <p className="mono steel mt-2">Covers</p>
        <p className="lede">{REDTC_COVERS.join(" · ")}</p>
        <div className="inline-cta">
          <Link className="btn btn-solid" href="/redtc/test">
            Start practice test
          </Link>
          <Link className="btn btn-ghost" href="/redtc/load-charts">
            Load charts
          </Link>
          <Link className="btn btn-ghost" href="/redtc/rigging-charts">
            Rigging charts
          </Link>
          <Link className="btn btn-ghost" href="/redtc/test/master">
            Master exam
          </Link>
        </div>
        <ExamCluster tone="tower" />
        <p className="mono steel mt">Last reviewed: {formatReviewed(LAST_REVIEWED)}</p>
      </header>

      <section className="section wrap">
        <p className="mono kicker">What this is</p>
        <div className="mt-2">
          {REDTC_FEATURES.map((item) => (
            <article className="service" key={item.label}>
              <span className="mono steel">{item.label}</span>
              <h3 className="display">
                {item.label === "Practice"
                  ? `${countLabel} exam questions tagged to B.C. papers`
                  : item.title}
              </h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <p className="lede mt">
          {theory.toLocaleString("en-CA")} theory questions. {chartQs} load-chart
          questions on {chartCount} manufacturer charts. {riggingQs} sling-chart
          questions. {countLabel} in the bank. 70% to pass. This is practice —
          not the official paper.
        </p>
      </section>

      <section className="section wrap">
        <p className="mono kicker">About</p>
        <h2 className="display giant">WHAT IS RED SEAL CERTIFICATION?</h2>
        <p className="lede mt-2">
          The Red Seal Program is Canada’s interprovincial standard of excellence
          in the skilled trades. A Red Seal endorsement on your provincial
          Certificate of Qualification lets you work as a Tower Crane Operator in
          other Red Seal jurisdictions without rewriting the exam.
        </p>
        <p className="lede mt">
          The current exam is based on the 2023 Red Seal Occupational Standard
          (RSOS), not the older National Occupational Analysis. Interprovincial
          exams were aligned to that standard in 2025.
        </p>
        <p className="lede mt">
          In B.C., a Tower Crane Operator CofQ is still valid on its own. If you
          already hold one, you can add the Red Seal endorsement by writing and
          passing the Interprovincial Red Seal exam through SkilledTradesBC.
        </p>
        <ul className="std-list">
          <li>
            <h3 className="display">Interprovincial recognition</h3>
            <p>Work in other Red Seal jurisdictions.</p>
          </li>
          <li>
            <h3 className="display">B.C. compulsory trade</h3>
            <p>Skilled Trades Certification from July 5, 2027.</p>
          </li>
          <li>
            <h3 className="display">Career advancement</h3>
            <p>Higher wages and opportunities.</p>
          </li>
        </ul>
      </section>

      <section className="section wrap">
        <p className="mono kicker">British Columbia</p>
        <h2 className="display giant">WHO RUNS CERTIFICATION IN B.C.</h2>
        <p className="lede mt-2">
          Five organizations share the system. Registration, testing,
          apprenticeship, and workplace law are separate jobs — mixing them up is
          a common source of bad exam-prep advice.
        </p>
        <ul className="std-list">
          {REDTC_AUTHORITIES.map((item) => (
            <li key={item.name}>
              <p className="mono steel">{item.role}</p>
              <h3 className="display">
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.name}
                </a>
              </h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section wrap">
        <p className="mono kicker">Register and log hours</p>
        <h2 className="display giant">SKILLEDTRADESBC AND THE PASSPORT APP</h2>
        <p className="lede mt-2">
          Two official systems. SkilledTradesBC runs the apprenticeship and exams
          in a web portal. BC Crane Safety issues the SkillRecord Passport app for
          your crane logbook.
        </p>
        <div className="redtc-pair">
          <article>
            <p className="mono steel">Apprenticeship</p>
            <h3>SkilledTradesBC — Tower Crane Operator</h3>
            <p>
              Two-level Red Seal trade. Register with a sponsor after BC Crane
              Safety registration. Technical training is about nine weeks over two
              years (Level 1: 175 hours, Level 2: 140 hours). Work-based training is
              2,685 hours. Pass mark on level exams and the IP is 70%. No code book.
            </p>
            <ul className="redtc-bullets">
              <li>Book Level 1 SLE, Level 2 SLE, and the Red Seal IP; see results</li>
              <li>Sponsors report work-based hours (every 3–6 months recommended)</li>
              <li>Trade qualifier / challenge path: 3,000 crane-related hours</li>
              <li>
                Compulsory trade after July 5, 2027 — apprentice, trade qualifier,
                or journeyperson
              </li>
            </ul>
            <div className="inline-cta">
              <a
                className="btn btn-solid"
                href="https://skilledtradesbc.ca/tower-crane-operator"
                target="_blank"
                rel="noreferrer"
              >
                Tower Crane Operator
              </a>
              <a
                className="btn btn-ghost"
                href="https://portal.skilledtradesbc.ca/Account/Login/Register"
                target="_blank"
                rel="noreferrer"
              >
                Create a Portal account
              </a>
              <a
                className="btn btn-ghost"
                href="https://portal.skilledtradesbc.ca/Account/Login/"
                target="_blank"
                rel="noreferrer"
              >
                Portal sign-in
              </a>
            </div>
            <p className="redtc-pair-note">
              There is no SkilledTradesBC app on the App Store or Google Play. Hours
              toward your CofQ are reported in the{" "}
              <a
                href="https://skilledtradesbc.ca/manage-apprenticeship-information-skilledtradesbc-portal"
                target="_blank"
                rel="noreferrer"
              >
                SkilledTradesBC Portal
              </a>{" "}
              (mobile-friendly website). Customer service: 1-866-660-6011.
            </p>
          </article>
          <article>
            <p className="mono steel">Logbook app</p>
            <h3>SkillRecord Passport</h3>
            <p>
              Free iOS and Android app provided to every BC Crane Safety member.
              This is the crane operator logbook (it replaced SkillRecord Logbook in
              April 2024). Provisional operators must keep a logbook; WorkSafeBC may
              ask to see it. SkilledTradesBC apprentices are expected to use it for
              operating hours.
            </p>
            <ul className="redtc-bullets">
              <li>Log daily crane time, photos, and supervisor sign-offs</li>
              <li>See your BC Crane Safety ID and current credentials</li>
              <li>Sign in with the same email you used to register with BC Crane Safety</li>
            </ul>
            <div className="redtc-stores">
              <a
                className="redtc-store redtc-store-apple"
                href="https://apps.apple.com/ca/app/skillrecord-passport/id1606993730"
                target="_blank"
                rel="noreferrer"
                aria-label="Download SkillRecord Passport on the App Store"
              >
                {/* Official Apple badge: https://toolbox.marketingtools.apple.com */}
                <img
                  src="/redtc/store-badges/download-on-the-app-store-white.svg"
                  alt="Download on the App Store"
                  width={120}
                  height={40}
                />
              </a>
              <a
                className="redtc-store"
                href="https://play.google.com/store/apps/details?id=com.skillrecord.skillspassport"
                target="_blank"
                rel="noreferrer"
                aria-label="Get SkillRecord Passport on Google Play"
              >
                {/* Official Google Play badge: https://play.google.com/intl/en_us/badges/ */}
                <img
                  src="/redtc/store-badges/get-it-on-google-play.png"
                  alt="Get it on Google Play"
                  width={135}
                  height={40}
                />
              </a>
            </div>
            <div className="redtc-pair-links">
              <a
                href="https://bccranesafety.ca/resources/crane-operator-logbook/"
                target="_blank"
                rel="noreferrer"
              >
                Logbook &amp; Passport guide
              </a>
              <a
                href="https://bccranesafety.ca/resources/crane-operator-logbook/skillrecord-passport-app/"
                target="_blank"
                rel="noreferrer"
              >
                Get the app (BC Crane Safety)
              </a>
              <a href="https://bccranesafety.ca/" target="_blank" rel="noreferrer">
                Register with BC Crane Safety first
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="section wrap">
        <p className="mono kicker">Requirements</p>
        <h2 className="display giant">B.C. APPRENTICESHIP REQUIREMENTS</h2>
        <p className="lede mt-2">
          Tower Crane Operator is a two-level Red Seal trade at SkilledTradesBC —
          not a three-level, 4,200-hour program. Technical training is typically
          nine weeks over two years.
        </p>
        <div className="redtc-callout mt-2">
          <p className="mono steel">Skilled Trades Certification</p>
          <h3 className="display">
            Compulsory trade
            <br />
            as of July 5, 2027
          </h3>
          <p>
            A one-year transition began July 6, 2026. After July 5, 2027, Tower
            Crane Operators in B.C. must be a registered apprentice, a trade
            qualifier, or a certified journeyperson.
          </p>
          <p>
            Existing B.C. CofQ or Red Seal holders already meet the requirement.
            Employers will also need a 2:1 apprentice-to-journeyperson ratio.
          </p>
          <div className="inline-cta">
            <a
              className="btn btn-ghost"
              href="https://skilledtradesbc.ca/skilledtradescertification"
              target="_blank"
              rel="noreferrer"
            >
              Official details
            </a>
          </div>
        </div>
        <div className="place mt-2">
          <article>
            <span className="mono steel">Work-based hours</span>
            <h3 className="display">2,685</h3>
            <p>
              Apprenticeship hours logged with a sponsor, including at least 1,000
              hours operating a tower crane with a mast of 90 ft or more, and
              1,000 hours of documented rigging.
            </p>
          </article>
          <article>
            <span className="mono steel">Technical levels</span>
            <h3 className="display">2</h3>
            <p>
              Level 1 is 175 hours (about 5 weeks) and Level 2 is 140 hours (about
              4 weeks) at a SkilledTradesBC-designated training provider. Pass
              mark is 70% at each level.
            </p>
          </article>
          <article>
            <span className="mono steel">Challenge hours</span>
            <h3 className="display">3,000</h3>
            <p>
              Experienced operators can apply as a trade qualifier with 3,000
              crane-related hours (same 1,000-hour rigging and 90 ft mast
              operating minimums) instead of a full apprenticeship.
            </p>
          </article>
        </div>
        <p className="mono kicker mt-2">What you still have to pass</p>
        <ul className="std-list">
          {REDTC_PAPERS_STILL.map((item) => (
            <li key={item.name}>
              <h3 className="display">{item.name}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section wrap">
        <p className="mono kicker">Path to certification</p>
        <h2 className="display giant">HOW CERTIFICATION WORKS IN B.C.</h2>
        <p className="lede mt-2">
          BC Crane Safety registration first. Then SkilledTradesBC apprenticeship
          or challenge, Fulford testing, and the Red Seal exam.
        </p>
        <div className="mt-2">
          {REDTC_PATH.map((s) => (
            <article className="service" key={s.num}>
              <span className="mono steel">{s.num}</span>
              <h3 className="display">{s.title}</h3>
              <p>{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <p className="mono kicker">The exam</p>
        <h2 className="display giant">RED SEAL EXAMINATION DETAILS</h2>
        <p className="lede mt-2">
          The Interprovincial Red Seal exam for Tower Crane Operator has 100
          multiple-choice questions, each with four options. The pass mark is 70%.
          Questions are drawn from the 2023 RSOS, not the former NOA.
        </p>
        <div className="place mt-2">
          <article>
            <span className="mono steel">Questions on exam</span>
            <h3 className="display">100</h3>
          </article>
          <article>
            <span className="mono steel">Typical time limit</span>
            <h3 className="display">4 hrs</h3>
          </article>
          <article>
            <span className="mono steel">Passing score</span>
            <h3 className="display">70%</h3>
          </article>
          <article>
            <span className="mono steel">Four-option multiple choice</span>
            <h3 className="display">MC</h3>
          </article>
        </div>
        <p className="lede mt-2">
          In B.C. you sit the exam through SkilledTradesBC. No code book is
          provided. Formulas and acronyms are supplied at the sitting. You must
          pass the Level 1 Standardized Level Exam before attempting the Red Seal
          exam.
        </p>
        <p className="mono kicker mt-2">Exam topic weighting</p>
        <div>
          {REDTC_EXAM_TOPICS.map((item) => (
            <article className="service" key={item.topic}>
              <span className="mono steel">{item.percentage}%</span>
              <h3 className="display">{item.topic}</h3>
              <p>
                {RSOS_MWA.find((b) => b.count === item.percentage)?.name ??
                  "2023 RSOS major work activity."}
              </p>
            </article>
          ))}
        </div>
        <p className="steel mt">
          Question counts from the official Red Seal Tower Crane Operator exam
          breakdown (2023 RSOS). Percentages shown are rounded.
        </p>
      </section>

      <section className="section wrap">
        <p className="mono kicker">Simulation</p>
        <h2 className="display giant">MASTER EXAM</h2>
        <p className="lede mt-2">
          Closed-book simulation of the Interprovincial exam: 100 questions, 4
          hours, 70/100 to pass, weighted to the 2023 RSOS task counts. No answer
          key until you submit. The official formula and acronym sheet is
          available during the sitting.
        </p>
        <p className="lede mt">
          The paper is built like the real exam: A 11 · B 21 · C 23 · D 17 · E 28,
          including a few manufacturer load-chart items in lift planning.
          Unanswered questions count as incorrect. Time expiry submits what you
          have — you still pass if you have 70.
        </p>
        <ul className="redtc-bullets mt-2">
          <li>2023 RSOS task counts (A 11 · B 21 · C 23 · D 17 · E 28)</li>
          <li>Closed book — key and explanations after submit</li>
          <li>Formula and acronym sheet (as at the sitting)</li>
          <li>Skip, flag, change answers; auto-submit at 4:00</li>
          <li>Results by major work activity</li>
        </ul>
        <div className="inline-cta">
          <Link className="btn btn-solid" href="/redtc/test/master">
            Start Master Exam
          </Link>
        </div>
      </section>

      <section className="section wrap">
        <p className="mono kicker">Real charts</p>
        <h2 className="display giant">LOAD CHART PRACTICE</h2>
        <p className="lede mt-2">
          Master reading real manufacturer load charts from 6 leading brands. Open
          charts in a separate window, then answer questions exactly like you’ll
          do on the job.
        </p>
        <div className="place mt-2">
          <article>
            <span className="mono steel">Charts</span>
            <h3 className="display">{chartCount}</h3>
          </article>
          <article>
            <span className="mono steel">Questions</span>
            <h3 className="display">{chartQs}</h3>
          </article>
          <article>
            <span className="mono steel">Brands</span>
            <h3 className="display">6</h3>
            <p>Liebherr · Potain · Terex · WOLFF · Krøll · Pecco</p>
          </article>
        </div>
        <p className="mono kicker mt-2">Flat-top &amp; hammerhead · 8 charts</p>
        <ul className="std-list">
          {REDTC_CHART_MODELS.flat.map((item) => (
            <li key={item.name}>
              <h3 className="display">{item.name}</h3>
              <p>{item.jib}</p>
            </li>
          ))}
        </ul>
        <p className="mono kicker mt-2">Luffing jib · 4 charts</p>
        <ul className="std-list">
          {REDTC_CHART_MODELS.luffing.map((item) => (
            <li key={item.name}>
              <h3 className="display">{item.name}</h3>
              <p>{item.jib}</p>
            </li>
          ))}
        </ul>
        <p className="mono kicker mt-2">Self-erecting · 2 charts</p>
        <ul className="std-list">
          {REDTC_CHART_MODELS.self.map((item) => (
            <li key={item.name}>
              <h3 className="display">{item.name}</h3>
              <p>{item.jib}</p>
            </li>
          ))}
        </ul>
        <div className="inline-cta">
          <Link className="btn btn-solid" href="/redtc/load-charts">
            Start practicing
          </Link>
          <Link className="btn btn-ghost" href="/redtc/rigging-charts">
            Sling charts
          </Link>
        </div>
      </section>

      <section className="section wrap">
        <p className="mono kicker">Topics</p>
        <h2 className="display giant">QUESTION CATEGORIES</h2>
        <p className="lede mt-2">{countLabel} questions across exam topics</p>
        <nav className="safety-index mt-2" aria-label="Question categories">
          {REDTC_CATEGORIES.map((item, i) => (
            <Link
              href={
                "charts" in item
                  ? "/redtc/load-charts"
                  : "rigging" in item
                    ? "/redtc/rigging-charts"
                    : "/redtc/test/review"
              }
              key={item.name}
            >
              <span className="mono steel">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <strong>{item.name}</strong>
                <em>
                  {"charts" in item
                    ? `${chartCount} crane charts`
                    : "rigging" in item
                      ? "3 sling charts"
                      : `${item.count} questions`}
                </em>
              </span>
            </Link>
          ))}
        </nav>
      </section>

      <section className="section wrap">
        <p className="mono kicker">Official papers</p>
        <h2 className="display giant">PRACTICE BY EXAM</h2>
        <ul className="std-list">
          {EXAM_TRACKS.map((track) => (
            <li key={track.id}>
              <h3 className="display">{track.title}</h3>
              <p>
                {track.subtitle}. {track.questions} questions · {track.passPercent}%
                to pass
                {track.minutes ? ` · ${track.minutes} min` : ""}. {track.body}
              </p>
            </li>
          ))}
        </ul>
        <div className="inline-cta">
          <Link className="btn btn-solid" href="/redtc/test">
            Choose a paper
          </Link>
          <Link className="btn btn-ghost" href="/redtc/test/review">
            Review all {countLabel} questions
          </Link>
        </div>
      </section>

      <section className="section wrap">
        <p className="mono kicker">Resources</p>
        <h2 className="display giant">OFFICIAL RESOURCES</h2>
        <nav className="safety-index mt-2" aria-label="Official resources">
          {REDTC_RESOURCES.map((item, i) => (
            <a href={item.href} key={item.href} target="_blank" rel="noreferrer">
              <span className="mono steel">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <strong>{item.name}</strong>
                <em>{item.body}</em>
              </span>
            </a>
          ))}
        </nav>
        <p className="mono steel mt-2">Industry standards</p>
        <p className="lede mt">
          <a
            href="https://www.csagroup.org/store/product/Z248-17/"
            target="_blank"
            rel="noreferrer"
          >
            CSA Z248
          </a>
          {" · "}
          <a
            href="https://www.asme.org/codes-standards/find-codes-standards/b30-3-tower-cranes"
            target="_blank"
            rel="noreferrer"
          >
            ASME B30.3
          </a>
        </p>
        <p className="lede mt">
          WorkSafeBC Part 14.2 requires tower, hammerhead, and self-erecting tower
          cranes to meet CSA Z248. Part 14.34.1 requires a valid operator
          certificate from a person acceptable to the Board — in B.C., that system
          is administered by BC Crane Safety.
        </p>
        <div className="inline-cta">
          <Link className="btn btn-solid" href="/redtc/test">
            Practice test
          </Link>
          <Link className="btn btn-ghost" href="/redtc/load-charts">
            Load charts
          </Link>
          <Link className="btn btn-ghost" href="/redtc/rigging-charts">
            Rigging charts
          </Link>
          <Link className="btn btn-ghost" href="/redtc/test/master">
            Master exam
          </Link>
        </div>
      </section>
    </>
  );
}
