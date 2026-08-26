import * as React from 'react';
import type { TooltipProps, TooltipSide } from './Tooltip';
export type { TooltipProps as TooltipV4Props, TooltipSide };
/**
 * **V4 tooltip** — the web twin of the native `TooltipV4`, same props as
 * {@link Tooltip}, a different design line.
 *
 * ## Why the bubble inverts, and why it stopped using the ramp
 *
 * A tip is the one floating thing in the kit that inverts, and that is how a
 * reader recognises "this is an annotation, not a surface" before reading a
 * word (§31 — prefer the established pattern). The base built the inversion
 * from `bg-neutral-900` / `text-neutral-50`, which reads correctly only because
 * the dark block re-emits the ramps mirrored: a pair by luck, not by promise.
 * V4 uses `on-surface` / `surface`, which the compiler guarantees against each
 * other in both schemes, so the inversion carries its own contrast.
 *
 * It takes `--xen-elevation-card`, the smallest of the three, because a tip has
 * barely left the page — §36.8, feedback proportional to the event. The base
 * had Tailwind's `shadow`, which cannot know a dark page needs more of it.
 *
 * At `depth: 'glass'` it joins the glass family instead: an inverted bubble
 * behind a blur is neither legible nor translucent. That is the one place this
 * component reads `depth`, and a necessary one — the compiler neutralises
 * gradients and elevation and stops there, so glass has to be asked for while
 * elevation falls flat on its own.
 *
 * ## The wrapper stays, and that is not an oversight
 *
 * `MenuV4` and `PopoverV4` had to stop wrapping their trigger and clone it
 * instead: on native a `<Button>` trigger takes the touch responder from any
 * wrapper, and on web a wrapping `<span onClick>` made a trigger's `disabled` a
 * lie. Neither applies here. This span listens for mouse-enter/leave and
 * focus/blur, none of which a nested control intercepts and none of which
 * activate anything, so there is no handler to hand the child and nothing for
 * the child's `disabled` to have an opinion about. The child stays exactly as
 * passed. The native twin has no hover to lean on, so it injects an
 * `onLongPress` — the same rule in each platform's vocabulary.
 */
export declare function TooltipV4({ label, side, children, className, }: TooltipProps): React.ReactElement;
//# sourceMappingURL=TooltipV4.d.ts.map