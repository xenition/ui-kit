import * as React from 'react';
import type { PasswordInputProps } from './PasswordInput';
export type { PasswordInputProps as PasswordInputV4Props };
/**
 * **V4 password field** — the same props as {@link PasswordInput}, a different
 * design line.
 *
 * The reveal toggle is the whole design problem here. It is a word, and a word
 * is a small target sitting inside a field the user is trying to type into —
 * which is why the base's toggle, at `hitSlop={8}`, is easy to miss and easier
 * to hit by accident. V4 gives it a `hitSlop` derived from the control's own
 * height, so it reaches a full touch target without growing the label and
 * pushing the field around it (§30).
 *
 * The rest is the shared field language:
 *
 * - `2xl` tall, `md` radius, `md` horizontal padding from `fieldMetrics`, so a
 *   password sits under an email field in a sign-up form and shares its edge
 *   (§13). The base's `radius.sm` box was visibly a different component.
 * - The same brand halo `InputV4` paints, around the whole shell — the toggle
 *   is part of the control, not a button beside it — with its space reserved
 *   whether or not it is showing (§36.11).
 * - The label sits above at `sm`, medium weight, matching `InputV4` exactly.
 *
 * The toggle says **Show** / **Hide** rather than carrying an eye icon: §47
 * asks for copy that says what happens, an eye with a slash through it is two
 * different meanings depending on which product you last used, and the state is
 * then in a word rather than only in an icon's decoration (§46). It is tinted
 * `primaryText` when revealed — the contrast-safe text form the compiler
 * measured against `surface`, not the vivid `primary` slot, which is for fills.
 *
 * No gradient, no glass, no shadow: §16 asks that forms stay minimal.
 */
export declare function PasswordInputV4({ value, onChangeText, label, placeholder, invalid, disabled, accessibilityLabel, containerStyle, ...rest }: PasswordInputProps): React.ReactElement;
//# sourceMappingURL=PasswordInputV4.d.ts.map