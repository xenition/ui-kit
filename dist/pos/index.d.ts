/**
 * `@xenition/ui/pos` — presentational point-of-sale / retail-ops / register
 * blocks for React DOM, the web parity of `@xenition/ui/native/pos`. Composed
 * from the web primitives (`Card`, `Button`, `Spinner`) and the commerce module
 * (`QuantityStepper`, `EmptyState`), plus the module-local `StatusPill`, styled
 * exclusively from the `--xen-*` theme tokens via Tailwind utility classes — no
 * literal colors (accents come from `text-*`/`bg-*`/`border-*` token classes and
 * the neutral/primary/accent ramps). Money — tenders, totals, discounts,
 * refunds, cash counts — is carried as integer **cents** and funnelled through
 * the shared `formatMoney` for stable 2-decimal output. Every status — tender
 * type, ticket new/preparing/ready, refund requested/processed, cash over/short
 * — is conveyed by a **glyph + word**, never by color alone. Each component is
 * data + callbacks + variants/states with empty/loading handling and a11y
 * labels; DOM-root components forward refs; no fetching, no SDK import, no
 * printer/hardware dependency.
 */
export { RegisterKeypad } from './RegisterKeypad';
export type { RegisterKeypadProps, RegisterKeypadVariant, KeypadKey } from './RegisterKeypad';
export { CartLine } from './CartLine';
export type { CartLineProps, CartLineVariant } from './CartLine';
export { ReceiptView } from './ReceiptView';
export type { ReceiptViewProps, ReceiptViewVariant, ReceiptLine, ReceiptTender } from './ReceiptView';
export { PaymentMethodTile } from './PaymentMethodTile';
export type { PaymentMethodTileProps, PaymentMethodTileVariant } from './PaymentMethodTile';
export { DiscountRow } from './DiscountRow';
export type { DiscountRowProps, DiscountRowVariant } from './DiscountRow';
export { CashDrawerRow } from './CashDrawerRow';
export type { CashDrawerRowProps, CashDrawerRowVariant } from './CashDrawerRow';
export { ProductGridTile } from './ProductGridTile';
export type { ProductGridTileProps, ProductGridTileVariant } from './ProductGridTile';
export { SplitBillRow } from './SplitBillRow';
export type { SplitBillRowProps, SplitBillRowVariant } from './SplitBillRow';
export { RefundRow } from './RefundRow';
export type { RefundRowProps, RefundRowVariant } from './RefundRow';
export { ShiftReport } from './ShiftReport';
export type { ShiftReportProps, ShiftReportVariant, ShiftPaymentBreakdown } from './ShiftReport';
export { QuickChargeBar } from './QuickChargeBar';
export type { QuickChargeBarProps, QuickChargeBarVariant } from './QuickChargeBar';
export { OrderTicket } from './OrderTicket';
export type { OrderTicketProps, OrderTicketVariant, OrderTicketItem } from './OrderTicket';
export { StatusPill } from './StatusPill';
export type { StatusPillProps, StatusPillVariant, StatusPillSize } from './StatusPill';
export { formatMoney, safeCents, sumCents, varianceMeta, initials, seedRampStep, PAYMENT_METHOD_META, TICKET_STATUS_META, REFUND_STATUS_META, REFUND_REASON_META, CASH_MOVEMENT_META, } from './internal';
export type { PosTone, StatusMeta, PaymentMethod, TicketStatus, RefundStatus, RefundReason, CashMovementKind, DiscountType, } from './internal';
//# sourceMappingURL=index.d.ts.map