import * as React from 'react';
/**
 * Drop-in props for the RichText **V4** "showcase" design. RichText is a
 * native-only base component (it has no web counterpart — the web app renders a
 * trusted CMS `bodyHtml` inline). This web V4 mirrors the native `RichTextProps`
 * contract so the two platforms are prop-compatible: a single trusted `html`
 * body string plus an optional `className`.
 */
export interface RichTextV4Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    /** Trusted CMS body HTML (e.g. a cms page's `bodyHtml`). */
    html: string;
}
/**
 * RichText — **V4** "showcase" design (web parity of the native V4). Beautiful
 * long-form typography for a trusted CMS `html` body: a strong heading hierarchy
 * (extra-bold h2/h3), a comfortable reading measure (`max-w-prose`) with generous
 * leading, and styled lists, links (`text-primary`) and blockquotes (a
 * soft-primary left rule on a faint primary wash). Contiguous list items are
 * grouped into a single `<ul>`. The native base's plain-text blocks keep their
 * inline markup here (bold/links) since the web has a DOM. Same `html` contract as
 * the native `RichText`; token-only colors, no literals. For trusted,
 * seed-authored content only (it does not sanitise).
 */
export declare const RichTextV4: React.ForwardRefExoticComponent<RichTextV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RichTextV4.d.ts.map