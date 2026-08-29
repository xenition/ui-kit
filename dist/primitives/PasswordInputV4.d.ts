import * as React from 'react';
import type { PasswordInputProps } from './PasswordInput';
export type { PasswordInputProps as PasswordInputV4Props };
/**
 * **V4 password field** — the same props as {@link PasswordInput}, a different
 * design line.
 *
 * The reveal toggle is the whole design problem here: it is a word sitting
 * inside a field the user is trying to type into, so it has to be reachable
 * without being in the way. V4 keeps it a word, gives it a full-height target
 * inside the shell, and — this is the part that matters for a keyboard — lets
 * it keep its own focus ring. The shared shell rule suppresses the outline on
 * `input`, `textarea` and `select` only, never on a button living inside a
 * shell, because someone tabbing to the toggle must still see where they are
 * (§46).
 *
 * The rest is the shared field language:
 *
 * - `FIELD_V4_SHELL` — the same height, radius and padding `InputV4` and
 *   `SelectV4` take — so a password sits under an email field in a sign-up
 *   form and shares its edge (§13). The base's `radius.sm` box was visibly a
 *   different component.
 * - The same brand halo, on `:focus-within` so the whole control rings, drawn
 *   with `box-shadow` so arming it costs no layout (§36.11).
 * - The label sits above at `text-sm`, medium weight, matching `InputV4`.
 *
 * The toggle says **Show** / **Hide** rather than carrying an eye icon: §47
 * asks for copy that says what happens, an eye with a slash through it means
 * two different things depending on which product you last used, and the state
 * is then in a word rather than only in an icon (§46). It is tinted
 * `text-primary-text` when revealed — the contrast-safe text form the compiler
 * measured against `surface`, not the vivid `primary` slot, which is for fills.
 *
 * No gradient, no glass, no shadow: §16 asks that forms stay minimal.
 */
export declare const PasswordInputV4: React.ForwardRefExoticComponent<PasswordInputProps & React.RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=PasswordInputV4.d.ts.map