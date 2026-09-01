import * as React from 'react';
import type { ArticleCardProps } from './ArticleCard';
export interface ArticleCardV4Props extends ArticleCardProps {
    /**
     * The busy name announced while the placeholder is up. Default
     * `'Loading article'`.
     */
    loadingLabel?: string;
}
/**
 * **V4 article card** — the web twin of the native `ArticleCardV4`, same props
 * as {@link ArticleCard} plus `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **A loading card can no longer be clicked.** The base computed
 *    `interactive` above the loading branch and still hung `role="button"`,
 *    `aria-label` and `onClick` around the skeleton, so a user could tap a
 *    placeholder and open an article that had not arrived. The loading branch
 *    now returns first, inert, named by `loadingLabel` as a polite `status`.
 * 2. **The activation is a real `<button>`**, not a `div` carrying
 *    `role="button"`, `tabIndex` and a hand-written Enter/Space handler. It is
 *    laid over the card rather than wrapped around it, because the body holds
 *    a heading, a paragraph and a byline — block content that is invalid
 *    inside a button and that a wrapping label would swallow.
 * 3. **The image placeholder is the shared media ground.** Web painted
 *    `bg-neutral-100`, a raw ramp step that ignores the seed; native painted
 *    `colors.border`, a hairline token spent as a fill.
 * 4. **Press and hover are the M3 state layer**, not `hover:opacity-90` —
 *    dimming a card is how the kit says *disabled*.
 * 5. **Meta text takes `mutedText`**, the contrast-corrected ink, never the
 *    `muted` fill slot.
 */
export declare const ArticleCardV4: React.ForwardRefExoticComponent<ArticleCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ArticleCardV4.d.ts.map