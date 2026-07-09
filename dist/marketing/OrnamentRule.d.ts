import * as React from 'react';
export type OrnamentShape = 'diamond' | 'dot' | 'line' | 'none';
export type OrnamentTone = 'accent' | 'primary' | 'border';
export interface OrnamentRuleProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Centered ornament: rotated diamond, round dot, short bar, or none (plain rule). */
    ornament?: OrnamentShape;
    /** Token family tinting the rule and ornament (default `accent` — the "brass" look). */
    tone?: OrnamentTone;
}
/**
 * Editorial divider generalized from the restaurant template's brass rules: a
 * fading 1px gradient rule with an optional centered diamond/dot/line
 * ornament. Purely decorative and static — token-tinted via `tone`, so
 * "brass" is just whatever the theme's accent ramp says it is.
 */
export declare const OrnamentRule: React.ForwardRefExoticComponent<OrnamentRuleProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=OrnamentRule.d.ts.map