import * as React from 'react';
/** Recent result token for the mini form strip. */
export type TeamForm = 'W' | 'D' | 'L';
export interface TeamCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Team display name. */
    name: string;
    /** Crest glyph or emoji. */
    crest?: string;
    /** Competition / division caption. */
    league?: string;
    /** Wins. */
    won?: number;
    /** Draws. */
    drawn?: number;
    /** Losses. */
    lost?: number;
    /** Current table position (1-based). */
    rank?: number;
    /** Recent form oldest→newest (max 5 shown). */
    form?: TeamForm[];
    /** Layout: `full` card, or a slim `tile`. Default `full`. */
    variant?: 'full' | 'tile';
    /** Marks the card as selected (accent border). */
    selected?: boolean;
    /** Loading skeleton. */
    loading?: boolean;
    /** Fires on activation (web parity of native `onPress`). */
    onClick?: () => void;
}
/**
 * A team summary card — crest, name, league, W/D/L record, rank, and a recent
 * form strip whose results read by letter + a11y label, not color alone.
 * Presentational: shaped props plus an optional `onClick`. `tile` is a slim
 * pickable variant. Reuses `LeagueBadge` for the crest. Token-only colors.
 */
export declare const TeamCard: React.ForwardRefExoticComponent<TeamCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TeamCard.d.ts.map