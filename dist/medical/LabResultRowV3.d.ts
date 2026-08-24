import * as React from 'react';
import type { LabResultRowProps } from './LabResultRow';
/** Same public contract as {@link LabResultRow} — a drop-in alternate design. */
export type LabResultRowV3Props = LabResultRowProps;
/**
 * LabResultRow, redesigned (v3): a **dense panel line**. A status glyph leads,
 * the analyte name + reference range stack tight, and the value·unit pin right —
 * hairline-bordered so a full lab panel reads as a compact table. The opposite of
 * v2's card. Status is glyph + text, never color alone. Same props, token-only.
 */
export declare const LabResultRowV3: React.ForwardRefExoticComponent<LabResultRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LabResultRowV3.d.ts.map