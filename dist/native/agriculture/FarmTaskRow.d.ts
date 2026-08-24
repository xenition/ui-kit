import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Task urgency — colors the priority chip and is stated as text. */
export type TaskPriority = 'low' | 'normal' | 'high' | 'urgent';
export interface FarmTaskRowProps {
    /** Task title (e.g. "Spray north orchard"). */
    title: string;
    /** Whether the task is complete. Drives the check control's a11y state. */
    done?: boolean;
    /** Due hint (e.g. "Today", "Aug 14"). */
    due?: string;
    /** Priority. Default `'normal'`. */
    priority?: TaskPriority;
    /** Field / area the task applies to (e.g. "Block C"). */
    field?: string;
    /** Assignee name / initials (e.g. "Sam"). */
    assignee?: string;
    /** Category glyph (e.g. "🚜", "💧"). Default `'✅'`. */
    icon?: string;
    /** Whether the due date is overdue (colors the due text + adds a chip). */
    overdue?: boolean;
    /** Fires with the requested done value when the check control is toggled. */
    onToggle?: (next: boolean) => void;
    /** Fires when the row body (not the check) is tapped. */
    onPress?: () => void;
    /** Hide the bottom divider (last row in a list). */
    last?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A farm task row — a tappable check control (a themed checkbox whose a11y
 * `checked` state carries completion, not color), the task title (struck +
 * muted when done), due / field / assignee meta, and a priority {@link Badge}
 * stated as text. `overdue` adds a text chip and colors the due line so urgency
 * reads without color. Toggling the check fires `onToggle(next)`; tapping the
 * body fires `onPress`. Token-bound throughout — no literal colors.
 */
export declare function FarmTaskRow({ title, done, due, priority, field, assignee, icon, overdue, onToggle, onPress, last, style, }: FarmTaskRowProps): React.ReactElement;
//# sourceMappingURL=FarmTaskRow.d.ts.map