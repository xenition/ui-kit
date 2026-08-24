import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type NewsTickerVariant = 'scroll' | 'stacked';
export interface NewsTickerItem {
    /** Stable unique id. */
    id: string;
    /** Headline text. */
    text: string;
}
export interface NewsTickerProps {
    /** Breaking / latest headlines. */
    items: NewsTickerItem[];
    /** Optional leading label chip, e.g. `'LIVE'` or `'BREAKING'`. Pass `null` to hide. */
    label?: string | null;
    /** Called with an item's id when a headline is tapped. */
    onItemPress?: (id: string) => void;
    /**
     * - `scroll`  — single horizontal strip of headlines (default).
     * - `stacked` — vertical list of headline rows.
     */
    variant?: NewsTickerVariant;
    /** Show a placeholder while headlines load. */
    loading?: boolean;
    /** Message when there are no headlines. */
    emptyLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A breaking-news ticker — the accent "LIVE / BREAKING" strip of latest
 * headlines. `scroll` lays the headlines out in a single horizontally
 * scrollable strip (separated by middots); `stacked` renders them as vertical
 * rows. Tapping a headline fires `onItemPress(id)`. Handles `loading` and empty
 * states. All colors from `SemanticColors`; no literal hex.
 */
export declare function NewsTicker({ items, label, onItemPress, variant, loading, emptyLabel, style, }: NewsTickerProps): React.ReactElement;
//# sourceMappingURL=NewsTicker.d.ts.map