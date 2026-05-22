type Props = {
  index?: string;
  label: string;
  accent?: boolean;
};

export default function SectionEyebrow({ index, label, accent }: Props) {
  return (
    <div
      className={accent ? "eyebrow-accent" : "eyebrow"}
      style={{ display: "flex", alignItems: "center", gap: 12 }}
    >
      {index && (
        <span
          aria-hidden
          style={{
            display: "inline-block",
            width: 24,
            textAlign: "left",
            color: accent ? "var(--accent)" : "var(--muted-2)",
          }}
        >
          {index}
        </span>
      )}
      <span
        aria-hidden
        style={{
          width: 16,
          height: 1,
          background: accent ? "var(--accent)" : "var(--hairline-strong)",
        }}
      />
      <span>{label}</span>
    </div>
  );
}
