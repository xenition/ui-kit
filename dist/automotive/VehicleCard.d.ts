import * as React from 'react';
/** Presentation density for a {@link VehicleCard}. */
export type VehicleCardVariant = 'default' | 'compact';
/** Operational state of the vehicle. */
export type VehicleStatus = 'available' | 'in-use' | 'maintenance' | 'offline';
export interface VehicleSpec {
    /** Spec label, e.g. `'Seats'`. */
    label: string;
    /** Spec value, e.g. `'4'`. */
    value: string;
}
export interface VehicleCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Make + model, e.g. `'Tesla Model 3'`. */
    name: string;
    /** License plate. */
    plate?: string;
    /** Vehicle class, e.g. `'Sedan'` / `'SUV'`. */
    vehicleClass?: string;
    /** Color name, e.g. `'Midnight Blue'`. */
    color?: string;
    /** Year, e.g. `2023`. */
    year?: number;
    /** Operational status. */
    status?: VehicleStatus;
    /** Short spec chips (seats, range, etc.). */
    specs?: VehicleSpec[];
    /** Presentation variant. */
    variant?: VehicleCardVariant;
    /** Fires when the card is pressed. */
    onClick?: () => void;
    /** Placeholder skeleton while the vehicle loads. */
    loading?: boolean;
}
/**
 * A fleet vehicle summary — make/model, plate, class, color, year, an
 * operational status, and optional spec chips. The status is shown with a glyph
 * plus a spelled-out word and an a11y label, so meaning never rests on color.
 * Data + `onClick` only; nothing fetches. Colors come from `--xen-*` token
 * classes — no literal colors. When `onClick` is set the card is a
 * keyboard-operable `role="button"`. `variant="compact"` renders a denser row.
 * Spec indexing is guarded against a missing array. Web parity of the native
 * `VehicleCard`.
 */
export declare const VehicleCard: React.ForwardRefExoticComponent<VehicleCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=VehicleCard.d.ts.map