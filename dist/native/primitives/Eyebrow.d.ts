import * as React from 'react';
import { type StyleProp, type TextStyle } from 'react-native';
export type EyebrowTone = 'primary' | 'accent' | 'muted';
export interface EyebrowProps {
    /** Semantic color slot for the label (default `accent`). */
    tone?: EyebrowTone;
    /** Draw short hairline ticks flanking the label. */
    rule?: boolean;
    /** Horizontal alignment (default `start`; `center` for section openers). */
    align?: 'start' | 'center';
    style?: StyleProp<TextStyle>;
    children?: React.ReactNode;
}
/**
 * Tracked small-caps kicker label — the native mirror of the web `Eyebrow`.
 * Color comes from the semantic `primary`/`accent`/`muted` tokens (auto-
 * contrast-checked by the compiler); the optional flanking rules inherit the
 * same token color. No literal colors.
 */
export declare function Eyebrow({ tone, rule, align, style, children, }: EyebrowProps): React.ReactElement;
//# sourceMappingURL=Eyebrow.d.ts.map