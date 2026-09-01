import * as React from 'react';
import type { PrintOrderRowProps } from './PrintOrderRow';
/** Drop-in for {@link PrintOrderRowProps} — same props, the V4 "studio" design. */
export type PrintOrderRowV4Props = PrintOrderRowProps;
/**
 * PrintOrderRow — **V4** "studio" design (web parity of the native V4). The
 * matted take on a print-order line: an elevated clean-surface row with a leading
 * glyph tile floating inside a thin neutral **mat**, a bold product name, a soft
 * muted meta line (size · finish · ×qty), and a trailing line total
 * ({@link PriceTag} of `unitPriceCents × quantity`) above a labelled status
 * `Badge`. Every `status` value carries glyph + token tone + label (never color
 * alone). Quantity is clamped to at least 1. Identical props/behavior to
 * {@link PrintOrderRowProps}; passing `onClick` makes the whole row a
 * keyboard-operable `button`. All colors from `--xen-*` token classes.
 */
export declare const PrintOrderRowV4: React.ForwardRefExoticComponent<PrintOrderRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PrintOrderRowV4.d.ts.map