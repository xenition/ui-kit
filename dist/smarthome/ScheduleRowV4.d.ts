import * as React from 'react';
import type { ScheduleRowProps } from './ScheduleRow';
/** Drop-in for {@link ScheduleRowProps} — same props, the V4 "ambient" design. */
export type ScheduleRowV4Props = ScheduleRowProps;
/**
 * ScheduleRow — **V4** "ambient" design (web parity of the native V4). The
 * control-panel take on a schedule row: an **enabled schedule glows** — when on
 * the row takes a soft `primary`-tinted wash, a primary border, and a glowing
 * clock disc; disabled schedules stay calm and muted. The **time reads big and
 * legible**, active weekday pills carry a soft-`primary` tint, and the scene /
 * action label sits alongside. The enable state is carried by the {@link Switch}'s
 * `aria-checked` (not color alone). Same props/behavior as {@link ScheduleRowProps};
 * all colors from `--xen-*` token classes (no literals).
 */
export declare const ScheduleRowV4: React.ForwardRefExoticComponent<ScheduleRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ScheduleRowV4.d.ts.map