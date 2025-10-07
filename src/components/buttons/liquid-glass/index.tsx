"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const liquidGlassButtonVariants = cva(
  "relative inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95",
  {
    variants: {
      variant: {
        default:
          "text-white/90 bg-white/10 backdrop-blur-xl  hover:bg-white/20 dark:bg-white/10  dark:hover:bg-white/10",
        blue:
          "text-blue-100 bg-blue-500/20 backdrop-blur-xl   hover:bg-blue-500/30",
        rose:
          "text-rose-100 bg-rose-500/20 backdrop-blur-xl  hover:bg-rose-500/30 ",
        emerald:
          "text-emerald-100 bg-emerald-500/20 backdrop-blur-xl  hover:bg-emerald-500/30 ",
      },
      size: {
        sm: "px-3 py-1.5 text-xs",
        md: "px-5 py-2 text-sm",
        lg: "px-7 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface LiquidGlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidGlassButtonVariants> {
  isLoading?: boolean;
}

export const LiquidGlassButton = React.forwardRef<
  HTMLButtonElement,
  LiquidGlassButtonProps
>(({ className, variant, size, isLoading, children, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      disabled={isLoading || props.disabled}
      className={cn(
        liquidGlassButtonVariants({ variant, size }),
        "overflow-hidden group disabled:opacity-50 flex items-center justify-center gap-2 disabled:cursor-not-allowed bottom-2 rounded-full text-xs font-medium cursor-pointer"
      )}
      {...props}
    >
      {/* Animated highlight overlay */}
      <span className="absolute inset-0 pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity duration-300" />

      {/* Liquid shimmer effect */}
      <span className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
        <span className="absolute left-[-100%] top-0 w-[200%] h-full  group-hover:translate-x-1/2 transition-transform duration-[1.2s] ease-in-out" />
      </span>

      {/* Glass ripple */}
      <span className="absolute inset-0 pointer-events-none rounded-xl scale-0 group-active:scale-100 transition-transform duration-200 ease-out" />

      {/* Button content */}
      <span className="relative  z-10 flex items-center gap-2">
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </span>
    </Button>
  );
});

LiquidGlassButton.displayName = "LiquidGlassButton";
