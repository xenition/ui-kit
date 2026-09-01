import * as React from 'react';
import type { OutageAlertProps } from './OutageAlert';
/** Drop-in for {@link OutageAlertProps} — same props, a different design. */
export type OutageAlertV4Props = OutageAlertProps;
/**
 * OutageAlert — **V4** design. A cleaner elevated card that keeps the severity
 * signal (active → danger, scheduled → warn, resolved → success via
 * `outageState`) carried by glyph + heading + a semantic tint (never color
 * alone): a thin tinted top rail and tinted ETA line. The kind glyph sits in the
 * signature brand-gradient disc. ETA is surfaced for active/scheduled and
 * suppressed once resolved; the details `Button` renders only when `onDetails`
 * is supplied. Same props as {@link OutageAlertProps}; token-only colors.
 */
export declare function OutageAlertV4({ state, kind, area, eta, message, detailsLabel, onDetails, style, }: OutageAlertV4Props): React.ReactElement;
//# sourceMappingURL=OutageAlertV4.d.ts.map