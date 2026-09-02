import * as React from 'react';
import type { CaseCardProps } from './CaseCard';
/** Drop-in for {@link CaseCardProps} — same props, the V4 "chambers" design. */
export type CaseCardV4Props = CaseCardProps;
/**
 * CaseCard — **V4** "chambers" design (native twin of the web V4). The
 * distinguished, chambers take on a matter file: an elevated rounded card with a
 * soft shadow, a docket-number eyebrow over a strong caption, the client, a
 * labelled glyph + word status pill (never color alone), and a soft-primary chip
 * strip carrying practice area + priority. `compact` trims to the header row;
 * `detailed` adds lead attorney + next event. An optional `onOpen` renders an
 * "Open case" affordance. Reuses the base `variant`
 * (`default` / `compact` / `detailed`). Token-only colors via `useXenitionTheme()`.
 */
export declare function CaseCardV4({ caseNumber, title, client, practiceArea, status, priority, leadAttorney, nextEvent, variant, loading, onPress, onOpen, testID, style, }: CaseCardV4Props): React.ReactElement;
//# sourceMappingURL=CaseCardV4.d.ts.map