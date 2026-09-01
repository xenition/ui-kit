import * as React from 'react';
import { type NPSScaleProps } from './NPSScale';
/** Drop-in for {@link NPSScaleProps} — same props, the V4 "focus" design. */
export type NPSScaleV4Props = NPSScaleProps;
/**
 * NPSScale — **V4** "clean form / focus" design. Eleven big 0–10 cells (min
 * height 44, bold 800 numerals) in a calm, legible row that wraps, with the
 * anchor labels underneath. The selected cell is a solid **primary** fill with
 * on-primary numeral by default, or its semantic **bucket** color
 * (detractor→danger, passive→warn, promoter→success) when `colorByBucket`;
 * unselected cells sit on `surface` + `border` with a soft primary tint on press.
 * One accent otherwise. Same props/behavior as {@link NPSScaleProps} — the
 * `radiogroup`/`radio` roles, `accessibilityState`, bucket announcements and
 * `onChange` are all preserved; token-only colors via `useXenitionTheme()` (no
 * literal colors).
 */
export declare function NPSScaleV4({ value, onChange, minLabel, maxLabel, colorByBucket, accessibilityLabel, disabled, style, }: NPSScaleV4Props): React.ReactElement;
//# sourceMappingURL=NPSScaleV4.d.ts.map