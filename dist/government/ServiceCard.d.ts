import * as React from 'react';
/** Category of a public / civic service — drives the leading glyph + label. */
export type ServiceCategory = 'license' | 'permit' | 'tax' | 'records' | 'benefit' | 'health' | 'utility' | 'other';
/** How the service is delivered — a non-color-alone availability hint. */
export type ServiceChannel = 'online' | 'in-person' | 'phone' | 'unavailable';
export interface ServiceCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
    /** Service category — picks the tinted leading glyph + category label. */
    category: ServiceCategory;
    /** Service title (e.g. "Renew driver license"). */
    title: string;
    /** Optional one-line description of what the service does. */
    description?: string;
    /** Delivery channel — rendered as a text+glyph availability badge. */
    channel?: ServiceChannel;
    /** Typical processing / turnaround time (already localized). */
    estimatedTime?: string;
    /** Label for the primary action button (only shown with `onStart`). */
    actionLabel?: string;
    /** Fires when the action button is pressed (e.g. begin the service). */
    onStart?: () => void;
    /** Fires when the whole card is clicked; card is a button only when set. */
    onClick?: () => void;
}
/**
 * A single public-service tile for a civic app home / directory. The `category`
 * selects a tinted leading glyph disc; a `channel` badge conveys availability by
 * **text + glyph + color** (never color alone). An optional primary `Button`
 * fires `onStart` (a real `<button>` that stops propagation so it never triggers
 * the card), and the whole card becomes a keyboard-operable button only when
 * `onClick` is supplied. Token-bound throughout — no literal colors. Web parity
 * of the native `ServiceCard`.
 */
export declare const ServiceCard: React.ForwardRefExoticComponent<ServiceCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ServiceCard.d.ts.map