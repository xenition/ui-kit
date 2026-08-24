import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { ContentAuthor } from './types';
export type ArticleHeaderVariant = 'standard' | 'hero';
export interface ArticleHeaderProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * The masthead of an article page — category eyebrow, headline, dek, cover
 * image, and author byline. Composes `CategoryChip` + `AuthorByline` and reads
 * every color from `SemanticColors`. Two variants (`standard` / `hero`) and a
 * `loading` skeleton state. No literal hex.
 */
export declare function ArticleHeader({ title, deck, category, coverImageUrl, author, date, readingTime, variant, loading, style, }: ArticleHeaderProps): React.ReactElement;
//# sourceMappingURL=ArticleHeader.d.ts.map