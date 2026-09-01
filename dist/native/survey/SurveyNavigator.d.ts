import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface SurveyNavigatorProps {
    /** Current step, 1-based. */
    step: number;
    /** Total number of steps. */
    total: number;
    /** Fires on Back. The Back button is hidden when unset or on step 1. */
    onBack?: () => void;
    /** Fires on Next (steps before the last). */
    onNext?: () => void;
    /** Fires on Submit (the last step). Falls back to `onNext` when unset. */
    onSubmit?: () => void;
    /** Back button label. Default `'Back'`. */
    backLabel?: string;
    /** Next button label. Default `'Next'`. */
    nextLabel?: string;
    /** Submit button label, shown on the last step. Default `'Submit'`. */
    submitLabel?: string;
    /** Disable the Next/Submit action (e.g. a required answer is missing). */
    nextDisabled?: boolean;
    /** Container style override. */
    style?: StyleProp<ViewStyle>;
}
/**
 * SurveyNavigator — the survey flow's **footer** (V4 "focus" line). A calm,
 * non-gradient bar: a slim primary progress track with a `Step N of M` caption
 * (exposed as a `progressbar`), a ghost Back button and a primary Next button.
 * On the final step Next becomes Submit (still primary, routed to `onSubmit` and
 * falling back to `onNext`). Both actions are big ≥44px thumb-zone `Button`
 * primitives. Presentational only (step index + callbacks). Token-only colors
 * via `useXenitionTheme()` (no literals), dark-mode safe.
 */
export declare function SurveyNavigator({ step, total, onBack, onNext, onSubmit, backLabel, nextLabel, submitLabel, nextDisabled, style, }: SurveyNavigatorProps): React.ReactElement;
//# sourceMappingURL=SurveyNavigator.d.ts.map