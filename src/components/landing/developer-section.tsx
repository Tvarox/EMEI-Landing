"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Terminal } from "lucide-react";

/**
 * Developer Experience.
 * Three columns: CLI · API · SDK
 * Same operation ("issue an invoice") in three idioms, side-by-side.
 */

const CLI_LINES = [
  { prompt: "$", text: "npm i -g @emei/cli", delay: 0 },
  { prompt: "$", text: "emei keys generate", delay: 600 },
  { prompt: ">", text: "saved to ~/.emei/keys.json", delay: 1100, muted: true },
  { prompt: "$", text: "emei invoice create \\", delay: 1700 },
  { prompt: " ", text: "  --to 0xVendor·a91e \\", delay: 2000 },
  { prompt: " ", text: "  --amount 100 --due 30d", delay: 2300 },
  { prompt: ">", text: "INV-29A1 issued · tx 0xa1f2…7d", delay: 3000, muted: true, ok: true },
];

const API_TABS = [
  {
    label: "curl",
    code: `curl https://api.emei.xyz/v1/invoices \\
  -H "X-Private-Key: $EMEI_KEY" \\
  -d '{
    "to":     "0xVendor·a91e",
    "amount": "100",
    "due":    "30d",
    "category": "api"
  }'`,
  },
  {
    label: "TypeScript",
    code: `import { EMEI } from "@emei/sdk";

const emei = new EMEI({ key: process.env.EMEI_KEY! });

const inv = await emei.invoices.create({
  to:       "0xVendor·a91e",
  amount:   "100",
  due:      "30d",
  category: "api",
});`,
  },
  {
    label: "Rust",
    code: `use emei::{Client, NewInvoice};

let client = Client::from_env()?;
let inv = client
  .invoices()
  .create(NewInvoice {
    to:       addr!("0xVendor·a91e"),
    amount:   "100".parse()?,
    due:      Duration::days(30),
    category: "api".into(),
  })
  .await?;`,
  },
  {
    label: "Python",
    code: `from emei import EMEI

emei = EMEI(key=os.environ["EMEI_KEY"])

inv = emei.invoices.create(
    to="0xVendor·a91e",
    amount="100",
    due="30d",
    category="api",
)`,
  },
];

