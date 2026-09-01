import * as React from 'react';
/** Project delivery status — drives the frosted status pill's glyph + label. */
export type ProjectStatus = 'on-track' | 'at-risk' | 'off-track' | 'done';
export interface ProjectHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Project name — the near-white headline on the gradient. */
    name: string;
    /** Optional one-line description under the name. */
    description?: string;
    /** Completion percentage `0–100`; shown as a near-white progress bar + numeral. */
    progressPct: number;
    /** Done / total task counts, rendered as a frosted stat tile. */
    taskCounts?: {
        done: number;
        total: number;
    };
    /** Members on the project — rendered as an overlapping avatar stack (max 5 shown). */
    members?: readonly {
        name: string;
        avatarUrl?: string;
    }[];
    /** Localized due-date label, rendered as a frosted stat tile. */
    dueLabel?: string;
    /** Delivery status; rendered as a frosted status pill. */
    status?: ProjectStatus;
    /** Fires on the "Add task" CTA. Hidden when unset. */
    onAddTask?: () => void;
    /** Fires on the settings (gear) action. Hidden when unset. */
    onSettings?: () => void;
}
/**
 * ProjectHeader — the project-detail hero for the productivity **V4 "flow"** line.
 * A brand-gradient panel that opens a project workspace: the near-white project
 * name + description, a near-white progress bar with its numeral, frosted stat
 * tiles (done/total, due), an overlapping member avatar stack, and a frosted
 * status pill. "Add task" (a near-white `bg-on-primary` pill) and a ghost
 * settings button each appear only when their handler is set. Presentational —
 * shaped data + callbacks, nothing fetches. Every color derives from the brand
 * ramp via `--xen-*` token classes and gradient utilities — no literals, light +
 * dark.
 */
export declare const ProjectHeader: React.ForwardRefExoticComponent<ProjectHeaderProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ProjectHeader.d.ts.map