import * as React from 'react';
import type { PollResultBarProps } from './PollResultBar';
/** Drop-in for {@link PollResultBarProps} — same props, the V4 "focus" design. */
export type PollResultBarV4Props = PollResultBarProps;
/**
 * PollResultBar — **V4** "focus" design. The calm, legible take on a result
 * chart: tall (~44px) rounded rows on a soft-primary track, each filled to its
 * share of the vote in primary and trailed by a big percent numeral. The
 * **leading** option is emphasised (bolder label, solid-primary fill) and the
 * respondent's own pick keeps its primary border + spoken "your choice"; when
 * `showResults` is `false` and `onVote` is set the rows become vote buttons.
 * One accent (primary), no gradients. Same props/behavior as
 * {@link PollResultBarProps}; token-only colors via `useXenitionTheme()` +
 * `withAlpha`. `0` total votes render every bar at 0% safely.
 */
export declare function PollResultBarV4({ options, selectedId, showResults, onVote, accessibilityLabel, style, }: PollResultBarV4Props): React.ReactElement;
//# sourceMappingURL=PollResultBarV4.d.ts.map