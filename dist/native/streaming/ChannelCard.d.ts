import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type StreamChannel } from './types';
export type ChannelCardVariant = 'row' | 'grid' | 'featured';
export interface ChannelCardProps {
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
    /** Called when the card body is tapped — open the channel. */
    onPress?: (channel: StreamChannel) => void;
    /** Called with the next following state; shows a follow control when set. */
    onFollowToggle?: (next: boolean) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A channel / creator card — avatar, name, category, a `LiveBadge` (with
 * viewer count) when `channel.live`, and an optional follow button.
 * `onPress(channel)` opens it; `onFollowToggle(next)` flips the follow state
 * with the button label + a11y reflecting `following`. Composes `Card` /
 * `Avatar` / `Button`. Token-only — no literal hex.
 */
export declare function ChannelCard({ channel, following, variant, onPress, onFollowToggle, style, }: ChannelCardProps): React.ReactElement;
//# sourceMappingURL=ChannelCard.d.ts.map