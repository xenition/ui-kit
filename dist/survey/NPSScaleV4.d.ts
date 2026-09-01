import * as React from 'react';
import { type NPSScaleProps } from './NPSScale';
/** Drop-in for {@link NPSScaleProps} — same props, the V4 "focus" design. */
export type NPSScaleV4Props = NPSScaleProps;
/**
 * NPSScale — **V4** "clean form / focus" design. Eleven big 0–10 cells (min
 * height 44px, bold 800 numerals) in a calm, legible row that wraps, with the
 * anchor labels underneath. The selected cell is a solid **primary** fill with
 * on-primary numeral by default, or its semantic **bucket** color
 * (detractor→danger, passive→warn, promoter→success) when `colorByBucket`;
 * unselected cells sit on `bg-surface` + `border-border` with a soft
 * `bg-primary/10` hover. One accent otherwise. Same props/behavior as
 * {@link NPSScaleProps} — the `radiogroup`/`radio` roles, `aria-checked`, bucket
 * announcements and `onChange` are all preserved; all colors come from `--xen-*`
 * token classes (no literal colors).
 */
export declare const NPSScaleV4: React.ForwardRefExoticComponent<NPSScaleProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=NPSScaleV4.d.ts.map