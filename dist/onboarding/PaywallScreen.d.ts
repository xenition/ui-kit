import * as React from 'react';
import { type IconName } from '../primitives/icon-names';
import type { BillingPeriod, PlanTier } from './types';
export interface PaywallValueProp {
    /** Leading glyph for the value row. */
    icon?: string;
    /** Outcome the user gets (design.md §47) — not a feature name. */
    text: string;
}
/**
 * One §8 feature row: an icon badge, a title and a supporting line. This is the
 * pattern that carries the value proposition on a paywall — the reference
 * screens lead with it — and it is deliberately the *same* shape used for the
 * value-framing block, so there is one row component rather than two.
 */
export interface PaywallFeatureRow {
    /** Stable key for list rendering. Falls back to the index. */
    id?: string;
    /** A name from the kit's icon set (`'bolt'`, `'lock'`, …) or a one-off glyph. */
    icon?: IconName | string;
    /** Row title — an outcome, not a feature name (design.md §47). */
    title: string;
    /** Supporting line under the title. */
    description?: string;
}
/**
 * The "less than your everyday spending" block from the reference paywall: a
 * per-day price, a comparison and a payback line. It is not a second component
 * — it is {@link PaywallFeatureRows} under a different heading, with the price
 * row generated from `perDayCents` through the kit's `formatMoney`.
 */
export interface PaywallValueFraming {
    /** Section heading (e.g. `'Less than your everyday spending'`). */
    title?: string;
    /** Per-day price in integer **cents**, formatted with the kit's `formatMoney`. */
    perDayCents?: number;
    /** ISO currency for `perDayCents`. Default `'USD'`. */
    currency?: string;
    /** Suffix after the formatted price. Default `'per day'`. */
    perDayLabel?: string;
    /** Supporting line under the price row. */
    perDayCaption?: string;
    /** Badge glyph for the generated price row. Default `'card'`. */
    perDayIcon?: IconName | string;
    /** Comparison / payback lines — the same §8 rows as `features`. */
    rows?: PaywallFeatureRow[];
}
export interface PaywallFeatureRowsProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The rows to draw. Empty renders nothing at all. */
    rows: PaywallFeatureRow[];
    /** Optional section heading above the list. */
    heading?: string;
    /**
     * 1px vertical rail connecting the badges. Defaults to **on at three or more
     * rows** (§8) — a rail is what makes three rows read as one list instead of
     * three fragments; below three there is nothing to bind.
     */
    rail?: boolean;
    /** Tighter badge and rhythm for the compact (v3) line. Default `false`. */
    dense?: boolean;
}
/**
 * §8 feature rows — circular icon badge on a `primary-50` ground with the glyph
 * in `primary`, a semibold title, a muted description, and an optional hairline
 * rail joining the badges.
 *
 * Exported from this module rather than a file of its own because it is one
 * pattern shared by every paywall line and by the value-framing block: the
 * "less than your everyday spending" section is these rows under a different
 * heading, not a second component.
 */
export declare const PaywallFeatureRows: React.ForwardRefExoticComponent<PaywallFeatureRowsProps & React.RefAttributes<HTMLDivElement>>;
/**
 * Fold `valueProps` (the original flat `{ icon, text }` list) into §8 rows so a
 * caller that never migrates still gets the new anatomy — the row simply has no
 * description. `features` wins when both are supplied.
 */
