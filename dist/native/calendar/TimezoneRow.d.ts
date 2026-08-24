import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface TimezoneRowProps {
    /** IANA timezone id, e.g. `America/New_York`. */
    timezone: string;
    /** Optional human label; falls back to the id with underscores replaced. */
    label?: string;
    /** Optional current-offset / abbreviation caption, e.g. `GMT-4 · EDT`. */
    offsetLabel?: string;
    /** Leading row title (default "Time zone"). */
    title?: string;
    /**
     * `row` (default) is a tappable settings row that defers to a host picker;
     * `inline` is a static, non-interactive display line.
     */
    variant?: 'row' | 'inline';
    /** Fires when the row is tapped (row variant). */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A timezone display/select row for an event form. `row` renders a tappable
 * settings line (globe icon, title, current zone, chevron) that hands off to a
 * host-owned picker; `inline` is a static caption. No date math is done here —
 * offset text is passed in. Token colors only.
 */
export declare function TimezoneRow({ timezone, label, offsetLabel, title, variant, onPress, style, }: TimezoneRowProps): React.ReactElement;
//# sourceMappingURL=TimezoneRow.d.ts.map