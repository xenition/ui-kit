import * as React from 'react';
import type { LikertScaleProps } from './LikertScale';
/** Drop-in for {@link LikertScaleProps} — same props, the V4 "focus" design. */
export type LikertScaleV4Props = LikertScaleProps;
/**
 * LikertScale — **V4** "clean form / focus" design. A calm, legible agreement
 * scale: the N points render as a row of big, tappable pills (min height 44) that
 * wrap responsively. The selected pill is a solid **primary** fill with
 * on-primary text; unselected pills sit on `surface` with a `border` hairline and
 * a soft primary tint on press. One accent, generous 8-pt air. Same
 * props/behavior as {@link LikertScaleProps} — the `radiogroup`/`radio` roles,
 * `accessibilityState`, anchor labels and `onChange` are all preserved;
 * token-only colors via `useXenitionTheme()` (no literal colors).
 */
export declare function LikertScaleV4({ points, value, onChange, minLabel, maxLabel, accessibilityLabel, variant, disabled, style, }: LikertScaleV4Props): React.ReactElement;
//# sourceMappingURL=LikertScaleV4.d.ts.map