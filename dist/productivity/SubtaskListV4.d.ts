import * as React from 'react';
import type { SubtaskListProps } from './SubtaskList';
/** Drop-in for {@link SubtaskListProps} — same props, the V4 "flow" design. */
export type SubtaskListV4Props = SubtaskListProps;
/**
 * SubtaskList — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on a subtask list: a calm header carrying a
 * **soft-primary progress bar** and an "N/M done" count, then the
 * {@link ChecklistItem} rows. Guards against a missing/empty array and keeps the
 * add/toggle callbacks. Same props/behavior as {@link SubtaskListProps}; all
 * colors from `--xen-*` token classes (no literals).
 */
export declare const SubtaskListV4: React.ForwardRefExoticComponent<SubtaskListProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SubtaskListV4.d.ts.map