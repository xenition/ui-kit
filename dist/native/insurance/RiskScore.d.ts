import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Risk tier — an ordered, non-color signal. */
export type RiskTier = 'low' | 'moderate' | 'high';
export interface RiskScoreProps {
    /** Underwriting risk score, 0–100 (higher = riskier). */
    score: number;
    /** Explicit tier; derived from `score` when omitted. */
    tier?: RiskTier;
    /** Heading label (default "Risk score"). */
    label?: string;
    /** Contributing factors listed under the bar. */
    factors?: string[];
    style?: StyleProp<ViewStyle>;
}
/**
 * An underwriting risk gauge: a 0–100 score with a tier read out by
 * **glyph + label + color** (low → success, high → danger — never color alone),
 * a token `Progress` bar, and an optional factor list. The score is clamped to
 * 0–100 and rounded; the tier derives from the score when not given. Factor
 * indexing is guarded. Token-bound throughout.
 */
export declare function RiskScore({ score, tier, label, factors, style, }: RiskScoreProps): React.ReactElement;
//# sourceMappingURL=RiskScore.d.ts.map