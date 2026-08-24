import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type RoutineSlot = 'morning' | 'afternoon' | 'evening' | 'bedtime' | 'anytime';
export interface RoutineRowProps {
    /** Step label, e.g. "Brush teeth". */
    label: string;
    /** Time-of-day slot; drives the fallback icon. */
    slot?: RoutineSlot;
    /** Explicit emoji/glyph (overrides the slot icon). */
    icon?: string;
    /** Scheduled time, e.g. "7:30 AM". */
    time?: string;
    /** Whether the step is done. */
    done?: boolean;
    /** Disable the toggle. */
    disabled?: boolean;
    /** Toggle the done state. Presence makes the row a tappable checkbox. */
    onToggle?: (next: boolean) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single routine step row: an icon, label + time, and a tappable done/not-done
 * checkbox. Done state is shown by a check glyph, strike-through, and the a11y
 * `checked` state — never color alone. When `onToggle` is set the whole row is a
 * `checkbox` role. Token-only colors.
 */
export declare function RoutineRow({ label, slot, icon, time, done, disabled, onToggle, style, }: RoutineRowProps): React.ReactElement;
//# sourceMappingURL=RoutineRow.d.ts.map