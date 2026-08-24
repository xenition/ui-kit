import * as React from 'react';
import type { ComposeBarProps } from './ComposeBar';
/** Same public contract as {@link ComposeBar} — a drop-in alternate design. */
export type ComposeBarV3Props = ComposeBarProps;
/**
 * ComposeBar — design V3. A **flat, full-width bar** with an edge-to-edge body
 * field over a row of **inline text actions** (Attach · Send) — no pill, no FAB,
 * no elevation. Optional To/Subject fields appear only when their controlled
 * value is supplied. Send stays disabled until there is a body or an attachment
 * (and while `sending`), reading "Sending…" in flight. Same props as
 * `ComposeBar`. No literal colors.
 */
export declare function ComposeBarV3({ to, onChangeTo, subject, onChangeSubject, body, onChangeBody, onSend, onAttach, attachments, onRemoveAttachment, placeholder, sending, disabled, style, }: ComposeBarV3Props): React.ReactElement;
//# sourceMappingURL=ComposeBarV3.d.ts.map