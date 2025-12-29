/**
 * Pokémon card component - Slot-based compound component
 * Layer 1: UI component (primitives only)
 */

import * as React from "react";
import { cn } from "~/lib/utils";
import {
  Card as BaseCard,
  CardContent as BaseCardContent,
  CardHeader as BaseCardHeader,
} from "./card";

// Root component
export interface PokemonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function PokemonCard({
  className,
  children,
  ...props
}: PokemonCardProps) {
  return (
    <BaseCard
      className={cn("overflow-hidden p-0 gap-0 flex flex-col", className)}
      {...props}
    >
      {children}
    </BaseCard>
  );
}

// Header component (for use in hero)
export interface PokemonCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function PokemonCardHeader({
  className,
  children,
  ...props
}: PokemonCardHeaderProps) {
  return (
    <BaseCardHeader
      className={cn(
        "pt-2 pb-1.5 px-2 flex items-center flex-wrap gap-2 text-white [&_*]:text-white [&_*]:border-white/20",
        className
      )}
      {...props}
    >
      {children}
    </BaseCardHeader>
  );
}

// Title component
export interface PokemonCardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function PokemonCardTitle({
  className,
  children,
  ...props
}: PokemonCardTitleProps) {
  return (
    <h3
      className={cn(
        "font-semibold capitalize text-xl leading-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

// Content component
export interface PokemonCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function PokemonCardContent({
  className,
  children,
  ...props
}: PokemonCardContentProps) {
  return (
    <BaseCardContent
      className={cn("space-y-2 px-2 pb-2 flex-1 flex flex-col", className)}
      {...props}
    >
      {children}
    </BaseCardContent>
  );
}

// Hero section (header + media with background image)
export interface PokemonCardHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  backgroundImage?: string;
}

export function PokemonCardHero({
  className,
  children,
  backgroundImage,
  ...props
}: PokemonCardHeroProps) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        backgroundSize: "50%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "100% 25%",
      }}
      {...props}
    >
      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40 dark:from-black/70 dark:via-black/50 dark:to-black/60" />
      {/* Content */}
      <div className="relative z-1">{children}</div>
    </div>
  );
}

// Media section (field skills area within hero)
export interface PokemonCardMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function PokemonCardMedia({
  className,
  children,
  ...props
}: PokemonCardMediaProps) {
  return (
    <div
      className={cn("px-2 pb-0 pt-0 flex items-center min-h-12", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Types section (for header)
export interface PokemonCardTypesProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function PokemonCardTypes({
  className,
  children,
  ...props
}: PokemonCardTypesProps) {
  return (
    <div
      className={cn("flex flex-wrap gap-1", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Skills section (overlaid in hero)
export interface PokemonCardSkillsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function PokemonCardSkills({
  className,
  children,
  ...props
}: PokemonCardSkillsProps) {
  return (
    <div
      className={cn(
        "flex-1 text-white [&_*]:text-white [&_*]:border-white/20",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Stats section
export interface PokemonCardStatsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function PokemonCardStats({
  className,
  children,
  ...props
}: PokemonCardStatsProps) {
  return (
    <div className={cn("pt-2 pb-0", className)} {...props}>
      {children}
    </div>
  );
}

// Actions section
export interface PokemonCardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function PokemonCardActions({
  className,
  children,
  ...props
}: PokemonCardActionsProps) {
  return (
    <div className={cn("pt-2 pb-0", className)} {...props}>
      {children}
    </div>
  );
}
