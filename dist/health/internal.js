"use strict";
/**
 * Shared token-class maps for the web `health` blocks. Every semantic slot maps
 * to a `--xen-*`-bound Tailwind class (never a literal color), mirroring the
 * `SemanticColors` keys the native module resolves from `useXenitionTheme()`.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CARD_SHELL = exports.BORDER_CLASS = exports.BG_CLASS = exports.TEXT_CLASS = void 0;
/** `text-*` token class per accentable slot (plus `muted`). */
exports.TEXT_CLASS = {
    primary: 'text-primary',
    accent: 'text-accent',
    success: 'text-success',
    warn: 'text-warn',
    danger: 'text-danger',
    muted: 'text-muted',
};
/** `bg-*` token class per accentable slot (plus `muted`). */
exports.BG_CLASS = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    success: 'bg-success',
    warn: 'bg-warn',
    danger: 'bg-danger',
    muted: 'bg-muted',
};
/** `border-*` token class per accentable slot. */
exports.BORDER_CLASS = {
    primary: 'border-primary',
    accent: 'border-accent',
    success: 'border-success',
    warn: 'border-warn',
    danger: 'border-danger',
};
/** Shared bordered-surface card shell: token background, border, radius, padding. */
exports.CARD_SHELL = 'flex flex-col rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]';
//# sourceMappingURL=internal.js.map