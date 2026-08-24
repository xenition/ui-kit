import * as React from 'react';
import type { ChoreCardProps } from './ChoreCard';
/** Same public contract as {@link ChoreCard} — a drop-in alternate design. */
export type ChoreCardV3Props = ChoreCardProps;
/**
 * ChoreCard, redesigned (v3): a **dense checklist line**. A leading checkbox
 * toggles completion (checking it fires `onComplete`), the title sits inline
 * with a small assignee·due caption, and points show as a trailing star figure.
 * One tight row for long chore lists — the opposite of v2's tall quest card.
 * Same props.
 */
export declare function ChoreCardV3({ title, assignee, points, due, icon, status, loading, onComplete, onPress, style, }: ChoreCardV3Props): React.ReactElement;
//# sourceMappingURL=ChoreCardV3.d.ts.map