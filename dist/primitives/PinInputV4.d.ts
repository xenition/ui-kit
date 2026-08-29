import * as React from 'react';
import type { PinInputProps } from './PinInput';
export type { PinInputProps as PinInputV4Props };
/**
 * **V4 PIN / OTP entry** — the same props as {@link PinInput}, a different
 * design line.
 *
 * A one-time code is the most time-critical field in any product: it is read
 * off another screen while a timer runs. So the changes are about getting
 * through it, not about how it looks:
 *
 * 1. **The code can be pasted whole.** The base takes one character per box, so
 *    pasting six from a message filled one and dropped five. V4 intercepts the
 *    paste, spreads it across the remaining boxes and lands the caret at the
 *    end; the first box carries `autoComplete="one-time-code"`, so the browser
 *    can offer the code from the SMS itself — §4, optimize for time to value,
 *    and §32, recognition over recall.
 * 2. **Boxes at the form's own height.** Each is `2xl` tall — the height every
 *    other V4 control takes — and `2xl − sm` wide, so a row of six still fits a
 *    narrow screen while each box stays a real target (§30).
 * 3. **A ring that shows where you are.** Each box takes the shared V4 halo, and
 *    a box that already holds a digit keeps a brand border, so the row shows
 *    its own progress. The ring is a `box-shadow`, so advancing between boxes
 *    costs no layout (§36.11).
 *
 * The figures are `tabular-nums` and centred, so a `1` sits where an `8` sits
 * and the row does not twitch as it fills. Focusing a box selects what is in
 * it, so typing over a digit replaces it rather than fighting the caret.
 *
 * No gradient, no glass, no shadow: §16 asks that forms stay minimal, and this
 * is the most minimal form there is.
 */
export declare function PinInputV4({ length, value, onChange, className, }: PinInputProps): React.ReactElement;
//# sourceMappingURL=PinInputV4.d.ts.map