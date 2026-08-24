/**
 * Shared token-class maps for the web `health` blocks. Every semantic slot maps
 * to a `--xen-*`-bound Tailwind class (never a literal color), mirroring the
 * `SemanticColors` keys the native module resolves from `useXenitionTheme()`.
 */

/** Semantic color slots health blocks accent with (subset of `SemanticColors`). */
export type HealthColor = 'primary' | 'accent' | 'success' | 'warn' | 'danger';

/** `text-*` token class per accentable slot (plus `muted`). */
export const TEXT_CLASS: Record<HealthColor | 'muted', string> = {
  primary: 'text-primary',
  accent: 'text-accent',
  success: 'text-success',
  warn: 'text-warn',
  danger: 'text-danger',
  muted: 'text-muted',
};

/** `bg-*` token class per accentable slot (plus `muted`). */
export const BG_CLASS: Record<HealthColor | 'muted', string> = {
  primary: 'bg-primary',
  accent: 'bg-accent',
  success: 'bg-success',
  warn: 'bg-warn',
  danger: 'bg-danger',
  muted: 'bg-muted',
};

/** `border-*` token class per accentable slot. */
export const BORDER_CLASS: Record<HealthColor, string> = {
  primary: 'border-primary',
  accent: 'border-accent',
  success: 'border-success',
  warn: 'border-warn',
  danger: 'border-danger',
};

/** Shared bordered-surface card shell: token background, border, radius, padding. */
export const CARD_SHELL =
  'flex flex-col rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]';
