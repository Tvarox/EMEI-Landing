"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { ScrambleText } from "@/components/ui/scramble-text";

const NAV = [
  { label: "Product", href: "#product" },
  { label: "Architecture", href: "#architecture" },
  { label: "Developers", href: "#developers" },
  { label: "Enterprise", href: "#enterprise" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300`}
    >
      <div
        className={`mx-auto mt-3 sm:mt-4 max-w-[1200px] px-3 sm:px-4 transition-all duration-300`}
      >
        <nav
          className={`flex items-center justify-between gap-4 rounded-full border h-14 pl-5 pr-2 sm:pr-2.5 transition-all duration-300 ${
            scrolled
              ? "bg-[rgba(244,243,239,0.85)] border-hairline backdrop-blur-md shadow-[0_2px_24px_rgba(0,0,0,0.04)]"
              : "bg-[rgba(244,243,239,0.55)] border-transparent backdrop-blur-sm"
          }`}
        >
          {/* Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 select-none cursor-pointer group"
          >
            <Image
              src="/Logo.svg"
              alt=""
              width={20}
              height={20}
              className="w-5 h-5"
              priority
            />
            <ScrambleText
              text="EMEI"
              className="font-semibold text-[15px] tracking-[0.22em] text-ink"
            />
          </Link>

          {/* Center nav */}
          <ul className="hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
            {NAV.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-[13px] font-medium text-ink/70 hover:text-ink transition-colors duration-200"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/Tvarox/EMEI-Facilitator"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-[13px] font-medium text-ink/70 hover:text-ink transition-colors px-3"
            >
              GitHub
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="#cta"
              className="inline-flex items-center gap-2 bg-ink text-canvas rounded-full pl-4 pr-2 py-2 text-[13px] font-semibold hover:bg-ink-2 transition-all duration-200 group"
            >
              Get test keys
              <span className="bg-canvas/10 rounded-full p-1 group-hover:bg-accent group-hover:translate-x-0.5 transition-all">
                <ArrowUpRight className="w-3 h-3 text-canvas" />
              </span>
            </a>
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-black/5 transition-colors"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile sheet */}
        {open && (
          <div className="md:hidden mt-2 rounded-3xl border border-hairline bg-canvas/95 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-4">
            <ul className="flex flex-col">
              {NAV.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 px-2 text-[15px] font-medium text-ink hover:bg-black/[0.03] rounded-lg"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 mt-2 border-t border-hairline">
                <a
                  href="https://github.com/Tvarox/EMEI-Facilitator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-3 px-2 text-[15px] font-medium text-ink hover:bg-black/[0.03] rounded-lg"
                  onClick={() => setOpen(false)}
                >
                  GitHub
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};
