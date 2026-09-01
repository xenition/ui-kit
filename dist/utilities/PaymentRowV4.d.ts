import * as React from 'react';
import type { PaymentRowProps } from './PaymentRow';
/** Drop-in for {@link PaymentRowProps} — same props, a different design. */
export type PaymentRowV4Props = PaymentRowProps;
/**
 * PaymentRow — **V4** design. The clean, trust-first payment line: an elevated
 * rounded surface, the settlement-state glyph in a small brand-gradient disc (the
 * signature V4 touch), a method/date stack with a status pill, and a right-aligned
 * amount. The state is still conveyed redundantly (glyph + label + a color that
 * traces to a semantic token: paid → success, failed → danger) so it is never
 * color-alone, and a refunded/failed amount stays muted with a strike. Amount is
 * integer cents via `formatMoney`; becomes a `role="button"` row only when
 * `onClick` is supplied. Same props/behavior as {@link PaymentRowProps};
 * token-only colors.
 */
export declare const PaymentRowV4: React.ForwardRefExoticComponent<PaymentRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PaymentRowV4.d.ts.map