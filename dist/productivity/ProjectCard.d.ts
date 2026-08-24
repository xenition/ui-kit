import * as React from 'react';
import { type Assignee } from './AssigneeGroup';
import { type DueDateTone } from './DueDatePill';
export interface ProjectCardProps {
    /** Project name. */
    title: string;
    /** Short description / subtitle. */
    description?: string;
    /** Completion percent 0–100 (guarded/clamped by the bar). */
    progress?: number;
    /** Count of open tasks (rendered as a subtle meta). */
    taskCount?: number;
    /** People on the project. */
    assignees?: Assignee[];
    /** Optional deadline label + tone. */
    dueLabel?: string;
    dueTone?: DueDateTone;
    /** Fires when the card is clicked. */
    onClick?: () => void;
    className?: string;
}
/**
 * A project summary card composed on the primitive {@link Card}: title +
 * description, a {@link Progress} completion bar, and a footer with an
 * {@link AssigneeGroup} and optional {@link DueDatePill}. Progress tone shifts to
 * success at 100%. Web parity of the native `ProjectCard` (`onPress` → `onClick`).
 * No literal colors.
 */
export declare const ProjectCard: React.ForwardRefExoticComponent<ProjectCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ProjectCard.d.ts.map