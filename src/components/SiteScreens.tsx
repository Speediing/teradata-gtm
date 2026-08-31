import type { Artifact, DemoMessage } from "@/data/types";
import type { ComputerBeat } from "@/data/screens";
import { ArtifactCard } from "./ArtifactCard";

export function SiteScreen({
  beat,
  message,
  account,
  sent,
}: {
  beat: ComputerBeat;
  message?: DemoMessage;
  account: string;
  sent: boolean;
}) {
  switch (beat.site) {
    case "granola":
      return <NotesScreen account={account} />;
    case "gmail":
      return (
        <MailScreen account={account} artifact={message?.artifact} sent={sent} />
      );
    case "gdoc":
      return <DocScreen title={beat.title} artifact={message?.artifact} />;
    case "research":
      return <ResearchScreen beat={beat} account={account} />;
    case "page":
      return <PageScreen title={beat.title} artifact={message?.artifact} />;
    default: {
      const exhaustiveSite: never = beat.site;
      return exhaustiveSite;
    }
  }
}

function NotesScreen({ account }: { account: string }) {
  return (
    <div className="site site-granola">
      <header>
        <strong>Granola</strong>
        <span>Call complete</span>
      </header>
      <p className="site-time">Working notes for {account}</p>
      <ul>
        <li>
          <span>Covered</span> Product questions and account priorities
        </li>
        <li>
          <span>Open</span> Scope, owner, and timing need confirmation
        </li>
        <li>
          <span>Next</span> Seller reviews the recap before it is shared
        </li>
      </ul>
    </div>
  );
}

function MailScreen({
  account,
  artifact,
  sent,
}: {
  account: string;
  artifact?: Artifact;
  sent: boolean;
}) {
  const email = artifact?.kind === "gmail" ? artifact : undefined;

  return (
    <div className="site site-gmail">
      <header>
        <strong>Gmail</strong>
        <em>{sent ? "Sent" : "Draft, not sent"}</em>
      </header>
      <p>
        <span>To</span>
        {email?.to || "Customer team"}
      </p>
      <p>
        <span>Subject</span>
        {email?.subject || `${account} product question`}
      </p>
      <div>
        {email?.body ||
          "The customer question is open. The agent is checking approved sources before it drafts an answer."}
      </div>
    </div>
  );
}

function DocScreen({
  title,
  artifact,
}: {
  title: string;
  artifact?: Artifact;
}) {
  return (
    <div className="site site-gdoc">
      <header>
        <strong>Docs</strong>
        <span>{title}</span>
      </header>
      <article>
        {artifact ? (
          <ArtifactCard artifact={artifact} />
        ) : (
          <>
            <p>
              <b>Facts.</b> Public or approved source attached.
            </p>
            <p>
              <b>Working ideas.</b> Marked for seller review.
            </p>
            <p>
              <b>Unknowns.</b> Left open.
            </p>
          </>
        )}
      </article>
    </div>
  );
}

function ResearchScreen({
  beat,
  account,
}: {
  beat: ComputerBeat;
  account: string;
}) {
  const isTeradataSource = beat.host === "www.teradata.com";

  return (
    <div className="site site-research">
      <header>
        <strong>{beat.host}</strong>
        <span>{isTeradataSource ? "Approved material" : "Public source"}</span>
      </header>
      <p className="site-time">
        {isTeradataSource
          ? "Checking the product source"
          : `Researching ${account}`}
      </p>
      <ul>
        {isTeradataSource ? (
          <>
            <li>
              <span>Product</span> Approved note found
            </li>
            <li>
              <span>Integration</span> Approved material found
            </li>
            <li>
              <span>Scope</span> Account team still needs to confirm
            </li>
          </>
        ) : (
          <>
            <li>
              <span>Company site</span> Source open
            </li>
            <li>
              <span>Newsroom</span> Source open
            </li>
            <li>
              <span>Careers</span> Source open
            </li>
            <li>
              <span>Unknowns</span> No claim added without evidence
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

function PageScreen({
  title,
  artifact,
}: {
  title: string;
  artifact?: Artifact;
}) {
  return (
    <div className="site site-page">
      <header>
        <strong>Page</strong>
        <em>Draft</em>
      </header>
      <h4>{title}</h4>
      {artifact ? (
        <ArtifactCard artifact={artifact} />
      ) : (
        <p>The page stays private until the seller reviews it.</p>
      )}
    </div>
  );
}
