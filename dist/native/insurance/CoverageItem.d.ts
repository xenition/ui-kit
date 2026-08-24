import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type MoneyFormatter } from './internal/format';
export interface CoverageItemProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * One coverage line in a benefits breakdown: an included/excluded marker
 * (glyph + color, never color alone), the coverage label with optional detail,
 * and a right-aligned limit. Included reads `success`, excluded reads `muted` —
 * both slots trace to `SemanticColors`. Limit is integer cents via
 * `formatMoney`; when omitted the line shows "—" rather than a fabricated value.
 */
export declare function CoverageItem({ label, included, limitCents, detail, currency, formatMoney: format, style, }: CoverageItemProps): React.ReactElement;
//# sourceMappingURL=CoverageItem.d.ts.map