import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface GradientHeroProps {
    /** Small kicker line above the title. */
    eyebrow?: React.ReactNode;
    /** Main headline. */
    title: React.ReactNode;
    /** Supporting copy under the title. */
    subtitle?: React.ReactNode;
    /** Call-to-action row (buttons/links) — rendered as-is. */
    actions?: React.ReactNode;
    /** Optional media (screenshot, illustration) below the copy. */
    media?: React.ReactNode;
    /** Horizontal alignment of the copy block. */
    align?: 'left' | 'center';
    style?: StyleProp<ViewStyle>;
}
/**
 * Full-bleed marketing hero — the native mirror of the web `GradientHero`.
 *
 * The web version paints an animated `AuroraBackground` (multiple blurred
 * blobs + grain/pattern overlays) behind the copy; React Native has no
 * `filter: blur()` or CSS keyframe machinery, so native **simplifies to a
 * static two-tone linear gradient** (primary→accent ramp tints fading into
 * `surface`) via the shared `expo-linear-gradient` wrapper — the same real-
 * gradient approach `GenerativeCover` uses. The web `variant`/`grain`/`pattern`
 * props are aurora/DOM-specific and are therefore dropped. Token-only.
 */
export declare function GradientHero({ eyebrow, title, subtitle, actions, media, align, style, }: GradientHeroProps): React.ReactElement;
//# sourceMappingURL=GradientHero.d.ts.map