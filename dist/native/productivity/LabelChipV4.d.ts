import * as React from 'react';
import type { LabelChipProps } from './LabelChip';
/** Drop-in for {@link LabelChipProps} — same props, the V4 "flow" design. */
export type LabelChipV4Props = LabelChipProps;
/**
 * LabelChip — **V4** "flow" design. The focused-workspace take on a label: a
 * rounded, **soft-tint** chip carrying a small tone-colored dot and its text,
 * with an optional remove (×). Calm and borderless — the tone lives in a gentle
 * `withAlpha` wash rather than an outline, and the single accent dot does the
 * work. Same props/behavior as {@link LabelChipProps} (`tone` dot, `onPress`,
 * `onRemove`); token-only colors via `useXenitionTheme()`.
 */
export declare function LabelChipV4({ label, tone, onRemove, onPress, style }: LabelChipV4Props): React.ReactElement;
//# sourceMappingURL=LabelChipV4.d.ts.map