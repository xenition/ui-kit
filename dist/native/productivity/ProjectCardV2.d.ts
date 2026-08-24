import * as React from 'react';
import type { ProjectCardProps } from './ProjectCard';
/** Same public contract as {@link ProjectCard} — a drop-in alternate design. */
export type ProjectCardV2Props = ProjectCardProps;
/**
 * ProjectCard, redesigned (v2): an **elevated project card**. A bold title/desc, a
 * percent read-out over a progress bar, then assignees, a task-count meta and a due
 * pill on a footer row. Shadowed, press-scales. Distinct from v1. Same props,
 * token-only.
 */
export declare function ProjectCardV2({ title, description, progress, taskCount, assignees, dueLabel, dueTone, onPress, appearance, style, }: ProjectCardV2Props): React.ReactElement;
//# sourceMappingURL=ProjectCardV2.d.ts.map