import * as React from 'react';
import type { EmployeeCardProps } from './EmployeeCard';
/** Drop-in alternate design for {@link EmployeeCard} — identical Props. */
export type EmployeeCardV3Props = EmployeeCardProps;
/**
 * EmployeeCard, design **V3** — a compact directory row. A small avatar, name +
 * title on one line, a trailing employment word, and the status carried by a
 * leading tone glyph plus its word (never color alone) — dense enough to stack
 * many per screen. Same Props as {@link EmployeeCard}; the card chrome is
 * dropped for a borderless hairline-divider row. Token-pure (no literals).
 */
export declare const EmployeeCardV3: React.ForwardRefExoticComponent<EmployeeCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EmployeeCardV3.d.ts.map