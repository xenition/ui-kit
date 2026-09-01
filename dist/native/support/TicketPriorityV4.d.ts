import * as React from 'react';
import type { TicketPriorityProps } from './TicketPriority';
/** Drop-in for {@link TicketPriorityProps} — same props, the V4 "calm console" design. */
export type TicketPriorityV4Props = TicketPriorityProps;
/**
 * TicketPriority — **V4** "calm console" design (native twin, drop-in for
 * {@link TicketPriorityProps}). A refined priority chip: glyph + label inside a
 * soft-tint pill colored by level (`withAlpha(color, 0.12)`), cleaner and more
 * legible in a busy queue than the base's bordered chip. The `bars` variant is
 * preserved as a four-step signal indicator whose filled count carries the
 * level. Level is encoded by glyph **and** color (never color alone); `size`
 * variants and the `low`/`normal`/`high`/`urgent` mapping are unchanged.
 * Token-only colors via `useXenitionTheme()` — no literal hex. Presentational.
 */
export declare function TicketPriorityV4({ level, variant, size, hideLabel, style, }: TicketPriorityV4Props): React.ReactElement;
//# sourceMappingURL=TicketPriorityV4.d.ts.map