import * as React from 'react';
import type { EmployeeCardProps } from './EmployeeCard';
/** Drop-in alternate design for {@link EmployeeCard} — identical Props. */
export type EmployeeCardV3Props = EmployeeCardProps;
/**
 * EmployeeCard, design **V3** — a compact directory row. A small avatar, name +
 * title on one line, and the status carried by a leading tone glyph plus a
 * trailing employment word — dense enough to stack many per screen. Same Props
 * as {@link EmployeeCard}; the card chrome is dropped for a hairline divider
 * row. Press-scales on tap; token-pure (no literal colors).
 */
export declare function EmployeeCardV3({ name, title, department, avatarUrl, employmentType, status, loading, onPress, testID, style, }: EmployeeCardV3Props): React.ReactElement;
//# sourceMappingURL=EmployeeCardV3.d.ts.map