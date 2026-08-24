/**
 * Internal token-class maps for the web `wellness` module. Every entry is a
 * `--xen-*`-bound Tailwind utility (never a literal color), mirroring the native
 * module's `colors[slot]` / `withAlpha(colors[slot], α)` lookups. Not part of
 * the public barrel.
 */
/** Semantic color slots referenced by the wellness components. */
export type WellnessSlot = 'primary' | 'accent' | 'success' | 'warn' | 'danger' | 'muted';
/** `text-*` token class per slot. */
export declare const SLOT_TEXT: Record<WellnessSlot, string>;
/** Solid `bg-*` token class per slot (filled controls / completed dots). */
export declare const SLOT_BG: Record<WellnessSlot, string>;
/** Readable foreground `text-*` class to pair on a solid `SLOT_BG`. */
export declare const SLOT_ON: Record<WellnessSlot, string>;
/** `border-*` token class per slot. */
export declare const SLOT_BORDER: Record<WellnessSlot, string>;
/** Left-edge accent `border-l-*` token class per slot. */
export declare const SLOT_BORDER_L: Record<WellnessSlot, string>;
/**
 * Reduced-alpha `bg-<slot>/10` tint per slot — the web analog of the native
 * `withAlpha(colors[slot], ~0.14)` soft disc / chip fill. Resolves through the
 * `--xen-*` token with an opacity modifier, so no literal color is introduced.
 */
export declare const SLOT_TINT: Record<WellnessSlot, string>;
/** Shared surface-card shell classes (token-bound background, border, radius). */
export declare const CARD_SHELL = "bg-surface text-on-surface border border-border rounded-[var(--xen-radius-lg)]";
//# sourceMappingURL=_tokens.d.ts.map