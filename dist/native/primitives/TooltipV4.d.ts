import * as React from 'react';
import type { TooltipProps, TooltipSide } from './Tooltip';
export type { TooltipProps as TooltipV4Props, TooltipSide };
/**
 * **V4 tooltip** — same props as {@link Tooltip}, a different design line.
 *
 * ## No scrim
 *
 * This is the change that matters. The base threw a 50% scrim over the whole
 * app to show a two-word annotation — and built it from `colors.onSurface`,
 * which INVERTS with the scheme and painted a near-white veil over a dark page.
 * V4 removes the scrim outright rather than fixing its colour: §36.8 asks for
 * feedback proportional to the event, and dimming an entire screen to say
 * "Delete" is the least proportional thing in the kit. What remains is a
 * transparent full-screen tap-catcher, so a tap anywhere still dismisses.
 *
 * ## Why the bubble inverts
 *
 * A tip is the one floating thing in the kit that inverts, and that is how a
 * reader recognises "this is an annotation, not a surface" before reading a
 * word (§31 — prefer the established pattern). `onSurface`/`surface` is a
 * compiler-guaranteed pair, so the inversion carries its own contrast promise.
 * It takes `elevation.card`, the smallest of the three, because a tip has
 * barely left the page.
 *
 * At `depth: 'glass'` it joins the glass family instead — an inverted bubble
 * behind a blur is neither legible nor translucent. That is the one place this
 * file reads `depth`, and a necessary one: the compiler neutralises gradients
 * and elevation and stops there, so glass has to be asked for while elevation
 * falls flat on its own.
 *
 * ## The child is the control, and long-press is the gesture
 *
 * Unchanged from the base, and deliberately so. On native the deepest
 * `Pressable` under the finger wins the touch responder whether or not it has
 * an `onPress`, and the thing you attach a tooltip to is almost always already
 * pressable — so Tooltip's own wrapper never fired and the tip never appeared.
 * Cloning the child removes the second pressable.
 *
 * The handler injected is `onLongPress`, **not** `onPress` — where Tooltip
 * parts company with `MenuV4` and `PopoverV4`. They ARE the control's action;
 * a tooltip is not. On web it is revealed by hover, a gesture that activates
 * nothing, and the control still does its own job on click. Native has no
 * hover, and the nearest gesture that likewise activates nothing is long-press.
 * Injecting `onPress` would make every tooltipped Save button save AND throw a
 * bubble over the screen.
 *
 * A child that is not a single element (a bare string, several nodes) has
 * nothing to clone onto — and nothing that could steal the responder — so it
 * keeps the transparent wrapper, listening for the same gesture, so there is
 * one rule to learn rather than two.
 */
export declare function TooltipV4({ label, side, children }: TooltipProps): React.ReactElement;
//# sourceMappingURL=TooltipV4.d.ts.map