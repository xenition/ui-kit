import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
    style?: StyleProp<ViewStyle>;
}
/**
 * Vertical list of subtasks rendered as {@link ChecklistItem}s, with an optional
 * `done/total` counter and a muted empty state. Guards against a missing/empty
 * array. Colors come from the theme tokens. No literal colors.
 */
export declare function SubtaskList({ subtasks, onToggle, emptyLabel, showProgress, style, }: SubtaskListProps): React.ReactElement;
//# sourceMappingURL=SubtaskList.d.ts.map