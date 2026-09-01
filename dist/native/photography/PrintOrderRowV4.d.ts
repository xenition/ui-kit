import * as React from 'react';
import type { PrintOrderRowProps } from './PrintOrderRow';
/** Drop-in for {@link PrintOrderRowProps} — same props, the V4 "studio" design. */
export type PrintOrderRowV4Props = PrintOrderRowProps;
/**
 * PrintOrderRow — **V4** "studio" design (native parity of the web V4). The
 * matted take on a print-order line: an elevated clean-surface row with a leading
 * glyph tile floating inside a thin neutral **mat**, a bold product name, a soft
 * muted meta line (size · finish · ×qty), and a trailing line total
 * ({@link PriceTag} of `unitPriceCents × quantity`) above a labelled status
 * `Badge`. Every `status` value carries glyph + token tone + label (never color
 * alone). Quantity is clamped to at least 1. Identical props/behavior to
 * {@link PrintOrderRowProps}; optional `onPress` exposes the row as a `button`.
 * Token-only colors via `useXenitionTheme()`.
 */
export declare function PrintOrderRowV4({ product, size, finish, quantity, unitPriceCents, currency, status, onPress, formatMoney, style, }: PrintOrderRowV4Props): React.ReactElement;
//# sourceMappingURL=PrintOrderRowV4.d.ts.map