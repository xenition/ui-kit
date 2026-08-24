import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { ContentAuthor } from './types';
export type AuthorBylineVariant = 'full' | 'compact';
export interface AuthorBylineProps {
    /** The credited author. */
    author: ContentAuthor;
    /** Human-readable publish date, e.g. `'Aug 24, 2026'`. */
    date?: string;
    /** Human-readable read length, e.g. `'6 min read'`. */
    readingTime?: string;
    /**
     * Layout:
     * - `full`    — avatar + name + role, with date/time on a second line (default).
     * - `compact` — small avatar + name · date · time on one line.
     */
    variant?: AuthorBylineVariant;
    style?: StyleProp<ViewStyle>;
}
/**
 * The "by {author} · {date} · {read time}" credit line under a headline —
 * the native mirror of a web article byline. Composes the `Avatar` primitive
 * (initials fallback when there's no photo) and reads all colors from the
 * theme's `SemanticColors`. Two variants: a stacked `full` byline for article
 * headers and a single-line `compact` byline for cards. No literal hex.
 */
export declare function AuthorByline({ author, date, readingTime, variant, style, }: AuthorBylineProps): React.ReactElement;
//# sourceMappingURL=AuthorByline.d.ts.map