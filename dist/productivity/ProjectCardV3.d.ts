import * as React from 'react';
import type { ProjectCardProps } from './ProjectCard';
/** Same public contract as {@link ProjectCard} — a drop-in alternate design. */
export type ProjectCardV3Props = ProjectCardProps;
/**
 * ProjectCard, redesigned (v3): a **dense project row**. The title over a
 * description·task-count line with a thin progress underline, and assignees + a due
 * pill on the right — hairline-bordered for a projects list. The opposite of v2's
 * card. Same props, token-only.
 */
export declare const ProjectCardV3: React.ForwardRefExoticComponent<ProjectCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ProjectCardV3.d.ts.map