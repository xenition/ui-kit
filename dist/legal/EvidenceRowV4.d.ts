import * as React from 'react';
import type { EvidenceRowProps } from './EvidenceRow';
/** Drop-in for {@link EvidenceRowProps} — same props, the V4 "chambers" design. */
export type EvidenceRowV4Props = EvidenceRowProps;
/**
 * EvidenceRow — **V4** "chambers" design (web parity of the native V4). The
 * distinguished, chambers take on an evidence exhibit: an elevated rounded row
 * with a soft shadow, the kind glyph tucked in a soft-primary well, an exhibit
 * eyebrow over the description, a chain-of-custody meta line, an optional
 * "Chain verified" marker (glyph + word, not bare color), and a labelled glyph +
 * word admissibility pill (never color alone). `compact` truncates and hides the
 * meta line. When `onClick` is set the row is a keyboard-activable `role="button"`.
 * Reuses the base `variant` (`default` / `compact`). All colors from `--xen-*`
 * token classes (no literals).
 */
export declare const EvidenceRowV4: React.ForwardRefExoticComponent<EvidenceRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EvidenceRowV4.d.ts.map