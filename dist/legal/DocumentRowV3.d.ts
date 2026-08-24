import * as React from 'react';
import type { DocumentRowProps } from './DocumentRow';
/** Same public contract as {@link DocumentRow} — a drop-in alternate design. */
export type DocumentRowV3Props = DocumentRowProps;
/**
 * DocumentRow, redesigned (v3): a **compact file line**. The kind glyph, the title
 * over a version·modified subtitle, an inline status word, and a small download —
 * the tightest possible file row. The opposite of v2's card. Same props,
 * token-only.
 */
export declare const DocumentRowV3: React.ForwardRefExoticComponent<DocumentRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DocumentRowV3.d.ts.map