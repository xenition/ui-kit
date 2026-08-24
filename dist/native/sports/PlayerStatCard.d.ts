import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** A single labelled stat cell. */
export interface PlayerStat {
    /** Caption (e.g. `Goals`). */
    label: string;
    /** Value (number or preformatted string). */
    value: React.ReactNode;
    /** Optional emphasis — draws the value in the primary accent. */
    highlight?: boolean;
}
export interface PlayerStatCardProps {
    /** Player display name. */
    name: string;
    /** Squad position (e.g. `Forward`). */
    position?: string;
    /** Shirt number. */
    number?: number;
    /** Photo URL (initials fallback when absent). */
    photo?: string;
    /** Team caption under the name. */
    team?: string;
    /** Stat cells laid out in a responsive grid. */
    stats?: PlayerStat[];
    /** `full` card / `compact` header-only. Default `full`. */
    variant?: 'full' | 'compact';
    /** Availability flag — shows an "Injured/Out" chip (text + glyph). */
    status?: 'available' | 'injured' | 'suspended';
    /** Loading skeleton. */
    loading?: boolean;
    /** Fires on tap. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A player profile + stat grid — avatar (initials fallback), name/position/
 * number, and a grid of labelled stat cells. Availability is shown as a chip
 * carrying both a glyph and text so it never reads by color alone.
 * Presentational; shaped props plus optional `onPress`. Empty stats and a
 * loading skeleton are handled. Token-only colors.
 */
export declare function PlayerStatCard({ name, position, number, photo, team, stats, variant, status, loading, onPress, style, }: PlayerStatCardProps): React.ReactElement;
//# sourceMappingURL=PlayerStatCard.d.ts.map