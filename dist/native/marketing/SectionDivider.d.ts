import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type OrnamentShape, type OrnamentTone } from './OrnamentRule';
export type SectionDividerVariant = 'hairline' | 'ornament' | 'fade';
export interface SectionDividerProps {
    /**
     * `hairline` — a 1px primary→accent gradient rule (the SaaS band divider).
     * `ornament` — delegates to `OrnamentRule` (the restaurant diamond rule).
     * `fade`     — a tall gradient that melts the section into the surface.
     */
    variant?: SectionDividerVariant;
    /**
     * Web-only parallax speed. Kept for prop parity with the web
     * `SectionDivider`, but **inert on native** — there is no scroll-linked
     * drift here.
     */
    parallax?: number;
    /** Ornament shape when `variant="ornament"` (default `diamond`). */
    ornament?: OrnamentShape;
    /** Token tone when `variant="ornament"` (default `accent`). */
    tone?: OrnamentTone;
    style?: StyleProp<ViewStyle>;
}
/**
 * Section separator — the native mirror of the web `SectionDivider`.
 *
 * The web `hairline` and `fade` variants use CSS gradients (`linear-gradient`
 * + `color-mix`); React Native has no CSS gradients here, so both are
 * **approximated with solid low-opacity token fills** (the tint always
 * originates from a theme token). The web `parallax` prop is scroll-linked and
 * is kept for parity but does nothing on native.
 */
export declare function SectionDivider({ variant, parallax: _parallax, ornament, tone, style, }: SectionDividerProps): React.ReactElement;
//# sourceMappingURL=SectionDivider.d.ts.map