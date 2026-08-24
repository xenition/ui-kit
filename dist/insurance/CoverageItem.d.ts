import * as React from 'react';
import { type MoneyFormatter } from './internal/format';
export interface CoverageItemProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Coverage name (e.g. "Collision", "Water damage"). */
    label: string;
    /** Whether this coverage is included in the policy (default `true`). */
    included?: boolean;
    /** Coverage limit / benefit in integer **cents** (omit for "no limit"). */
    limitCents?: number;
    /** Supporting detail line (e.g. "Up to actual cash value"). */
    detail?: string;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Override the cents → string formatter (locale control). */
    formatMoney?: MoneyFormatter;
}
/**
 * One coverage line in a benefits breakdown: an included/excluded marker
 * (glyph + color, never color alone), the coverage label with optional detail,
 * and a right-aligned limit. Included reads `text-success`, excluded reads
 * `text-muted` — both semantic token slots. Limit is integer cents via
 * `formatMoney`; when omitted the line shows "—" rather than a fabricated value.
 * Web parity of the native `CoverageItem`.
 */
export declare const CoverageItem: React.ForwardRefExoticComponent<CoverageItemProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CoverageItem.d.ts.map