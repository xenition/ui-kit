import * as React from 'react';
/** Publication state of a knowledge-base article. */
export type KBStatus = 'published' | 'draft' | 'archived';
export interface KBArticle {
    /** Stable id, returned to `onClick`. */
    id: string;
    /** Article title. */
    title: string;
    /** Optional category / section label. */
    category?: string;
    /** Optional view count. */
    views?: number;
    /** Optional helpful-vote count. */
    helpful?: number;
    /** Publication status (default treated as `published`). */
    status?: KBStatus;
    /** Optional updated hint (e.g. `"Updated 3d ago"`). */
    updatedLabel?: string;
}
export interface KBArticleRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** The article to render. */
    article: KBArticle;
    /** Fires with the article id when the row is activated (click / Enter / Space). */
    onClick?: (id: string) => void;
    /** Fires when the "Insert link" affordance is pressed (agent linking a KB doc). */
    onInsertLink?: (article: KBArticle) => void;
    /** Loading placeholder row. */
    loading?: boolean;
}
/**
 * A knowledge-base article row for search results / suggested-answers panels —
 * a leading doc glyph, title, category + status, and view/helpful counts.
 * Activating fires `onClick(id)` (click + keyboard); an optional `onInsertLink`
 * lets an agent drop the article link into a reply (its own button, click does
 * not bubble to the row). Non-published articles carry a text status badge (never
 * color-only). Handles a `loading` placeholder. Token colors only.
 */
export declare const KBArticleRow: React.ForwardRefExoticComponent<KBArticleRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=KBArticleRow.d.ts.map