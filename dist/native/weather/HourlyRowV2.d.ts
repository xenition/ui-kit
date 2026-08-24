import * as React from 'react';
import type { HourlyRowProps } from './HourlyRow';
/** Drop-in for {@link HourlyRowProps} — same props, a different design. */
export type HourlyRowV2Props = HourlyRowProps;
/**
 * HourlyRow — **bold rounded tiles** design (v2). A horizontal scroll of soft
 * primary-tinted, generously-rounded hour tiles; each carries the time, a large
 * condition glyph + label, a bold temperature, and a pill-shaped precip chip.
 * The condition is a glyph AND its text label — never color alone. Renders a
 * muted empty state when `hours` is empty. Same props as {@link HourlyRowProps};
 * token-only colors.
 */
export declare function HourlyRowV2({ hours, unit, showPrecip, onSelectHour, emptyLabel, style, }: HourlyRowV2Props): React.ReactElement;
//# sourceMappingURL=HourlyRowV2.d.ts.map