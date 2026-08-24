import * as React from 'react';
/** A device summarized inside a room. */
export interface RoomDevice {
    /** Stable identity. */
    id: string;
    /** Row label. */
    label: string;
    /** Row glyph/emoji. */
    icon?: string;
    /** Secondary line. */
    subtitle?: string;
    /** Whether the device is on. */
    on?: boolean;
    /** Whether the device is unreachable. */
    offline?: boolean;
}
export interface RoomGroupProps {
    /** Room name (e.g. "Living Room"). */
    name: string;
    /** Leading glyph/emoji. Default "🛋️". */
    icon?: string;
    /** Devices in the room. Empty → an inline empty state. */
    devices?: RoomDevice[];
    /** Fires with `(id, next)` when a device row is toggled. */
    onDeviceToggle?: (id: string, next: boolean) => void;
    /** Fires with `next` when the header "all" switch is toggled. */
    onToggleAll?: (next: boolean) => void;
    /** Copy for the empty state title. */
    emptyTitle?: string;
    /** Optional extra content rendered under the device list. */
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * A room grouping card — a header (glyph, name, "N on" summary + an all-devices
 * {@link Switch}) over a list of {@link DeviceToggleRow}s. The header switch is
 * on when **every** reachable device is on and fires `onToggleAll`; the summary
 * count is derived defensively from the `devices` array. When there are no
 * devices it renders the shared {@link EmptyState} instead of an empty list.
 * Token-bound throughout — no literal colors.
 */
export declare const RoomGroup: React.ForwardRefExoticComponent<RoomGroupProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RoomGroup.d.ts.map