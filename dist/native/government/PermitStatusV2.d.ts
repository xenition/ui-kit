import * as React from 'react';
import type { PermitStatusProps } from './PermitStatus';
/** Drop-in replacement for {@link PermitStatus} — identical props, distinct design. */
export type PermitStatusV2Props = PermitStatusProps;
/**
 * PermitStatus, alternate design **V2** — a big **vertical timeline**. Each
 * happy-path stage (submitted → review → approved → issued) is its own row with
 * a numbered/checked marker joined by a connecting rail; done stages fill with
 * primary, the active stage rings, and upcoming stages stay muted. A `denied`
 * permit branches into a danger banner (`role="alert"`, glyph + text + color,
 * never color alone) above the rail. Same `PermitStatusProps`; drops in for
 * `PermitStatus`. Token-pure.
 */
export declare function PermitStatusV2({ status, permitNumber, title, updatedDate, loading, style, }: PermitStatusV2Props): React.ReactElement;
//# sourceMappingURL=PermitStatusV2.d.ts.map