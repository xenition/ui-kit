import * as React from 'react';
import type { DocumentRowProps } from './DocumentRow';
/** Same public contract as {@link DocumentRow} — a drop-in alternate design. */
export type DocumentRowV2Props = DocumentRowProps;
/**
 * DocumentRow, redesigned (v2): an **elevated document card**. A kind glyph tile
 * leads the title and a status pill; version·size·modified·author sit as meta, with
 * a download affordance. Distinct from v1's flat row. Same props, token-only.
 */
export declare const DocumentRowV2: React.ForwardRefExoticComponent<DocumentRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DocumentRowV2.d.ts.map