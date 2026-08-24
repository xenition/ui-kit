import * as React from 'react';
import type { LeaveRequestProps } from './LeaveRequest';
/** Drop-in alternate design for {@link LeaveRequest} — identical Props. */
export type LeaveRequestV2Props = LeaveRequestProps;
/**
 * LeaveRequest, design **V2** — a card built around an explicit date-range block.
 * The range renders as two dated columns (From → To) joined by an arrow with the
 * day-count between; status is a glyph + word pill (never color alone). When
 * `actionable` and still `pending`, approve / deny buttons show; otherwise the
 * approver is named. Same Props as {@link LeaveRequest}. Elevated with a subtle
 * hover lift; token-pure (no literals).
 */
export declare const LeaveRequestV2: React.ForwardRefExoticComponent<LeaveRequestProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LeaveRequestV2.d.ts.map