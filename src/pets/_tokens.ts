/**
 * Internal token-class maps for the web `pets` module. Every entry is a
 * `--xen-*`-bound Tailwind utility (never a literal color), mirroring the native
 * module's `colors[slot]` lookups. Not part of the public barrel.
 */
import type { BadgeTone } from '../primitives';

/** Semantic color slots referenced by the pet components (subset of the theme's `SemanticColors`). */
export type PetSlot = 'primary' | 'accent' | 'success' | 'warn' | 'danger' | 'muted';

/** `text-*` token class per slot. */
export const SLOT_TEXT: Record<PetSlot, string> = {
  primary: 'text-primary',
  accent: 'text-accent',
  success: 'text-success',
  warn: 'text-warn',
  danger: 'text-danger',
  muted: 'text-muted',
};

/** `bg-*` token class per slot. */
export const SLOT_BG: Record<PetSlot, string> = {
  primary: 'bg-primary',
  accent: 'bg-accent',
  success: 'bg-success',
  warn: 'bg-warn',
  danger: 'bg-danger',
  muted: 'bg-muted',
};

/** Full `border-*` token class per slot. */
export const SLOT_BORDER: Record<PetSlot, string> = {
  primary: 'border-primary',
  accent: 'border-accent',
  success: 'border-success',
  warn: 'border-warn',
  danger: 'border-danger',
  muted: 'border-muted',
};

/** Left-edge accent `border-l-*` token class per slot. */
export const SLOT_BORDER_L: Record<PetSlot, string> = {
  primary: 'border-l-primary',
  accent: 'border-l-accent',
  success: 'border-l-success',
  warn: 'border-l-warn',
  danger: 'border-l-danger',
  muted: 'border-l-muted',
};

/** Top-edge accent `border-t-*` token class per slot. */
export const SLOT_BORDER_T: Record<PetSlot, string> = {
  primary: 'border-t-primary',
  accent: 'border-t-accent',
  success: 'border-t-success',
  warn: 'border-t-warn',
  danger: 'border-t-danger',
  muted: 'border-t-muted',
};

/** Reduced-alpha `bg-<slot>/10` tint token class per slot (translucent banner fills). */
export const SLOT_TINT: Record<PetSlot, string> = {
  primary: 'bg-primary/10',
  accent: 'bg-accent/10',
  success: 'bg-success/10',
  warn: 'bg-warn/10',
  danger: 'bg-danger/10',
  muted: 'bg-muted/10',
};

/**
 * Map a native badge tone to a web {@link BadgeTone}. The web `Badge` has no
 * `accent` tone, so `accent` folds into `primary`.
 */
export function toBadgeTone(tone: 'primary' | 'success' | 'warn' | 'danger' | 'neutral' | 'accent'): BadgeTone {
  return tone === 'accent' ? 'primary' : tone;
}

/** Minimal keyboard-event shape used by {@link activateOnKey} (avoids a React import here). */
interface KeyLike {
  key: string;
  preventDefault: () => void;
}

/**
 * Keyboard activation for a `role="button"` div — fires the handler on
 * Enter/Space and swallows the default scroll on Space.
 */
export function activateOnKey(onActivate?: () => void): (e: KeyLike) => void {
  return (e: KeyLike) => {
    if (onActivate && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onActivate();
    }
  };
}
