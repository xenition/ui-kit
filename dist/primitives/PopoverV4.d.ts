import * as React from 'react';
import type { PopoverProps } from './Popover';
export type { PopoverProps as PopoverV4Props };
/**
 * **V4 popover** — the web twin of the native `PopoverV4`, same props as
 * {@link Popover}, a different design line.
 *
 * ## What the depth is saying
 *
 * A popover is a layer above the page with nothing above it, so it takes
 * `--xen-elevation-sheet` — the same altitude as `MenuV4`, `ModalV4` and
 * `BottomSheetV4`. One rule for every floating panel in the kit: they are the
 * same kind of object at different sizes. The base used Tailwind's
 * `shadow-lg`, a fixed shadow that cannot know a dark page needs MORE opacity,
 * not less. Its content stays flat; a card inside a popover is §8's "cards
 * inside cards".
 *
 * Glass applies only when the seed asked for `depth: 'glass'`; elevation is
 * consumed unconditionally, so a `depth: 'flat'` seed gets a flat panel with no
 * branch in this file.
 *
 * ## Rhythm
 *
 * The base panel padded itself with `p-2`, which puts arbitrary content eight
 * pixels from a hard edge and reads as cramped next to every other surface in
 * the kit. V4 uses the `md` step, the same one `CardV4` and the V4 sheets use,
 * so a popover looks like it came from the same system as the thing that
 * opened it.
 *
 * ## The trigger is the button
 *
 * Unchanged from the base, and deliberately so. This mirrors the native twin,
 * where wrapping the trigger was an outright bug: on RN the deepest
 * `Pressable` wins the touch responder, so a `<Button>` trigger swallowed the
 * tap and the panel never opened. The DOM bubbles clicks, so a wrapping
 * `<span onClick>` did fire here — but it made `disabled` a lie in the other
 * direction, opening the panel from a control the user was told was dead.
 * Cloning the element and injecting `onClick` gives both platforms one rule:
 * the trigger is the only thing that handles the press. A non-element trigger
 * (a bare string) has nothing to clone onto, so it keeps the transparent
 * `<span>`.
 */
export declare function PopoverV4({ trigger, children, align, className, }: PopoverProps): React.ReactElement;
//# sourceMappingURL=PopoverV4.d.ts.map