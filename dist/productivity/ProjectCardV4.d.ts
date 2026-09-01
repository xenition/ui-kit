import * as React from 'react';
import type { ProjectCardProps } from './ProjectCard';
/** Drop-in for {@link ProjectCardProps} — same props, the V4 "flow" design. */
export type ProjectCardV4Props = ProjectCardProps;
/**
 * ProjectCard — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on a project summary: a clean, softly-elevated
 * {@link Card} with a legible title, one **primary** progress track (which
 * settles into a **soft-success glow** at 100%), an {@link AssigneeGroup},
 * task-count meta, and an optional {@link DueDatePill}. A hairline primary
 * accent edge is the only flourish. Same props/behavior as
 * {@link ProjectCardProps}; all colors from `--xen-*` token classes (no
 * literals).
 */
export declare const ProjectCardV4: React.ForwardRefExoticComponent<ProjectCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ProjectCardV4.d.ts.map