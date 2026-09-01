import * as React from 'react';
import type { TicketRowProps } from './TicketRow';
/** Drop-in for {@link TicketRowProps} — same props, the V4 "console" design. */
export type TicketRowV4Props = TicketRowProps;
/**
 * TicketRow — **V4** "console" design (web parity of the native V4). The
 * calm-workspace take on a queue row: an elevated rounded card with a left
 * status-accent bar (the signature at-a-glance cue) and a soft-tint status pill
 * carrying glyph + label. Requester avatar, subject, optional priority chip,
 * updated hint, and an unread badge. Status is encoded by glyph **and** color
 * (never color alone). Same props/behavior as {@link TicketRowProps}; all colors
 * from `--xen-*` token classes (no literal hex). Supports a `loading` skeleton
 * and a `selected` state.
 */
export declare const TicketRowV4: React.ForwardRefExoticComponent<TicketRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TicketRowV4.d.ts.map