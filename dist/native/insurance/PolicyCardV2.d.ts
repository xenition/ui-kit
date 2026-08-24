import * as React from 'react';
import type { PolicyCardProps } from './PolicyCard';
/** Drop-in replacement for {@link PolicyCard} — identical props, distinct design. */
export type PolicyCardV2Props = PolicyCardProps;
/**
 * PolicyCard, alternate design **V2** — an elevated hero card. A large tinted
 * glyph tile anchors the top row beside the plan name and a status pill; a
 * full-width tinted "coverage band" makes the benefit amount the visual anchor,
 * with the premium and renewal as a quiet footer. Same `PolicyCardProps`, same
 * data contract (integer cents via `formatMoney`, status by glyph + text +
 * color), so it drops in wherever `PolicyCard` is used. Token-pure.
 */
export declare function PolicyCardV2({ variant, name, policyNumber, coverageCents, premiumCents, cadence, status, holder, renewalDate, currency, formatMoney: format, onPress, style, }: PolicyCardV2Props): React.ReactElement;
//# sourceMappingURL=PolicyCardV2.d.ts.map