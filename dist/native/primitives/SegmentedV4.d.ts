import * as React from 'react';
import type { SegmentedOption, SegmentedProps } from './Segmented';
export type { SegmentedProps as SegmentedV4Props, SegmentedOption };
/**
 * **V4 segmented control** — same props as {@link Segmented}, a different
 * design line.
 *
 * ## One thumb, and it travels
 *
 * The base control repainted a background on whichever segment was selected:
 * the fill blinked out here and in there, two events for one change. V4 has a
 * single thumb that **slides** — §36.5, continuity of position, and the reason
 * this control feels like a physical switch rather than a row of buttons that
 * happen to share a box. `useMovingIndicator` measures the row and drives it;
 * Reduce Motion snaps it into place instead (§36.10), and it stays hidden
 * until it has a real position so the first paint never shows it flying in
 * from the left edge.
 *
 * ## Why this one is allowed to be a pill
 *
 * `design.md` §8 lists "excessive pill-shaped controls" among the tells of
 * generic AI UI. A segmented control is the exception the word *excessive* is
 * there for: the capsule is not decoration applied to a control, it IS the
 * control — the shape is how a user recognises "pick exactly one of these"
 * before reading a single label (§32). It still defers to the seed: `radius.full`
 * is 0 on a `sharp` brand, so a sharp app gets a sharp switch rather than the
 * capsule being smuggled in over the top of a design decision.
 *
 * ## Depth
 *
 * The thumb is `surface` over a rail mixed from `border`, carrying
 * `elevation.card` — the smallest of the three, because it has lifted by
 * exactly the height of a thumb. There is no hairline on it: a raised card
 * keeps its border because a shadow alone dissolves on a same-colour page, and
 * a thumb never has that problem, because the rail underneath is a different
 * colour by construction. A `depth: 'flat'` seed zeroes the shadow with no
 * branch in this file, and the rail-against-thumb contrast still carries the
 * state.
 *
 * ## Reach
 *
 * Each segment is a full 44pt target composed from the spacing scale. The base
 * control was `spacing.xs` of padding around a 14pt label — around 22pt, half
 * a target, on the control people tap most often per screen.
 */
export declare function SegmentedV4({ options, value, onChange, style, }: SegmentedProps): React.ReactElement;
//# sourceMappingURL=SegmentedV4.d.ts.map