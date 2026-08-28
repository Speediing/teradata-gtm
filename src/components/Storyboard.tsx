import type { StoryBeat, StoryScene, StoryVisual } from "@/data/types";

function Screen({ scene }: { scene: StoryScene }) {
  if (scene === "call") {
    return (
      <>
        <rect x="18" y="14" width="22" height="14" rx="1.4" fill="currentColor" opacity="0.28" />
        <rect x="44" y="14" width="22" height="14" rx="1.4" fill="currentColor" opacity="0.14" />
        <rect x="18" y="31" width="22" height="14" rx="1.4" fill="currentColor" opacity="0.14" />
        <rect x="44" y="31" width="22" height="14" rx="1.4" fill="currentColor" opacity="0.08" />
      </>
    );
  }
  if (scene === "demo") {
    return (
      <>
        <rect x="16" y="14" width="52" height="32" rx="1.4" fill="currentColor" opacity="0.12" />
        <path d="M36 24l14 8-14 8z" fill="currentColor" opacity="0.5" />
      </>
    );
  }
  if (scene === "notes" || scene === "voice") {
    return (
      <path
        d="M20 18h44M20 26h44M20 34h30M20 42h22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.45"
      />
    );
  }
  if (scene === "map") {
    return (
      <>
        <rect x="18" y="18" width="28" height="6" rx="1" fill="currentColor" opacity="0.45" />
        <rect x="18" y="28" width="40" height="6" rx="1" fill="currentColor" opacity="0.7" />
        <rect x="18" y="38" width="22" height="6" rx="1" fill="currentColor" opacity="0.3" />
      </>
    );
  }
  if (scene === "inspect" || scene === "deck") {
    return (
      <>
        <rect x="22" y="13" width="40" height="28" rx="1.4" fill="currentColor" opacity="0.1" />
        <path
          d="M28 22h28M28 28h22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.45"
        />
      </>
    );
  }
  if (scene === "launch") {
    return (
      <>
        <rect x="16" y="16" width="36" height="10" rx="2" fill="currentColor" opacity="0.18" />
        <rect x="22" y="30" width="44" height="10" rx="2" fill="currentColor" opacity="0.32" />
      </>
    );
  }
  if (scene === "drill") {
    return (
      <>
        <circle cx="32" cy="26" r="7" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.45" />
        <circle cx="52" cy="26" r="7" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.45" />
        <path
          d="M22 42c2-6 6-9 10-9s8 3 10 9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          opacity="0.35"
        />
      </>
    );
  }
  return (
    <path
      d="M24 36 60 16 48 42l-6-12z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      opacity="0.45"
    />
  );
}

