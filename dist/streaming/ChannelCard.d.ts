import * as React from 'react';
import { type StreamChannel } from './types';
export type ChannelCardVariant = 'row' | 'grid' | 'featured';
export interface ChannelCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** The channel / creator to render. */
    channel: StreamChannel;
    /** Whether the user follows this channel (controlled) — toggles the action. */
    following?: boolean;
    /**
     * - `row`      — avatar left, meta right, single row (default).
     * - `grid`     — centered avatar + name + follow, tile-friendly.
     * - `featured` — larger avatar + category + live badge + follow.
     */
    variant?: ChannelCardVariant;
    /** Card click — open the channel (maps native `onPress`). */
    onClick?: (channel: StreamChannel) => void;
    /** Called with the next following state; shows a follow control when set. */
    onFollowToggle?: (next: boolean) => void;
}
/**
 * A channel / creator card (web) — avatar, name, category, a `LiveBadge` (with
 * viewer count) when `channel.live`, and an optional follow button.
 * `onClick(channel)` opens it (rendered as a `role="button"` `Card` with
 * Enter/Space support); `onFollowToggle(next)` flips the follow state via a
 * `Button` (stops propagation) with the label + a11y reflecting `following`.
 * Composes `Card` / `Avatar` / `Button`. Token-only — no literal hex.
 */
export declare const ChannelCard: React.ForwardRefExoticComponent<ChannelCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ChannelCard.d.ts.map