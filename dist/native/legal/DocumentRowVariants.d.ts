import * as React from 'react';
import type { DocumentRowProps } from './DocumentRow';
/** Alternate design — identical Props to {@link DocumentRow}, drop-in swap. */
export type DocumentRowV2Props = DocumentRowProps;
/** Alternate design — identical Props to {@link DocumentRow}, drop-in swap. */
export type DocumentRowV3Props = DocumentRowProps;
/**
 * DocumentRow, design v2 — an **elevated card** with a tinted kind-glyph tile,
 * title + metadata block, a status pill and an explicit round download button.
 * Same Props as {@link DocumentRow}; a richer, card-shaped presentation vs. the
 * flat inline original. Token-pure; status is a glyph + word, never color alone.
 */
export declare function DocumentRowV2({ title, kind, status, modified, version, size, author, variant, onPress, onDownload, testID, style, }: DocumentRowV2Props): React.ReactElement;
/**
 * DocumentRow, design v3 — a **dense single line**: a bare kind glyph, the title,
 * a trailing inline status and a compact download glyph, on a hairline divider.
 * Same Props as {@link DocumentRow}; the tightest list treatment. Token-pure;
 * status remains a glyph + word, never color alone.
 */
export declare function DocumentRowV3({ title, kind, status, modified, version, onPress, onDownload, testID, style, }: DocumentRowV3Props): React.ReactElement;
//# sourceMappingURL=DocumentRowVariants.d.ts.map