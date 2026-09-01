import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/**
 * A soft-primary quick-pick chip descriptor. When `active` the chip reads as a
 * filled soft-primary; otherwise it is a calm outlined affordance. Every color
 * traces to a theme token — no literals.
 */
export interface QuickAddChip {
    /** Visible chip label (e.g. a priority, a due date, a project name). */
    label: string;
    /** Optional leading glyph rendered before the label (decorative). */
    glyph?: string;
    /** Whether the chip currently reads as chosen (solid soft-primary). */
    active?: boolean;
}
export interface QuickAddTaskProps {
    /** Current composer text (controlled). */
    value: string;
    /** Fires with the next text on every keystroke — the controlled change handler. */
    onChangeText: (text: string) => void;
    /** Placeholder shown when the field is empty. Defaults to `'Add a task…'`. */
    placeholder?: string;
    /** Fires when the task is submitted (Add button or keyboard submit) with the trimmed text. */
    onAdd?: (text: string) => void;
    /** When set, the Add button shows a busy state and submission is blocked. */
    adding?: boolean;
    /** Accessible label for the text field. Defaults to `'Add a task'`. */
    label?: string;
    /** Label for the primary Add button. Defaults to `'Add'`. */
    addLabel?: string;
    /** Leading composer glyph (the calm ⊕/checkbox affordance). Defaults to `'⊕'`. */
    glyph?: string;
    /** Priority quick-pick chip; omit to hide it. */
    priority?: QuickAddChip;
    /** Fires when the priority chip is pressed. */
    onPriority?: () => void;
    /** Due-date quick-pick chip; omit to hide it. */
    dueLabel?: QuickAddChip;
    /** Fires when the due-date chip is pressed. */
    onDue?: () => void;
    /** Project quick-pick chip; omit to hide it. */
    projectLabel?: QuickAddChip;
    /** Fires when the project chip is pressed. */
    onProject?: () => void;
    /** Container style override. */
    style?: StyleProp<ViewStyle>;
}
/**
 * QuickAddTask — **V4** "flow" quick-add composer (native twin of the web
 * component). A calm, rounded, elevated card: a leading ⊕ glyph seated in a
 * **soft-primary disc**, a big legible controlled {@link TextInput}, a row of
 * soft-primary quick-pick chips (priority / due / project), and one **primary**
 * {@link Button} (≥44px, disabled while empty or `adding`). Controlled — the
 * caller owns `value` and is handed the next text via `onChangeText`; `onAdd`
 * fires on the button or keyboard submit with the trimmed value. Presentational
 * only. Token-only colors via `useXenitionTheme()` — no literals.
 */
export declare function QuickAddTask({ value, onChangeText, placeholder, onAdd, adding, label, addLabel, glyph, priority, onPriority, dueLabel, onDue, projectLabel, onProject, style, }: QuickAddTaskProps): React.ReactElement;
//# sourceMappingURL=QuickAddTask.d.ts.map