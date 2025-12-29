/**
 * Team display component - Slot-based compound component
 * Layer 1: UI component
 */

import * as React from "react";
import { cn } from "~/lib/utils";

// Root component
export interface TeamDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function TeamDisplay({ className, children, ...props }: TeamDisplayProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)} {...props}>
      {children}
    </div>
  );
}

// Header component
export interface TeamDisplayHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function TeamDisplayHeader({ className, children, ...props }: TeamDisplayHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between", className)} {...props}>
      {children}
    </div>
  );
}

// Label component
export interface TeamDisplayLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export function TeamDisplayLabel({ className, children, ...props }: TeamDisplayLabelProps) {
  return (
    <span className={cn("text-sm font-medium", className)} {...props}>
      {children}
    </span>
  );
}

// Action button component (for clear button, etc.)
export interface TeamDisplayActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function TeamDisplayAction({ className, children, ...props }: TeamDisplayActionProps) {
  return (
    <button 
      className={cn("text-xs text-muted-foreground hover:text-foreground transition-colors", className)} 
      {...props}
    >
      {children}
    </button>
  );
}

// Grid component
export interface TeamDisplayGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function TeamDisplayGrid({ className, children, ...props }: TeamDisplayGridProps) {
  return (
    <div className={cn("flex lg:grid lg:grid-cols-6 gap-2 overflow-x-auto lg:overflow-x-visible scrollbar-hide", className)} {...props}>
      {children}
    </div>
  );
}

// Slot wrapper component
export interface TeamDisplaySlotProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function TeamDisplaySlot({ className, children, ...props }: TeamDisplaySlotProps) {
  return (
    <div className={cn("relative w-[280px] shrink-0 lg:w-auto lg:shrink", className)} {...props}>
      {children}
    </div>
  );
}
