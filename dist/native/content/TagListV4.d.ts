import * as React from 'react';
import type { TagListProps } from './TagList';
export interface TagListV4Props extends TagListProps {
    /** A tag's accessible name. Default ``(label) => `Tag ${label}` ``. */
    formatTagLabel?: (label: string) => string;
    /** What the `+N` chip announces. Default ``(count) => `${count} more tags` ``. */
    formatOverflow?: (count: number) => string;
}
/**
 * **V4 tag list** — same props as {@link TagList} plus `formatTagLabel` and
 * `formatOverflow`.
 *
 * ## Four changes
 *
 * 1. **The empty branch keeps the caller's props.** The populated branch
 *    applied `style` (and, on the web twin, every `id`, `data-*` and handler
 *    the caller passed) and the empty branch dropped them — so a tag row
 *    silently lost its identity exactly when there was nothing in it, which is
 *    also when a test or a layout is most likely to be looking for it.
 * 2. **A list has list items.** The tags hung directly off a `role="list"` as
 *    bare buttons; each is now one announced child of the list.
 * 3. **A tappable tag clears 44.** They were about 20px — the chip stays
 *    exactly as small, and only the touch area grows.
 * 4. **The `+N` chip says what the N are.** It was an unfocusable chip reading
 *    "+3" with nothing to say which three.
 */
export declare function TagListV4({ tags, onTagPress, max, emptyLabel, formatTagLabel, formatOverflow, style, }: TagListV4Props): React.ReactElement | null;
//# sourceMappingURL=TagListV4.d.ts.map