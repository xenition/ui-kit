import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Cultivation state of a field/parcel. Drives the status chip. */
export type FieldStatus = 'planted' | 'fallow' | 'harvested' | 'preparing';
/** Visual density. */
export type FieldCardVariant = 'detailed' | 'compact';
export interface FieldCardProps {
    /** Field / parcel name (e.g. "North 40"). */
    name: string;
    /** Area magnitude (e.g. `12.5`). Rendered with `areaUnit`. */
    area?: number | string;
    /** Area unit suffix. Default `'ha'`. */
    areaUnit?: string;
    /** Crop currently on the field (e.g. "Maize"). */
    crop?: string;
    /** Soil type / classification (e.g. "Clay loam"). */
    soilType?: string;
    /** Location / GPS hint (e.g. "Sector B"). */
    location?: string;
    /** Cultivation status. Default `'planted'`. */
    status?: FieldStatus;
    /** Leading glyph/emoji. Default `'🌾'`. */
    icon?: string;
    /** Density variant. Default `'detailed'`. */
    variant?: FieldCardVariant;
    /** Fires when the card is tapped. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A field / parcel summary card — glyph, name, an area figure, and a cultivation
 * {@link Badge} whose text label (not color alone) carries the status. The
 * `detailed` variant adds crop / soil / location meta rows; `compact` keeps just
 * the header. Tappable via `onPress` (exposed as an accessible button).
 * Token-bound throughout — no literal colors.
 */
export declare function FieldCard({ name, area, areaUnit, crop, soilType, location, status, icon, variant, onPress, style, }: FieldCardProps): React.ReactElement;
//# sourceMappingURL=FieldCard.d.ts.map