export const DeveloperSection = () => {
  const [tab, setTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const onCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* noop */
    }
  };

  return (
    <section
      id="developers"
      className="relative w-full py-24 sm:py-28 md:py-32 border-t border-hairline bg-panel-2/40"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="max-w-[640px] mb-12 sm:mb-14">
          <span className="eyebrow">Developer experience</span>
          <h2 className="mt-4 text-[clamp(34px,5vw,56px)] font-display tracking-[-0.015em] leading-[0.96] text-ink">
            One operation.
            <br />
            <span className="text-ink/40">Three surfaces.</span>
          </h2>
          <p className="mt-5 text-[16px] leading-[1.55] text-ink/70 max-w-[540px]">
            CLI for agent runtimes. REST API for backends. SDKs for the rest.
            All three drop into the same facilitator and produce the same
            on-chain artifact.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.4fr] gap-6">
          {/* CLI auto-typer */}
          <div className="rounded-[18px] border border-hairline bg-inverse text-on-inverse overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-on-inverse-muted" />
                <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-on-inverse-muted">
                  emei · cli
                </span>
              </div>
              <button
                type="button"
                onClick={() => onCopy(CLI_LINES.filter(l => l.prompt !== ">").map(l => l.text).join("\n"))}
                className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-on-inverse-muted hover:text-on-inverse inline-flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? "copied" : "copy"}
              </button>
            </div>
            <CliReplay />
          </div>

          {/* API tabs */}
          <div className="rounded-[18px] border border-hairline bg-white overflow-hidden">
            <div className="flex items-center justify-between border-b border-hairline bg-panel-2">
              <div className="flex items-center gap-0">
                {API_TABS.map((t, i) => (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => setTab(i)}
                    className={`px-3.5 sm:px-4 py-2.5 font-mono text-[11px] tracking-[0.12em] border-r border-hairline last:border-r-0 transition-colors ${
                      i === tab
                        ? "bg-white text-ink"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => onCopy(API_TABS[tab].code)}
                className="px-3.5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted hover:text-ink inline-flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? "copied" : "copy"}
              </button>
            </div>
            <pre className="px-5 sm:px-6 py-5 font-mono text-[12.5px] leading-[1.65] text-ink overflow-x-auto whitespace-pre">
              {colorize(API_TABS[tab].code)}
            </pre>
            <div className="px-5 py-3 border-t border-hairline bg-panel-2 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
              <span>POST /v1/invoices</span>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-ink hover:text-accent transition-colors"
              >
                Try in sandbox
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Quickstart strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            { t: "Install", v: "≤ 30s" },
            { t: "First invoice", v: "≤ 4 min" },
            { t: "First settlement", v: "single tx" },
          ].map((c) => (
            <div
              key={c.t}
              className="flex items-center justify-between rounded-[14px] border border-hairline bg-white px-4 py-3.5"
            >
              <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
                {c.t}
              </span>
              <span className="font-mono tabular text-[14px] font-semibold text-ink">
                {c.v}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ----------------------- helpers ----------------------- */

function CliReplay() {
  const [revealed, setRevealed] = useState(0);
  const [loop, setLoop] = useState(0);

  useEffect(() => {
    const total = CLI_LINES.length;
    const finalDelay = CLI_LINES[total - 1].delay + 1100;
    const timeouts = CLI_LINES.map((line, idx) =>
      setTimeout(() => setRevealed(idx + 1), line.delay),
    );
    const restart = setTimeout(() => {
      setRevealed(0);
      setLoop((l) => l + 1);
    }, finalDelay + 4000);
    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(restart);
    };
  }, [loop]);

  return (
    <ul className="px-4 sm:px-5 py-5 font-mono text-[13px] leading-[1.85] min-h-[280px]">
      {CLI_LINES.slice(0, revealed).map((l, i) => (
        <li
          key={i}
          className="ticker-rise flex items-start gap-2"
        >
          <span className={`shrink-0 ${l.muted ? "text-on-inverse-muted" : "text-accent"}`}>
            {l.prompt}
          </span>
          <span className={l.muted ? (l.ok ? "text-status-ok" : "text-on-inverse-muted") : "text-on-inverse"}>
            {l.text}
          </span>
        </li>
      ))}
      {revealed > 0 && revealed < CLI_LINES.length && (
        <li className="flex items-center gap-2">
          <span className="text-accent">$</span>
          <span className="inline-block w-2 h-3.5 bg-on-inverse blink-soft" />
        </li>
      )}
    </ul>
  );
}

/**
 * Tiny syntax colorizer — comments, strings, addresses, keywords.
 * Intentionally cheap; we only need surface aesthetic.
 */
function colorize(code: string): React.ReactNode {
  const KEYWORDS = ["import", "from", "const", "let", "await", "use", "fn", "let", "pub", "async"];
  return code.split("\n").map((line, idx) => {
    const tokens: React.ReactNode[] = [];
    let rest = line;
    let i = 0;

    // simple per-line handling
    while (rest.length > 0 && i < 40) {
      i++;
      // strings
      const sMatch = rest.match(/"[^"]*"/);
      // hex addresses
      const hexMatch = rest.match(/0x[0-9a-fA-FxV·]+/);
      // numbers
      const numMatch = rest.match(/\b[0-9]+\b/);
      // keywords
      const kwMatch = rest.match(new RegExp(`\\b(${KEYWORDS.join("|")})\\b`));

      // pick earliest match
      const candidates = [
        sMatch ? { kind: "str", idx: sMatch.index!, len: sMatch[0].length, text: sMatch[0] } : null,
        hexMatch ? { kind: "hex", idx: hexMatch.index!, len: hexMatch[0].length, text: hexMatch[0] } : null,
        numMatch ? { kind: "num", idx: numMatch.index!, len: numMatch[0].length, text: numMatch[0] } : null,
        kwMatch ? { kind: "kw", idx: kwMatch.index!, len: kwMatch[0].length, text: kwMatch[0] } : null,
      ].filter(Boolean) as { kind: string; idx: number; len: number; text: string }[];

      if (candidates.length === 0) {
        tokens.push(rest);
        break;
      }
      candidates.sort((a, b) => a.idx - b.idx);
      const next = candidates[0];
      if (next.idx > 0) tokens.push(rest.slice(0, next.idx));
      tokens.push(
        <span key={`${idx}-${i}`} className={
          next.kind === "str" ? "text-status-ok" :
          next.kind === "hex" ? "text-accent" :
          next.kind === "num" ? "text-status-warn" :
          "text-ink/55"
        }>
          {next.text}
        </span>,
      );
      rest = rest.slice(next.idx + next.len);
    }

    return (
      <span key={idx}>
        {tokens}
        {"\n"}
      </span>
    );
  });
}
