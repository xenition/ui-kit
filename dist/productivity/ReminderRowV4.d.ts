import * as React from 'react';
import type { ReminderRowProps } from './ReminderRow';
/** Drop-in for {@link ReminderRowProps} — same props, the V4 "flow" design. */
export type ReminderRowV4Props = ReminderRowProps;
/**
 * ReminderRow — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on a reminder line: a bell glyph seated in a
 * **soft-primary disc**, a bigger legible title over its time
 * {@link DueDatePill}, and an enable toggle exposing a `switch` role with a
 * stateful label. When the reminder is enabled the whole row settles into a
 * calm **soft-primary tint** so an active reminder reads at a glance. Same
 * props/behavior as {@link ReminderRowProps}; all colors from `--xen-*` token
 * classes (no literals).
 */
export declare const ReminderRowV4: React.ForwardRefExoticComponent<ReminderRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ReminderRowV4.d.ts.map