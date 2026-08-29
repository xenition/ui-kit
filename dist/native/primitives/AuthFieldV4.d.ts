import * as React from 'react';
import type { AuthFieldProps } from './AuthCard';
export interface AuthFieldV4Props extends AuthFieldProps {
    /**
     * Adds the trailing clear `✕` once there is something to clear (§6's
     * "trailing affordance **where it earns one**" — a ✕ over an empty field is
     * the hole §10.6 forbids, so it is not drawn until the field has text).
     */
    clearable?: boolean;
    /** Announced label for the clear affordance. Default `'Clear'`. */
    clearLabel?: string;
    /** Fires after the field has been emptied by the clear affordance. */
    onClear?: () => void;
}
/**
 * **V4 auth input** — the native twin of the web `AuthFieldV4`, the same props
 * as the auth family's {@link AuthField} plus an optional clear affordance.
 *
 * Four things separate it from the base:
 *
 * 1. **It is a field like every other V4 field.** Height, radius, horizontal
 *    padding, ring width, border colour and the halo all come from
 *    `internal/field-v4` — `spacing['2xl']` tall on `radius.md`, which the
 *    Addendum settled as the line's answer over §6's written 56/`radius.lg`.
 *    Nothing is picked here, so a sign-in field stacked above an `InputV4` or a
 *    `SelectV4` shares an edge and a `sharp` seed squares all three together.
 * 2. **A real focus ring, not a border swap.** Focus paints the shared
 *    translucent halo *around* the control, and its space is reserved whether
 *    or not it is showing — so focusing never nudges the form out from under
 *    the finger (§36.11).
 * 3. **An error state that says something.** `error` turns the border and the
 *    halo `danger` **and** prints the message underneath in `dangerText`,
 *    announced politely. A red border alone is invisible to a colour-blind
 *    user, which is why the Addendum lets a field-shaped V4 keep `error` at the
 *    cost of strict prop parity — and why the message is the state, not a
 *    decoration on it.
 * 4. **Affordances a thumb can actually hit.** The eye and the ✕ carry a 44
 *    `hitSlop` instead of being a bare glyph the size of its font.
 *
 * Everything else is the base's contract, unchanged: a muted leading icon, a
 * `muted` placeholder that is never a faked label (§6), `hint` below when there
 * is no error, `trailing` for a caller's own affordance. No gradient, no glass,
 * no shadow — §16 asks that forms stay minimal, and a sign-in field is not a
 * hero.
 */
export declare function AuthFieldV4({ label, icon, error, hint, secure, trailing, disabled, style, showLabel, hideLabel, clearable, clearLabel, onClear, value, onChangeText, onFocus, onBlur, ...rest }: AuthFieldV4Props): React.ReactElement;
//# sourceMappingURL=AuthFieldV4.d.ts.map