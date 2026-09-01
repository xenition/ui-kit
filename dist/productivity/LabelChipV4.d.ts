import * as React from 'react';
import type { LabelChipProps } from './LabelChip';
/** Drop-in for {@link LabelChipProps} — same props, the V4 "flow" design. */
export type LabelChipV4Props = LabelChipProps;
/**
 * LabelChip — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on a label: a rounded, **soft-tint** chip carrying a
 * small tone-colored dot and its text, with an optional remove (×). Calm and
 * borderless — the tone lives in a gentle wash rather than an outline, and the
 * single accent dot does the work. Same props/behavior as {@link LabelChipProps}
 * (`tone` dot, `onClick`, `onRemove`); all colors from `--xen-*` token classes
 * (no literals).
 */
export declare const LabelChipV4: React.ForwardRefExoticComponent<LabelChipProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LabelChipV4.d.ts.map