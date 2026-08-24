import * as React from 'react';
import type { TaskRowProps } from './TaskRow';
/** Same public contract as {@link TaskRow} — a drop-in alternate design. */
export type TaskRowV2Props = TaskRowProps;
/**
 * TaskRow, redesigned (v2): an **elevated task card**. The checkbox rides in a soft
 * tinted well, the title is bolder, and the priority/due accessory sits as a chip
 * on a raised surface row. Distinct from v1's flat line. Same props, token-only.
 */
export declare const TaskRowV2: React.ForwardRefExoticComponent<TaskRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TaskRowV2.d.ts.map