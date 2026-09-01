import * as React from 'react';
import type { KBArticleRowProps } from './KBArticleRow';
/** Drop-in for {@link KBArticleRowProps} — same props, the V4 "calm console" design. */
export type KBArticleRowV4Props = KBArticleRowProps;
/**
 * KBArticleRow — **V4** "calm console" design (web parity of the native V4). A
 * knowledge-base article row as an elevated rounded card: a leading doc glyph,
 * title, a soft-tint status pill carrying glyph + label (published→success,
 * draft→warn, archived→muted — never color alone), and a category · views ·
 * helpful meta hint. Activating fires `onClick(id)` (click + keyboard); an
 * optional `onInsertLink` gets its own ≥44px button that does not bubble to the
 * row. Hover/focus paints a soft-primary tint. Same props/behavior as
 * {@link KBArticleRowProps}; all colors from `--xen-*` token classes (no literal
 * hex). Dark-mode safe.
 */
export declare const KBArticleRowV4: React.ForwardRefExoticComponent<KBArticleRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=KBArticleRowV4.d.ts.map