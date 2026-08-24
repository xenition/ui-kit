import * as React from 'react';
export interface TagListProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The tag labels to render. */
    tags: string[];
    /** Called with the tag label (and its index) when a tag is clicked — web mirror of native `onTagPress`. */
    onTagClick?: (tag: string, index: number) => void;
    /** Optional cap; extra tags collapse into a "+N" chip. */
    max?: number;
    /** Text shown when `tags` is empty. Pass `null` to render nothing. */
    emptyLabel?: string | null;
}
/**
 * A wrapping row of keyword / topic tags for an article — the web (React DOM)
 * mirror of the native `TagList`. Composes the `Tag` primitive; an optional
 * `onTagClick` makes each tag a keyboard-activatable button (to open a topic
 * feed). Respects a `max` cap with a "+N" overflow chip and renders an
 * `emptyLabel` when there are no tags. All colors come from `--xen-*` tokens.
 */
export declare const TagList: React.ForwardRefExoticComponent<TagListProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TagList.d.ts.map