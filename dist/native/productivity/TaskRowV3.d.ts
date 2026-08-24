import * as React from 'react';
import type { TaskRowProps } from './TaskRow';
/** Same public contract as {@link TaskRow} — a drop-in alternate design. */
export type TaskRowV3Props = TaskRowProps;
/**
 * TaskRow, redesigned (v3): an **ultra-dense checklist line**. A small checkbox, the
 * title inline, and a compact accessory on a bare hairline row — the tightest to-do
 * line. The opposite of v2's card. Same props, token-only.
 */
export declare function TaskRowV3({ title, done, onToggle, onPress, variant, priority, dueLabel, dueTone, appearance, style, }: TaskRowV3Props): React.ReactElement;
//# sourceMappingURL=TaskRowV3.d.ts.map