import * as React from 'react';
import type { AuthorBylineProps } from './AuthorByline';
export interface AuthorBylineV4Props extends AuthorBylineProps {
    /** Build the credit from the author's name. Default ``(name) => `By ${name}` ``. */
    formatByline?: (name: string) => string;
}
/**
 * **V4 byline** — same props as {@link AuthorByline} plus `formatByline`.
 *
 * ## Three changes
 *
 * 1. **The byline is one stop with a real role.** The web twin hung an
 *    `aria-label` on a roleless `<div>`, where it is ignored outright, so a
 *    credit line read as three loose fragments — name, then role, then date —
 *    while this twin read it as one. Both are now a single named `text`
 *    element, so the two platforms say the same sentence.
 * 2. **`'By '` is a prop.** It was the one word in the component nobody
 *    outside English could change.
 * 3. **The role and the meta line take `mutedText`.** They were set in
 *    `muted`, a fill slot the compiler makes no contrast promise about, at the
 *    smallest step in the component.
 *
 * **Renders nothing without an author name** (§4.5).
 */
export declare function AuthorBylineV4({ author, date, readingTime, variant, formatByline, style, }: AuthorBylineV4Props): React.ReactElement | null;
//# sourceMappingURL=AuthorBylineV4.d.ts.map