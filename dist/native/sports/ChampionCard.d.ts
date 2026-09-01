import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** A single celebratory stat (e.g. `{ label: 'Points', value: '89' }`). */
export interface ChampionStat {
    /** Short caption under the value (e.g. `Points`). */
    label: string;
    /** The stat value, pre-formatted by the caller (e.g. `89`). */
    value: string;
}
/** A trophy / champion celebration hero — the peak-end moment. Presentational only. */
export interface ChampionCardProps {
    /** Celebration headline (e.g. `Champions 2024`). */
    title: string;
    /** The winning team's name (the near-white hero line under the trophy). */
    team: string;
    /** Crest/emoji glyph for the team, shown beside the name. */
    crest?: string;
    /** Competition subtitle above the title (e.g. `Premier League`). */
    subtitle?: string;
    /** One optional headline stat rendered as a frosted tile (e.g. season points). */
    stat?: ChampionStat;
    /** Fires on the share action; the CTA only renders when set. */
    onShare?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * ChampionCard — the sports module's **peak-end trophy celebration**. A two-hue
 * accent→primary "trophy glow" gradient ground (`broadcastTrophy`) with a big 🏆
 * glyph, the optional competition subtitle, the celebration `title`, and the
 * winning `team` (crest + name) all in near-white ink, plus an optional frosted
 * stat tile and a share CTA. Presentational only: shaped data plus an optional
 * `onShare`; nothing fetches. Token-only colors via `useXenitionTheme()` +
 * `broadcast*(tokens.ramps)` — no literals, dark-safe.
 */
export declare function ChampionCard({ title, team, crest, subtitle, stat, onShare, style, }: ChampionCardProps): React.ReactElement;
//# sourceMappingURL=ChampionCard.d.ts.map