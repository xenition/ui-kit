import * as React from 'react';
import type { TicketRowProps } from './TicketRow';
/** Drop-in for {@link TicketRowProps} — same props, the V4 "console" design. */
export type TicketRowV4Props = TicketRowProps;
/**
 * TicketRow — **V4** "console" design. The calm-workspace take on a queue row:
 * an elevated rounded card with a left status-accent bar (the signature at-a-
 * glance cue) and a soft-tint status pill carrying glyph + label. Requester
 * avatar, subject, optional priority chip, updated hint, and an unread badge.
 * Status is encoded by glyph **and** color (never color alone). Same
 * props/behavior as {@link TicketRowProps}; token-only colors via
 * `useXenitionTheme()`. Supports a `loading` skeleton and a `selected` state.
 */
export declare function TicketRowV4({ ticket, onPress, loading, selected, style, }: TicketRowV4Props): React.ReactElement;
//# sourceMappingURL=TicketRowV4.d.ts.map