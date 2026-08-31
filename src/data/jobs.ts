import type { Artifact, CroJob } from "./types";

const SAMPLE_RECAP: Extract<Artifact, { kind: "one-pager" }> = {
  kind: "one-pager",
  title: "Example account call recap",
  eyebrow: "Draft for seller review",
  sections: [
    {
      heading: "Covered",
      body: "Account priorities and product questions from the call, organized from the seller's notes.",
    },
    {
      heading: "Still open",
      body: "Scope, owner, and timing stay open until the account team confirms them.",
    },
    {
      heading: "Next step",
      body: "The seller chooses what to send and who to include in the follow-up.",
    },
  ],
};

const CHECKED_REPLY: Extract<Artifact, { kind: "redlines" }> = {
  kind: "redlines",
  title: "Example product answer",
  paperTitle: "Questions to check",
  from: "Customer question received",
  marks: [
    {
      text: "Which option fits our requirements?",
      note: "Use the approved product note and attach the source.",
      take: true,
    },
    {
      text: "How does this work with our current tools?",
      note: "Use the approved integration material. Keep unsupported details out.",
      take: true,
    },
    {
      text: "What can the team commit to now?",
      note: "Leave this open until the account team confirms scope.",
      take: false,
    },
  ],
  reply: {
    to: "Customer team",
    subject: "Follow-up on your product questions",
    body: "Hi team,\n\nI pulled the approved notes for the questions we covered. The source links are attached beside each answer. One scope question is still open, so I left it out of the draft.\n\nPlease reply with anything else you want us to check.\n\nBest,",
  },
};

const ACCOUNT_BRIEF: Extract<Artifact, { kind: "one-pager" }> = {
  kind: "one-pager",
  title: "Example account research brief",
  eyebrow: "Public sources only",
  sections: [
    {
      heading: "Public context",
      body: "Only sourced items appear here. Unverified claims stay out.",
    },
    {
      heading: "People to confirm",
      body: "Role names stay open until a public source or the seller confirms them.",
    },
    {
      heading: "Draft choices",
      body: "An email, account note, and meeting brief are ready for the seller to edit.",
    },
  ],
};

