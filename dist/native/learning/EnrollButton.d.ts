import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Enrollment lifecycle. */
export type EnrollState = 'idle' | 'enrolling' | 'enrolled' | 'full';
export interface EnrollButtonProps {
    /** Current enrollment state. */
    state?: EnrollState;
    /** CTA label when idle (default "Enroll now"). */
    label?: string;
    /** Optional price shown next to / under the button. */
    price?: string;
    /** Fires when an idle button is pressed. */
    onEnroll?: () => void;
    /** Full-width layout. */
    block?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * Course enrollment CTA built on the primitive `Button`. Maps the enrollment
 * lifecycle to button appearance: `idle` → primary CTA, `enrolling` → loading,
 * `enrolled` → a success confirmation (not pressable), `full` → a disabled
 * "Class full". Announces the current state. Token-only colors.
 */
export declare function EnrollButton({ state, label, price, onEnroll, block, style, }: EnrollButtonProps): React.ReactElement;
//# sourceMappingURL=EnrollButton.d.ts.map