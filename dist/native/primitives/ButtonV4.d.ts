import * as React from 'react';
import type { ButtonProps, ButtonSize, ButtonTone, ButtonVariant } from './Button';
export type { ButtonProps as ButtonV4Props, ButtonSize, ButtonTone, ButtonVariant };
/**
 * **V4 button** — same props as {@link Button}, a different design line.
 *
 * What makes it premium is restraint, not decoration. Exactly one thing on the
 * screen carries the brand gradient: `variant="primary"` at the default tone —
 * the single dominant action `design.md` §5 asks every screen to have. Every
 * other variant is flat with a crisp hairline, because §8 lists "gradients on
 * every button" as the first tell of generic AI UI and §35.11 asks that
 * gradients stay rare and purposeful. A `danger` or `success` primary is solid,
 * never gradient: §35.4 says semantic colours are not brand colours, and a
 * destructive action wearing the brand sweep reads as a promotion.
 *
 * The depth comes from `elevation.action` and a press that genuinely depresses
 * — scale plus a shadow that sits back down — rather than from an opacity dip.
 * Both are read straight off the theme, so a `depth: 'flat'` seed gets a flat
 * button with no branch anywhere in this file: the tokens are already inert.
 *
 * Motion is `usePressScale`, which is reduced-motion aware by construction
 * (§36.10); with Reduce Motion on, the scale stays at 1 and the elevation
 * change alone carries the feedback, so nothing depends on the animation.
 */
export declare function ButtonV4({ variant, size, tone, onPress, onPressIn, onPressOut, disabled, loading, style, children, ...rest }: ButtonProps): React.ReactElement;
//# sourceMappingURL=ButtonV4.d.ts.map