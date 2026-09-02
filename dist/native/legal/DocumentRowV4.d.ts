import * as React from 'react';
import type { DocumentRowProps } from './DocumentRow';
/** Drop-in for {@link DocumentRowProps} — same props, the V4 "chambers" design. */
export type DocumentRowV4Props = DocumentRowProps;
/**
 * DocumentRow — **V4** "chambers" design (native twin of the web V4). An elevated
 * rounded row with a soft shadow, the kind glyph in a soft-primary well, the
 * title, a version · size · modified meta line, a labelled glyph + word status
 * pill (never color alone), and an optional trailing download control. `compact`
 * collapses the metadata line. Tappable when `onPress` is set. Reuses the base
 * `variant` (`default` / `compact`). Token-only colors via `useXenitionTheme()`.
 */
export declare function DocumentRowV4({ title, kind, status, modified, version, size, author, variant, onPress, onDownload, testID, style, }: DocumentRowV4Props): React.ReactElement;
//# sourceMappingURL=DocumentRowV4.d.ts.map