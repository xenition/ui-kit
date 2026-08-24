import * as React from 'react';
/** Enrollment lifecycle. */
export type EnrollState = 'idle' | 'enrolling' | 'enrolled' | 'full';
export interface EnrollButtonProps {
    /** Current enrollment state. */
    state?: EnrollState;
    /** CTA label when idle (default "Enroll now"). */
    label?: string;
    /** Optional price shown next to the button label. */
    price?: string;
    /** Fires when an idle button is clicked. */
    onEnroll?: () => void;
    /** Full-width layout. */
    block?: boolean;
    className?: string;
}
/**
 * Course enrollment CTA built on the primitive `Button`. Maps the enrollment
 * lifecycle to button appearance: `idle` → primary CTA, `enrolling` → disabled
 * "Enrolling…", `enrolled` → a success confirmation (not pressable), `full` → a
 * disabled "Class full". Announces the current state. Token-only colors
 * (`--xen-*`).
 */
export declare function EnrollButton({ state, label, price, onEnroll, block, className, }: EnrollButtonProps): React.ReactElement;
//# sourceMappingURL=EnrollButton.d.ts.map