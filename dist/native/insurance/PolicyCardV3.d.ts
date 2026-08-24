import * as React from 'react';
import type { PolicyCardProps } from './PolicyCard';
/** Drop-in replacement for {@link PolicyCard} — identical props, distinct design. */
export type PolicyCardV3Props = PolicyCardProps;
/**
 * PolicyCard, alternate design **V3** — a minimal single line. A colored type
 * dot (a category hue, reinforced by the glyph and the line label — never
 * color-alone) leads into the plan name and number; the coverage sits quietly
 * on the right, with the policy status shown as a small glyph + label. No card
 * chrome — separation comes from spacing. Same `PolicyCardProps`; drops in for
 * dense lists. Token-pure.
 */
export declare function PolicyCardV3({ variant, name, policyNumber, coverageCents, status, currency, formatMoney: format, onPress, style, }: PolicyCardV3Props): React.ReactElement;
//# sourceMappingURL=PolicyCardV3.d.ts.map