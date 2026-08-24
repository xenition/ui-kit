import * as React from 'react';
/** Visual density of a {@link DonationCard}. */
export type DonationCardVariant = 'default' | 'compact' | 'featured';
export interface DonationCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    /** Headline, e.g. `Support Clean Water`. */
    title: string;
    /** Optional supporting blurb. */
    description?: string;
    /**
     * Preset gift amounts in integer **cents**. Rendered as a selectable chip
     * grid; the chosen preset becomes the amount passed to `onDonate`.
     */
    presets?: number[];
    /** Controlled selected preset (cents). Falls back to the first preset. */
    selected?: number;
    /** ISO 4217 currency for money formatting (default `USD`). */
    currency?: string;
    /** Label for the primary CTA (default `Donate`). */
    ctaLabel?: string;
    /** Density / emphasis. `featured` enlarges the title. */
    variant?: DonationCardVariant;
    /** Fires when a preset chip is chosen (cents). */
    onSelectAmount?: (cents: number) => void;
    /** Fires when the CTA is clicked, with the active amount in cents. */
    onDonate?: (cents: number) => void;
    /** Block the CTA (web `Button` has no `loading`, so a busy CTA is disabled). */
    loading?: boolean;
    disabled?: boolean;
}
/**
 * Web parity of the native `DonationCard`: the donate call-to-action surface —
 * a title/blurb, a grid of preset gift amounts (integer cents → localized
 * currency via `formatMoney`), and a primary CTA that reports the chosen amount.
 * Selection is conveyed by a filled chip, a bold border, AND `aria-checked` on a
 * `role="radio"` button — not color alone. When no `presets` are supplied the
 * grid is omitted and the CTA reports `0`. All colors come from the `--xen-*`
 * token classes — no literal colors.
 */
export declare const DonationCard: React.ForwardRefExoticComponent<DonationCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DonationCard.d.ts.map