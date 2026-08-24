import * as React from 'react';
export type NewsTickerVariant = 'scroll' | 'stacked';
export interface NewsTickerItem {
    /** Stable unique id. */
    id: string;
    /** Headline text. */
    text: string;
}
export interface NewsTickerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Breaking / latest headlines. */
    items: NewsTickerItem[];
    /** Optional leading label chip, e.g. `'LIVE'` or `'BREAKING'`. Pass `null` to hide. */
    label?: string | null;
    /** Called with an item's id when a headline is clicked — web mirror of native `onItemPress`. */
    onItemClick?: (id: string) => void;
    /**
     * - `scroll`  — single horizontal strip of headlines (default).
     * - `stacked` — vertical list of headline rows.
     */
    variant?: NewsTickerVariant;
    /** Show a placeholder while headlines load. */
    loading?: boolean;
    /** Message when there are no headlines. */
    emptyLabel?: string;
}
/**
 * A breaking-news ticker — the accent "LIVE / BREAKING" strip of latest
 * headlines. Web (React DOM) mirror of the native `NewsTicker`. `scroll` lays
 * the headlines out in a single horizontally scrollable strip (separated by
 * middots); `stacked` renders them as vertical rows. Clicking a headline fires
 * `onItemClick(id)`. Handles `loading` and empty states. The label chip reuses
 * the `Badge` primitive; all colors from `--xen-*` token classes.
 */
export declare const NewsTicker: React.ForwardRefExoticComponent<NewsTickerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=NewsTicker.d.ts.map