import * as React from 'react';
import type { RegisterKeypadProps } from './RegisterKeypad';
/** Drop-in for {@link RegisterKeypadProps} — same props, the V4 "register" design. */
export type RegisterKeypadV4Props = RegisterKeypadProps;
/**
 * RegisterKeypad — **V4** "register" design. The tactile checkout take on a
 * numeric pad: **big ≥44px keys** with a soft-primary press, a **bold
 * `tabular-nums` amount display**, and distinct clear / backspace action keys
 * (the primary/danger accents a busy counter reaches for). Keys are emitted
 * through `onKeyPress`, and value-mutating keys fold into a controlled `value`
 * via `onChange` (append digit, single decimal, `00`, backspace, clear); `pin`
 * masks the display. Same props/behavior as {@link RegisterKeypadProps}; each key
 * is a labelled `button` for screen readers, token-only via `useXenitionTheme()`.
 */
export declare function RegisterKeypadV4({ value, onChange, onKeyPress, variant, showDisplay, displayPrefix, placeholder, maxLength, disabled, accessibilityLabel, style, }: RegisterKeypadV4Props): React.ReactElement;
//# sourceMappingURL=RegisterKeypadV4.d.ts.map