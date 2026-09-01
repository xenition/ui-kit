import * as React from 'react';
/** Flight lifecycle state — drives the banner tint, glyph and pill tone. */
export type FlightStatus = 'on-time' | 'boarding' | 'delayed' | 'cancelled' | 'landed';
export interface FlightStatusBannerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Flight lifecycle state — colors the banner via semantic tokens (never color alone). */
    status: FlightStatus;
    /** Flight number / identifier (e.g. "XN 482"). */
    flightNumber: string;
    /** Departure gate (shown as a small field when set). */
    gate?: string;
    /** Assigned seat (shown as a small field when set). */
    seat?: string;
    /** Localized boarding time string (shown as a small field when set). */
    boardingTime?: string;
    /** Longer status remark (e.g. "New departure 4:15 PM"). */
    remark?: string;
}
/**
 * FlightStatusBanner — a **V4** "journey" status strip (web parity of the native
 * twin). Announces where a flight is in its lifecycle: on-time / landed read as a
 * success tint, delayed as warn, cancelled as danger, and boarding rides the
 * brand gradient (the boarding "peak" moment) in near-white ink. Severity is
 * always carried by **glyph + label + a tint that traces to a semantic token
 * slot**, never color alone; the state is pilled with a `Badge`. Gate / seat /
 * boarding surface as small fields. All colors from `--xen-*` token classes and
 * gradient utilities — no literals; dark-mode safe.
 */
export declare const FlightStatusBanner: React.ForwardRefExoticComponent<FlightStatusBannerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FlightStatusBanner.d.ts.map