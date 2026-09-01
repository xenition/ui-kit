import * as React from 'react';
import type { ReminderRowProps } from './ReminderRow';
/** Drop-in for {@link ReminderRowProps} — same props, the V4 "flow" design. */
export type ReminderRowV4Props = ReminderRowProps;
/**
 * ReminderRow — **V4** "flow" design. The focused-workspace take on a reminder
 * line: a bell glyph seated in a **soft-primary disc**, a bigger legible title
 * over its time {@link DueDatePill}, and an enable toggle exposing a `switch`
 * a11y role with a stateful label. When the reminder is enabled the whole row
 * settles into a calm **soft-primary tint** so an active reminder reads at a
 * glance. Same props/behavior as {@link ReminderRowProps}; token-only colors via
 * `useXenitionTheme()` + `withAlpha`.
 */
export declare function ReminderRowV4({ title, timeLabel, tone, enabled, onToggle, onPress, style, }: ReminderRowV4Props): React.ReactElement;
//# sourceMappingURL=ReminderRowV4.d.ts.map