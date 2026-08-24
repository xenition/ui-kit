import * as React from 'react';
import { type StoryState } from './StoryRing';
export interface Story {
    id: string;
    name?: string;
    src?: string;
    /** Ring state; `add` tiles are usually supplied via `showAdd` instead. */
    state?: StoryState;
}
export interface StoryBarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Ordered stories to display. */
    stories: ReadonlyArray<Story>;
    /** Clicking a ring fires with its id. */
    onPressStory?: (id: string) => void;
    /** Prepend the viewer's own "add story" tile. Default `true`. */
    showAdd?: boolean;
    /** Handler for the add tile. */
    onPressAdd?: () => void;
    /** Caption for the add tile. */
    addLabel?: string;
}
/**
 * A horizontally-scrolling rail of {@link StoryRing}s, optionally led by the
 * viewer's "add story" tile. Ring state (unseen/seen/live) comes straight from
 * each story. Web parity of the native `StoryBar`; token-only. Scrolls
 * horizontally without a visible scrollbar footprint on the page.
 */
export declare const StoryBar: React.ForwardRefExoticComponent<StoryBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StoryBar.d.ts.map