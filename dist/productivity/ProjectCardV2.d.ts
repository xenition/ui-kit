import * as React from 'react';
import type { ProjectCardProps } from './ProjectCard';
/** Same public contract as {@link ProjectCard} — a drop-in alternate design. */
export type ProjectCardV2Props = ProjectCardProps;
/**
 * ProjectCard, redesigned (v2): an **elevated project card**. A bold title/desc, a
 * big percent read-out over a thick progress bar, then assignees, a task-count meta
 * and a due pill on a footer row. Distinct from v1. Same props, token-only.
 */
export declare const ProjectCardV2: React.ForwardRefExoticComponent<ProjectCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ProjectCardV2.d.ts.map