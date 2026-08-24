import * as React from 'react';
import { type SLAState } from './SLABadge';
export interface ResolutionTimerProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Signed seconds remaining until the SLA due time — positive = time left,
     * negative = overdue. Provide this **or** `dueAt`.
     */
    remainingSeconds?: number;
    /** SLA due instant (ISO-8601). Used with `now` when `remainingSeconds` is absent. */
    dueAt?: string;
    /** Reference "now" (ISO-8601 or ms). Defaults to `Date.now()`. Enables deterministic tests. */
    now?: string | number;
    /** Seconds-remaining threshold below which the state becomes `at-risk` (default 900 = 15m). */
    atRiskThresholdSeconds?: number;
    /** Caption above the timer (default "Time to resolution"). */
    label?: string;
    /** Force a specific SLA state instead of deriving it (rarely needed). */
    state?: SLAState;
}
/**
 * A resolution/SLA countdown. Given a signed `remainingSeconds` (or a `dueAt` +
 * `now` pair) it renders the formatted time left / overdue and derives the SLA
 * state — `breached` once time is up, `at-risk` under the configurable
 * threshold, else `on-track` — surfaced through the glyph+text `SLABadge` so the
 * state is never color-only. Pure/presentational (no internal ticking); the app
 * re-renders with a fresh value. The big time text uses `text-danger`/`text-warn`
 * token classes for breached/at-risk. Token colors only.
 */
export declare const ResolutionTimer: React.ForwardRefExoticComponent<ResolutionTimerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ResolutionTimer.d.ts.map