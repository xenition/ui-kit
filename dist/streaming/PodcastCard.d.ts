import * as React from 'react';
import type { StreamPodcast } from './types';
export type PodcastCardVariant = 'grid' | 'list' | 'featured';
export interface PodcastCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
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
    /** Card click — open the show (maps native `onPress`). */
    onClick?: (podcast: StreamPodcast) => void;
    /** Called with the next subscribed state; shows a subscribe control when set. */
    onSubscribeToggle?: (next: boolean) => void;
}
/**
 * A podcast show card (web) — artwork, title, publisher, episode count, and (in
 * `featured`) a description plus a subscribe button. `onClick(podcast)` opens the
 * show (rendered as a `role="button"` `Card` with Enter/Space support);
 * `onSubscribeToggle(next)` flips the subscription via a `Button` (stops
 * propagation), with the label + a11y reflecting `subscribed`. Composes
 * `Card` / `Button`. Token-only — no literal hex.
 */
export declare const PodcastCard: React.ForwardRefExoticComponent<PodcastCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PodcastCard.d.ts.map