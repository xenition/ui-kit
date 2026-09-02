import * as React from 'react';
import type { EvidenceRowProps } from './EvidenceRow';
/** Drop-in for {@link EvidenceRowProps} — same props, the V4 "chambers" design. */
export type EvidenceRowV4Props = EvidenceRowProps;
/**
 * EvidenceRow — **V4** "chambers" design (native twin of the web V4). An elevated
 * rounded row with a soft shadow, the kind glyph in a soft-primary well, an
 * exhibit eyebrow over the description, a chain-of-custody meta line, an optional
 * "Chain verified" marker (glyph + word, not bare color), and a labelled glyph +
 * word admissibility pill (never color alone). `compact` truncates and hides the
 * meta line. Tappable when `onPress` is set. Reuses the base `variant`
 * (`default` / `compact`). Token-only colors via `useXenitionTheme()`.
 */
export declare function EvidenceRowV4({ exhibit, title, kind, status, source, date, custodyVerified, variant, onPress, testID, style, }: EvidenceRowV4Props): React.ReactElement;
//# sourceMappingURL=EvidenceRowV4.d.ts.map