import * as React from 'react';
import type { ConversationRowProps } from './ConversationRow';
/** Drop-in alternate design for {@link ConversationRow} — identical props. */
export type ConversationRowV3Props = ConversationRowProps;
/**
 * ConversationRow — **dense minimal** variant. A single tight line: a small
 * leading unread dot, a tiny `xs` avatar, the name and message preview flowing
 * inline (name bold, preview muted), and the timestamp pinned far-right. Rows
 * are hairline-separated for high-density inboxes (many on screen) — the
 * opposite of the spacious v2 card. Same props as `ConversationRow`. No literal
 * colors.
 */
export declare const ConversationRowV3: React.ForwardRefExoticComponent<ConversationRowProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=ConversationRowV3.d.ts.map