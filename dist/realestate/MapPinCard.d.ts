import * as React from 'react';
export interface MapPinCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Address / place name announced and shown under the pin. */
    address: string;
    /** Secondary line (neighborhood, coordinates, "0.4 mi to transit", …). */
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
}
/**
 * Web parity of the native `MapPinCard`: a location preview for a listing — a
 * STATIC, dependency-free styled placeholder, NOT a live map. It imports no map
 * library, so it renders in any environment: a token-tinted frame with faux grid
 * lines standing in for tiles and a single pin marker. Wire a real map behind
 * `onClick`. Data + callback only; all colors come from the `--xen-*` tokens —
 * no literal colors; a11y-labelled.
 */
export declare const MapPinCard: React.ForwardRefExoticComponent<MapPinCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MapPinCard.d.ts.map