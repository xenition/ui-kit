import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface RoomHeaderProps {
    /** The room's display name — the hero headline (e.g. "Living Room"). */
    roomName: string;
    /** Optional emoji/glyph for the room, shown as a frosted disc (e.g. "🛋️"). */
    glyph?: string;
    /** Optional current temperature, already formatted (e.g. "71°"). */
    temperature?: string;
    /** Optional current humidity, already formatted (e.g. "44%"). */
    humidity?: string;
    /** Optional count of devices currently on in the room. */
    devicesOn?: number;
    /** Optional total device count in the room (paired with `devicesOn`). */
    deviceCount?: number;
    /** When set, the all-off control shows; fires when the user turns everything off. */
    onAllOff?: () => void;
    /** When set, the all-on control shows; fires when the user turns everything on. */
    onAllOn?: () => void;
    /**
     * Optional lights state, driving which combined control is emphasised:
     * `true` → offer "All off", `false` → offer "All on". When omitted, both
     * provided controls render.
     */
    lightsOn?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * RoomHeader — a room **hero** for the smart-home module. A brand-gradient
 * ground carries an optional frosted glyph disc, a big near-white room name,
 * climate + devices-on frosted tiles, and an all-off / all-on control. When
 * `lightsOn` is set it picks the more useful single control (on → "All off",
 * off → "All on"); otherwise both provided controls render. Every color derives
 * from the compiled brand ramp via `ambient*` + `GradientSurface` — the light
 * ramp steps act as near-white "ink" on the saturated ground — token-only, no
 * literals, light + dark. Presentational: shaped data + callbacks, nothing
 * fetches.
 */
export declare function RoomHeader({ roomName, glyph, temperature, humidity, devicesOn, deviceCount, onAllOff, onAllOn, lightsOn, style, }: RoomHeaderProps): React.ReactElement;
//# sourceMappingURL=RoomHeader.d.ts.map