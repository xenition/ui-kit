import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type Appearance } from '../primitives/internal/appearance';
export interface HabitRowProps {
    /** Habit name, e.g. "Drink water". */
    name: string;
    /** Whether the habit is done for the current period. */
    done: boolean;
    /** Current streak length; a flame + count is shown when `> 0`. */
    streak?: number;
    /** Secondary line, e.g. "Daily · 8 glasses". */
    meta?: string;
    /** Fires with the next `done` state when the row / checkbox is toggled. */
    onToggle?: (next: boolean) => void;
    /**
     * Surface treatment for visual diversity; defaults to `classic`. For rows
     * `classic` stays transparent (the historical look) — non-classic values wrap
     * the row in a rounded, treated surface.
     */
    appearance?: Appearance;
    style?: StyleProp<ViewStyle>;
}
/**
 * A habit-tracker row: a tappable check control, the habit name + meta, and a
 * streak flame. Completing a habit reads in the `success` tone. `onToggle`
 * receives the next boolean state. `appearance` selects an optional surface
 * treatment. Token-only; a11y announces done state and streak.
 */
export declare function HabitRow({ name, done, streak, meta, onToggle, appearance, style, }: HabitRowProps): React.ReactElement;
//# sourceMappingURL=HabitRow.d.ts.map