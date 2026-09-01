import * as React from 'react';
import type { ServiceRequestRowProps } from './ServiceRequestRow';
/** Drop-in for {@link ServiceRequestRowProps} — same props, a different design. */
export type ServiceRequestRowV4Props = ServiceRequestRowProps;
/**
 * ServiceRequestRow — **V4** design. An elevated row: the kind glyph in the
 * signature brand-gradient disc, a title/number stack, an optional date, and a
 * status `Badge`. The lifecycle state stays conveyed redundantly by glyph +
 * label + a color that traces to a semantic slot (completed → success,
 * cancelled → neutral) via `requestState` — never color-alone; a `high` priority
 * adds an explicit "Urgent" tag. Becomes a button only when `onPress` is
 * supplied. Same props as {@link ServiceRequestRowProps}; token-only colors.
 */
export declare function ServiceRequestRowV4({ requestNumber, title, status, kind, date, priority, onPress, style, }: ServiceRequestRowV4Props): React.ReactElement;
//# sourceMappingURL=ServiceRequestRowV4.d.ts.map