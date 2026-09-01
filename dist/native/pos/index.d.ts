/**
 * `@xenition/ui/native/pos` — presentational point-of-sale / retail-ops /
 * register blocks for React Native. Composed from the native primitives (`Card`,
 * `Button`, `EmptyState`) and the commerce module (`QuantityStepper`), plus the
 * module-local `StatusPill`, styled exclusively from the compiled theme tokens
 * via `useXenitionTheme()` — no literal colors (accents come from
 * `SemanticColors` slots, `tokens.ramps.*`, or a token-tinted `withAlpha`).
 * Money — tenders, totals, discounts, refunds, cash counts — is carried as
 * integer **cents** and funnelled through the shared `formatMoney` for stable
 * 2-decimal output. Every status — tender type, ticket new/preparing/ready,
 * refund requested/processed, cash over/short — is conveyed by a **glyph +
 * word**, never by color alone. Each component is data + callbacks +
 * variants/states with empty/loading handling and a11y labels; no fetching, no
 * SDK import, no printer/hardware dependency.
 */
export { RegisterKeypad } from './RegisterKeypad';
export type { RegisterKeypadProps, RegisterKeypadVariant, KeypadKey } from './RegisterKeypad';
export { CartLine } from './CartLine';
export type { CartLineProps, CartLineVariant } from './CartLine';
export { ReceiptView } from './ReceiptView';
export type { ReceiptViewProps, ReceiptViewVariant, ReceiptLine, ReceiptTender, } from './ReceiptView';
export { RegisterKeypadV2 } from './RegisterKeypadV2';
export type { RegisterKeypadV2Props } from './RegisterKeypadV2';
export { RegisterKeypadV3 } from './RegisterKeypadV3';
export type { RegisterKeypadV3Props } from './RegisterKeypadV3';
export { CartLineV2 } from './CartLineV2';
export type { CartLineV2Props } from './CartLineV2';
export { CartLineV3 } from './CartLineV3';
export type { CartLineV3Props } from './CartLineV3';
export { ReceiptViewV2 } from './ReceiptViewV2';
export type { ReceiptViewV2Props } from './ReceiptViewV2';
export { ReceiptViewV3 } from './ReceiptViewV3';
export type { ReceiptViewV3Props } from './ReceiptViewV3';
export { ProductGridTileV2 } from './ProductGridTileV2';
export type { ProductGridTileV2Props } from './ProductGridTileV2';
export { ProductGridTileV3 } from './ProductGridTileV3';
export type { ProductGridTileV3Props } from './ProductGridTileV3';
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
export { formatMoney, withAlpha, toneColor, toneSlot, onToneSlot, safeCents, sumCents, varianceMeta, initials, seedRampStep, PAYMENT_METHOD_META, TICKET_STATUS_META, REFUND_STATUS_META, REFUND_REASON_META, CASH_MOVEMENT_META, } from './internal';
export type { PosTone, StatusMeta, PaymentMethod, TicketStatus, RefundStatus, RefundReason, CashMovementKind, DiscountType, } from './internal';
export { ProductGridTileV4 } from './ProductGridTileV4';
export type { ProductGridTileV4Props } from './ProductGridTileV4';
export { CartLineV4 } from './CartLineV4';
export type { CartLineV4Props } from './CartLineV4';
export { ReceiptViewV4 } from './ReceiptViewV4';
export type { ReceiptViewV4Props } from './ReceiptViewV4';
export { RegisterKeypadV4 } from './RegisterKeypadV4';
export type { RegisterKeypadV4Props } from './RegisterKeypadV4';
export { QuickChargeBarV4 } from './QuickChargeBarV4';
export type { QuickChargeBarV4Props } from './QuickChargeBarV4';
export { PaymentMethodTileV4 } from './PaymentMethodTileV4';
export type { PaymentMethodTileV4Props } from './PaymentMethodTileV4';
export { OrderTicketV4 } from './OrderTicketV4';
export type { OrderTicketV4Props } from './OrderTicketV4';
export { DiscountRowV4 } from './DiscountRowV4';
export type { DiscountRowV4Props } from './DiscountRowV4';
export { RefundRowV4 } from './RefundRowV4';
export type { RefundRowV4Props } from './RefundRowV4';
export { SplitBillRowV4 } from './SplitBillRowV4';
export type { SplitBillRowV4Props } from './SplitBillRowV4';
export { CashDrawerRowV4 } from './CashDrawerRowV4';
export type { CashDrawerRowV4Props } from './CashDrawerRowV4';
export { ShiftReportV4 } from './ShiftReportV4';
export type { ShiftReportV4Props } from './ShiftReportV4';
export { StatusPillV4 } from './StatusPillV4';
export type { StatusPillV4Props } from './StatusPillV4';
export { PaymentSuccess } from './PaymentSuccess';
export type { PaymentSuccessProps } from './PaymentSuccess';
export { SalesSummary } from './SalesSummary';
export type { SalesSummaryProps, SalesSummaryTopItem } from './SalesSummary';
export { RegisterHeader } from './RegisterHeader';
export type { RegisterHeaderProps } from './RegisterHeader';
export { CheckoutSummary } from './CheckoutSummary';
export type { CheckoutSummaryProps } from './CheckoutSummary';
export { TipSelector } from './TipSelector';
export type { TipSelectorProps } from './TipSelector';
export { CategoryTabs } from './CategoryTabs';
export type { CategoryTabsProps, CategoryTab } from './CategoryTabs';
//# sourceMappingURL=index.d.ts.map