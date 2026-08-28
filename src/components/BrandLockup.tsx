import Image from "next/image";

export function BrandLockup({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
  invert?: boolean;
}) {
  return (
    <div className={`brand-lockup brand-lockup-${size}`}>
      <Image
        src="/brand/teradata-wordmark.svg"
        alt="Teradata"
        width={148}
        height={29}
        className="brand-customer"
      />
      <span className="brand-times" aria-hidden>
        ×
      </span>
      <Image
        src="/brand/spacexai.svg"
        alt="SpaceXAI"
        width={1294}
        height={158}
        className="brand-sxai"
      />
    </div>
  );
}
