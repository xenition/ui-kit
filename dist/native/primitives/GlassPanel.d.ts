import * as React from 'react';
import { type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import type { GlassIntensity } from '../../theme/glass';
export type { GlassIntensity };
export interface GlassPanelProps extends ViewProps {
    /**
     * How much of the ground shows through.
     *
     * `soft` is the theme's own `glass.tint`, untouched — the most translucent
     * this theme's contrast budget allows. `regular` (default) and `strong` mix
     * that tint toward the opaque `surface`. The scale only travels one way, and
     * that is not an oversight: see the note on legibility below.
     */
    intensity?: GlassIntensity;
    /** Draw the translucent token border (default true). */
    bordered?: boolean;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
/**
 * A translucent panel, built from the compiled `glass` tokens.
 *
 * ## There is no real blur here, and that is deliberate
 *
 * React Native has no `backdrop-filter`. A true frosted panel needs a host
 * `BlurView` (`expo-blur`, `@react-native-community/blur`), and a kit component
 * that mounted one would crash in every app that has not installed it.
 *
 * So the compiler pre-composites `glass.tint` against the scheme's surface: the
 * panel reads as glass with no blur at all, and an app that HAS a blur view can
 * wrap this one and pass the blur radius the token already carries:
 *
 * ```tsx
 * const { glass } = useXenitionTheme();
 * <BlurView intensity={glass.blur}>
 *   <GlassPanel>…</GlassPanel>
 * </BlurView>
 * ```
 *
 * That is the honest trade. A blurred backdrop is nicer; a panel that only
 * works in some apps is not a design-system component.
 *
 * ## Legibility
 *
 * A panel over unknown artwork is where text quietly stops being readable, so
 * the alpha is not a taste knob. `theme/glass-legibility.spec.ts` composites
 * the tint over pure black and pure white — the extremes any real image sits
 * between — and measures `onSurface` against the result. The compiler's tint
 * clears WCAG AA with roughly 5.6:1 at worst, and loses that margin once it is
 * thinned by 12%. `intensity` therefore starts at the token and can only get
 * more opaque.
 *
 * The corollary: put `onSurface` on a glass panel, not `muted`. `muted` carries
 * no contrast promise even on an opaque surface and measurably fails on glass.
 *
 * ## §8
 *
 * `design.md` bans "glassmorphism without purpose". This component is the
 * purpose-built exception, not a default background — it earns its place when
 * something is genuinely layered over something else. It is reached for by the
 * V4 surfaces only when the seed asks for `depth: 'glass'`.
 */
export declare function GlassPanel({ intensity, bordered, style, children, ...rest }: GlassPanelProps): React.ReactElement;
//# sourceMappingURL=GlassPanel.d.ts.map