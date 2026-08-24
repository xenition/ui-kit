import type { BadgeTone } from '../../primitives';
/**
 * Tone → token-utility classes for a **soft tinted surface** (disc / pill /
 * banner background) with a matching foreground. The web analog of the native
 * `withAlpha(colors.<tone>, α)` tint: every class resolves through a `--xen-*`
 * token (ramp step or token-with-opacity modifier), so no literal color is ever
 * introduced. Foreground pairs a readable `text-*` token for glyph + label.
 */
export declare const TONE_TINT: Record<BadgeTone, string>;
//# sourceMappingURL=tint.d.ts.map