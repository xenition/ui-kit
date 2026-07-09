/**
 * Money stays integer **cents** on native exactly as on web. `formatMoney` is
 * a pure `Intl.NumberFormat` util with no DOM dependency, so the native layer
 * re-exports the **single web home** rather than duplicating it — one formatter,
 * one set of tests, identical output across platforms.
 */
export { formatMoney } from '../../commerce/money';
export type { MoneyFormatter } from '../../commerce/money';
//# sourceMappingURL=money.d.ts.map