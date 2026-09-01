import * as React from 'react';
export interface PaymentSuccessProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
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
}
/**
 * PaymentSuccess — the POS V4 "register" **peak-end** (web parity of the native
 * twin): the payment-complete celebration. A two-hue celebratory gradient
 * (`from-accent-400 to-primary-600`) carries a big frosted ✓ glyph, the headline,
 * and the **big near-white amount** (integer cents via `formatMoney`). The tender
 * `method` and any cash `changeDueCents` read as frosted glass tiles
 * (`bg-primary-50/15 border-primary-50/30`); "Print receipt" / "Email receipt"
 * and "New sale" appear only when their handler is set. Every color derives from
 * the brand ramp via `--xen-*` classes + gradient utilities — no literals, light
 * + dark safe.
 */
export declare const PaymentSuccess: React.ForwardRefExoticComponent<PaymentSuccessProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PaymentSuccess.d.ts.map