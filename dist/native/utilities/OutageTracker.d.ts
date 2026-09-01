import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type OutageState } from './internal/status';
export type { OutageState };
export interface OutageStep {
    label: string;
    time?: string;
    done?: boolean;
    current?: boolean;
}
export interface OutageTrackerProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * A clean-card outage progress timeline. The event state (active → danger,
 * scheduled → warn, resolved → success) is conveyed by **glyph + heading + a
 * tint that traces to a `SemanticColors` slot** — never color alone — over a
 * soft tinted header strip. A vertical timeline traces the restoration: a
 * completed step is a filled dot with a connector, the current step is ringed,
 * and pending steps are `border`-colored. The estimated restoration is shown for
 * active/scheduled events and suppressed once resolved. Token-bound throughout.
 */
export declare function OutageTracker({ state, area, eta, steps, onDetails, style, }: OutageTrackerProps): React.ReactElement;
//# sourceMappingURL=OutageTracker.d.ts.map