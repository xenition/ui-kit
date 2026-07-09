import * as React from 'react';
export type EyebrowTone = 'primary' | 'accent' | 'muted';
export interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
    /** Semantic color slot for the label (default `accent`). */
    tone?: EyebrowTone;
    /** Draw short hairline ticks flanking the label. */
    rule?: boolean;
    /** Horizontal alignment (default `start`; `center` for section openers). */
    align?: 'start' | 'center';
}
/**
 * Tracked small-caps kicker label — the tiny loud line above headings that
 * every template hand-rolled. Uses the semantic `primary`/`accent`/`muted`
 * slots (auto-contrast-checked by the theme compiler), never raw ramp steps,
 * so it stays readable in both modes. The optional flanking rules use
 * `currentColor` — no extra color rule needed.
 */
export declare const Eyebrow: React.ForwardRefExoticComponent<EyebrowProps & React.RefAttributes<HTMLParagraphElement>>;
//# sourceMappingURL=Eyebrow.d.ts.map