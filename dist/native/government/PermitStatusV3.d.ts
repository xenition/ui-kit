import * as React from 'react';
import type { PermitStatusProps } from './PermitStatus';
/** Drop-in replacement for {@link PermitStatus} — identical props, distinct design. */
export type PermitStatusV3Props = PermitStatusProps;
/**
 * PermitStatus, alternate design **V3** — a compact status pill row. The permit
 * title / number ride the left of a single line, and the current status reads
 * as one glyph + text + color pill on the right (a `denied` permit shows the
 * danger-toned pill; `role="alert"` is preserved). An optional updated-date sits
 * below. Dense enough for a permits list. Same `PermitStatusProps`; drops in for
 * `PermitStatus`. Token-pure.
 */
export declare function PermitStatusV3({ status, permitNumber, title, updatedDate, loading, style, }: PermitStatusV3Props): React.ReactElement;
//# sourceMappingURL=PermitStatusV3.d.ts.map