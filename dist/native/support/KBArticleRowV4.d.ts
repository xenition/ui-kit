import * as React from 'react';
import type { KBArticleRowProps } from './KBArticleRow';
/** Drop-in for {@link KBArticleRowProps} — same props, the V4 "calm console" design. */
export type KBArticleRowV4Props = KBArticleRowProps;
/**
 * KBArticleRow — **V4** "calm console" design. A knowledge-base article row as an
 * elevated rounded card: a leading doc glyph disc, title, a soft-tint status pill
 * carrying glyph + label (published→success, draft→warn, archived→muted — never
 * color alone), and a category · views · helpful meta hint. Tapping fires
 * `onPress(id)`; an optional `onInsertLink` gets its own ≥44px affordance that
 * does not bubble. Press paints a soft-primary tint. Same props/behavior as
 * {@link KBArticleRowProps}; token-only colors via `useXenitionTheme()` +
 * `withAlpha`. Dark-mode safe.
 */
export declare function KBArticleRowV4({ article, onPress, onInsertLink, loading, style, }: KBArticleRowV4Props): React.ReactElement;
//# sourceMappingURL=KBArticleRowV4.d.ts.map