/**
 * Internal helper for the email module: derive a translucent tint from a
 * theme-token hex so soft-filled chips/labels stay token-bound (no literal
 * colors). Mirrors the `withAlpha` used by `Button`/`GlassPanel`. Not exported
 * from the module barrel — components import it directly.
 */
export declare function withAlpha(hex: string, alpha: number): string;
//# sourceMappingURL=tint.d.ts.map