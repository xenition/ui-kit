import * as React from 'react';
export interface LocationHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Place name, shown bold on the brand ground. */
    location: string;
    /** Secondary line beneath the location (e.g. the date). */
    date?: string;
    /** Trailing icon button handler; omit to hide the button. */
    onMenu?: () => void;
    /** Glyph for the trailing button. Default `'☰'`. */
    menuGlyph?: string;
}
/**
 * LocationHeader — a gradient rounded header card (web parity of the native
 * `LocationHeader`). A `📍` pin + the `location` in bold `on-primary`, an
 * optional `date` beneath in the softer `primary-100`, and — when `onMenu` is
 * set — a round trailing button on a lighter ramp step. The ground is a
 * `primary` gradient; every color comes from `--xen-*` Tailwind classes, no
 * literals.
 */
export declare const LocationHeader: React.ForwardRefExoticComponent<LocationHeaderProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LocationHeader.d.ts.map