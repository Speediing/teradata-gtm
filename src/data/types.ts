export type JobId =
  | "standardize-room"
  | "legal-redlines"
  | "attach-engine";

export type ParticipantRole = "you" | "bot";

export type Participant = {
  id: string;
  name: string;
  role: ParticipantRole;
  persona?: string;
  color?: string;
};

export type MessageKind = "text" | "draft" | "routine" | "handoff" | "system";

export type StoryScene =
  | "call"
  | "demo"
  | "voice"
  | "notes"
  | "deck"
  | "map"
  | "inspect"
  | "launch"
  | "drill"
  | "send";

export type StoryVisual =
  | {
      kind: "live-call";
      title: string;
      people: { initials: string; name: string }[];
    }
  | {
      kind: "live-transcript";
      timestamp: string;
      speaker: string;
      quote: string;
      signals: string[];
    }
  | {
      kind: "deck-update";
      eyebrow: string;
      headline: string;
      product: string;
      status: string;
    }
  | {
      kind: "procurement-email";
      sender: string;
      subject: string;
      questions: number;
    }
  | {
      kind: "answers-found";
      sources: { name: string; answer: string }[];
      status: string;
    }
  | {
      kind: "reply-ready";
      to: string;
      subject: string;
      status: string;
    }
  | {
      kind: "account-research";
      account: string;
      sources: string[];
      signal: string;
    }
  | {
      kind: "three-why";
      items: { label: string; answer: string }[];
    }
  | {
      kind: "outreach-ready";
      person: string;
      channels: string[];
      status: string;
    };

export type StoryBeat = {
  label: string;
  scene: StoryScene;
  when?: string;
  artifact?: Artifact;
  visual?: StoryVisual;
};

export type Artifact =
  | {
      kind: "one-pager";
      title: string;
      eyebrow?: string;
      sections: { heading: string; body: string }[];
    }
  | {
      kind: "packet";
      title: string;
      fields: { label: string; value: string }[];
    }
  | {
      kind: "table";
      title: string;
      caption?: string;
      columns: string[];
      rows: string[][];
    }
  | {
      kind: "outbound";
      title: string;
      account: string;
      hypothesis: { k: string; body: string }[];
      evidence: { source: string; finding: string }[];
      targets: { name: string; role: string; why: string }[];
      page: { headline: string; body: string };
    }
  | {
      kind: "linkedin";
      title: string;
      to: string;
      role?: string;
      body: string;
    }
  | {
      kind: "talk-tracks";
      title: string;
      tracks: { seat: string; line: string }[];
    }
  | {
      kind: "forecast";
      title: string;
      status: string;
      body: string;
      account?: string;
      amount?: string;
      gaps?: { label: string; body: string }[];
    }
  | {
      kind: "gaps";
      title: string;
      items: { label: string; body: string }[];
    }
  | {
      kind: "questions";
      title: string;
      items: string[];
    }
  | {
      kind: "scorecard";
      title: string;
      score: string;
      notes: string[];
      betterAnswer: string;
      weakLine?: string;
    }
  | {
      kind: "deal-kit";
      title: string;
      weeks: { label: string; body: string }[];
      pack: string[];
    }
  | {
      kind: "redlines";
      title: string;
      paperTitle: string;
      from: string;
      marks: { text: string; note: string; take: boolean }[];
      reply: { to: string; subject: string; body: string };
    }
  | {
      kind: "gmail";
      title: string;
      to: string;
      subject: string;
      body: string;
    }
  | {
      kind: "slack";
      title: string;
      channel: string;
      body: string;
    };

export type DemoMessage = {
  id: string;
  from: string;
  kind: MessageKind;
  body?: string;
  draftLabel?: string;
  artifact?: Artifact;
  delayMs?: number;
};

export type DemoThread = {
  title: string;
  subtitle: string;
  participants: Participant[];
  messages: DemoMessage[];
};

export type CroJob = {
  id: JobId;
  number: number;
  title: string;
  trigger: string;
  backgroundAction: string;
  problem: string;
  botJob: string;
  storyboard: StoryBeat[];
  outcome: string;
  demo: DemoThread;
};
