"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TONE_TINT = void 0;
/**
 * Tone → token-utility classes for a **soft tinted surface** (disc / pill /
 * banner background) with a matching foreground. The web analog of the native
 * `withAlpha(colors.<tone>, α)` tint: every class resolves through a `--xen-*`
 * token (ramp step or token-with-opacity modifier), so no literal color is ever
 * introduced. Foreground pairs a readable `text-*` token for glyph + label.
 * Mirror of the insurance module's `internal/tint.ts`.
 */
exports.TONE_TINT = {
    neutral: 'bg-neutral-100 text-on-surface',
    muted: 'bg-neutral-100 text-muted',
    primary: 'bg-primary-50 text-primary',
    accent: 'bg-accent-50 text-accent',
    success: 'bg-success/10 text-success',
    warn: 'bg-warn/10 text-warn',
    danger: 'bg-danger/10 text-danger',
};
//# sourceMappingURL=tint.js.map