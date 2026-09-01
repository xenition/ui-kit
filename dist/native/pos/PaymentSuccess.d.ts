import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface PaymentSuccessProps {
    /** Amount charged, in integer **cents** — the big near-white numeral. */
    amountCents: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Tender label, e.g. `"Visa ···4242"` — shown as a frosted tile when set. */
    method?: string;
    /** Change owed back to the customer (cash sales), in integer **cents**. Shown as a frosted tile when `> 0`. */
    changeDueCents?: number;
    /** Headline over the celebration (default `"Payment complete"`). */
    title?: string;
    /** Fires on the primary "Print receipt" action. Shown only when set. */
    onReceipt?: () => void;
    /** Fires on the "Email receipt" action. Shown only when set. */
    onEmailReceipt?: () => void;
    /** Fires on the "New sale" action — the path back to the register. Shown only when set. */
    onNewSale?: () => void;
    /** Optional container style override. */
    style?: StyleProp<ViewStyle>;
}
/**
 * PaymentSuccess — the POS V4 "register" **peak-end**: the payment-complete
 * celebration. A two-hue celebratory gradient (`registerCelebrate`, accent →
 * primary) carries a big frosted ✓ glyph, the headline, and the **big near-white
 * amount** (integer cents via `formatMoney`). The tender `method` and any cash
 * `changeDueCents` read as frosted glass tiles; "Print receipt" / "Email receipt"
 * and "New sale" appear only when their handler is set. Every color derives from
 * the brand ramp via `useXenitionTheme()` — no literals, light + dark safe.
 */
export declare function PaymentSuccess({ amountCents, currency, method, changeDueCents, title, onReceipt, onEmailReceipt, onNewSale, style, }: PaymentSuccessProps): React.ReactElement;
//# sourceMappingURL=PaymentSuccess.d.ts.map