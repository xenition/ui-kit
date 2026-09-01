import * as React from 'react';
import type { MatrixQuestionProps } from './MatrixQuestion';
/** Drop-in for {@link MatrixQuestionProps} — same props, the V4 "focus" design. */
export type MatrixQuestionV4Props = MatrixQuestionProps;
/**
 * MatrixQuestion — **V4** "clean form / focus" design. A calm, legible row×column
 * grid: one `radiogroup` per statement row sharing the same column choices, laid
 * out as a header row plus one big-tap-target cell per column. Legible column
 * headers sit above zebra-free rows separated only by a hairline `border`. The
 * chosen cell fills with a solid **primary** disc (on a soft primary tint) and is
 * announced via `accessibilityState.selected` — state is never color-only. One
 * accent, generous 8-pt air, no gradients. An empty `rows`/`columns` list renders
 * a muted empty state. Same props/behavior as {@link MatrixQuestionProps};
 * token-only colors via `useXenitionTheme()` + `withAlpha` (no literal colors).
 */
export declare function MatrixQuestionV4({ rows, columns, value, onChange, accessibilityLabel, disabled, style, }: MatrixQuestionV4Props): React.ReactElement;
//# sourceMappingURL=MatrixQuestionV4.d.ts.map