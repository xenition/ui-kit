import * as React from 'react';
import type { TaskRowProps } from './TaskRow';
/** Drop-in for {@link TaskRowProps} — same props, the V4 "flow" design. */
export type TaskRowV4Props = TaskRowProps;
/**
 * TaskRow — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on a task line: a leading {@link Checkbox}, a bigger,
 * more legible title, and the variant-driven trailing accessory (priority tag or
 * due pill). Completing a task is the satisfying moment — the row settles into a
 * **soft-success glow** with the title struck through. Same props/behavior as
 * {@link TaskRowProps}; all colors from `--xen-*` token classes (no literals).
 */
export declare const TaskRowV4: React.ForwardRefExoticComponent<TaskRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TaskRowV4.d.ts.map