import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type OrnamentShape = 'diamond' | 'dot' | 'line' | 'none';
export type OrnamentTone = 'accent' | 'primary' | 'border';
export interface OrnamentRuleProps {
    /** Centered ornament: rotated diamond, round dot, short bar, or none (plain rule). */
    ornament?: OrnamentShape;
    /** Token family tinting the rule and ornament (default `accent` — the "brass" look). */
    tone?: OrnamentTone;
    style?: StyleProp<ViewStyle>;
}
/**
 * Editorial divider — the native mirror of the web `OrnamentRule`: a 1px rule
 * flanking an optional centered diamond/dot/line ornament. Purely decorative
 * and static, token-tinted via `tone`.
 *
 * The web version fades each half of the rule with a horizontal gradient
 * (`linear-gradient` + `color-mix`). React Native has no CSS gradients here, so
 * the fade is **approximated with a solid low-opacity token border** — the tint
 * always originates from a theme token, so no literal color is introduced.
 */
export declare function OrnamentRule({ ornament, tone, style, }: OrnamentRuleProps): React.ReactElement;
//# sourceMappingURL=OrnamentRule.d.ts.map