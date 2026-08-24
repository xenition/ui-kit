import * as React from 'react';
import { type SpaceKey } from './_tokens';
export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    title?: string;
    subtitle?: string;
    /** Vertical gap between the header and the content, from the spacing scale. */
    spacing?: SpaceKey;
}
/**
 * A titled content block: an optional `title`/`subtitle` header followed by its
 * children, separated by a token-bound `spacing` gap. Rendered as a `<section>`.
 * Type sizes, colors, and spacing trace to the theme tokens; no literal colors.
 */
export declare const Section: React.ForwardRefExoticComponent<SectionProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=Section.d.ts.map