"use client";

/**
 * AmbientBackground — Fixed full-viewport ambient layer.
 *
 * Uses CSS radial gradients instead of blurred divs for:
 *   1. Crisp, well-defined ambient glow (no muddy blur stacking)
 *   2. Single composite operation (GPU efficient)
 *   3. Controllable, predictable results across devices
 */
export const AmbientBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    {/* Ambient glow — radial gradients, zero blur */}
    <div
      className="absolute inset-0"
      style={{
        background: [
          "radial-gradient(ellipse 70% 45% at 50% -10%, rgba(59, 130, 246, 0.07) 0%, transparent 70%)",
          "radial-gradient(ellipse 50% 35% at 95% 95%, rgba(245, 158, 11, 0.035) 0%, transparent 70%)",
        ].join(", "),
      }}
    />

    {/* Subtle vertical grid lines — architectural pattern */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
  </div>
);
