/**
 * `@xenition/ui/crypto` — presentational crypto / web3 / wallet / portfolio
 * blocks for React DOM. Composed from the web primitives (`Card`, `Button`,
 * `Badge`, `Switch`, `Icon`, `Input`), charts (`Sparkline`, `DonutChart`,
 * `Legend`), and the finance `MoneyAmount`, and styled exclusively from the
 * `--xen-*` Tailwind token classes — no literal colors (gains read
 * `text-success`, losses `text-danger`), and no status is conveyed by color
 * alone (glyph + label everywhere). Fiat is carried as integer **cents** and
 * funnelled through `MoneyAmount`; token amounts/prices/percentages are
 * formatted with fixed precision so printed values never drift. UI only — no
 * chain deps, no fetching, no SDK import. Web parity of
 * `@xenition/ui/native/crypto`.
 */

export { WalletCard } from './WalletCard';
export type { WalletCardProps, WalletKind, WalletCardVariant } from './WalletCard';
export { WalletCardV2 } from './WalletCardV2';
export type { WalletCardV2Props } from './WalletCardV2';
export { WalletCardV3 } from './WalletCardV3';
export type { WalletCardV3Props } from './WalletCardV3';

export { TokenRow } from './TokenRow';
export type { TokenRowProps } from './TokenRow';
export { TokenRowV2 } from './TokenRowV2';
export type { TokenRowV2Props } from './TokenRowV2';
export { TokenRowV3 } from './TokenRowV3';
export type { TokenRowV3Props } from './TokenRowV3';

export { PriceTicker } from './PriceTicker';
export type { PriceTickerProps, PriceTickerVariant } from './PriceTicker';

export { NFTCard } from './NFTCard';
export type { NFTCardProps, NFTCardVariant } from './NFTCard';
export { NFTCardV2 } from './NFTCardV2';
export type { NFTCardV2Props } from './NFTCardV2';
export { NFTCardV3 } from './NFTCardV3';
export type { NFTCardV3Props } from './NFTCardV3';

export { SwapForm } from './SwapForm';
export type { SwapFormProps, SwapValues, SwapToken } from './SwapForm';

export { GasFeeRow } from './GasFeeRow';
export type { GasFeeRowProps, GasSpeed } from './GasFeeRow';

export { PortfolioSummary } from './PortfolioSummary';
export type { PortfolioSummaryProps, AllocationSlice } from './PortfolioSummary';
export { PortfolioSummaryV2 } from './PortfolioSummaryV2';
export type { PortfolioSummaryV2Props } from './PortfolioSummaryV2';
export { PortfolioSummaryV3 } from './PortfolioSummaryV3';
export type { PortfolioSummaryV3Props } from './PortfolioSummaryV3';

export { TxRow, TxList } from './TxRow';
export type { TxRowProps, TxListProps, TxStatus, TxDirection } from './TxRow';

export { StakingCard } from './StakingCard';
export type { StakingCardProps, StakingStatus } from './StakingCard';

export { PriceAlertRow } from './PriceAlertRow';
export type { PriceAlertRowProps, AlertCondition } from './PriceAlertRow';

export { NetworkBadge } from './NetworkBadge';
export type { NetworkBadgeProps, NetworkStatus, NetworkBadgeSize } from './NetworkBadge';

export { SeedPhraseGrid } from './SeedPhraseGrid';
export type { SeedPhraseGridProps } from './SeedPhraseGrid';

// Display-formatting helpers (stable, no float drift) — exported for reuse.
export {
  truncateHash,
  formatToken,
  formatPrice,
  formatPct,
  changeToneKey,
  changeGlyph,
  changeToneClass,
} from './internal/format';
export type { ChangeTone } from './internal/format';
