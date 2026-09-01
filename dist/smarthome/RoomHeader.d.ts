import * as React from 'react';
export interface RoomHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
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
}
/**
 * RoomHeader — a room **hero** for the smart-home module (web parity of the
 * native twin). A brand-gradient ground carries an optional frosted glyph disc,
 * a big near-white room name, climate + devices-on frosted tiles, and an
 * all-off / all-on control. When `lightsOn` is set it picks the more useful
 * single control (on → "All off", off → "All on"); otherwise both provided
 * controls render. Every color derives from the brand ramp — gradient
 * `from-primary-500 to-primary-700`, ink `text-primary-50/100`, frosted tiles
 * `bg-primary-50/15` + `border-primary-50/30` — token-only, no literals, light +
 * dark. Presentational: shaped data + callbacks, nothing fetches.
 */
export declare const RoomHeader: React.ForwardRefExoticComponent<RoomHeaderProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RoomHeader.d.ts.map