import * as React from 'react';
import type { EmployeeCardProps } from './EmployeeCard';
/** Drop-in alternate design for {@link EmployeeCard} — identical Props. */
export type EmployeeCardV2Props = EmployeeCardProps;
/**
 * EmployeeCard, design **V2** — a banner-header profile card. A tone-tinted
 * banner (derived from the employee's status, never color alone) sits above an
 * overlapping avatar; name, title and department stack below, followed by
 * employment / status word-pills and a full row of tappable contact actions.
 * Same Props as {@link EmployeeCard}, so it swaps in with no call-site change.
 * Elevated + mount-fade; token-pure (no literal colors).
 */
export declare function EmployeeCardV2({ name, title, department, avatarUrl, employmentType, status, location, startDate, actions, loading, onPress, testID, style, }: EmployeeCardV2Props): React.ReactElement;
//# sourceMappingURL=EmployeeCardV2.d.ts.map