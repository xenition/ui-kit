import * as React from 'react';
import type { ClientProofRowProps } from './ClientProofRow';
/** Drop-in for {@link ClientProofRowProps} — same props, the V4 "studio" design. */
export type ClientProofRowV4Props = ClientProofRowProps;
/**
 * ClientProofRow — **V4** "studio" design (native parity of the web V4). The
 * matted proofing row: an elevated clean-surface row whose thumbnail floats
 * inside a thin neutral **mat** (a soft-primary selection ring when picked for a
 * batch), a bold filename, and a labelled decision `Badge` carrying glyph + token
 * tone + label (never color alone). While `pending` the base's approve/reject
 * actions render as trailing `Button`s. The row body is a keyboard/press
 * `checkbox` when `onToggleSelect` is provided (selection carries an
 * accessibility `checked` state, never color alone). Identical props/behavior to
 * {@link ClientProofRowProps}; token-only colors via `useXenitionTheme()`.
 */
export declare function ClientProofRowV4({ filename, thumbUrl, decision, selected, onToggleSelect, onApprove, onReject, approveLabel, rejectLabel, style, }: ClientProofRowV4Props): React.ReactElement;
//# sourceMappingURL=ClientProofRowV4.d.ts.map