import * as React from 'react';
import type { ChoreCardProps } from './ChoreCard';
/** Same public contract as {@link ChoreCard} — a drop-in alternate design. */
export type ChoreCardV3Props = ChoreCardProps;
/**
 * ChoreCard, redesigned (v3): a **dense checklist line**. A leading status box
 * glyph, the title inline with a middot-joined assignee·due·points subtitle, and
 * a quiet trailing "Done" text button. A hairline separates rows so many stack
 * as a tight to-do list — the opposite of v2's tall quest card. Same props,
 * token-only.
 */
export declare const ChoreCardV3: React.ForwardRefExoticComponent<ChoreCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ChoreCardV3.d.ts.map