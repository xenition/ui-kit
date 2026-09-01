import * as React from 'react';
import type { TourSchedulerProps } from './TourScheduler';
/** Drop-in for {@link TourSchedulerProps} — same props, the V4 "listing" design. */
export type TourSchedulerV4Props = TourSchedulerProps;
/**
 * TourScheduler — **V4** "listing" design. The editorial take on the tour
 * scheduler: an elevated, rounded card with a date line, a grid (or list) of
 * soft-primary time-slot pills — the selected pill fills solid primary — sized
 * to a ≥44px tap target, plus a request/confirm button. Same props/behavior as
 * {@link TourSchedulerProps}: works controlled (`selectedId`) or uncontrolled;
 * the confirm button stays disabled until an available slot is chosen, then
 * fires `onSchedule` with it. Empty `slots` degrades to the shared `EmptyState`.
 * Selection is conveyed via `accessibilityState.selected`, not color alone.
 * Token-only colors via `useXenitionTheme()` + `withAlpha`.
 */
export declare function TourSchedulerV4({ title, dateLabel, slots, selectedId, onSelectSlot, onSchedule, confirmLabel, variant, loading, style, }: TourSchedulerV4Props): React.ReactElement;
//# sourceMappingURL=TourSchedulerV4.d.ts.map