import * as React from 'react';
import type { OnboardingTaskProps } from './OnboardingTask';
export interface OnboardingTaskV4Props extends OnboardingTaskProps {
    /** What the task is waiting on. Shown when the status is `blocked`. */
    blockedReason?: string;
    /** The past-due flag's word. Default `'⚠ Overdue'`. */
    overdueLabel?: string;
}
/**
 * **V4 onboarding task** — same props as {@link OnboardingTask} plus
 * `blockedReason` and `overdueLabel`.
 *
 * ## Five changes
 *
 * 1. **The checkbox is reachable.** It sat inside the row's own `Pressable`,
 *    which is `accessible` by default and flattens its whole subtree into one
 *    leaf named "Onboarding task Sign employment contract" — so the tick, the
 *    only control on the row, was not a focus stop and a VoiceOver user could
 *    open the task and never complete it. The row is a plain `View` now and the
 *    checkbox is a sibling, which is also how the **web twin already had it**:
 *    there, the activation wraps only the title, and this brings the native
 *    twin to the same shape rather than to a third one.
 * 2. **The checkbox is a target.** A 20pt box with no wrapper is under half the
 *    44pt floor. `CheckboxV4` opens its own touch area, and the slot it sits in
 *    is `minTap` square, so the two agree.
 * 3. **A blocked task says what it is waiting on.** `blocked` was one of six
 *    adverse statuses in the module with nowhere to record a reason, and it is
 *    the one whose entire meaning is "somebody else has to do something first".
 * 4. **Overdue is inked with ink, and its word is a prop.**
 *    `toneColor(colors, 'danger')` returns the `danger` **fill** slot and the
 *    base assigned it straight to `color:`.
 * 5. **The row announces its whole state** — title, category, due date, status,
 *    overdue, the blocking reason and the assignee — instead of the title
 *    alone, with the completion state left to a checkbox nobody could reach.
 *
 * The assignee's avatar is `xs` on both twins; the web base used `sm`.
 *
 * **Renders nothing without a `title`.**
 */
export declare function OnboardingTaskV4({ title, category, status, dueDate, overdue, assignee, assigneeAvatarUrl, variant, blockedReason, overdueLabel, onToggle, onPress, testID, style, }: OnboardingTaskV4Props): React.ReactElement | null;
//# sourceMappingURL=OnboardingTaskV4.d.ts.map