function Laptop({ scene }: { scene: StoryScene }) {
  return (
    <svg className="story-laptop" viewBox="0 0 88 58" aria-hidden>
      <rect
        x="10"
        y="4"
        width="68"
        height="44"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <rect x="14" y="8" width="60" height="36" rx="1.2" fill="currentColor" opacity="0.06" />
      <Screen scene={scene} />
      <path
        d="M4 50h80l3 5H1z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LiveVisual({ visual }: { visual: StoryVisual }) {
  switch (visual.kind) {
    case "live-call":
      return (
        <div className="story-ui story-call-ui" aria-hidden>
          <header className="story-ui-bar">
            <span className="story-ui-dots">
              <i />
              <i />
              <i />
            </span>
            <strong>{visual.title}</strong>
            <span className="story-live">Live</span>
          </header>
          <div className="story-call-people">
            {visual.people.map((person, index) => (
              <div
                key={person.initials}
                className={index === 1 ? "is-speaking" : undefined}
              >
                <span>{person.initials}</span>
                <small>{person.name}</small>
              </div>
            ))}
          </div>
          <footer>
            <span className="story-wave">||||||||||||</span>
            Granola is listening
          </footer>
        </div>
      );
    case "live-transcript":
      return (
        <div className="story-ui story-transcript-ui" aria-hidden>
          <header className="story-ui-bar">
            <strong>Live transcript</strong>
            <span>{visual.timestamp}</span>
          </header>
          <blockquote>
            <strong>{visual.speaker}</strong>
            {`"${visual.quote}"`}
          </blockquote>
          <footer>
            {visual.signals.map((signal) => (
              <span key={signal}>{signal}</span>
            ))}
          </footer>
        </div>
      );
    case "deck-update":
      return (
        <div className="story-ui story-deck-ui" aria-hidden>
          <header className="story-ui-bar">
            <strong>Open deck</strong>
            <span>Editing now</span>
          </header>
          <div className="story-mini-slide">
            <small>{visual.eyebrow}</small>
            <strong>{visual.headline}</strong>
            <span>{visual.product}</span>
          </div>
          <footer>✓ {visual.status}</footer>
        </div>
      );
    case "procurement-email":
      return (
        <div className="story-ui story-email-ui" aria-hidden>
          <header className="story-ui-bar">
            <strong>Inbox</strong>
            <span>5:27 AM</span>
          </header>
          <div className="story-email-body">
            <span className="story-avatar">JH</span>
            <p>
              <strong>{visual.sender}</strong>
              <small>{visual.subject}</small>
            </p>
          </div>
          <footer>
            <strong>{visual.questions}</strong>
            questions need answers
          </footer>
        </div>
      );
    case "answers-found":
      return (
        <div className="story-ui story-answers-ui" aria-hidden>
          <header className="story-ui-bar">
            <strong>Grok checked the sources</strong>
            <span>{visual.status}</span>
          </header>
          <ul>
            {visual.sources.map((source) => (
              <li key={source.name}>
                <span>✓</span>
                <p>
                  <strong>{source.name}</strong>
                  <small>{source.answer}</small>
                </p>
              </li>
            ))}
          </ul>
        </div>
      );
    case "reply-ready":
      return (
        <div className="story-ui story-reply-ui" aria-hidden>
          <header className="story-ui-bar">
            <strong>Reply draft</strong>
            <span>Not sent</span>
          </header>
          <div className="story-reply-fields">
            <p>
              <span>To</span>
              {visual.to}
            </p>
            <p>
              <span>Re</span>
              {visual.subject}
            </p>
            <i />
            <i />
            <i />
          </div>
          <footer>✓ {visual.status}</footer>
        </div>
      );
    case "account-research":
      return (
        <div className="story-ui story-research-ui" aria-hidden>
          <header className="story-ui-bar">
            <strong>{visual.account}</strong>
            <span>Researching</span>
          </header>
          <div className="story-source-orbit">
            <strong>{visual.signal}</strong>
            {visual.sources.map((source) => (
              <span key={source}>{source}</span>
            ))}
          </div>
          <footer>Public evidence found</footer>
        </div>
      );
    case "three-why":
      return (
        <div className="story-ui story-why-ui" aria-hidden>
          <header className="story-ui-bar">
            <strong>Account hypothesis</strong>
            <span>Built from evidence</span>
          </header>
          <ol>
            {visual.items.map((item) => (
              <li key={item.label}>
                <span>{item.label}</span>
                <strong>{item.answer}</strong>
              </li>
            ))}
          </ol>
        </div>
      );
    case "outreach-ready":
      return (
        <div className="story-ui story-outreach-ui" aria-hidden>
          <header className="story-ui-bar">
            <strong>{visual.person}</strong>
          </header>
          <div>
            {visual.channels.map((channel, index) => (
              <p key={channel}>
                <span>{index + 1}</span>
                <strong>{channel}</strong>
                <small>Personalized</small>
              </p>
            ))}
          </div>
          <footer>{visual.status}</footer>
        </div>
      );
    default: {
      const exhaustiveVisual: never = visual;
      return exhaustiveVisual;
    }
  }
}

export function Storyboard({ beats }: { beats: StoryBeat[] }) {
  const hasLiveFlow = beats.some((beat) => beat.visual);

  return (
    <ol className={`storyboard${hasLiveFlow ? " is-live-flow" : ""}`}>
      {beats.map((beat) => (
        <li
          key={`${beat.when}-${beat.label}`}
          className={`story-beat${beat.visual ? " has-visual" : ""}`}
        >
          {beat.visual ? (
            <LiveVisual visual={beat.visual} />
          ) : (
            <Laptop scene={beat.scene} />
          )}
          {beat.when ? <p className="story-when">{beat.when}</p> : null}
          <p className="story-line">{beat.label}</p>
        </li>
      ))}
    </ol>
  );
}
