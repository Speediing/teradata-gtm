export type HeroJob = {
  id: string;
  name: string;
  account: string;
  signal: string;
  work: string;
  result: string;
  user: string;
  bot: string;
};

export const HERO_JOBS = [
  {
    id: "relay",
    name: "Relay",
    account: "Example account",
    signal: "Sample customer call ended",
    work: "I opened the notes and split the recap into decisions, open points, and next steps. Unknowns stay marked.",
    result: "Recap draft ready",
    user: "Keep it as a draft.",
    bot: "Held for your review. Nothing sent.",
  },
  {
    id: "answer",
    name: "Answer",
    account: "Customer question",
    signal: "A platform question arrived",
    work: "I checked approved product and analytics material. I attached the sources and marked one open point.",
    result: "Sourced reply ready",
    user: "Show the sources beside it.",
    bot: "They are attached to the draft.",
  },
  {
    id: "scout",
    name: "Scout",
    account: "Example account",
    signal: "Account opened for prep",
    work: "I am reading the public site and approved notes. Every claim in the brief keeps its source.",
    result: "Account brief in progress",
    user: "Leave outreach as a draft.",
    bot: "Research and drafts only.",
  },
  {
    id: "brief",
    name: "Brief",
    account: "Working session",
    signal: "A meeting appeared on the calendar",
    work: "I pulled the approved account notes and open questions into one page. I did not fill the gaps.",
    result: "Call page ready",
    user: "Keep the open points visible.",
    bot: "They are first on the page.",
  },
  {
    id: "signal",
    name: "Signal",
    account: "Example account",
    signal: "A public account page changed",
    work: "I am checking whether the change affects the account brief. I will stay quiet if it does not.",
    result: "Change under review",
    user: "Only flag a useful change.",
    bot: "No alert unless the brief changes.",
  },
  {
    id: "map",
    name: "Map",
    account: "Example account",
    signal: "The account notes changed",
    work: "I updated the known roles and gaps. I left every unconfirmed contact open.",
    result: "Coverage map updated",
    user: "Do not guess a contact.",
    bot: "Unknown roles stay unknown.",
  },
  {
    id: "desk",
    name: "Desk",
    account: "Open deal question",
    signal: "The account team added a question",
    work: "I found the approved material. One part still needs a person, so I routed it and held the reply.",
    result: "One item needs an owner",
    user: "Hold the whole reply.",
    bot: "Held. Nothing sent.",
  },
  {
    id: "follow-up",
    name: "Follow-up",
    account: "Working session",
    signal: "A next step changed",
    work: "I updated the recap draft and kept the earlier version in the notes.",
    result: "Next steps current",
    user: "I will approve the wording.",
    bot: "Ready when you are.",
  },
] as const satisfies readonly HeroJob[];