export declare function toFeatureRows(features: PaywallFeatureRow[] | undefined, valueProps: PaywallValueProp[]): PaywallFeatureRow[];
/** Build the value-framing rows, price row first, using the kit's `formatMoney`. */
export declare function toValueFramingRows(framing: PaywallValueFraming | undefined): PaywallFeatureRow[];
export interface PaywallScreenProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Value-first headline (e.g. `'Do your best work, faster'`). */
    title: string;
    /** Supporting line under the headline. */
    subtitle?: string;
    /**
     * Artwork for the §3 hero slot. The kit ships none — pass an `<img>`, an SVG
     * or any node. Absent, the slot falls back to the `logoGlyph` medallion so
     * the screen still reads as composed rather than empty.
     */
    illustration?: React.ReactNode;
    /** Brand mark for the hero fallback. Default `'✦'`. */
    logoGlyph?: string;
    /** Draw the hero slot at all. Default `true` (the compact v3 line defaults to `false`). */
    showHero?: boolean;
    /**
     * The §8 value rows — icon badge, title, description. This is what the
     * reference paywall leads with; prefer it over the flat `valueProps`.
     */
    features?: PaywallFeatureRow[];
    /** Heading above `features` (e.g. `'What you unlock'`). */
    featuresTitle?: string;
    /** Force the §8 connecting rail on/off. Default: on at three or more rows. */
    featureRail?: boolean;
    /**
     * The "less than your everyday spending" block — a per-day price, a
     * comparison and a payback line, drawn with the same §8 rows.
     */
    valueFraming?: PaywallValueFraming;
    /**
     * The "why upgrade" list, shown before any price (design.md §27). Kept for
     * existing callers: each entry is folded into a §8 row without a description.
     */
    valueProps?: PaywallValueProp[];
    /** Plans to choose from. When present, renders the inline {@link PlanSelector}. */
    plans?: PlanTier[];
    /** Selected tier id (controlled). */
    selectedPlanId?: string;
    /** Fires with the clicked tier id. */
    onSelectPlan?: (planId: string) => void;
    /** Billing cadence (controlled). Default `'annual'` — annual leads on paywalls. */
    billingPeriod?: BillingPeriod;
    /** Fires when the monthly/annual toggle changes. */
    onBillingPeriodChange?: (period: BillingPeriod) => void;
    /** Savings pill copy beside the annual toggle. */
    annualSavingsLabel?: string;
    /** Optional trial strip above the value list. */
    trial?: {
        title: string;
        subtitle?: string;
        daysLeft?: number;
    };
    /** Primary CTA copy. Default `'Start free trial'`. */
    ctaLabel?: string;
    /** Fires on the primary CTA. */
    onSubscribe?: () => void;
    /** Show a spinner on the CTA while purchase is in flight. */
    loading?: boolean;
    /** Fine print under the CTA (e.g. cancel-anytime, terms). */
    footnote?: string;
    /** Dismiss ("Maybe later") link copy. Hidden without `onDismiss`. */
    dismissLabel?: string;
    /** Fires on dismiss. */
    onDismiss?: () => void;
}
/**
 * The hero slot (§3): a tinted, ~4:3 panel capped at ~38% of the viewport so
 * the sticky CTA never leaves the fold. Falls back to the brand medallion at
 * hero size when the app supplies no artwork.
 */
export declare function PaywallHero({ illustration, logoGlyph, }: {
    illustration?: React.ReactNode;
    logoGlyph: string;
}): React.ReactElement;
/**
 * The sticky footer (§5) — one anatomy shared by all three lines, which is why
 * it is exported from here rather than copied into each: a hairline divider,
 * the full-width 56-tall CTA, the fine print, and the secondary action **below**
 * the CTA as a muted text link, never beside it competing for the same weight.
 */
export declare function PaywallFooter({ ctaLabel, onSubscribe, loading, footnote, dismissLabel, onDismiss, sticky, }: Pick<PaywallScreenProps, 'onSubscribe' | 'loading' | 'footnote' | 'dismissLabel' | 'onDismiss'> & {
    ctaLabel: string;
    sticky?: boolean;
}): React.ReactElement;
/**
 * Value-first paywall — the reference anatomy, top to bottom: hero slot (§3),
 * centred headline block (§4), the §8 feature rows that carry the value
 * proposition, the value-framing block, the two-up plan cards (§7), and a
 * sticky CTA (§5) that never leaves the fold.
 *
 * What was thin before: a headline, a flat row of green ticks and a button on
 * grey. The rows are the fix — an icon badge on a tinted ground, a semibold
 * title, a muted description and a rail binding them into one list is what the
 * reference screens use to make the offer look worth paying for.
 *
 * Composes {@link TrialBanner}, {@link PlanSelector} and {@link
 * GetStartedButton}, with an optional "Maybe later" escape. The body scrolls
 * while the CTA stays pinned. All colors token-bound. No literal colors.
 */
export declare const PaywallScreen: React.ForwardRefExoticComponent<PaywallScreenProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PaywallScreen.d.ts.map