import * as React from 'react';
import type { TagListProps } from './TagList';
export interface TagListV4Props extends TagListProps {
    /** Build a tag button's accessible name. Default ``(label) => `Tag ${label}` ``. */
    formatTagLabel?: (label: string) => string;
    /**
     * Build the overflow chip's spoken form. Default
     * ``(count) => `${count} more tags` ``.
     */
    formatOverflow?: (count: number) => string;
}
/**
 * **V4 tag list** — the web twin of the native `TagListV4`, same props as
 * {@link TagList} plus `formatTagLabel` and `formatOverflow`.
 *
 * ## Four changes
 *
 * 1. **The empty branch keeps the caller's props.** The populated branch
 *    spread `{...rest}` and the empty one did not, so every `id`, `data-*` and
 *    handler an app hung on the list vanished at exactly the moment the list
 *    was empty — the state hardest to notice in development and easiest to hit
 *    in production. Native dropped `style` the same way.
 * 2. **A list has list items.** `role="list"` with bare buttons under it has
 *    zero items, and a reader announces an empty list.
 * 3. **A tag button clears 44.** They were roughly 20px — the height of the
 *    word inside them.
 * 4. **The `+N` chip is reachable and says what the N are.** It was an
 *    unfocusable chip reading "plus three", with no way to learn which three.
 */
export declare const TagListV4: React.ForwardRefExoticComponent<TagListV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TagListV4.d.ts.map