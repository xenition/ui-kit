import * as React from 'react';
import type { ServiceRequestRowProps } from './ServiceRequestRow';
/** Drop-in for {@link ServiceRequestRowProps} — same props, a different design. */
export type ServiceRequestRowV4Props = ServiceRequestRowProps;
/**
 * ServiceRequestRow — **V4** design. A clean, elevated row: the kind glyph in the
 * signature brand-gradient disc, a title/number stack, an optional date, and a
 * status `Badge`. The lifecycle state stays conveyed redundantly by glyph +
 * label + a color that traces to a semantic slot (completed → success,
 * cancelled → neutral) via `requestState` — never color-alone; a `high` priority
 * adds an explicit "Urgent" tag. Becomes a `role="button"` row only when
 * `onClick` is supplied. Same props/behavior as {@link ServiceRequestRowProps};
 * token-only colors.
 */
export declare const ServiceRequestRowV4: React.ForwardRefExoticComponent<ServiceRequestRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ServiceRequestRowV4.d.ts.map