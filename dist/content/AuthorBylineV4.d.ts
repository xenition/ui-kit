import * as React from 'react';
import type { AuthorBylineProps } from './AuthorByline';
export interface AuthorBylineV4Props extends AuthorBylineProps {
    /**
     * Build the credit from the author's name. Default ``(name) => `By ${name}` ``.
     *
     * `'By '` was English welded into the component, on a kit that ships an
     * `i18n` module.
     */
    formatByline?: (name: string) => string;
}
/**
 * **V4 author byline** — the web twin of the native `AuthorBylineV4`, same
 * props as {@link AuthorByline} plus `formatByline`.
 *
 * ## Three changes
 *
 * 1. **The byline's name finally lands.** The base hung `aria-label` on a
 *    roleless `<div>`, where ARIA says it is ignored — so where native read one
 *    labelled stop, web read the avatar, the name, the role and the meta line
 *    as separate fragments and left the reader to reassemble the credit. The
 *    container is now a `group`, a role that takes a name, and the name is one
 *    comma-joined line built with `spokenLine`.
 * 2. **The avatar is decorative and says so.** It repeats the name it sits
 *    beside; `aria-hidden` keeps it out of the reading order.
 * 3. **`'By '` is a prop**, and the role and meta lines take `mutedText` — the
 *    contrast-corrected ink — rather than the `muted` fill slot.
 */
export declare const AuthorBylineV4: React.ForwardRefExoticComponent<AuthorBylineV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AuthorBylineV4.d.ts.map