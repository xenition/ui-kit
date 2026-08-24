import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface CTABannerProps {
    /** Banner headline. */
    title: React.ReactNode;
    /**
     * Supporting copy under the title. (The web `CTABanner` names this slot
     * `subtitle`; native uses `description` per the section spec, and accepts
     * `subtitle` as an alias for full web prop parity — `description` wins.)
     */
    description?: React.ReactNode;
    /** Alias of {@link CTABannerProps.description} for web parity. */
    subtitle?: React.ReactNode;
    /** Call-to-action slot — rendered as-is. */
    action?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}
/**
 * Closing call-to-action band — the native mirror of the web `CTABanner`.
 *
 * The web version reuses the animated `AuroraBackground`; native **simplifies
 * to a static primary→accent linear-gradient tint** (via the shared
 * `expo-linear-gradient` wrapper) over a bordered rounded panel — no blur,
 * grain, or pattern. The web `variant`/`grain`/`pattern` props are dropped as
 * aurora/DOM-specific. Always centered, matching the web layout. Token-only.
 */
export declare function CTABanner({ title, description, subtitle, action, style, }: CTABannerProps): React.ReactElement;
//# sourceMappingURL=CTABanner.d.ts.map