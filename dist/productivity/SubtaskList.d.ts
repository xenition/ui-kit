import * as React from 'react';
export interface Subtask {
    id: string;
    title: string;
    done?: boolean;
}
export interface SubtaskListProps {
    /** The subtasks to render; an empty array shows the empty state. */
    subtasks: Subtask[];
    /** Fires with the toggled subtask id and its next done value. */
    onToggle?: (id: string, done: boolean) => void;
    /** Copy for the empty state. */
    emptyLabel?: string;
    /** Show a compact `done/total` counter header. */
    showProgress?: boolean;
    className?: string;
}
/**
 * Vertical list of subtasks rendered as {@link ChecklistItem}s, with an optional
 * `done/total` counter and a muted empty state. Web parity of the native
 * `SubtaskList`. Guards against a missing/empty array. Colors come from the theme
 * tokens. No literal colors.
 */
export declare const SubtaskList: React.ForwardRefExoticComponent<SubtaskListProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SubtaskList.d.ts.map