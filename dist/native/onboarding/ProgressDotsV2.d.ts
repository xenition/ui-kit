import * as React from 'react';
import type { ProgressDotsProps } from './ProgressDots';
/** Drop-in for {@link ProgressDots} — identical props, different design. */
export type ProgressDotsV2Props = ProgressDotsProps;
/**
 * Paged progress — V2, the editorial line: **one continuous track with a
 * spoken position beside it**, "2 of 5", instead of a row of segments.
 *
 * The idea the base and V3 cannot express: on a long flow — eight steps, ten —
 * segments stop being countable and the header turns into a row of tick marks
 * nobody reads. A single filled track plus the number says the same thing at
 * any length, and the number is the part a user actually uses to decide
 * whether to keep going.
 *
 * The counter is `tabular` and fixed-width so the track does not resize as the
 * step number changes, which would make the bar appear to jump backwards on
 * step 10 of 12.
 *
 * `onDotPress` is accepted and **ignored**: there are no dots to press. A
 * continuous track has no discrete targets, and inventing invisible ones is
 * worse than not offering navigation at all. An app that needs step navigation
 * wants the base line.
 *
 * Same props as {@link ProgressDots}. Token-pure.
 */
export declare function ProgressDotsV2({ count, activeIndex, size, accessibilityLabel, style, }: ProgressDotsV2Props): React.ReactElement;
//# sourceMappingURL=ProgressDotsV2.d.ts.map