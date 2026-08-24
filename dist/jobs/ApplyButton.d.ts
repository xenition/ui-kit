import * as React from 'react';
import { type ButtonSize } from '../primitives';
import type { ApplyState } from './types';
export interface ApplyButtonProps {
    /** Current application state. Drives the label, variant, and callback. */
    state?: ApplyState;
    /** Fired to submit an application (`apply` state) or re-apply (`withdrawn`). */
    onApply?: () => void;
    /** Fired to withdraw a submitted application (`applied` state). */
    onWithdraw?: () => void;
    /** Show a spinner and block presses. */
    loading?: boolean;
    disabled?: boolean;
    size?: ButtonSize;
    /** Fill the available width. */
    block?: boolean;
    className?: string;
}
/**
 * The apply / applied / withdrawn call-to-action for a job. A thin, stateful
 * wrapper over the primitive `Button`:
 * - `apply` → primary "Apply", presses call `onApply`.
 * - `applied` → secondary "Applied ✓", presses call `onWithdraw` (undo).
 * - `withdrawn` → ghost "Re-apply", presses call `onApply` again.
 * The accessible label always names the state so it is not conveyed by variant
 * color alone. Colors come from the `Button` primitive's tokens.
 */
export declare const ApplyButton: React.ForwardRefExoticComponent<ApplyButtonProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=ApplyButton.d.ts.map