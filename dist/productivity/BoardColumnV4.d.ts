import * as React from 'react';
import type { BoardColumnProps } from './BoardColumn';
/** Drop-in for {@link BoardColumnProps} — same props, the V4 "flow" design. */
export type BoardColumnV4Props = BoardColumnProps;
/**
 * BoardColumn — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on a Kanban column: a calm header with the title and a
 * **soft-primary count pill**, a subtle column surface, the stack of
 * {@link TaskRow} cards, and the "+ Add" affordance. Guards a missing array and
 * keeps title/count/cards/toggle behavior. Same props/behavior as
 * {@link BoardColumnProps}; all colors from `--xen-*` token classes (no literals).
 */
export declare const BoardColumnV4: React.ForwardRefExoticComponent<BoardColumnProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BoardColumnV4.d.ts.map