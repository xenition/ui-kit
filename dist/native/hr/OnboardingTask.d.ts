import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type TaskStatus } from './internal';
export type OnboardingTaskVariant = 'default' | 'compact';
export interface OnboardingTaskProps {
    /** Task title (e.g. "Sign employment contract"). */
    title: string;
    /** Grouping category (e.g. "Paperwork", "IT setup"). */
    category?: string;
    /** Workflow status — glyph + word pill. Drives the checkbox when `done`. */
    status?: TaskStatus;
    /** Pre-formatted due date. */
    dueDate?: string;
    /** Whether this task is past due — flagged by word, not color alone. */
    overdue?: boolean;
    /** Assignee / owner name. */
    assignee?: string;
    /** Assignee avatar. */
    assigneeAvatarUrl?: string;
    /** Density. */
    variant?: OnboardingTaskVariant;
    /** Fires with the next completed value when the checkbox is toggled. */
    onToggle?: (done: boolean) => void;
    /** Tap handler for the row body. */
    onPress?: () => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single onboarding checklist item: a checkbox, title, category, and status
 * pill (glyph + word — `blocked` reads danger, `done` success, never color
 * alone). Overdue tasks are called out with a word. Toggling the checkbox fires
 * `onToggle(next)` for optimistic completion. `compact` drops the category /
 * assignee meta. All colors are theme tokens — no literals.
 */
export declare function OnboardingTask({ title, category, status, dueDate, overdue, assignee, assigneeAvatarUrl, variant, onToggle, onPress, testID, style, }: OnboardingTaskProps): React.ReactElement;
//# sourceMappingURL=OnboardingTask.d.ts.map