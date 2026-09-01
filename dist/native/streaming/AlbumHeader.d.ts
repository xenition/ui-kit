import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/**
 * Props for {@link AlbumHeader} — the gradient album / playlist hero (native).
 * Presentational shell only: shaped display data + CTA callbacks; nothing
 * fetches a catalog or a playback engine.
 */
export interface AlbumHeaderProps {
    /** Album / playlist title, set large in near-white ink over the gradient. */
    title: string;
    /** Secondary line — artist, curator, or owner. */
    subtitle?: string;
    /** Cover artwork URL; falls back to a glyph placeholder when absent. */
    artworkUrl?: string;
    /** Metadata facts (e.g. `["2024", "12 songs", "48 min"]`) rendered as frosted chips. */
    meta?: readonly string[];
    /** Fires when the primary Play CTA is pressed; the pill is hidden when unset. */
    onPlay?: () => void;
    /** Fires when the Shuffle CTA is pressed; the ghost button is hidden when unset. */
    onShuffle?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * AlbumHeader — the **V4 "spotlight"** gradient hero for an album / playlist
 * (native). The cover sits on a two-hue brand glow (accent → primary) beside a
 * big near-white title, an optional subtitle, `meta` facts as frosted chips, and
 * Play (a near-white pill) + Shuffle (a ghost button) CTAs. Token-only colors via
 * `useXenitionTheme()` + `spotlight*(tokens.ramps)` on `GradientSurface` — no
 * literals; dark-mode safe.
 */
export declare function AlbumHeader({ title, subtitle, artworkUrl, meta, onPlay, onShuffle, style, }: AlbumHeaderProps): React.ReactElement;
//# sourceMappingURL=AlbumHeader.d.ts.map