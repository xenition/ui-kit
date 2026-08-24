import * as React from 'react';
/** Availability of a piece of gear. */
export type EquipmentStatus = 'available' | 'in-use' | 'maintenance' | 'unavailable';
export interface EquipmentRowProps extends React.HTMLAttributes<HTMLDivElement> {
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
}
/**
 * A gear-inventory row — an icon slot, the item name, an optional category /
 * serial meta line, and an availability `Badge`. Status is a labelled badge
 * (never color alone). Composes `Icon` and `Badge`; passing `onClick` exposes
 * the row as a keyboard-operable `button`. Token-only colors.
 */
export declare const EquipmentRow: React.ForwardRefExoticComponent<EquipmentRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EquipmentRow.d.ts.map