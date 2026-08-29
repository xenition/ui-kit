import * as React from 'react';
import type { ContextMenuAction, ContextMenuProps } from './ContextMenu';
export type { ContextMenuProps as ContextMenuV4Props, ContextMenuAction };
/**
 * `ContextMenu`, V4 — the same props, and a gesture that reaches the thing you
 * pressed.
 *
 * ## The child is the target
 *
 * The gesture handlers are cloned onto the child element rather than left on a
 * wrapping host, matching `Popconfirm` and `Menu`. This is a real bug on the
 * native twin — the deepest `Pressable` wins the responder there, so a wrapper
 * around anything pressable never fired — and on the web it is the `disabled`
 * asymmetry: a browser suppresses mouse events on a disabled form control, so a
 * host-level handler opens a menu on a control the user was told was dead only
 * when the caller disabled something that is *not* a form control. Cloning
 * gives both platforms one rule: the child is the only thing that handles the
 * gesture, so whatever it says about being disabled is what happens.
 *
 * A child that cannot take the props — a bare string, a fragment — has nothing
 * to clone onto, so the host keeps the handlers it has always had.
 *
 * The host `<div>` stays regardless, because the menu is positioned against the
 * viewport and `className` has to land somewhere.
 *
 * ## What the depth is saying
 *
 * The action list is a floating layer, so it takes the shared V4 panel skin —
 * `--xen-elevation-sheet`, glass only when the seed asked for
 * `depth: 'glass'` — the same skin `MenuV4` and `PopoverV4` wear. The base's
 * `shadow-lg` is a fixed black at a fixed alpha that knows nothing about the
 * scheme it is falling in.
 *
 * ## Reading the list
 *
 * The destructive row is `danger-text`, the compiler's contrast-corrected red,
 * not the `danger` FILL slot used as ink. That makes it the **only** coloured
 * thing in the menu, so it is unmistakable because it is different rather than
 * because it shouts (§32).
 *
 * Rows hover with the M3 state layer instead of `hover:bg-neutral-100` — a
 * LIGHT-oriented ramp step, so the base's hover paints a near-white slab across
 * a dark row. Every row clears 44px, composed from the spacing scale, and a
 * disabled row drops to M3's 0.38 rather than each component's own 0.5.
 */
export declare function ContextMenuV4({ actions, children, className, 'aria-label': ariaLabel, }: ContextMenuProps): React.ReactElement;
//# sourceMappingURL=ContextMenuV4.d.ts.map