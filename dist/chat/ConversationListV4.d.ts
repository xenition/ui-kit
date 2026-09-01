import * as React from 'react';
import type { ConversationListProps } from './ConversationList';
export interface ConversationListV4Props extends ConversationListProps {
    /** A sentence under the empty title — an empty inbox needs a next step. */
    emptyDescription?: string;
}
/**
 * **V4 conversation list** — the web twin of the native `ConversationListV4`,
 * same props as {@link ConversationList} plus `emptyDescription`.
 *
 * ## Four changes
 *
 * 1. **Loading draws the rows it is about to show.** The base drew a centred
 *    spinner, so the inbox collapsed to a dot and then jumped to full height.
 * 2. **Empty is a real empty state** with a title and a sentence, not a line
 *    of grey text centred in the void.
 * 3. **The last row drops its separator**, which otherwise hung off the end of
 *    the list with nothing under it.
 * 4. **The list is a list**, with a count in its name.
 */
export declare const ConversationListV4: React.ForwardRefExoticComponent<ConversationListV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ConversationListV4.d.ts.map