import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { StreamPodcast } from './types';
export type PodcastCardVariant = 'grid' | 'list' | 'featured';
export interface PodcastCardProps {
    /** The show to render. */
    podcast: StreamPodcast;
    /** Whether the user is subscribed (controlled) — toggles the action label. */
    subscribed?: boolean;
    /**
     * - `grid`     — square artwork above stacked meta (default).
     * - `list`     — artwork left, meta right, single row.
     * - `featured` — large artwork + description + prominent subscribe button.
     */
    variant?: PodcastCardVariant;
    /** Called when the card body is tapped — open the show. */
    onPress?: (podcast: StreamPodcast) => void;
    /** Called with the next subscribed state; shows a subscribe control when set. */
    onSubscribeToggle?: (next: boolean) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A podcast show card — artwork, title, publisher, episode count, and (in
 * `featured`) a description plus a subscribe button. `onPress(podcast)` opens
 * the show; `onSubscribeToggle(next)` flips the subscription, with the button
 * label + a11y reflecting `subscribed`. Composes `Card` / `Button`. Token-only
 * — no literal hex.
 */
export declare function PodcastCard({ podcast, subscribed, variant, onPress, onSubscribeToggle, style, }: PodcastCardProps): React.ReactElement;
//# sourceMappingURL=PodcastCard.d.ts.map