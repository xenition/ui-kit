import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
export interface VehicleCardProps {
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
    onPress?: () => void;
    /** Placeholder skeleton while the vehicle loads. */
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A fleet vehicle summary — make/model, plate, class, color, year, an
 * operational status, and optional spec chips. The status is shown with a glyph
 * plus a spelled-out word and an a11y label, so meaning never rests on color.
 * Data + `onPress` only; nothing fetches. Colors come from semantic tokens and
 * `withAlpha` tints — no literal colors. `variant="compact"` renders a denser
 * list row. Spec indexing is guarded against a missing array.
 */
export declare function VehicleCard({ name, plate, vehicleClass, color, year, status, specs, variant, onPress, loading, style, }: VehicleCardProps): React.ReactElement;
//# sourceMappingURL=VehicleCard.d.ts.map