import * as React from 'react';
/** A single labelled stat cell. */
export interface PlayerStat {
    /** Caption (e.g. `Goals`). */
    label: string;
    /** Value (number or preformatted string). */
    value: React.ReactNode;
    /** Optional emphasis — draws the value in the primary accent. */
    highlight?: boolean;
}
export interface PlayerStatCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
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
    /** Fires on activation (web parity of native `onPress`). */
    onClick?: () => void;
}
/**
 * A player profile + stat grid — avatar (initials fallback via the shared
 * `Avatar`), name/position/number, and a grid of labelled stat cells.
 * Availability is a `Badge` carrying both a glyph and text so it never reads by
 * color alone. Presentational; shaped props plus optional `onClick`. Empty
 * stats and a loading skeleton are handled. Token-only colors.
 */
export declare const PlayerStatCard: React.ForwardRefExoticComponent<PlayerStatCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PlayerStatCard.d.ts.map