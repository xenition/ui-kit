import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Visual density of a {@link DonationCard}. */
export type DonationCardVariant = 'default' | 'compact' | 'featured';
export interface DonationCardProps {
    /** Headline, e.g. `Support Clean Water`. */
    title: string;
    /** Optional supporting blurb. */
    description?: string;
    /**
     * Preset gift amounts in integer **cents**. Rendered as a selectable chip
     * grid; the tapped preset becomes the amount passed to `onDonate`.
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
    /** Fires when the CTA is pressed, with the active amount in cents. */
    onDonate?: (cents: number) => void;
    /** Block the CTA and show a spinner. */
    loading?: boolean;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * The donate call-to-action surface: a title/blurb, a grid of preset gift
 * amounts (integer cents → localized currency via `formatMoney`), and a primary
 * CTA that reports the chosen amount. Selection is conveyed by a filled chip, a
 * bold border, and `accessibilityState.selected` — not color alone. When no
 * `presets` are supplied the grid is omitted and the CTA reports `0`. All colors
 * come from the compiled theme tokens — no literal colors.
 */
export declare function DonationCard({ title, description, presets, selected, currency, ctaLabel, variant, onSelectAmount, onDonate, loading, disabled, style, }: DonationCardProps): React.ReactElement;
//# sourceMappingURL=DonationCard.d.ts.map