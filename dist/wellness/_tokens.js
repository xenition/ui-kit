"use strict";
/**
 * Internal token-class maps for the web `wellness` module. Every entry is a
 * `--xen-*`-bound Tailwind utility (never a literal color), mirroring the native
 * module's `colors[slot]` / `withAlpha(colors[slot], α)` lookups. Not part of
 * the public barrel.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CARD_SHELL = exports.SLOT_TINT = exports.SLOT_BORDER_L = exports.SLOT_BORDER = exports.SLOT_ON = exports.SLOT_BG = exports.SLOT_TEXT = void 0;
/** `text-*` token class per slot. */
exports.SLOT_TEXT = {
    primary: 'text-primary',
    accent: 'text-accent',
    success: 'text-success',
    warn: 'text-warn',
    danger: 'text-danger',
    muted: 'text-muted',
};
/** Solid `bg-*` token class per slot (filled controls / completed dots). */
exports.SLOT_BG = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    success: 'bg-success',
    warn: 'bg-warn',
    danger: 'bg-danger',
    muted: 'bg-muted',
};
/** Readable foreground `text-*` class to pair on a solid `SLOT_BG`. */
exports.SLOT_ON = {
    primary: 'text-on-primary',
    accent: 'text-on-accent',
    success: 'text-on-success',
    warn: 'text-on-warn',
    danger: 'text-on-danger',
    muted: 'text-on-surface',
};
/** `border-*` token class per slot. */
exports.SLOT_BORDER = {
    primary: 'border-primary',
    accent: 'border-accent',
    success: 'border-success',
    warn: 'border-warn',
    danger: 'border-danger',
    muted: 'border-muted',
};
/** Left-edge accent `border-l-*` token class per slot. */
exports.SLOT_BORDER_L = {
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
exports.SLOT_TINT = {
    primary: 'bg-primary/10',
    accent: 'bg-accent/10',
    success: 'bg-success/10',
    warn: 'bg-warn/10',
    danger: 'bg-danger/10',
    muted: 'bg-muted/10',
};
/** Shared surface-card shell classes (token-bound background, border, radius). */
exports.CARD_SHELL = 'bg-surface text-on-surface border border-border rounded-[var(--xen-radius-lg)]';
//# sourceMappingURL=_tokens.js.map