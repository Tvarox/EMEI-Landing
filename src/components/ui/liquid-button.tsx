"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * LiquidButton — "Neural Network" Edition.
 * Replaces the liquid fill with a dynamic particle web (nodes and edges) 
 * that activates on hover.
 */

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 overflow-hidden relative group cursor-pointer bg-black",
  {
    variants: {
      variant: {
        default:
          "text-white border border-blue-500/20 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] [--web-color:rgba(59,130,246,0.5)] [--node-color:#3b82f6]",
        secondary:
          "text-amber-500 border border-amber-500/20 hover:border-amber-400/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] [--web-color:rgba(245,158,11,0.5)] [--node-color:#f59e0b]",
        outline:
          "text-slate-300 border border-slate-800 hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] [--web-color:rgba(255,255,255,0.5)] [--node-color:#ffffff]",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 px-3 py-1 text-xs",
        lg: "h-12 px-8 py-2.5 text-sm font-semibold tracking-[0.15em]",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface LiquidButtonProps
  extends Omit<HTMLMotionProps<"button">, "children">,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  hoverScale?: number;
  tapScale?: number;
}

const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ className, variant, size, hoverScale = 1.01, tapScale = 0.97, children, ...props }, ref) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const [isHovered, setIsHovered] = React.useState(false);
    
    React.useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let animationFrameId: number;
      let particles: Particle[] = [];
      const particleCount = 25;
      const connectionDistance = 50;

      const resize = () => {
        const parent = canvas.parentElement;
        if (!parent) return;
        const rect = parent.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      };

      class Particle {
        x: number;
        y: number;
        vx: number;
        vy: number;
        size: number;

        constructor(w: number, h: number) {
          this.x = Math.random() * w;
          this.y = Math.random() * h;
          this.vx = (Math.random() - 0.5) * 0.4;
          this.vy = (Math.random() - 0.5) * 0.4;
          this.size = Math.random() * 1.5;
        }

        update(w: number, h: number) {
          this.x += this.vx;
          this.y += this.vy;

          if (this.x < 0 || this.x > w) this.vx *= -1;
          if (this.y < 0 || this.y > h) this.vy *= -1;
        }

        draw(nodeColor: string) {
          if (!ctx) return;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = nodeColor;
          ctx.fill();
        }
      }

      const init = () => {
        resize();
        particles = [];
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle(canvas.width, canvas.height));
        }
      };

      const animate = () => {
        if (!ctx || !canvas.parentElement) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const parentStyle = getComputedStyle(canvas.parentElement);
        const nodeColor = parentStyle.getPropertyValue("--node-color") || "#3b82f6";
        const webColorRaw = parentStyle.getPropertyValue("--web-color") || "rgba(59,130,246,0.5)";

        const opacity = isHovered ? 1 : 0.2;
        ctx.globalAlpha = opacity;

        particles.forEach((p, i) => {
          p.update(canvas.width, canvas.height);
          p.draw(nodeColor);

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDistance) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              const lineAlpha = (1 - dist / connectionDistance) * (isHovered ? 0.5 : 0.1);
              // Safely handle rgba replacement
              const strokeColor = webColorRaw.includes("rgba") 
                ? webColorRaw.replace(/[^,]+(?=\))/, lineAlpha.toString())
                : webColorRaw;
              
              ctx.strokeStyle = strokeColor;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        });

        animationFrameId = requestAnimationFrame(animate);
      };

      init();
      animate();
      window.addEventListener("resize", resize);

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("resize", resize);
      };
    }, [isHovered]);

    return (
      <motion.button
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileTap={{ scale: tapScale }}
        whileHover={{ scale: hoverScale }}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {/* Particle Web Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{ opacity: isHovered ? 1 : 0.3 }}
        />
        
        {/* Hover Background Shift */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-blue-500/5 pointer-events-none"
        />

        {/* Button Content */}
        <span className="relative z-10 flex items-center justify-center transition-all duration-300">
          {children}
        </span>
        
        {/* Subtle Scanline Overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px]" />
      </motion.button>
    );
  }
);

LiquidButton.displayName = "LiquidButton";

export { LiquidButton, buttonVariants };
