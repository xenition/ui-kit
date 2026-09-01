import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type PaymentMethodKind = 'card' | 'bank' | 'wallet';
export interface PaymentMethodCardProps {
    /** Which kind of instrument this is — picks the leading glyph. */
    kind: PaymentMethodKind;
    /** Primary label (e.g. "Visa" / "Checking" / "Apple Pay"). */
    label: string;
    /** Secondary line (e.g. "•••• 4242", "ACH ••6789"). */
    detail?: string;
    /** Marks this as the default method — shows a success "Default" badge. */
    isDefault?: boolean;
    /** Current selection state (drives the radio + the accent border). */
    selected?: boolean;
    /** When set, the whole row becomes a selectable radio. */
    onSelect?: () => void;
    /** When set, shows a manage affordance on the trailing edge. */
    onManage?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A saved payment method — the clean, trust-first row on a money surface: the
 * instrument glyph in a small brand-gradient disc (the signature V4 touch), the
 * `label` + `detail`, an optional "Default" badge (success tone), and a manage
 * affordance. When `onSelect` is set the whole row is a radio carrying
 * `accessibilityState.selected`; a selected row gains a 2px primary border. All
 * colors trace to tokens — no literals.
 */
export declare function PaymentMethodCard({ kind, label, detail, isDefault, selected, onSelect, onManage, style, }: PaymentMethodCardProps): React.ReactElement;
//# sourceMappingURL=PaymentMethodCard.d.ts.map