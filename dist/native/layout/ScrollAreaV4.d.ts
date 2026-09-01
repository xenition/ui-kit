import * as React from 'react';
import { type ScrollViewProps, type StyleProp, type ViewStyle } from 'react-native';
import type { SpacingScale } from '../../theme/types';
export type SpaceKey = keyof SpacingScale;
/** Which axis scrolls. Mirrors the web twin exactly (§1.3). */
export type ScrollAxis = 'vertical' | 'horizontal' | 'both';
/** `'none'` is the full-bleed choice — see `padding` below. */
export type ScrollPadding = SpaceKey | 'none';
export interface ScrollAreaV4Props extends ScrollViewProps {
    /**
     * Which axis scrolls. Defaults to `vertical`.
     *
     * React Native has no two-axis `ScrollView` — `'both'` needs a horizontal
     * one nested inside a vertical one, which is a composition the caller owns —
     * so `'both'` degrades to `'vertical'` here rather than silently doing
     * nothing. The prop exists on this twin for parity with web (§1.3); an
     * explicit `horizontal` still wins over it.
     */
    axis?: ScrollAxis;
    /**
     * Inner content padding, from the spacing scale. Defaults to `lg` — the page
     * gutter of §4.1, and changing it would not be additive.
     *
     * Pass `'none'` for full-bleed content: a list whose rows own their own
     * `spacing.md` padding, a carousel that must run to the screen edge, media.
     * A row list inside a `padding="lg"` region is indented twice and stops
     * lining up with everything else on the screen.
     */
    padding?: ScrollPadding;
    /** Fill the theme surface color behind the content. */
    filled?: boolean;
    /**
     * Pay the device's bottom safe-area inset as extra content padding, so the
     * last row can be scrolled clear of the home indicator.
     *
     * Defaults to `false` because the base paid no inset and V4 is additive
     * (§1.4) — turn it on for a full-height scrolling screen, and leave it off
     * when an ancestor already consumed the inset (a `SafeAreaView`, a
     * `PageContainer`) or a sticky footer below the region is paying it instead.
     * Needs a `SafeAreaProvider` above it, which Expo mounts by default.
     */
    safeArea?: boolean;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
/**
 * **V4 scroll area** — the native twin of the web `ScrollAreaV4`, the base's
 * props plus `axis`, `padding="none"` and safe-area handling.
 *
 * §5 calls this one "structure and parity only, no visual change", and nothing
 * here moves a default: the same `padding="lg"`, the same `filled`.
 *
 * ## What V4 changes
 *
 * **Parity with web.** §5's named gap: web had `axis`, this twin did not, so
 * the same scrolling carousel needed two different call shapes on the two
 * platforms and native callers reached past the component to `horizontal`.
 * `axis` now maps to `horizontal` here (§1.3).
 *
 * **`padding="none"` exists.** The base's `SpaceKey` had no zero, so full-bleed
 * content — a row list whose rows carry §4.3's own `spacing.md`, a chip row
 * bleeding to the screen edge — had to fight the region's `lg` with a negative
 * margin. It is a real layout choice, so it gets a real value.
 *
 * **It can clear the home indicator.** HIG asks a scroll region to respect the
 * system safe areas and the base read none, so the final row of a full-height
 * list sat under the home indicator with no way to scroll it out. `safeArea`
 * adds `insets.bottom` to the *content* padding — not to the region's frame —
 * via `useSafeAreaInsets()`, which is how every other edge-aware V4 component
 * here reads an inset (`AuthStickyFooterV4`, `BottomNavV4`, `PageContainer`).
 * Padding the content rather than the box is what keeps the scroll indicator
 * and the region's own background running to the true bottom of the screen.
 *
 * ## What it deliberately does not do
 *
 * **No shadow, no scroll-edge line.** §4.6 gives a shadow to a card, a sheet
 * and the one dominant action; a scroll region is none of the three. §4.4:
 * between free-standing blocks, space rather than a rule.
 *
 * **An empty region still draws.** §4.5's "render nothing" is about a
 * component with nothing to *say*; a scroll region is a viewport the caller
 * has sized, and collapsing it would take the screen's scroll with it. With no
 * children it paints nothing but its own optional `surface`.
 */
export declare function ScrollAreaV4({ axis, padding, filled, safeArea, horizontal, style, contentContainerStyle, children, ...rest }: ScrollAreaV4Props): React.ReactElement;
//# sourceMappingURL=ScrollAreaV4.d.ts.map