import * as React from 'react';
import type { RankingQuestionProps } from './RankingQuestion';
/** Drop-in for {@link RankingQuestionProps} — same props, the V4 "focus" design. */
export type RankingQuestionV4Props = RankingQuestionProps;
/**
 * RankingQuestion — **V4** "focus" design. The calm, legible take on an ordering
 * control: big (~44px) rounded surface rows, each led by a solid **primary** rank
 * pill (1, 2, 3…) and trailed by generous up/down reorder targets. Emits the full
 * next id order on every move; the move buttons disable at the ends and stay
 * labelled ("Move X up") so the action is never icon-only for screen readers.
 * Resolves a complete order even when `value` is partial or stale. Empty items
 * render a muted empty state. One accent (primary), no gradients. Same
 * props/behavior as {@link RankingQuestionProps}; token-only colors via
 * `useXenitionTheme()` + `withAlpha`.
 */
export declare function RankingQuestionV4({ items, value, onChange, accessibilityLabel, disabled, style, }: RankingQuestionV4Props): React.ReactElement;
//# sourceMappingURL=RankingQuestionV4.d.ts.map