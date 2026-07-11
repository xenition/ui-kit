import * as React from 'react';
export interface LocationHour {
    /** Day or range label (e.g. "Mon–Fri"). */
    label: string;
    /** Opening hours (e.g. "9:00–17:00" or "Closed"). */
    value: string;
}
export interface LocationBlockProps extends React.HTMLAttributes<HTMLElement> {
    /** Business or venue name. */
    name?: string;
    /** Street address, rendered in an `<address>`. */
    address: string;
    /** Opening-hours rows. */
    hours?: LocationHour[];
    /** Phone number; rendered as a `tel:` link. */
    phone?: string;
    /** Email; rendered as a `mailto:` link. */
    email?: string;
    /** Embed URL for a map `<iframe>`. */
    mapSrc?: string;
    /** External directions link (used by the placeholder and the map caption). */
    directionsUrl?: string;
}
/** Contact/location section — address, hours, and links beside an embedded map. */
export declare const LocationBlock: React.ForwardRefExoticComponent<LocationBlockProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=LocationBlock.d.ts.map