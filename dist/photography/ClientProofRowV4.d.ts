import * as React from 'react';
import type { ClientProofRowProps } from './ClientProofRow';
/** Drop-in for {@link ClientProofRowProps} — same props, the V4 "studio" design. */
export type ClientProofRowV4Props = ClientProofRowProps;
/**
 * ClientProofRow — **V4** "studio" design (web parity of the native V4). The
 * matted proofing row: an elevated clean-surface row whose thumbnail floats
 * inside a thin neutral **mat** (a soft-primary selection ring when picked for a
 * batch), a bold filename, and a labelled decision `Badge` carrying glyph + token
 * tone + label (never color alone). While `pending` the base's approve/reject
 * actions render as trailing `Button`s that stop propagation so they never toggle
 * selection. The row body is a keyboard-operable `checkbox` when `onToggleSelect`
 * is provided (selection carries `aria-checked`, never color alone). Identical
 * props/behavior to {@link ClientProofRowProps}; all colors from `--xen-*`
 * token classes.
 */
export declare const ClientProofRowV4: React.ForwardRefExoticComponent<ClientProofRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ClientProofRowV4.d.ts.map