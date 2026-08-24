import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type MoneyFormatter } from './internal/format';
/** Tip category — drives the leading glyph + label. */
export type EnergyTipCategory = 'heating' | 'cooling' | 'lighting' | 'water' | 'appliance' | 'general';
export interface EnergyTipProps {
    /** Tip headline (e.g. "Lower your thermostat 2°"). */
    title: string;
    /** Supporting explanation. */
    body?: string;
    /** Tip category — drives the glyph + label (default `general`). */
    category?: EnergyTipCategory;
    /** Estimated monthly saving in integer **cents** (shown as a badge). */
    savingsCents?: number;
    /** Effort/impact hint. */
    effort?: 'easy' | 'moderate' | 'project';
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Override the cents → string formatter (locale control). */
    formatMoney?: MoneyFormatter;
    /** Fires on card press (e.g. open the full tip); becomes a button when supplied. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * An energy-saving tip card: a tinted category glyph disc, a headline + body, an
 * optional effort tag, and an optional estimated monthly saving badge. The
 * saving is integer cents via `formatMoney`, so the printed figure never drifts.
 * Becomes a button only when `onPress` is supplied. Every color traces to a
 * `SemanticColors` slot or a `ramps`-derived tint — no literals.
 */
export declare function EnergyTip({ title, body, category, savingsCents, effort, currency, formatMoney: format, onPress, style, }: EnergyTipProps): React.ReactElement;
//# sourceMappingURL=EnergyTip.d.ts.map