import * as React from 'react';
import type { PopoverProps } from './Popover';
export type { PopoverProps as PopoverV4Props };
/**
 * **V4 popover** — same props as {@link Popover}, a different design line.
 *
 * ## What the depth is saying
 *
 * A popover is a layer above the page with nothing above it, so it takes
 * `elevation.sheet` — the same altitude as `MenuV4`, `ModalV4` and
 * `BottomSheetV4`. One rule for every floating panel in the kit: they are the
 * same kind of object at different sizes. Its content is flat; a card inside a
 * popover is §8's "cards inside cards".
 *
 * The scrim is built from the shadow colour at a fixed alpha, not from
 * `colors.onSurface` — which INVERTS with the scheme and paints a 50% white
 * veil over a dark page, the bug this component has today. Glass applies only
 * when the seed asked for `depth: 'glass'`; elevation is consumed
 * unconditionally, so a `depth: 'flat'` seed gets a flat panel with no branch
 * in this file.
 *
 * ## Rhythm
 *
 * The base panel padded itself with `spacing.sm`, which puts arbitrary content
 * eight points from a hard edge and reads as cramped next to every other
 * surface in the kit. V4 uses `spacing.md`, the same step `CardV4` and the V4
 * sheets use, so a popover looks like it came from the same system as the
 * thing that opened it.
 *
 * ## The trigger is the button
 *
 * Unchanged from the base, and deliberately so. On native the deepest
 * `Pressable` under the finger wins the touch responder whether or not it has
 * an `onPress`, so wrapping the trigger in Popover's own `Pressable` only ever
 * worked while the trigger was inert — pass a kit `<Button>` and the Button
 * claims the responder and the panel never opens. Cloning the element and
 * injecting `onPress` means there is one pressable instead of two nested ones,
 * a `disabled` trigger stays disabled because the press dies in its own
 * `Pressable`, and no `<button>`-inside-a-`<button>` can arise under
 * react-native-web. Anything the trigger already did on press runs first. A
 * non-element trigger (a bare string) has nothing to clone onto — and nothing
 * that could steal the responder — so it keeps the transparent wrapper.
 */
export declare function PopoverV4({ trigger, children, align, open, onOpenChange, style, }: PopoverProps): React.ReactElement;
//# sourceMappingURL=PopoverV4.d.ts.map