import * as React from 'react';
/** Operational state of a machine. Colors the status label + chip. */
export type EquipmentState = 'operational' | 'idle' | 'maintenance' | 'offline';
export interface EquipmentStatusProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Machine name (e.g. "Tractor 04"). */
    name: string;
    /** Equipment type / model line (e.g. "John Deere 6M"). */
    type?: string;
    /** Leading glyph/emoji. Default `'🚜'`. */
    icon?: string;
    /** Operational state. Default `'operational'`. */
    state?: EquipmentState;
    /** Fuel or battery level 0–100 (rendered as a bar). Clamped/guarded. */
    fuelPct?: number;
    /** Label for the level bar (e.g. "Fuel", "Battery"). Default "Fuel". */
    fuelLabel?: string;
    /** Hours / usage hint (e.g. "1,204 hrs"). */
    hours?: string;
    /** Fires when the card is activated. */
    onClick?: () => void;
}
/**
 * An equipment status card — machine glyph, name + type, and an operational
 * {@link Badge} whose text label (not color alone) carries the state. An
 * optional fuel/battery {@link Progress} bar and usage-hours line sit below.
 * The level is clamped to [0,100]; a low reading is stated as "· Low" text, not
 * color alone. When `onClick` is set the card is an accessible `role="button"`
 * with keyboard activation. Token-bound throughout — no literal colors.
 */
export declare const EquipmentStatus: React.ForwardRefExoticComponent<EquipmentStatusProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EquipmentStatus.d.ts.map