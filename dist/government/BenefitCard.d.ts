import * as React from 'react';
import { type MoneyFormatter } from './internal/format';
/** Type of public benefit / assistance program. */
export type BenefitType = 'food' | 'unemployment' | 'housing' | 'medical' | 'disability' | 'family' | 'other';
/** Enrolment status of a benefit case. */
export type BenefitStatus = 'active' | 'pending' | 'expiring' | 'expired' | 'denied' | 'suspended';
export interface BenefitCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Program title (e.g. "SNAP", "Section 8 Housing"). */
    name: string;
    /** Benefit type — drives the leading glyph + default sub-label. */
    benefitType: BenefitType;
    /** Enrolment status (default `active`) — text + glyph + color, never alone. */
    status?: BenefitStatus;
    /** Recurring benefit amount in integer **cents** (e.g. monthly). */
    amountCents?: number;
    /** Cadence suffix for the amount (default `/mo`). */
    cadence?: string;
    /** Case / reference number. */
    caseNumber?: string;
    /** Localized date of the next payment / renewal. */
    nextDate?: string;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Override the cents → string formatter (locale control). */
    formatMoney?: MoneyFormatter;
    /** Fires on card click (open case detail); button only when supplied. */
    onClick?: () => void;
}
/**
 * A public-benefit / assistance case card: a tinted program glyph, an enrolment
 * status pill conveyed by **text + glyph + color** (never color alone), an
 * optional recurring amount as integer cents through `formatMoney`, and case /
 * next-payment metadata. Becomes a keyboard-operable button only when `onClick`
 * is supplied. Token-bound throughout — no literal colors. Web parity of the
 * native `BenefitCard`.
 */
export declare const BenefitCard: React.ForwardRefExoticComponent<BenefitCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BenefitCard.d.ts.map