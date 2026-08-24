import * as React from 'react';
import { type PriorityLevel } from './PriorityTag';
import { type DueDateTone } from './DueDatePill';
/**
 * TaskRow layout variants:
 * - `checkbox` — leading checkbox + title only (the baseline task line).
 * - `priority` — adds a trailing {@link PriorityTag}.
 * - `dated`    — adds a trailing {@link DueDatePill}.
 */
export type TaskRowVariant = 'checkbox' | 'priority' | 'dated';
export interface TaskRowProps {
    /** Task title. */
    title: string;
    /** Completed state — toggles the checkbox and strikes the title. */
    done?: boolean;
    /** Fires with the next done value when the checkbox is toggled. */
    onToggle?: (done: boolean) => void;
    /** Fires when the row body (not the checkbox) is clicked. */
    onClick?: () => void;
    /** Which trailing accessory to show. */
    variant?: TaskRowVariant;
    /** Priority — required for the `priority` variant. */
    priority?: PriorityLevel;
    /** Due-date label — required for the `dated` variant. */
    dueLabel?: string;
    /** Due-date urgency tone for the `dated` variant. */
    dueTone?: DueDateTone;
    className?: string;
}
/**
 * A single task line: a leading {@link Checkbox}, the title (struck through when
 * `done`), and a variant-driven trailing accessory (priority tag or due-date
 * pill). The checkbox carries its own `checkbox` role; the row body is a separate
 * button. Web parity of the native `TaskRow` (`onPress` → `onClick`). No literal
 * colors.
 */
export declare const TaskRow: React.ForwardRefExoticComponent<TaskRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TaskRow.d.ts.map