import * as React from 'react';
import type { TocItem } from './types';
export interface TableOfContentsProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect' | 'title'> {
    /** The document headings, in reading order. */
    items: TocItem[];
    /** Id of the currently in-view heading (highlighted). */
    activeId?: string;
    /** Called with a heading id when clicked (scroll the reader to it). Domain callback — `Omit`s the DOM `onSelect`. */
    onSelect?: (id: string) => void;
    /** Optional heading above the list. Pass `null` to hide. */
    title?: string | null;
    /** Text shown when there are no headings. */
    emptyLabel?: string;
}
/**
 * An in-article table of contents — the jump-list of headings for a long read.
 * Web (React DOM) mirror of the native `TableOfContents`. Data-driven via
 * `items` (each a `{ id, label, level }` heading); indents by nesting `level`
 * and highlights the `activeId` in the accent color. Clicking a row fires
 * `onSelect(id)`. Renders an `emptyLabel` when there are no headings. All colors
 * from `--xen-*` token classes.
 */
export declare const TableOfContents: React.ForwardRefExoticComponent<TableOfContentsProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=TableOfContents.d.ts.map