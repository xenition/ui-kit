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
 * 1. **The code can be pasted whole.** Typing one character per box is what the
 *    base supports; pasting six from a message filled one box and dropped five.
 *    V4 spreads a multi-character entry across the remaining boxes and jumps to
 *    the end, and the first box carries `textContentType="oneTimeCode"` so the
 *    OS can offer the code from the SMS itself — §4, optimize for time to
 *    value, and §32, recognition over recall.
 * 2. **Boxes at the form's own height.** Each is `2xl` tall — the height every
 *    other V4 control takes — and `2xl − sm` wide, so a row of six still fits a
 *    narrow phone while each box clears a thumb (§30).
 * 3. **A ring that shows where you are.** The focused box lights the same brand
 *    halo `InputV4` paints, and a box that already has a digit keeps a brand
 *    border, so the row shows its own progress. The halo's space is reserved,
 *    so advancing between boxes never shifts the row (§36.11).
 *
 * The figures are tabular and centred, so a `1` sits where an `8` sits and the
 * row does not twitch as it fills.
 *
 * No gradient, no glass, no shadow: §16 asks that forms stay minimal, and this
 * is the most minimal form there is.
 */
export declare function PinInputV4({ length, value, onChange, style, }: PinInputProps): React.ReactElement;
//# sourceMappingURL=PinInputV4.d.ts.map