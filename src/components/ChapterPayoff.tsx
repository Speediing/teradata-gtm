import type { StoryBeat } from "@/data/types";
import { ArtifactCard } from "./ArtifactCard";

export function ChapterPayoff({
  beat,
  value,
}: {
  beat: StoryBeat;
  wash?: string;
  value?: string;
}) {
  if (!beat.artifact) return null;

  return (
    <div className="chapter-payoff">
      <p className="payoff-label">
        {beat.when ? <span>{beat.when}</span> : null}
        {beat.label}
      </p>
      <div className="leave leave-artifact">
        <ArtifactCard artifact={beat.artifact} />
      </div>
      {value ? <p className="leave-value">{value}</p> : null}
    </div>
  );
}
