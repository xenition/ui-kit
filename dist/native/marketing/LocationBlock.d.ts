import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface LocationHour {
    /** Day or range label (e.g. "Mon–Fri"). */
    label: string;
    /** Opening hours (e.g. "9:00–17:00" or "Closed"). */
    value: string;
}
export interface LocationBlockProps {
    /** Business or venue name. */
    name?: string;
    /** Street address. */
    address: string;
    /** Opening-hours rows. */
    hours?: LocationHour[];
    /** Phone number (display only on native). */
    phone?: string;
    /** Email (display only on native). */
    email?: string;
    /**
     * Static map image URL. The web embeds an interactive map `<iframe>`; native
     * shows this static image if provided, otherwise a token-styled placeholder.
     */
    mapImageUri?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Contact/location section — the native mirror of the web `LocationBlock`:
 * name, address, opening-hours rows, and contact lines above a map. The web
 * two-column desktop grid is **stacked vertically** on native (phones are
 * narrow). The web embeds an interactive map `<iframe>`; native has no
 * interactive map, so it renders a **static `mapImageUri` image** or a
 * token-styled placeholder. Phone/email are shown as plain text rather than
 * `tel:`/`mailto:` links. Token-only.
 */
export declare function LocationBlock({ name, address, hours, phone, email, mapImageUri, style, }: LocationBlockProps): React.ReactElement;
//# sourceMappingURL=LocationBlock.d.ts.map