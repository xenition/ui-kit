import * as React from 'react';
import type { ArticleHeaderProps } from './ArticleHeader';
export interface ArticleHeaderV4Props extends ArticleHeaderProps {
    /**
     * The busy name announced while the placeholder is up. Default
     * `'Loading article'`.
     */
    loadingLabel?: string;
}
/**
 * **V4 article header** — the web twin of the native `ArticleHeaderV4`, same
 * props as {@link ArticleHeader} plus `loadingLabel`.
 *
 * ## Four changes
 *
 * 1. **The skeleton title is the size of the title.** Web typed `44`/`36`
 *    while native derived `titleSize * 1.3`, so one variant drew two different
 *    placeholders and neither web bar matched the headline it stood in for.
 *    Both twins now derive it from the type scale.
 * 2. **The hero placeholder is the shared media ground**, not `bg-neutral-100`
 *    (a raw ramp step that ignores the seed) on web and `colors.border` (a
 *    hairline token spent as a fill) on native.
 * 3. **The deck and the meta line take `mutedText`**, the contrast-corrected
 *    ink slot, where the base inked them with the `muted` fill.
 * 4. **Loading announces itself.** The base drew five grey bars in silence;
 *    the placeholder is now a polite `status` named by `loadingLabel`.
 */
export declare const ArticleHeaderV4: React.ForwardRefExoticComponent<ArticleHeaderV4Props & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=ArticleHeaderV4.d.ts.map