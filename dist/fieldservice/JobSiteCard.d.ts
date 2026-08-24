import * as React from 'react';
/** Site activity state — text + glyph + color (never color-alone). */
export type JobSiteStatus = 'active' | 'scheduled' | 'completed' | 'blocked';
export interface JobSiteCardProps {
    /** Site / customer name (e.g. "Riverside Plaza"). */
    name: string;
    /** Street address, already formatted by the caller. */
    address: string;
    /** Activity status. */
    status: JobSiteStatus;
    /** Number of crew currently assigned to the site. */
    crewCount?: number;
    /** Count of open work orders at the site. */
    openOrders?: number;
    /** Localized distance string (e.g. "3.2 mi"). */
    distance?: string;
    /** Leading glyph for the site disc (emoji or symbol). */
    glyph?: string;
    /** Fires when the navigate/directions action is pressed. */
    onNavigate?: () => void;
    /** Fires on card click; the card is only a button when supplied. */
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * A summary card for a job site. A tinted leading glyph disc, name/address
 * stack, a status pill (text + glyph + a color that traces to a semantic token
 * — never color alone), crew / open-order / distance meta, and an optional
 * "Directions" action. Becomes a `role="button"` surface (click / Enter /
 * Space) only when `onClick` is supplied; the Directions action is a real
 * `<button>` that stops propagation. Every color traces to a `--xen-*` token.
 */
export declare const JobSiteCard: React.ForwardRefExoticComponent<JobSiteCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=JobSiteCard.d.ts.map