import * as React from 'react';
import type { SectionDividerProps, SectionDividerVariant } from './SectionDivider';
export type { SectionDividerVariant };
/** Drop-in for {@link SectionDividerProps} — same props, the V4 "showcase" design. */
export type SectionDividerV4Props = SectionDividerProps;
/**
 * SectionDivider — **V4** "showcase" design (native mirror of the web V4).
 *
 * Same technique as the native base: `hairline` and `fade` use CSS gradients on
 * web, which React Native lacks here, so both are **approximated with solid
 * low-opacity token fills** (the tint always originates from a theme token);
 * `ornament` delegates to the ornament rule. The V4 *refines* the look — a
 * two-segment `hairline` that reads brighter toward the center (approximating
 * the web's fuller primary→accent gradient), a taller/cleaner surface-tinted
 * `fade`, and the `ornament` variant delegating to `OrnamentRuleV4` so its
 * sharpened rule carries through. Every variant/ornament/tone is honored.
 *
 * **Native-simplified / web-only:** the web `parallax` prop is scroll-linked and
 * is kept for parity but does nothing on native — there is no scroll-linked
 * drift here, so nothing to honor for reduced motion. Token-only colors.
 */
export declare function SectionDividerV4({ variant, parallax: _parallax, ornament, tone, style, }: SectionDividerV4Props): React.ReactElement;
//# sourceMappingURL=SectionDividerV4.d.ts.map