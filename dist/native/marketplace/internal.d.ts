/**
 * Internal helpers shared across the native marketplace components. Not part of
 * the public surface — the barrel does not re-export these.
 */
/**
 * Token-derived translucent tint. Takes a resolved theme hex (always sourced
 * from a `SemanticColors` slot or a `tokens.ramps.*` step — never a literal)
 * and returns an `rgba(...)` string so tints stay traceable to a token and no
 * hex literal is ever introduced. Mirrors the primitive `withAlpha` in
 * `Button`/`Badge`.
 */
export declare function withAlpha(hex: string, alpha: number): string;
/** Marketplace item condition grades. */
export type Condition = 'new' | 'like-new' | 'used' | 'refurb';
//# sourceMappingURL=internal.d.ts.map