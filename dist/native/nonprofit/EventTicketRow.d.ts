import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface EventTicketRowProps {
    /** Ticket tier name, e.g. `Gala Table` or `General Entry`. */
    name: string;
    /** Ticket price, integer **cents**. `0` renders as the localized zero (free). */
    priceCents: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Short perks / description line. */
    description?: string;
    /** Portion of the price that is tax-deductible, integer **cents**. */
    deductibleCents?: number;
    /** Remaining inventory; `0` marks the row sold out and disables it. */
    remaining?: number;
    /** Force the sold-out state regardless of `remaining`. */
    soldOut?: boolean;
    /** Current selection (radio-style). */
    selected?: boolean;
    /** Fires when chosen (never fires while sold out / disabled). */
    onSelect?: () => void;
    /** Disable interaction without the sold-out styling. */
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A selectable charity-event ticket row: tier name, price (integer cents →
 * `formatMoney`), optional tax-deductible portion, perks, and inventory, with a
 * radio indicator. Selection is conveyed by a filled indicator, a bold border,
 * and `accessibilityState` — not color alone. Sold-out rows are dimmed, badged
 * and non-interactive. All colors come from the compiled theme tokens — no
 * literal colors.
 */
export declare function EventTicketRow({ name, priceCents, currency, description, deductibleCents, remaining, soldOut, selected, onSelect, disabled, style, }: EventTicketRowProps): React.ReactElement;
//# sourceMappingURL=EventTicketRow.d.ts.map