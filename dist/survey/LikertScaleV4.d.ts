import * as React from 'react';
import type { LikertScaleProps } from './LikertScale';
/** Drop-in for {@link LikertScaleProps} — same props, the V4 "focus" design. */
export type LikertScaleV4Props = LikertScaleProps;
/**
 * LikertScale — **V4** "clean form / focus" design. A calm, legible agreement
 * scale: the N points render as a row of big, tappable pills (min height 44px)
 * that wrap responsively. The selected pill is a solid **primary** fill with
 * on-primary text; unselected pills sit on `bg-surface` with a `border-border`
 * hairline and a soft `bg-primary/10` hover tint. One accent, generous 8-pt air.
 * Same props/behavior as {@link LikertScaleProps} — the `radiogroup`/`radio`
 * roles, `aria-checked`, anchor labels and `onChange` are all preserved; all
 * colors come from `--xen-*` token classes (no literal colors).
 */
export declare const LikertScaleV4: React.ForwardRefExoticComponent<LikertScaleProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LikertScaleV4.d.ts.map