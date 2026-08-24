import * as React from 'react';
export interface ServiceTask {
    /** Stable id for the task. */
    id: string;
    /** Task label (e.g. "Verify refrigerant charge"). */
    label: string;
    /** Whether the task is complete. */
    done: boolean;
    /** Marks the task as mandatory (rendered with a required marker). */
    required?: boolean;
}
export interface ServiceChecklistProps {
    /** Section title (e.g. "Startup procedure"). */
    title?: string;
    /** The tasks to render. */
    tasks: ServiceTask[];
    /** Fires with the task id and its next `done` value on toggle. */
    onToggle?: (id: string, done: boolean) => void;
    /** Show skeleton placeholders instead of the list. */
    loading?: boolean;
    /** Disable all checkboxes. */
    disabled?: boolean;
    /** Copy for the empty state when there are no tasks. */
    emptyLabel?: string;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * A completion checklist for a service procedure. Each task is a checkbox row
 * whose label strikes through when done (completion reads without color alone).
 * A header progress bar summarizes `done / total`. Handles the empty state (no
 * tasks → `EmptyState`) and a `loading` skeleton. Toggling fires
 * `onToggle(id, next)`. No literal colors.
 */
export declare const ServiceChecklist: React.ForwardRefExoticComponent<ServiceChecklistProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ServiceChecklist.d.ts.map