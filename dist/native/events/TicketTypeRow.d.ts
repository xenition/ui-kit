import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface TicketTypeRowProps {
    /** Tier name, e.g. `General Admission`. */
    name: string;
    /** Pre-formatted price, e.g. `$49` or `Free`. */
    price: string;
    /** Short description / perks line. */
    description?: string;
    /** Remaining inventory; `0` marks the row sold out and disables it. */
    remaining?: number;
    /** Force the sold-out state regardless of `remaining`. */
    soldOut?: boolean;
    /** Whether this row is the current selection. */
    selected?: boolean;
    /** Fires when the row is chosen (never fires while sold out/disabled). */
    onSelect?: () => void;
    /** Disable interaction without the sold-out styling. */
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A selectable ticket-tier row for a purchase sheet: name, price, description
 * and inventory, with a radio-style indicator on the right. Selection is
 * conveyed by a filled indicator, a bold border, and `accessibilityState`
 * (`selected` / `disabled`) — not color alone. Sold-out rows are dimmed,
 * badged, and non-interactive. Colors come from the compiled theme tokens; no
 * literal colors.
 */
export declare function TicketTypeRow({ name, price, description, remaining, soldOut, selected, onSelect, disabled, style, }: TicketTypeRowProps): React.ReactElement;
//# sourceMappingURL=TicketTypeRow.d.ts.map