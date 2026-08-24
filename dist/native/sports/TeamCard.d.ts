import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Recent result token for the mini form strip. */
export type TeamForm = 'W' | 'D' | 'L';
export interface TeamCardProps {
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
    /** Fires on tap. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A team summary card — crest, name, league, W/D/L record, rank, and a recent
 * form strip whose results read by letter + a11y label, not color alone.
 * Presentational: shaped props plus an optional `onPress`. `tile` is a slim
 * pickable variant. Reuses `LeagueBadge` for the crest. Token-only colors.
 */
export declare function TeamCard({ name, crest, league, won, drawn, lost, rank, form, variant, selected, loading, onPress, style, }: TeamCardProps): React.ReactElement;
//# sourceMappingURL=TeamCard.d.ts.map