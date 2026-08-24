import * as React from 'react';
import type { HourlyRowProps } from './HourlyRow';
/** Drop-in for {@link HourlyRowProps} — same props, a different design. */
export type HourlyRowV3Props = HourlyRowProps;
/**
 * HourlyRow — **dense compact strip** design (v3). A tight horizontal scroll of
 * narrow columns: a small time caption, a small condition glyph, the temperature,
 * and (optionally) a minimal precip figure. Sized for cramming many hours into a
 * single dashboard line. The condition is a glyph AND its text label (exposed to
 * screen readers) — never color alone. Renders a muted empty state when `hours`
 * is empty. Same props as {@link HourlyRowProps}; token-only colors.
 */
export declare function HourlyRowV3({ hours, unit, showPrecip, onSelectHour, emptyLabel, style, }: HourlyRowV3Props): React.ReactElement;
//# sourceMappingURL=HourlyRowV3.d.ts.map