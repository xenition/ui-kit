import * as React from 'react';
import type { ConversationListProps } from './ConversationList';
export interface ConversationListV4Props extends ConversationListProps {
    /** Description under the empty label. */
    emptyDescription?: string;
}
/**
 * **V4 conversation list** — same props as {@link ConversationList} plus
 * `emptyDescription`.
 *
 * ## Three changes
 *
 * 1. **The loading state is a skeleton, not a spinner.** An inbox that shows
 *    three ghost rows tells the user what is coming; a spinner tells them to
 *    wait. The skeleton is opaque, mixed against the card's own ground.
 * 2. **The empty state explains itself** rather than showing one muted line.
 * 3. **The last row drops its separator**, which the base drew under every
 *    row including the final one — a hairline hanging off the end of a list.
 */
export declare function ConversationListV4({ items, onPressItem, onLongPressItem, loading, emptyLabel, emptyDescription, dividers, children, style, }: ConversationListV4Props): React.ReactElement;
//# sourceMappingURL=ConversationListV4.d.ts.map