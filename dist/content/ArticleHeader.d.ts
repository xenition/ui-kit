import * as React from 'react';
import type { ContentAuthor } from './types';
export type ArticleHeaderVariant = 'standard' | 'hero';
export interface ArticleHeaderProps extends React.HTMLAttributes<HTMLElement> {
    /** Headline. */
    title: string;
    /** Optional dek / standfirst under the title. */
    deck?: string;
    /** Section / category label (rendered as a `CategoryChip`). */
    category?: string;
    /** Cover / hero image URL. */
    coverImageUrl?: string;
    /** Credited author (rendered as an `AuthorByline`). */
    author?: ContentAuthor;
    /** Human-readable publish date. */
    date?: string;
    /** Human-readable read length. */
    readingTime?: string;
    /**
     * - `standard` — cover image above stacked title/byline (default).
     * - `hero`     — larger display title, category eyebrow on top.
     */
    variant?: ArticleHeaderVariant;
    /** Show a placeholder skeleton instead of content. */
    loading?: boolean;
}
/**
 * The masthead of an article page — category eyebrow, headline, dek, cover
 * image, and author byline. Web (React DOM) mirror of the native `ArticleHeader`.
 * Composes `CategoryChip` + `AuthorByline` and reads every color from `--xen-*`
 * token classes. Two variants (`standard` / `hero`) and a `loading` skeleton.
 */
export declare const ArticleHeader: React.ForwardRefExoticComponent<ArticleHeaderProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=ArticleHeader.d.ts.map