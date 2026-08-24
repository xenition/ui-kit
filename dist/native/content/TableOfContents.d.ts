import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { TocItem } from './types';
export interface TableOfContentsProps {
    /** The document headings, in reading order. */
    items: TocItem[];
    /** Id of the currently in-view heading (highlighted). */
    activeId?: string;
    /** Called with a heading id when tapped (scroll the reader to it). */
    onSelect?: (id: string) => void;
    /** Optional heading above the list. Pass `null` to hide. */
    title?: string | null;
    /** Text shown when there are no headings. */
    emptyLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * An in-article table of contents — the jump-list of headings for a long read.
 * Data-driven via `items` (each a `{ id, label, level }` heading); indents by
 * nesting `level` and highlights the `activeId` in the accent color. Tapping a
 * row fires `onSelect(id)` so the reader can scroll to that anchor. Renders an
 * `emptyLabel` when there are no headings. All colors from `SemanticColors`;
 * no literal hex.
 */
export declare function TableOfContents({ items, activeId, onSelect, title, emptyLabel, style, }: TableOfContentsProps): React.ReactElement;
//# sourceMappingURL=TableOfContents.d.ts.map