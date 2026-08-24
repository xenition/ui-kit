import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface FeatureSplitProps {
    /** Small kicker above the title. */
    eyebrow?: React.ReactNode;
    /** Feature headline. */
    title: React.ReactNode;
    /** Supporting copy under the title. */
    description?: React.ReactNode;
    /** Check-marked selling points. */
    bullets?: string[];
    /** Visual slot; omit for a token-styled placeholder. */
    media?: React.ReactNode;
    /** Flip the stack order — media below the copy instead of above. */
    reverse?: boolean;
    /** Call-to-action slot under the copy — rendered as-is. */
    action?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}
/**
 * Media-beside-copy feature row — the native mirror of the web `FeatureSplit`.
 * The web version is a two-column grid on desktop; **native always stacks
 * vertically** (phones are narrow), with media on top by default and `reverse`
 * flipping it below the copy. When no `media` is supplied the web seeds a
 * `GenerativeCover`; native renders a token-styled 16:9 placeholder instead
 * (no generative canvas on native). Token-only.
 */
export declare function FeatureSplit({ eyebrow, title, description, bullets, media, reverse, action, style, }: FeatureSplitProps): React.ReactElement;
//# sourceMappingURL=FeatureSplit.d.ts.map