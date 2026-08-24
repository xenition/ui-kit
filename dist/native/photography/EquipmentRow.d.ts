import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Availability of a piece of gear. */
export type EquipmentStatus = 'available' | 'in-use' | 'maintenance' | 'unavailable';
export interface EquipmentRowProps {
    /** Gear name (e.g. "Canon R5"). */
    name: string;
    /** Category label (e.g. "Camera body", "Lens"). */
    category?: string;
    /** Leading icon glyph/emoji (e.g. "📷"). */
    glyph?: string;
    /** Availability status (default `available`). */
    status?: EquipmentStatus;
    /** Quantity / serial meta line. */
    meta?: string;
    /** Press handler for the row. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A gear-inventory row — an icon slot, the item name, an optional category /
 * serial meta line, and an availability `Badge`. Status is a labelled badge
 * (never color alone). Composes `Icon` and `Badge`; optional `onPress` exposes
 * the row as a `button`. Token-only colors.
 */
export declare function EquipmentRow({ name, category, glyph, status, meta, onPress, style, }: EquipmentRowProps): React.ReactElement;
//# sourceMappingURL=EquipmentRow.d.ts.map