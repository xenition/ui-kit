import * as React from 'react';
import type { EmployeeCardProps } from './EmployeeCard';
/** Drop-in alternate design for {@link EmployeeCard} — identical Props. */
export type EmployeeCardV2Props = EmployeeCardProps;
/**
 * EmployeeCard, design **V2** — a banner-header profile card. A tone-tinted
 * banner (derived from the employee's status, never color alone) sits above an
 * overlapping ringed avatar; name, title and department stack below, followed by
 * employment / location / start-date chips and a full-width row of contact
 * `<button>`s. Same Props as {@link EmployeeCard}, so it swaps in with no
 * call-site change. Elevated with a subtle hover lift; token-pure (no literals).
 */
export declare const EmployeeCardV2: React.ForwardRefExoticComponent<EmployeeCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EmployeeCardV2.d.ts.map