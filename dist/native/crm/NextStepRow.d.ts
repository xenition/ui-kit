import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type NextStepPriority = 'low' | 'normal' | 'high';
export interface NextStepRowProps {
    /** The action to take (e.g. "Send proposal"). */
    title: string;
    /** Pre-formatted due date. */
    dueDate?: string;
    /** Marks the step past due — shown as an "Overdue" word + ⚠ glyph. */
    overdue?: boolean;
    /** Completed state — checkbox fills, title strikes through. */
    done?: boolean;
    /** Who owns the step. */
    assignee?: string;
    /** Priority — a leading glyph + label, not color-only. */
    priority?: NextStepPriority;
    /** Fired with the next `done` value when the checkbox is tapped. */
    onToggle?: (done: boolean) => void;
    /** Fired when the row body (not the checkbox) is tapped. */
    onPress?: () => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single "next step" / task row for a deal or contact: a tappable checkbox,
 * the action title (struck through when `done`), and a meta line of assignee,
 * priority (glyph + label) and due date. `overdue` is surfaced as the word
 * "Overdue" plus a ⚠ glyph in the `danger` tone — never color alone. The
 * checkbox reports the next state via `onToggle`. All colors are theme tokens.
 */
export declare function NextStepRow({ title, dueDate, overdue, done, assignee, priority, onToggle, onPress, testID, style, }: NextStepRowProps): React.ReactElement;
//# sourceMappingURL=NextStepRow.d.ts.map