export default function SectionLabel({ text }: { text: string }) {
  return (
    <div className="brutalist-section-label" aria-hidden>
      {text}
    </div>
  );
}
