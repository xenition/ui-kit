import * as React from 'react';
/** Power/reachability state of a smart-home device. */
export type DeviceState = 'on' | 'off' | 'unavailable';
export interface DeviceTileProps {
    /** Device display name (e.g. "Living Room Lamp"). */
    name: string;
    /** Leading glyph/emoji (e.g. "💡", "🔌"). */
    icon?: string;
    /** Power/reachability state. `unavailable` disables the toggle. */
    state?: DeviceState;
    /** Secondary line under the name (e.g. "72% brightness", "Offline 2m ago"). */
    subtitle?: string;
    /** Fires with the requested on/off value when the toggle is pressed. */
    onToggle?: (next: boolean) => void;
    /** Fires when the tile body (not the switch) is clicked — opens details. */
    onClick?: () => void;
    /** Show a skeleton-style placeholder instead of live content. */
    loading?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * A single controllable device tile — a tinted glyph, name + status, and an
 * on/off {@link Switch}. `state` drives the accent slot and a text status label
 * (`on`→success, `off`→muted, `unavailable`→danger) so device status is never
 * conveyed by color alone; `unavailable` disables the switch. Optional `onClick`
 * makes the body open a detail view while the switch stays independently
 * clickable (its click is stopped from bubbling). Token-bound throughout — no
 * literal colors.
 */
export declare const DeviceTile: React.ForwardRefExoticComponent<DeviceTileProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DeviceTile.d.ts.map