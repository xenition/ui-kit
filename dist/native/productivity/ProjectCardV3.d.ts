import * as React from 'react';
import type { ProjectCardProps } from './ProjectCard';
/** Same public contract as {@link ProjectCard} — a drop-in alternate design. */
export type ProjectCardV3Props = ProjectCardProps;
/**
 * ProjectCard, redesigned (v3): a **dense project row**. The title over a
 * description·task-count line with a thin progress bar, and assignees + a due pill
 * on the right — a hairline row for a projects list. The opposite of v2's card.
 * Same props, token-only.
 */
export declare function ProjectCardV3({ title, description, progress, taskCount, assignees, dueLabel, dueTone, onPress, appearance, style, }: ProjectCardV3Props): React.ReactElement;
//# sourceMappingURL=ProjectCardV3.d.ts.map