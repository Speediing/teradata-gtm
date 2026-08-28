import type { JobId } from "./types";

export type SiteKind =
  | "granola"
  | "gmail"
  | "gdoc"
  | "research"
  | "page";

export type ChromeTab = {
  id: string;
  host: string;
  label: string;
};

export type ComputerBeat = {
  pill: string;
  host: string;
  path?: string;
  title: string;
  site: SiteKind;
  tabs: ChromeTab[];
};

const granola = { id: "granola", host: "granola.app", label: "Granola" };
const gmail = { id: "gmail", host: "mail.google.com", label: "Gmail" };
const docs = { id: "docs", host: "docs.google.com", label: "Docs" };
const teradata = {
  id: "teradata",
  host: "www.teradata.com",
  label: "Teradata",
};
const account = {
  id: "account",
  host: "example.com",
  label: "Example account",
};

export const SCREENS: Record<JobId, Record<string, ComputerBeat>> = {
  "standardize-room": {
    m1: {
      pill: "Opening the call notes",
      host: granola.host,
      path: "/notes/example-account",
      title: "Example account working session",
      site: "granola",
      tabs: [granola, docs, gmail],
    },
    m2: {
      pill: "Organizing open questions",
      host: granola.host,
      path: "/notes/example-account",
      title: "Example account working session",
      site: "granola",
      tabs: [granola, docs, gmail],
    },
    m3: {
      pill: "Writing the recap",
      host: docs.host,
      path: "/document/d/example-account-recap",
      title: "Example account call recap",
      site: "gdoc",
      tabs: [granola, docs, gmail],
    },
    m4: {
      pill: "Drafting in Gmail",
      host: gmail.host,
      path: "/mail/u/0/#drafts",
      title: "Follow-up draft",
      site: "gmail",
      tabs: [granola, docs, gmail],
    },
  },
  "legal-redlines": {
    m1: {
      pill: "Opening the customer question",
      host: gmail.host,
      path: "/mail/u/0/#inbox",
      title: "Customer question",
      site: "gmail",
      tabs: [gmail, teradata, docs],
    },
    m2: {
      pill: "Checking approved material",
      host: teradata.host,
      path: "/resources",
      title: "Approved product material",
      site: "research",
      tabs: [gmail, teradata, docs],
    },
    m3: {
      pill: "Keeping sources beside the answer",
      host: docs.host,
      path: "/document/d/checked-answer",
      title: "Checked answer",
      site: "gdoc",
      tabs: [gmail, teradata, docs],
    },
    m4: {
      pill: "Drafting in Gmail",
      host: gmail.host,
      path: "/mail/u/0/#drafts",
      title: "Reply draft",
      site: "gmail",
      tabs: [gmail, teradata, docs],
    },
  },
  "attach-engine": {
    m1: {
      pill: "Reading public sources",
      host: account.host,
      path: "/",
      title: "Example account",
      site: "research",
      tabs: [account, docs, gmail],
    },
    m2: {
      pill: "Separating facts from working ideas",
      host: account.host,
      path: "/newsroom",
      title: "Example account newsroom",
      site: "research",
      tabs: [account, docs, gmail],
    },
    m3: {
      pill: "Marking every unknown",
      host: docs.host,
      path: "/document/d/source-check",
      title: "Example account source check",
      site: "gdoc",
      tabs: [account, docs, gmail],
    },
    m4: {
      pill: "Building the account brief",
      host: docs.host,
      path: "/document/d/account-brief",
      title: "Example account research brief",
      site: "gdoc",
      tabs: [account, docs, gmail],
    },
  },
};

export function beatFor(
  jobId: JobId,
  messageId: string | undefined,
): ComputerBeat | undefined {
  if (!messageId) return undefined;
  return SCREENS[jobId]?.[messageId];
}
