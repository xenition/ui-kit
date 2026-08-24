import * as React from 'react';
import type { TaskRowProps } from './TaskRow';
/** Same public contract as {@link TaskRow} — a drop-in alternate design. */
export type TaskRowV3Props = TaskRowProps;
/**
 * TaskRow, redesigned (v3): an **ultra-dense checklist line**. A small checkbox, the
 * title inline, and a compact accessory (priority dot or due pill) on a bare
 * hairline row — the tightest to-do line. The opposite of v2's card. Same props,
 * token-only.
 */
export declare const TaskRowV3: React.ForwardRefExoticComponent<TaskRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TaskRowV3.d.ts.map