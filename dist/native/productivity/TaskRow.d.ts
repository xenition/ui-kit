import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type Appearance } from '../primitives/internal/appearance';
import { type PriorityLevel } from './PriorityTag';
import { type DueDateTone } from './DueDatePill';
/**
 * TaskRow layout variants:
 * - `checkbox` — leading checkbox + title only (the baseline task line).
 * - `priority` — adds a trailing {@link PriorityTag} dot.
 * - `dated`    — adds a trailing {@link DueDatePill}.
 */
export type TaskRowVariant = 'checkbox' | 'priority' | 'dated';
export interface TaskRowProps {
    /** Task title. */
    title: string;
    /** Completed state — toggles the checkbox and strikes the title. */
    done?: boolean;
    /** Fires with the next done value when the checkbox is pressed. */
    onToggle?: (done: boolean) => void;
    /** Fires when the row body (not the checkbox) is pressed. */
    onPress?: () => void;
    /** Which trailing accessory to show. */
    variant?: TaskRowVariant;
    /** Priority — required for the `priority` variant. */
    priority?: PriorityLevel;
    /** Due-date label — required for the `dated` variant. */
    dueLabel?: string;
    /** Due-date urgency tone for the `dated` variant. */
    dueTone?: DueDateTone;
    /** Surface treatment (visual-diversity preset). Defaults to `classic`. */
    appearance?: Appearance;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single task line: a leading {@link Checkbox}, the title (struck through when
 * `done`), and a variant-driven trailing accessory (priority tag or due-date
 * pill). The checkbox carries its own `checkbox` a11y role; the row body is a
 * separate pressable. No literal colors.
 */
export declare function TaskRow({ title, done, onToggle, onPress, variant, priority, dueLabel, dueTone, appearance, style, }: TaskRowProps): React.ReactElement;
//# sourceMappingURL=TaskRow.d.ts.map