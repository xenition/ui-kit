/**
 * Shared data shapes for the `@xenition/ui/native/content` module — the
 * blog / news / media-reader building blocks. These are plain data records
 * (no colors, no styling) that the content components accept as props. Keeping
 * them in one place lets an app model an article feed once and hand the same
 * objects to `ArticleCard`, `ArticleHeader`, `RelatedArticles`, etc.
 */
/** A byline author — the person (or brand) credited for a piece. */
export interface ContentAuthor {
    /** Display name, e.g. `'Ada Lovelace'`. */
    name: string;
    /** Optional avatar image URL; components fall back to initials when absent. */
    avatarUrl?: string;
    /** Optional role/title, e.g. `'Senior Editor'`. */
    role?: string;
}
/**
 * A summary of an article — enough to render a card, list row, or related-item
 * without loading the full body. `id` must be stable (used as a list key).
 */
export interface ArticleSummary {
    /** Stable unique id (used as the React list key). */
    id: string;
    /** Headline. */
    title: string;
    /** Short dek / standfirst shown under the title. */
    excerpt?: string;
    /** Hero/thumbnail image URL. */
    imageUrl?: string;
    /** Section / category label, e.g. `'Technology'`. */
    category?: string;
    /** Credited author. */
    author?: ContentAuthor;
    /** Human-readable publish date, e.g. `'Aug 24'` — components render as given. */
    date?: string;
    /** Human-readable read length, e.g. `'6 min read'`. */
    readingTime?: string;
}
/** One entry in a {@link TableOfContents} — a document heading. */
export interface TocItem {
    /** Anchor id (passed back to `onSelect`). */
    id: string;
    /** Heading text. */
    label: string;
    /** Nesting depth (1 = top level). Deeper levels are indented. Default 1. */
    level?: number;
}
/** One share destination for a {@link ShareRow}. */
export interface ShareTarget {
    /** Stable id passed back to `onShare`, e.g. `'twitter'`. */
    id: string;
    /** Accessible label, e.g. `'Share on X'`. */
    label: string;
    /** Glyph/emoji rendered in the button (the kit ships no icon font). */
    glyph: string;
}
/** One podcast episode for a {@link PodcastRow}. */
export interface PodcastEpisode {
    /** Stable unique id. */
    id: string;
    /** Episode title. */
    title: string;
    /** Show / series name. */
    show?: string;
    /** Cover artwork URL. */
    artworkUrl?: string;
    /** Human-readable duration, e.g. `'42 min'`. */
    duration?: string;
}
//# sourceMappingURL=types.d.ts.map