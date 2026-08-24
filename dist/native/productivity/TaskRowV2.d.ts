import * as React from 'react';
import type { TaskRowProps } from './TaskRow';
/** Same public contract as {@link TaskRow} — a drop-in alternate design. */
export type TaskRowV2Props = TaskRowProps;
/**
 * TaskRow, redesigned (v2): an **elevated task card**. The checkbox rides in a soft
 * tinted well, the title is bolder, and the accessory sits on a shadowed surface
 * row. Distinct from v1's flat line. Same props, token-only.
 */
export declare function TaskRowV2({ title, done, onToggle, onPress, variant, priority, dueLabel, dueTone, appearance, style, }: TaskRowV2Props): React.ReactElement;
//# sourceMappingURL=TaskRowV2.d.ts.map