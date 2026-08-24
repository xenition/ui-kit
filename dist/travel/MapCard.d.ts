import * as React from 'react';
export interface MapCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Place name announced and shown under the pin. */
    label: string;
    /** Secondary address/coordinate line. */
    caption?: string;
    /**
     * Pin position as fractions of the frame, `0`–`1` (default centered). Clamped
     * so the marker never leaves the card.
     */
    pin?: {
        x: number;
        y: number;
    };
    /** Frame height in px (default 160). */
    height?: number;
    /** Fires when the card is activated (e.g. to open the real map elsewhere). */
    onClick?: () => void;
}
/**
 * Web parity of the native `MapCard`: a location preview — a STATIC,
 * dependency-free styled `div` placeholder, NOT a live map. It draws a
 * token-tinted frame with faux grid lines and a single pin marker; there is
 * intentionally no map library import, so it renders in any environment. Wire a
 * real map behind `onClick` when needed. Token-only colors.
 */
export declare const MapCard: React.ForwardRefExoticComponent<MapCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MapCard.d.ts.map