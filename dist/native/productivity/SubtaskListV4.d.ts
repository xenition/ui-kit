import * as React from 'react';
import type { SubtaskListProps } from './SubtaskList';
/** Drop-in for {@link SubtaskListProps} — same props, the V4 "flow" design. */
export type SubtaskListV4Props = SubtaskListProps;
/**
 * SubtaskList — **V4** "flow" design. The focused-workspace take on a subtask
 * list: a calm header carrying a **soft-primary progress bar** and an "N/M done"
 * count, then the {@link ChecklistItem} rows. Guards against a missing/empty
 * array and keeps the add/toggle callbacks. Same props/behavior as
 * {@link SubtaskListProps}; token-only colors via `useXenitionTheme()`.
 */
export declare function SubtaskListV4({ subtasks, onToggle, emptyLabel, showProgress, style, }: SubtaskListV4Props): React.ReactElement;
//# sourceMappingURL=SubtaskListV4.d.ts.map