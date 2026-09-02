import * as React from 'react';
import type { DocumentRowProps } from './DocumentRow';
/** Drop-in for {@link DocumentRowProps} — same props, the V4 "chambers" design. */
export type DocumentRowV4Props = DocumentRowProps;
/**
 * DocumentRow — **V4** "chambers" design (web parity of the native V4). The
 * distinguished, chambers take on a document in a matter's file: an elevated
 * rounded row with a soft shadow, the kind glyph tucked in a soft-primary well,
 * the title, a version · size · modified meta line, a labelled glyph + word
 * status pill (never color alone), and an optional trailing download `<button>`.
 * `compact` collapses the metadata line. When `onClick` is set the row is a
 * keyboard-activable `role="button"`. Reuses the base `variant`
 * (`default` / `compact`). All colors from `--xen-*` token classes (no literals).
 */
export declare const DocumentRowV4: React.ForwardRefExoticComponent<DocumentRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DocumentRowV4.d.ts.map