import * as React from 'react';
import type { MatrixQuestionProps } from './MatrixQuestion';
/** Drop-in for {@link MatrixQuestionProps} — same props, the V4 "focus" design. */
export type MatrixQuestionV4Props = MatrixQuestionProps;
/**
 * MatrixQuestion — **V4** "clean form / focus" design. A calm, legible row×column
 * grid: one `radiogroup` per statement row sharing the same column choices, laid
 * out as a header row plus one big-tap-target cell per column. Legible column
 * headers sit above zebra-free rows separated only by a hairline `border`. The
 * chosen cell fills with a solid **primary** disc (on a soft `bg-primary/10`
 * tint) and is announced via `aria-checked` — state is never color-only. One
 * accent, generous 8-pt air, no gradients. An empty `rows`/`columns` list renders
 * a muted {@link EmptyState}. Same props/behavior as {@link MatrixQuestionProps};
 * all colors from `--xen-*` token classes (no literal colors).
 */
export declare const MatrixQuestionV4: React.ForwardRefExoticComponent<MatrixQuestionProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MatrixQuestionV4.d.ts.map