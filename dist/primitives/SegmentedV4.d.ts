import * as React from 'react';
import type { SegmentedOption, SegmentedProps } from './Segmented';
export type { SegmentedProps as SegmentedV4Props, SegmentedOption };
/**
 * **V4 segmented control** — the web twin of the native `SegmentedV4`, same
 * props as {@link Segmented}, a different design line.
 *
 * ## One thumb, and it travels
 *
 * The base control repainted a background on whichever segment was selected:
 * the fill blinked out here and in there, two events for one change. V4 has a
 * single absolutely-positioned thumb that **slides** — §36.5, continuity of
 * position, and the reason this control feels like a physical switch rather
 * than a row of buttons that happen to share a box. The transition is dropped
 * under `prefers-reduced-motion` (§36.10), and with no layout engine at all —
 * jsdom, SSR — the thumb is simply not rendered and the labels' colour and
 * weight carry the state on their own.
 *
 * ## Why this one is allowed to be a pill
 *
 * `design.md` §8 lists "excessive pill-shaped controls" among the tells of
 * generic AI UI. A segmented control is the exception the word *excessive* is
 * there for: the capsule is not decoration applied to a control, it IS the
 * control — the shape is how a user recognises "pick exactly one of these"
 * before reading a single label (§32). It still defers to the seed:
 * `--xen-radius-full` is 0 on a `sharp` brand, so a sharp app gets a sharp
 * switch rather than the capsule being smuggled in over a design decision.
 *
 * ## Depth, and the rail it replaced
 *
 * The base rail was `bg-neutral-100`, a raw ramp step — which the dark block
 * re-emits inverted, so it happened to work, by accident, and would stop the
 * moment a component reached one step further. V4's rail is `border` mixed
 * into `surface`: two semantic slots the compiler re-derives per scheme, so
 * the rail is a rail in both by construction. The thumb takes
 * `--xen-elevation-card`, the smallest of the three, because it has lifted by
 * exactly the height of a thumb — and it is zero under a `depth: 'flat'` seed
 * with no branch anywhere here.
 *
 * ## Reach
 *
 * Each segment is a full 44px target composed from the spacing scale. The base
 * control was `py-1` around a 14px label — around 22px, half a target, on the
 * control people click most often per screen.
 */
export declare function SegmentedV4({ options, value, onChange, className, }: SegmentedProps): React.ReactElement;
//# sourceMappingURL=SegmentedV4.d.ts.map