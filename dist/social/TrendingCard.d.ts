import * as React from 'react';
export interface TrendingCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Position in the trending list (e.g. `1`). Shown as a muted `#N ·` prefix. */
    rank?: number;
    /** Category / context line above the topic (e.g. `Trending in Tech`). */
    category?: string;
    /** The trending topic — a hashtag (`#Xenition`) or a phrase. Shown bold. */
    topic: string;
    /** Formatted post count shown as a big muted numeral (e.g. `12.4K posts`). */
    postCount?: string;
    /** Fires when the card is activated (keyboard + pointer). */
    onPress?: () => void;
    /** Fires when the overflow `⋯` menu is tapped. Renders the menu button when set. */
    onMenu?: () => void;
}
/**
 * TrendingCard — **V4** "feed" design. A clean, airy trending-topic card: a
 * muted `#rank · category` context line, the bold `topic`, and the `postCount`
 * as a big muted numeral. An optional `⋯` menu sits at the top-right. Pressed
 * state uses a soft-primary tint. Presentational; token-only colors via
 * `--xen-*` classes. Web parity of the native `TrendingCard`. When `onPress`
 * is set the root is a keyboard-operable `role="button"`.
 */
export declare const TrendingCard: React.ForwardRefExoticComponent<TrendingCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TrendingCard.d.ts.map