import * as React from 'react';
import { type OutageState, type UtilityKind } from './internal/status';
export type { OutageState };
export interface OutageAlertProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Outage lifecycle — drives glyph + heading + tint (default `active`). */
    state?: OutageState;
    /** Optional affected utility line (adds its glyph/label to the heading). */
    kind?: UtilityKind;
    /** Affected area / description (e.g. "Downtown · ~1,200 customers"). */
    area?: string;
    /** Localized estimated-restoration string (shown for active/scheduled). */
    eta?: string;
    /** Longer message body. */
    message?: string;
    /** Details button label (default "View details"). Hidden when no `onDetails`. */
    detailsLabel?: string;
    /** Fires when the details action is pressed. */
    onDetails?: () => void;
}
/**
 * A prominent banner for a service outage / planned-maintenance event. Severity
 * is conveyed by **glyph + heading + a tint that traces to a semantic token**
 * (active → danger, scheduled → warn, resolved → success) — never color alone.
 * The estimated restoration is surfaced for active/scheduled events and
 * suppressed once resolved. An optional details `Button` renders only when
 * `onDetails` is supplied. Token-bound throughout. Web parity of the native
 * `OutageAlert`.
 */
export declare const OutageAlert: React.ForwardRefExoticComponent<OutageAlertProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=OutageAlert.d.ts.map