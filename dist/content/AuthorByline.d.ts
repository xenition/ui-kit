import * as React from 'react';
import type { ContentAuthor } from './types';
export type AuthorBylineVariant = 'full' | 'compact';
export interface AuthorBylineProps extends React.HTMLAttributes<HTMLDivElement> {
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
}
/**
 * The "by {author} · {date} · {read time}" credit line under a headline — the
 * web (React DOM) mirror of the native `AuthorByline`. Composes the `Avatar`
 * primitive (initials fallback when there's no photo) and styles exclusively via
 * `--xen-*` token classes. Two variants: a stacked `full` byline for article
 * headers and a single-line `compact` byline for cards.
 */
export declare const AuthorByline: React.ForwardRefExoticComponent<AuthorBylineProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AuthorByline.d.ts.map