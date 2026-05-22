export default function BracketFrame() {
  // Continuous frame inset 16px from each edge, broken at the corners by 32px gaps.
  return (
    <>
      <div
        className="brutalist-frame-edge hidden md:block"
        style={{ top: 16, left: 48, right: 48, height: 2 }}
        aria-hidden
      />
      <div
        className="brutalist-frame-edge hidden md:block"
        style={{ bottom: 16, left: 48, right: 48, height: 2 }}
        aria-hidden
      />
      <div
        className="brutalist-frame-edge hidden md:block"
        style={{ left: 16, top: 48, bottom: 48, width: 2 }}
        aria-hidden
      />
      <div
        className="brutalist-frame-edge hidden md:block"
        style={{ right: 16, top: 48, bottom: 48, width: 2 }}
        aria-hidden
      />

      {/* Mobile: simple full outline */}
      <div
        className="brutalist-frame-edge md:hidden"
        style={{ top: 8, left: 8, right: 8, height: 2 }}
        aria-hidden
      />
      <div
        className="brutalist-frame-edge md:hidden"
        style={{ bottom: 8, left: 8, right: 8, height: 2 }}
        aria-hidden
      />
      <div
        className="brutalist-frame-edge md:hidden"
        style={{ left: 8, top: 8, bottom: 8, width: 2 }}
        aria-hidden
      />
      <div
        className="brutalist-frame-edge md:hidden"
        style={{ right: 8, top: 8, bottom: 8, width: 2 }}
        aria-hidden
      />
    </>
  );
}
