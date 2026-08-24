import * as React from 'react';
import { type MoneyFormatter } from './internal/format';
/** Tip category — drives the leading glyph + label. */
export type EnergyTipCategory = 'heating' | 'cooling' | 'lighting' | 'water' | 'appliance' | 'general';
export interface EnergyTipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
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
    /** Fires on card click (e.g. open the full tip); becomes a button when supplied. */
    onClick?: () => void;
}
/**
 * An energy-saving tip card: a tinted category glyph disc, a headline + body, an
 * optional effort tag, and an optional estimated monthly saving badge. The
 * saving is integer cents via `formatMoney`, so the printed figure never drifts.
 * Becomes a `role="button"` surface only when `onClick` is supplied. Every color
 * traces to a `--xen-*` token — no literals. Web parity of the native
 * `EnergyTip`.
 */
export declare const EnergyTip: React.ForwardRefExoticComponent<EnergyTipProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EnergyTip.d.ts.map