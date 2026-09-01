import * as React from 'react';
import type { QueueStatProps } from './QueueStat';
/** Drop-in for {@link QueueStatProps} — same props, the V4 "calm console" design. */
export type QueueStatV4Props = QueueStatProps;
/**
 * QueueStat — **V4** "calm console" design. A clean KPI tile: a muted caption, a
 * **big** value numeral (`scale['3xl']`, weight 800), an optional unit suffix,
 * and an optional delta indicator colored by tone (up→success / down→danger /
 * flat→muted, per the base) with a matching glyph. An optional leading glyph
 * sits in a soft-tint chip whose tone follows the base's `tone` mapping. Same
 * props/behavior as {@link QueueStatProps}; token-only colors via
 * `useXenitionTheme()` + `withAlpha` (no literal hex). Supports a `loading`
 * placeholder and an optional card surface.
 */
export declare function QueueStatV4({ label, value, delta, trend, suffix, tone, glyph, loading, card, style, }: QueueStatV4Props): React.ReactElement;
//# sourceMappingURL=QueueStatV4.d.ts.map