import * as React from 'react';
export interface RegisterHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Store / location name — the primary line. */
    storeName: string;
    /** Register / terminal label, e.g. `"Register 2"`. Shown next to the store name when set. */
    registerLabel?: string;
    /** Cashier on the terminal. Shown as a subline when set. */
    cashierName?: string;
    /** Whether the shift/drawer is open — drives the frosted status pill (`Shift open` vs `Shift closed`). */
    shiftOpen?: boolean;
    /** Current open-order total, in integer **cents** — the near-white running total. Shown when set. */
    runningTotalCents?: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Fires on the menu / overflow action. Shown only when set. */
    onMenu?: () => void;
    /** Fires on the shift action (open/close/manage). The status pill becomes a button when set. */
    onShift?: () => void;
}
/**
 * RegisterHeader — the POS V4 "register" **terminal header** (web parity of the
 * native twin). A confident brand gradient (`from-primary-500 to-primary-700`)
 * carries the store name + `registerLabel`, the `cashierName` subline, a frosted
 * shift-status pill (open/closed by word, not color alone), and the **near-white
 * running total** of the open order (integer cents via `formatMoney`). An optional
 * menu button sits top-right; the shift pill becomes a button when `onShift` is
 * set. Every color derives from the brand ramp via `--xen-*` classes + gradient
 * utilities — no literals, light + dark safe.
 */
export declare const RegisterHeader: React.ForwardRefExoticComponent<RegisterHeaderProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RegisterHeader.d.ts.map