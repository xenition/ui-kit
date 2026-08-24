/**
 * Internal token-class maps for the web `pets` module. Every entry is a
 * `--xen-*`-bound Tailwind utility (never a literal color), mirroring the native
 * module's `colors[slot]` lookups. Not part of the public barrel.
 */
import type { BadgeTone } from '../primitives';
/** Semantic color slots referenced by the pet components (subset of the theme's `SemanticColors`). */
export type PetSlot = 'primary' | 'accent' | 'success' | 'warn' | 'danger' | 'muted';
/** `text-*` token class per slot. */
export declare const SLOT_TEXT: Record<PetSlot, string>;
/** `bg-*` token class per slot. */
export declare const SLOT_BG: Record<PetSlot, string>;
/** Full `border-*` token class per slot. */
export declare const SLOT_BORDER: Record<PetSlot, string>;
/** Left-edge accent `border-l-*` token class per slot. */
export declare const SLOT_BORDER_L: Record<PetSlot, string>;
/** Top-edge accent `border-t-*` token class per slot. */
export declare const SLOT_BORDER_T: Record<PetSlot, string>;
/** Reduced-alpha `bg-<slot>/10` tint token class per slot (translucent banner fills). */
export declare const SLOT_TINT: Record<PetSlot, string>;
/**
 * Map a native badge tone to a web {@link BadgeTone}. The web `Badge` has no
 * `accent` tone, so `accent` folds into `primary`.
 */
export declare function toBadgeTone(tone: 'primary' | 'success' | 'warn' | 'danger' | 'neutral' | 'accent'): BadgeTone;
/** Minimal keyboard-event shape used by {@link activateOnKey} (avoids a React import here). */
interface KeyLike {
    key: string;
    preventDefault: () => void;
}
/**
 * Keyboard activation for a `role="button"` div — fires the handler on
 * Enter/Space and swallows the default scroll on Space.
 */
export declare function activateOnKey(onActivate?: () => void): (e: KeyLike) => void;
export {};
//# sourceMappingURL=_tokens.d.ts.map