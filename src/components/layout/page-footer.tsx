/**
 * PageFooter — Minimal site footer.
 */
export const PageFooter = () => (
  <footer className="w-full py-8 text-center border-t border-slate-900 z-10 mt-20">
    <p className="text-xs text-slate-600 font-mono">
      &copy; {new Date().getFullYear()} EMEI SYSTEM. ALL RIGHTS RESERVED.
    </p>
  </footer>
);
