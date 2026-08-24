/**
 * Shared token-class maps for the web `health` blocks. Every semantic slot maps
 * to a `--xen-*`-bound Tailwind class (never a literal color), mirroring the
 * `SemanticColors` keys the native module resolves from `useXenitionTheme()`.
 */
/** Semantic color slots health blocks accent with (subset of `SemanticColors`). */
export type HealthColor = 'primary' | 'accent' | 'success' | 'warn' | 'danger';
/** `text-*` token class per accentable slot (plus `muted`). */
export declare const TEXT_CLASS: Record<HealthColor | 'muted', string>;
/** `bg-*` token class per accentable slot (plus `muted`). */
export declare const BG_CLASS: Record<HealthColor | 'muted', string>;
/** `border-*` token class per accentable slot. */
export declare const BORDER_CLASS: Record<HealthColor, string>;
/** Shared bordered-surface card shell: token background, border, radius, padding. */
export declare const CARD_SHELL = "flex flex-col rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]";
//# sourceMappingURL=internal.d.ts.map