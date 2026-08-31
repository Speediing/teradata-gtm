import type { JobId } from "@/data/types";
import { beatFor, type ComputerBeat } from "@/data/screens";
import type { DemoPlayback } from "@/hooks/useDemoPlayback";
import { SiteScreen } from "./SiteScreens";

function activeBeat(jobId: JobId, playback: DemoPlayback): ComputerBeat | undefined {
  const typingId = playback.typingFrom
    ? playback.messages[playback.visibleCount]?.id
    : undefined;
  const visibleId =
    playback.visible[playback.visible.length - 1]?.id ||
    playback.messages[0]?.id;
  return beatFor(jobId, typingId) || beatFor(jobId, visibleId);
}

export function BotComputer({
  jobId,
  playback,
}: {
  jobId: JobId;
  playback: DemoPlayback;
}) {
  const beat = activeBeat(jobId, playback);

  const message = playback.current;
  const sent = message ? Boolean(playback.sentDrafts[message.id]) : false;

  if (!beat) return null;

  const url = `https://${beat.host}${beat.path || ""}`;

  return (
    <div className="pc" aria-label="Bot computer">
      <div className="pc-window">
        <div className="chrome">
          <div className="chrome-row">
            <span className="traffic" aria-hidden>
              <i />
              <i />
              <i />
            </span>
            <div className="chrome-url">
              <span className="chrome-lock" aria-hidden />
              <code>{url}</code>
            </div>
          </div>
        </div>
        <div className="pc-body">
          <div className="chrome-tabs" role="tablist" aria-label="Open sites">
            {beat.tabs.map((tab) => (
              <span
                key={tab.id}
                role="tab"
                aria-selected={tab.host === beat.host}
                className={tab.host === beat.host ? "is-active" : undefined}
              >
                {tab.label}
              </span>
            ))}
          </div>
          <div className="pc-main">
            <p className="pc-pill">{beat.pill}</p>
            <div className="pc-page">
              <SiteScreen
                beat={beat}
                message={message}
                account={playback.account}
                sent={sent}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