export const JOBS: CroJob[] = [
  {
    id: "standardize-room",
    number: 1,
    title: "Turn a call into a clean recap",
    trigger: "A customer call ends",
    backgroundAction: "Organizing notes and drafting the follow-up",
    problem:
      "Call notes often sit in one place while the follow-up starts somewhere else.",
    botJob:
      "Relay opens the notes, separates open questions from next steps, and drafts the recap.",
    storyboard: [
      {
        when: "Call ends",
        label: "Relay opens the notes without waiting for another prompt.",
        scene: "call",
        visual: {
          kind: "live-call",
          title: "Example account working session",
          people: [
            { initials: "TS", name: "Teradata seller" },
            { initials: "CT", name: "Customer team" },
          ],
        },
      },
      {
        when: "Notes organized",
        label: "The agent separates covered items, open points, and the next step.",
        scene: "notes",
        visual: {
          kind: "deck-update",
          eyebrow: "Working notes",
          headline: "Open questions and next steps",
          product: "Draft only",
          status: "Ready for review",
        },
      },
      {
        when: "Artifact ready",
        label: "A recap is ready to edit. Nothing has been sent.",
        scene: "send",
        artifact: SAMPLE_RECAP,
      },
    ],
    outcome:
      "The notes become a clear recap with open questions and next steps. The seller edits the draft before it goes anywhere.",
    demo: {
      title: "Relay",
      subtitle: "Call notes to follow-up",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "relay",
          name: "Relay",
          role: "bot",
          persona: "Turns call notes into a recap and follow-up draft",
          color: "#FF5F02",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "relay",
          kind: "routine",
          body: "The customer call ended. I am opening the notes and separating covered items, open questions, and next steps.",
        },
        {
          id: "m2",
          from: "relay",
          kind: "text",
          body: "The notes are organized. I left scope, owner, and timing open because the account team still needs to confirm them.",
        },
        {
          id: "m3",
          from: "relay",
          kind: "draft",
          draftLabel: "Call recap",
          artifact: SAMPLE_RECAP,
        },
        {
          id: "m4",
          from: "relay",
          kind: "draft",
          draftLabel: "Follow-up email",
          artifact: {
            kind: "gmail",
            title: "Follow-up draft",
            to: "Customer team",
            subject: "Example account working session",
            body: "Hi team,\n\nThanks for the conversation. I organized the covered items, open questions, and next step in the recap. Please correct anything I missed.\n\nBest,",
          },
        },
      ],
    },
  },
  {
    id: "legal-redlines",
    number: 2,
    title: "Turn a question into a checked answer",
    trigger: "A customer question arrives",
    backgroundAction: "Checking approved material and attaching sources",
    problem:
      "A seller can lose the thread while looking across product notes and internal answers.",
    botJob:
      "Answer checks approved material, marks what is still open, and drafts a reply with its sources.",
    storyboard: [
      {
        when: "Question arrives",
        label: "Answer opens the thread and lists what needs a source.",
        scene: "inspect",
        visual: {
          kind: "answers-found",
          sources: [
            { name: "Product note", answer: "Checked" },
            { name: "Integration material", answer: "Checked" },
            { name: "Scope question", answer: "Left open" },
          ],
          status: "Sources attached",
        },
      },
      {
        when: "Sources checked",
        label: "The reply uses approved material. Unsupported details stay out.",
        scene: "notes",
        visual: {
          kind: "reply-ready",
          to: "Customer team",
          subject: "Product questions",
          status: "Not sent",
        },
      },
      {
        when: "Artifact ready",
        label: "The checked answer is ready for the seller to edit or hold.",
        scene: "send",
        artifact: CHECKED_REPLY,
      },
    ],
    outcome:
      "The agent checks approved material, writes the reply, and leaves the source trail beside the draft.",
    demo: {
      title: "Answer",
      subtitle: "Question to checked reply",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "answer",
          name: "Answer",
          role: "bot",
          persona: "Checks approved material and drafts sourced answers",
          color: "#C94E1B",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "answer",
          kind: "routine",
          body: "A customer question arrived. I am checking the approved product and integration material.",
        },
        {
          id: "m2",
          from: "answer",
          kind: "text",
          body: "Two answers have approved sources. I left the scope question open for the account team.",
        },
        {
          id: "m3",
          from: "answer",
          kind: "draft",
          draftLabel: "Questions and source notes",
          artifact: CHECKED_REPLY,
        },
        {
          id: "m4",
          from: "answer",
          kind: "draft",
          draftLabel: "Reply email",
          artifact: {
            kind: "gmail",
            title: "Checked answer",
            to: CHECKED_REPLY.reply.to,
            subject: CHECKED_REPLY.reply.subject,
            body: CHECKED_REPLY.reply.body,
          },
        },
      ],
    },
  },
  {
    id: "attach-engine",
    number: 3,
    title: "Turn public research into a first draft",
    trigger: "An account needs preparation",
    backgroundAction: "Reading public sources and building the brief",
    problem:
      "Account research takes time, and weak drafts often mix evidence with assumptions.",
    botJob:
      "Scout reads public sources, keeps unknowns visible, and prepares draft choices for the seller.",
    storyboard: [
      {
        when: "Account opens",
        label: "Scout starts with public sources and the approved account notes.",
        scene: "inspect",
        visual: {
          kind: "account-research",
          account: "Example account",
          sources: ["Company site", "Newsroom", "Careers"],
          signal: "Public sources only",
        },
      },
      {
        when: "Evidence grouped",
        label: "The agent keeps facts, working ideas, and unknowns separate.",
        scene: "notes",
        visual: {
          kind: "three-why",
          items: [
            { label: "Why this account", answer: "Evidence attached" },
            { label: "Why now", answer: "No trigger assumed" },
            { label: "Who to contact", answer: "Role to confirm" },
          ],
        },
      },
      {
        when: "Draft choices",
        label: "The seller gets a few useful starting points, not a finished claim.",
        scene: "map",
        visual: {
          kind: "outreach-ready",
          person: "Role to confirm",
          channels: ["Email", "Account note", "Meeting brief"],
          status: "Drafts only",
        },
      },
      {
        when: "Artifact ready",
        label: "The source-backed account brief is ready for review.",
        scene: "send",
        artifact: ACCOUNT_BRIEF,
      },
    ],
    outcome:
      "The agent builds a source-backed brief and leaves draft choices for the seller to edit.",
    demo: {
      title: "Scout",
      subtitle: "Public research to account brief",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "scout",
          name: "Scout",
          role: "bot",
          persona: "Reads public account context and marks unknowns",
          color: "#D98A35",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "scout",
          kind: "routine",
          body: "Example account is open for preparation. I am reading the company site, newsroom, and careers page.",
        },
        {
          id: "m2",
          from: "scout",
          kind: "text",
          body: "I separated sourced notes from working ideas. No people or timing claims were added without evidence.",
        },
        {
          id: "m3",
          from: "scout",
          kind: "draft",
          draftLabel: "Research rules",
          artifact: {
            kind: "packet",
            title: "Example account source check",
            fields: [
              { label: "Facts", value: "Public source attached" },
              { label: "Working ideas", value: "Marked for seller review" },
              { label: "Unknowns", value: "Left open" },
            ],
          },
        },
        {
          id: "m4",
          from: "scout",
          kind: "draft",
          draftLabel: "Account brief",
          artifact: ACCOUNT_BRIEF,
        },
      ],
    },
  },
];

export function getJob(id: string): CroJob | undefined {
  return JOBS.find((job) => job.id === id);
}
