export default function Footer() {
  return (
    <footer
      className="hairline-t"
      style={{
        background: "var(--bg-2)",
        paddingTop: 64,
        paddingBottom: 48,
      }}
    >
      <div className="container-x">
        <div
          className="grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 40,
            alignItems: "start",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 18,
                  height: 18,
                  border: "1.5px solid var(--ink)",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    inset: 4,
                    background: "var(--accent)",
                  }}
                />
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 17,
                  letterSpacing: "-0.02em",
                }}
              >
                EMEI
              </span>
            </div>
            <p
              className="body-muted"
              style={{ fontSize: 14, maxWidth: 280, lineHeight: 1.55 }}
            >
              An open invoicing protocol for autonomous agents and the humans
              who work with them.
            </p>
          </div>

          <FooterColumn title="Protocol">
            <FooterLink href="#primitives">Primitives</FooterLink>
            <FooterLink href="#how-it-works">How it works</FooterLink>
            <FooterLink href="#settlement">Settlement</FooterLink>
            <FooterLink href="#status">Status</FooterLink>
          </FooterColumn>

          <FooterColumn title="Build">
            <FooterLink
              href="https://github.com/Tvarox/EMEI-Contracts"
              external
            >
              Contracts
            </FooterLink>
            <FooterLink
              href="https://github.com/Tvarox/EMEI-Facilitator"
              external
            >
              Facilitator
            </FooterLink>
            <FooterLink
              href="https://github.com/Tvarox/EMEI-Contracts#readme"
              external
            >
              Docs
            </FooterLink>
          </FooterColumn>

          <FooterColumn title="Network">
            <div className="status-pill" style={{ marginBottom: 12 }}>
              <span className="status-dot" />
              <span>Live · Mantle Sepolia</span>
            </div>
            <p
              className="body-muted"
              style={{ fontSize: 13, lineHeight: 1.55 }}
            >
              Mainnet pending. Built in public.
            </p>
          </FooterColumn>
        </div>

        <div
          className="hairline-t"
          style={{
            marginTop: 48,
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div
            className="eyebrow"
            style={{ color: "var(--muted-2)", fontSize: 11 }}
          >
            © {new Date().getFullYear()} EMEI · v0 · Pre-production
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--muted-2)",
              letterSpacing: "0.04em",
              fontStyle: "italic",
            }}
          >
            {"// built for the agents that already exist"}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          footer .grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 540px) {
          footer .grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        className="eyebrow"
        style={{ marginBottom: 14, fontSize: 11 }}
      >
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {children}
      </div>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      style={{
        fontSize: 14,
        color: "var(--ink)",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      {children}
      {external && (
        <span aria-hidden style={{ color: "var(--muted-2)" }}>
          ↗
        </span>
      )}
    </a>
  );
}
