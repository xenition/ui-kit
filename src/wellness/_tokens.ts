/**
 * Internal token-class maps for the web `wellness` module. Every entry is a
 * `--xen-*`-bound Tailwind utility (never a literal color), mirroring the native
 * module's `colors[slot]` / `withAlpha(colors[slot], α)` lookups. Not part of
 * the public barrel.
 */

/** Semantic color slots referenced by the wellness components. */
export type WellnessSlot = 'primary' | 'accent' | 'success' | 'warn' | 'danger' | 'muted';

/** `text-*` token class per slot. */
export const SLOT_TEXT: Record<WellnessSlot, string> = {
  primary: 'text-primary',
  accent: 'text-accent',
  success: 'text-success',
  warn: 'text-warn',
  danger: 'text-danger',
  muted: 'text-muted',
};

/** Solid `bg-*` token class per slot (filled controls / completed dots). */
export const SLOT_BG: Record<WellnessSlot, string> = {
  primary: 'bg-primary',
  accent: 'bg-accent',
  success: 'bg-success',
  warn: 'bg-warn',
  danger: 'bg-danger',
  muted: 'bg-muted',
};

/** Readable foreground `text-*` class to pair on a solid `SLOT_BG`. */
export const SLOT_ON: Record<WellnessSlot, string> = {
  primary: 'text-on-primary',
  accent: 'text-on-accent',
  success: 'text-on-success',
  warn: 'text-on-warn',
  danger: 'text-on-danger',
  muted: 'text-on-surface',
};

/** `border-*` token class per slot. */
export const SLOT_BORDER: Record<WellnessSlot, string> = {
  primary: 'border-primary',
  accent: 'border-accent',
  success: 'border-success',
  warn: 'border-warn',
  danger: 'border-danger',
  muted: 'border-muted',
};

/** Left-edge accent `border-l-*` token class per slot. */
export const SLOT_BORDER_L: Record<WellnessSlot, string> = {
  primary: 'border-l-primary',
  accent: 'border-l-accent',
  success: 'border-l-success',
  warn: 'border-l-warn',
  danger: 'border-l-danger',
  muted: 'border-l-muted',
};

/**
 * Reduced-alpha `bg-<slot>/10` tint per slot — the web analog of the native
 * `withAlpha(colors[slot], ~0.14)` soft disc / chip fill. Resolves through the
 * `--xen-*` token with an opacity modifier, so no literal color is introduced.
 */
export const SLOT_TINT: Record<WellnessSlot, string> = {
  primary: 'bg-primary/10',
  accent: 'bg-accent/10',
  success: 'bg-success/10',
  warn: 'bg-warn/10',
  danger: 'bg-danger/10',
  muted: 'bg-muted/10',
};

/** Shared surface-card shell classes (token-bound background, border, radius). */
export const CARD_SHELL =
  'bg-surface text-on-surface border border-border rounded-[var(--xen-radius-lg)]';
