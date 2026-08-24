import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Publication state of a knowledge-base article. */
export type KBStatus = 'published' | 'draft' | 'archived';
export interface KBArticle {
    /** Stable id, returned to `onPress`. */
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
export interface KBArticleRowProps {
    /** The article to render. */
    article: KBArticle;
    /** Fires with the article id when tapped. */
    onPress?: (id: string) => void;
    /** Fires when the "Insert link" affordance is tapped (agent linking a KB doc). */
    onInsertLink?: (article: KBArticle) => void;
    /** Loading placeholder row. */
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A knowledge-base article row for search results / suggested-answers panels —
 * a leading doc glyph, title, category + status, and view/helpful counts.
 * Tapping fires `onPress(id)`; an optional `onInsertLink` lets an agent drop the
 * article link into a reply. Non-published articles carry a text status chip
 * (never color-only). Handles a `loading` placeholder. Token colors only.
 */
export declare function KBArticleRow({ article, onPress, onInsertLink, loading, style, }: KBArticleRowProps): React.ReactElement;
//# sourceMappingURL=KBArticleRow.d.ts.map