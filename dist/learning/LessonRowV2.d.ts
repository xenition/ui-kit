import * as React from 'react';
import type { LessonRowProps } from './LessonRow';
/** Same public contract as {@link LessonRow} — a drop-in alternate design. */
export type LessonRowV2Props = LessonRowProps;
/**
 * LessonRow, redesigned (v2): an **elevated lesson card**. A numbered disc leads,
 * a tinted status glyph tile marks state, the title sits over a kind·duration
 * meta line, and a chevron hints navigation. Completed rows tint their disc
 * success. Distinct from v1's flat row. Same props, token-only.
 */
export declare const LessonRowV2: React.ForwardRefExoticComponent<LessonRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LessonRowV2.d.ts.map