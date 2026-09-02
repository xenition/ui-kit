import * as React from 'react';
import type { DockScheduleProps } from './DockSchedule';
/** Drop-in for {@link DockScheduleProps} — same props, the V4 "dispatch" design. */
export type DockScheduleV4Props = DockScheduleProps;
/**
 * DockSchedule — **V4** "dispatch" design (web parity of the native V4). The
 * confident, operations-desk take on a dock-door appointment board: an elevated
 * rounded card with a soft shadow, a door headline with a slot count, and a list
 * of time-window slots. Each slot is a soft-primary well with a tone-toned
 * leading edge, a **tabular-nums** window, a glyph + word status (never color
 * alone), and an optional `CarrierBadge` + reference. Empty (no slots, via
 * `EmptyState`) and loading states are handled; slots are clickable when
 * `onSelectSlot` is set. Identical props/behavior to {@link DockScheduleProps}.
 * All colors from `--xen-*` token classes (no literals).
 */
export declare const DockScheduleV4: React.ForwardRefExoticComponent<DockScheduleProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DockScheduleV4.d.ts.map