import * as React from 'react';
import { type OutageState } from './internal/status';
export type { OutageState };
export interface OutageStep {
    label: string;
    time?: string;
    done?: boolean;
    current?: boolean;
}
export interface OutageTrackerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Outage lifecycle — drives heading, glyph, and tint (default `active`). */
    state?: OutageState;
    /** Affected area / description (e.g. "Downtown · ~1,200 customers"). */
    area?: string;
    /** Localized estimated-restoration string (hidden when resolved). */
    eta?: string;
    /** Timeline steps (default: Reported → Crew dispatched → Power restored). */
    steps?: OutageStep[];
    /** Fires when the details action is pressed; the button renders only then. */
    onDetails?: () => void;
}
/**
 * A clean-card outage progress timeline (web parity). The event state (active →
 * danger, scheduled → warn, resolved → success) is conveyed by **glyph + heading
 * + a tint that traces to a semantic token** — never color alone — over a soft
 * tinted header strip. A vertical timeline traces the restoration: a completed
 * step is a filled dot with a connector, the current step is ringed, and pending
 * steps are `border`-colored. The estimated restoration is shown for
 * active/scheduled events and suppressed once resolved. Token-bound throughout.
 */
export declare const OutageTracker: React.ForwardRefExoticComponent<OutageTrackerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=OutageTracker.d.ts.map