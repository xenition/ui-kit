import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface TrendingCardProps {
    /** Position in the trending list (e.g. `1`). Shown as a muted `#N ·` prefix. */
    rank?: number;
    /** Category / context line above the topic (e.g. `Trending in Tech`). */
    category?: string;
    /** The trending topic — a hashtag (`#Xenition`) or a phrase. Shown bold. */
    topic: string;
    /** Formatted post count shown as a big muted numeral (e.g. `12.4K posts`). */
    postCount?: string;
    /** Fires when the card is pressed. */
    onPress?: () => void;
    /** Fires when the overflow `⋯` menu is tapped. Renders the menu button when set. */
    onMenu?: () => void;
    /** Optional style override for the card container. */
    style?: StyleProp<ViewStyle>;
}
/**
 * TrendingCard — **V4** "feed" design. A clean, airy trending-topic card: a
 * muted `#rank · category` context line, the bold `topic`, and the `postCount`
 * as a big muted numeral. An optional `⋯` menu sits at the top-right. Pressed
 * state uses a soft-primary tint (via `withAlpha`). Presentational; token-only
 * colors via `useXenitionTheme()`. Native twin of the web `TrendingCard`.
 */
export declare function TrendingCard({ rank, category, topic, postCount, onPress, onMenu, style, }: TrendingCardProps): React.ReactElement;
//# sourceMappingURL=TrendingCard.d.ts.map