import * as React from 'react';
/**
 * Props for {@link AlbumHeader} — the gradient album / playlist hero (web).
 * Presentational shell only: shaped display data + CTA callbacks; nothing
 * fetches a catalog or a playback engine.
 */
export interface AlbumHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
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
}
/**
 * AlbumHeader — the **V4 "spotlight"** gradient hero for an album / playlist
 * (web). The cover sits on a two-hue brand glow (`from-accent-400 to-primary-600`)
 * beside a big near-white title, an optional subtitle, `meta` facts as frosted
 * chips, and Play (a near-white pill) + Shuffle (a ghost button) CTAs. All colors
 * derive from the brand ramp via `--xen-*` classes + gradient utilities — no
 * literal hex; dark-mode safe.
 */
export declare const AlbumHeader: React.ForwardRefExoticComponent<AlbumHeaderProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AlbumHeader.d.ts.map