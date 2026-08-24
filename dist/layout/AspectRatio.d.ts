import * as React from 'react';
export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Width-to-height ratio, e.g. `16 / 9` or `1`. */
    ratio: number;
    /** Clip children to the (token-bound) large corner radius. */
    rounded?: boolean;
}
/**
 * Locks its content to a fixed width-to-height `ratio` via the CSS
 * `aspect-ratio` property. When `rounded`, it clips to the theme's large corner
 * radius token; the `ratio` itself is a numeric layout literal (no literal
 * colors).
 */
export declare const AspectRatio: React.ForwardRefExoticComponent<AspectRatioProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AspectRatio.d.ts.map