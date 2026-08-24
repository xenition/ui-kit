import * as React from 'react';
/** Kind of commentary entry — drives the leading glyph + a11y prefix. */
export type CommentaryKind = 'goal' | 'card' | 'sub' | 'chance' | 'var' | 'whistle' | 'info';
/** One commentary feed entry. */
export interface CommentaryEntry {
    /** Stable key. */
    id: string;
    /** Match clock label (e.g. `45+2'`). */
    minute?: string;
    /** Entry kind. Default `info`. */
    kind?: CommentaryKind;
    /** The commentary line. */
    text: string;
    /** Which side the event belongs to (used for subtle alignment accent). */
    side?: 'home' | 'away';
    /** Emphasise (e.g. key moment). */
    important?: boolean;
}
export interface LiveCommentaryProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Feed entries — newest first is the convention. */
    entries: CommentaryEntry[];
    /** Header title. Default `Live commentary`. */
    title?: string;
    /** Show a live indicator in the header. */
    live?: boolean;
    /** Loading skeleton row count; when set, entries are ignored. */
    loadingRows?: number;
    /** Empty-state label. */
    emptyLabel?: string;
}
/**
 * A live text commentary feed — a vertical list of timestamped entries, each
 * with a kind glyph and an accessible kind prefix so meaning survives without
 * color. Handles a `live` header marker, a loading skeleton, and an empty
 * state. Presentational: pass shaped `entries`; nothing polls. Token-only
 * colors.
 */
export declare const LiveCommentary: React.ForwardRefExoticComponent<LiveCommentaryProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LiveCommentary.d.ts.map