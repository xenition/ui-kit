import * as React from 'react';
import type { OnboardingTaskProps } from './OnboardingTask';
export interface OnboardingTaskV4Props extends OnboardingTaskProps {
    /**
     * Why the task is blocked.
     *
     * `blocked` is the adverse member of this union and the row had no field for
     * it, so a task waiting on IT for a laptop said "⛔ Blocked" and nothing a
     * new starter could act on.
     */
    blockedReason?: string;
    /** Copy on the past-due flag. Default `'Overdue'`. */
    overdueLabel?: string;
    /** Test hook. Every native `hr` component had one; no web one did. */
    testID?: string;
}
/**
 * **V4 onboarding task** — the web twin of the native `OnboardingTaskV4`, same
 * props as {@link OnboardingTask} plus `blockedReason`, `overdueLabel` and
 * `testID`.
 *
 * ## Five changes
 *
 * 1. **The checkbox is a 44 target.** It was a bare 16px `<input>` with a
 *    `pt-0.5` wrapper — a quarter of the area a thumb needs, on the one
 *    control the whole component exists for. It now sits in a 44 square that
 *    is itself the label, so the miss lands on the tick rather than on
 *    nothing. On native the same `Checkbox` was nested *inside* the row's
 *    `Pressable`, which flattened the row to one leaf and made the tick
 *    unreachable to VoiceOver; this twin already kept it out, and both now
 *    match.
 * 2. **A blocked task can say why.** See `blockedReason`.
 * 3. **The title carries the whole task's name.** The title button announced
 *    only the title, so the status, the due date and the word "Overdue" — the
 *    three things that decide whether the reader acts today — were separate
 *    stops or, in browse mode, easy to miss entirely.
 * 4. **"Overdue" is a prop and is inked with an ink slot.** It was a hard-coded
 *    English string drawn in `text-danger`, the **fill** token; `danger-text`
 *    is the slot with the contrast promise.
 * 5. **The assignee avatar is the same size on both twins** (`xs`, matching
 *    the `xs` caption beside it); web drew `sm` and native drew `xs`.
 */
export declare const OnboardingTaskV4: React.ForwardRefExoticComponent<OnboardingTaskV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=OnboardingTaskV4.d.ts.map