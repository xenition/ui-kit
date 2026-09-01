import * as React from 'react';
import type { ArticleHeaderProps } from './ArticleHeader';
export interface ArticleHeaderV4Props extends ArticleHeaderProps {
    /** Announced while the masthead is still a skeleton. Default `'Loading article'`. */
    loadingLabel?: string;
}
/**
 * **V4 article masthead** — same props as {@link ArticleHeader} plus
 * `loadingLabel`.
 *
 * ## Four changes
 *
 * 1. **The skeleton is the shape of the headline it replaces.** Both twins now
 *    derive the placeholder's height from the type scale times one shared
 *    leading ratio, instead of one twin measuring and the other guessing.
 * 2. **The loading state says what is loading**, once, politely — the base
 *    showed a silent stack of grey blocks.
 * 3. **The hero and cover placeholders take the shared media ground**, not
 *    `colors.border`, which is the hairline token.
 * 4. **The deck and the meta line take `mutedText`**, the contrast-corrected
 *    slot, rather than the `muted` fill they were set in.
 *
 * **Renders nothing without a title** (§4.5).
 */
export declare function ArticleHeaderV4({ title, deck, category, coverImageUrl, author, date, readingTime, variant, loading, loadingLabel, style, }: ArticleHeaderV4Props): React.ReactElement | null;
//# sourceMappingURL=ArticleHeaderV4.d.ts.map