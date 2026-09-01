import * as React from 'react';
import { type RichTextProps } from './RichText';
/** Drop-in for {@link RichTextProps} — same props, the V4 "showcase" design. */
export type RichTextV4Props = RichTextProps;
/**
 * RichText — **V4** "showcase" design (native mirror of the web V4). Beautiful
 * long-form typography for a trusted CMS `html` body: a strong heading hierarchy
 * (extra-bold h2/h3), a comfortable reading measure with generous leading, styled
 * list items and blockquotes. Uses the shared {@link parseRichText} reader (no
 * DOM), so the `html` contract is identical to the base; blockquotes gain a
 * soft-primary left rule and muted italic ink. Same props/behavior as
 * {@link RichTextProps}; token-only colors, no literals. For trusted,
 * seed-authored content only (it does not sanitise).
 */
export declare function RichTextV4({ html, style }: RichTextV4Props): React.ReactElement;
//# sourceMappingURL=RichTextV4.d.ts.map