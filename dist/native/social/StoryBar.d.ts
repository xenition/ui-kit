import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type StoryState } from './StoryRing';
export interface Story {
    id: string;
    name?: string;
    src?: string;
    /** Ring state; `add` tiles are usually supplied via `showAdd` instead. */
    state?: StoryState;
}
export interface StoryBarProps {
    /** Ordered stories to display. */
    stories: ReadonlyArray<Story>;
    /** Tapping a ring fires with its id. */
    onPressStory?: (id: string) => void;
    /** Prepend the viewer's own "add story" tile. Default `true`. */
    showAdd?: boolean;
    /** Handler for the add tile. */
    onPressAdd?: () => void;
    /** Caption for the add tile. */
    addLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A horizontally-scrolling rail of {@link StoryRing}s, optionally led by the
 * viewer's "add story" tile. Ring state (unseen/seen/live) comes straight from
 * each story. Token-only; scrolls without a visible scrollbar.
 */
export declare function StoryBar({ stories, onPressStory, showAdd, onPressAdd, addLabel, style, }: StoryBarProps): React.ReactElement;
//# sourceMappingURL=StoryBar.d.ts.map