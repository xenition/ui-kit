import * as React from 'react';
import type { ComposeBarProps } from './ComposeBar';
/** Same public contract as {@link ComposeBar} — a drop-in alternate design. */
export type ComposeBarV3Props = ComposeBarProps;
/**
 * ComposeBar — design **V3**. A **flat, full-width bar**: an edge-to-edge body
 * field sits above a hairline-divided row of **inline text actions** (Attach ·
 * Send) — no pill, no floating button, no elevation. Optional To/Subject fields
 * appear only when their controlled value is supplied. Send stays disabled until
 * there is a body or an attachment (and while `sending`), reading "Sending…" in
 * flight. Same props as `ComposeBar`. No literal colors.
 */
export declare const ComposeBarV3: React.ForwardRefExoticComponent<ComposeBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ComposeBarV3.d.ts.map