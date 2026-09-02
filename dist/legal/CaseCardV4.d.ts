import * as React from 'react';
import type { CaseCardProps } from './CaseCard';
/** Drop-in for {@link CaseCardProps} — same props, the V4 "chambers" design. */
export type CaseCardV4Props = CaseCardProps;
/**
 * CaseCard — **V4** "chambers" design (web parity of the native V4). The
 * distinguished, chambers take on a matter file: an elevated rounded card with a
 * soft shadow, a docket-number eyebrow over a strong caption, the client, a
 * labelled glyph + word status pill (never color alone), and a soft-primary chip
 * strip carrying practice area + priority. `compact` trims to the header row;
 * `detailed` adds lead attorney + next event. An optional `onOpen` renders an
 * "Open case" affordance; when `onClick` is set the card is a keyboard-activable
 * `role="button"`. Reuses the base `variant` (`default` / `compact` / `detailed`).
 * All colors from `--xen-*` token classes (no literals).
 */
export declare const CaseCardV4: React.ForwardRefExoticComponent<CaseCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CaseCardV4.d.ts.map