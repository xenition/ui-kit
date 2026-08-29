import * as React from 'react';
import type { PopconfirmProps } from './Popconfirm';
export type { PopconfirmProps as PopconfirmV4Props };
/**
 * `Popconfirm`, V4 — the same props, and the last thing between a user and a
 * mistake.
 *
 * ## What the depth is saying
 *
 * The bubble is a floating layer, so it takes `elevation.sheet` and the shared
 * `panelSkin` — the same altitude and the same glass rule as `ModalV4`,
 * `MenuV4` and `DrawerV4`, because all four are one kind of object at four
 * sizes. The scrim is `scrimColor`, the shadow colour at a fixed alpha; the
 * base painted `colors.onSurface` at 0.5, which INVERTS with the scheme and
 * lays a white veil over a dark page.
 *
 * Glass applies only when the seed asked for `depth: 'glass'`. Elevation is
 * consumed unconditionally, so a `depth: 'flat'` seed flattens the bubble with
 * no branch in this file.
 *
 * ## The trigger is the button
 *
 * Unchanged from the base, and deliberately so. On native the deepest
 * `Pressable` under the finger wins the touch responder whether or not it has
 * an `onPress` of its own, so wrapping the trigger in Popconfirm's own
 * `Pressable` only ever worked while the trigger was inert: pass the obvious
 * thing — a kit `<Button>`, which is a `Pressable` — and the Button claims the
 * responder, the wrapper's `onPress` never fires, and the confirm bubble never
 * opens. Every destructive action in an app built on the kit was silently a
 * no-op, and the kit's own test hid it because it passed a bare `<Text>`.
 *
 * Cloning the trigger and injecting `onPress` fixes it at the root: one
 * pressable instead of two nested ones, so there is no responder to lose, and a
 * `disabled` trigger stays disabled because the press dies in its own
 * `Pressable` — which is what `disabled` means. Anything the trigger already
 * does on press runs first. A non-element trigger has nothing to clone onto,
 * and nothing that could steal the responder, so it keeps the wrapper.
 *
 * ## Reading the choice
 *
 * §25 asks for friction proportional to risk and §26 that a destructive
 * consequence be legible. So the destructive button is the **only** coloured
 * thing in the bubble — `danger` filled with `onDanger`, the compiler's paired
 * ink, not the `onPrimary` the base painted on a red fill by mistake — and
 * Cancel is quiet text in `mutedText`, which is `muted` with an actual AA
 * promise rather than `muted`, which has none.
 *
 * Both buttons clear the 44pt target the rest of the V4 line composes from the
 * spacing scale. A confirm bubble is the one place in a product where a mis-tap
 * is unrecoverable, and the base's `paddingVertical: xs` chips were about 24
 * tall — half a target, for the highest-stakes tap on the screen.
 *
 * Press feedback is the M3 state layer: the control's own ink over its own
 * ground, at `state.pressed`. Under Reduce Motion the modal's fade is dropped
 * (§36.10); the state layer is not motion and stays.
 */
export declare function PopconfirmV4({ trigger, message, onConfirm, onCancel, confirmLabel, cancelLabel, }: PopconfirmProps): React.ReactElement;
//# sourceMappingURL=PopconfirmV4.d.ts.map