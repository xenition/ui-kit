import * as React from 'react';
import type { DockScheduleProps } from './DockSchedule';
/** Drop-in for {@link DockScheduleProps} — same props, the V4 "dispatch" design. */
export type DockScheduleV4Props = DockScheduleProps;
/**
 * DockSchedule — **V4** "dispatch" design (native twin of the web V4). The
 * confident, operations-desk take on a dock-door appointment board: an elevated
 * rounded card with a soft shadow, a door headline with a slot count, and a list
 * of time-window slots. Each slot is a soft-primary well with a tone-toned
 * leading edge, a **tabular-nums** window, a glyph + word status (never color
 * alone), and an optional `CarrierBadge` + reference. Empty (no slots) and
 * loading states are handled; slots are tappable when `onSelectSlot` is set.
 * Token-only colors via `useXenitionTheme()`.
 */
export declare function DockScheduleV4({ dock, slots, onSelectSlot, loading, testID, style, }: DockScheduleV4Props): React.ReactElement;
//# sourceMappingURL=DockScheduleV4.d.ts.map