import * as React from 'react';
import { type SpaceKey } from './_tokens';
export type ScrollAxis = 'vertical' | 'horizontal' | 'both';
export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Which axis scrolls. Defaults to `vertical`. */
    axis?: ScrollAxis;
    /** Inner content padding, from the spacing scale. Defaults to `lg`. */
    padding?: SpaceKey;
    /** Fill the theme surface color behind the content. */
    filled?: boolean;
}
/**
 * Themed scroll container with token-bound content padding and an optional
 * theme `surface` background — the web scroll region. Padding and color trace to
 * the theme tokens; no literal colors.
 */
export declare const ScrollArea: React.ForwardRefExoticComponent<ScrollAreaProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ScrollArea.d.ts.map