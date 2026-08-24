import * as React from 'react';
/** Risk tier — an ordered, non-color signal. */
export type RiskTier = 'low' | 'moderate' | 'high';
export interface RiskScoreProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Underwriting risk score, 0–100 (higher = riskier). */
    score: number;
    /** Explicit tier; derived from `score` when omitted. */
    tier?: RiskTier;
    /** Heading label (default "Risk score"). */
    label?: string;
    /** Contributing factors listed under the bar. */
    factors?: string[];
}
/**
 * An underwriting risk gauge: a 0–100 score with a tier read out by
 * **glyph + label + color** (low → success, high → danger — never color alone),
 * a token `Progress` bar, and an optional factor list. The score is clamped to
 * 0–100 and rounded; the tier derives from the score when not given. Factor
 * indexing is guarded. Token-bound throughout. Web parity of the native
 * `RiskScore`.
 */
export declare const RiskScore: React.ForwardRefExoticComponent<RiskScoreProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RiskScore.d.ts.map