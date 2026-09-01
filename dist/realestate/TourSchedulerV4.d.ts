import * as React from 'react';
import type { TourSchedulerProps } from './TourScheduler';
/** Drop-in for {@link TourSchedulerProps} — same props, the V4 "listing" design. */
export type TourSchedulerV4Props = TourSchedulerProps;
/**
 * TourScheduler — **V4** "listing" design (web parity of the native V4). The
 * editorial take on the tour scheduler: an elevated, rounded card with a date
 * line, a grid (or list) of soft-primary time-slot pills — the selected pill
 * fills solid primary — sized to a ≥44px tap target, plus a request/confirm
 * button. Same props/behavior as {@link TourSchedulerProps}: works controlled
 * (`selectedId`) or uncontrolled; the confirm button stays disabled until an
 * available slot is chosen, then fires `onSchedule` with it. Empty `slots`
 * degrades to the shared `EmptyState`. Selection is conveyed via `aria-pressed`,
 * not color alone. All colors come from the `--xen-*` tokens — no literal colors.
 */
export declare const TourSchedulerV4: React.ForwardRefExoticComponent<TourSchedulerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TourSchedulerV4.d.ts.map