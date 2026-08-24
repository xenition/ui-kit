import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface TagListProps {
    /** The tag labels to render. */
    tags: string[];
    /** Called with the tag label (and its index) when a tag is pressed. */
    onTagPress?: (tag: string, index: number) => void;
    /** Optional cap; extra tags collapse into a "+N" chip. */
    max?: number;
    /** Text shown when `tags` is empty. Pass `null` to render nothing. */
    emptyLabel?: string | null;
    style?: StyleProp<ViewStyle>;
}
/**
 * A wrapping row of keyword / topic tags for an article — the native mirror of
 * a web tag cloud. Composes the `Tag` primitive; an optional `onTagPress` makes
 * each tag tappable (to open a topic feed). Respects a `max` cap with a "+N"
 * overflow chip and renders an `emptyLabel` when there are no tags. All colors
 * come from `SemanticColors` (via `Tag`); no literal hex.
 */
export declare function TagList({ tags, onTagPress, max, emptyLabel, style, }: TagListProps): React.ReactElement | null;
//# sourceMappingURL=TagList.d.ts.map