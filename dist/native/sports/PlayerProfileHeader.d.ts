import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** One `{ label, value }` stat rendered as a frosted tile on the gradient. */
export interface PlayerStat {
    /** Short caption under the value (e.g. `Goals`). */
    label: string;
    /** The stat value, pre-formatted by the caller (e.g. `24`, `1.4k`). */
    value: string;
}
/** A gradient player hero: crest/photo, jersey number, name, and frosted stat tiles. */
export interface PlayerProfileHeaderProps {
    /** Player display name (the near-white headline). */
    name: string;
    /** Playing position (e.g. `Forward`). */
    position?: string;
    /** Club / national side the player belongs to. */
    team?: string;
    /** Jersey number, rendered large in near-white ink. */
    number?: number;
    /** Photo/avatar URL. When present it fills the avatar; otherwise `crest` is shown. */
    photoUrl?: string;
    /** Crest/emoji glyph shown in the avatar when no `photoUrl` is given. */
    crest?: string;
    /** Career/season stats, rendered as frosted tiles (`broadcastTile`). */
    stats: readonly PlayerStat[];
    /** Fires on the follow toggle; the CTA only renders when set. */
    onFollow?: () => void;
    /** Whether the viewer already follows this player (drives the CTA label/state). */
    following?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * PlayerProfileHeader — a **gradient player hero**. A brand-gradient ground with
 * the player's crest/photo avatar and big jersey number up top, the near-white
 * name + position · team beneath, an optional follow CTA, and a row of frosted
 * stat tiles (`broadcastTile` + `broadcastBorder`) along the bottom.
 * Presentational only: shaped `stats` plus an optional `onFollow`; nothing
 * fetches. Token-only colors via `useXenitionTheme()` + `broadcast*(tokens.ramps)`
 * — no literals, dark-safe.
 */
export declare function PlayerProfileHeader({ name, position, team, number, photoUrl, crest, stats, onFollow, following, style, }: PlayerProfileHeaderProps): React.ReactElement;
//# sourceMappingURL=PlayerProfileHeader.d.ts.map