import * as React from 'react';
import type { ConversationRowProps } from './ConversationRow';
/** Drop-in alternate design for {@link ConversationRow} — identical props. */
export type ConversationRowV2Props = ConversationRowProps;
/**
 * ConversationRow — **card** variant. A rounded, elevated card (margins +
 * shadow, lifts on hover) with a large `xl` avatar, the name and timestamp on
 * the top line, a bold two-line last-message preview, and a filled **unread
 * pill** in the trailing gutter. Reads as a spacious stacked-card inbox rather
 * than the flat v1 list row. Same props as `ConversationRow`. No literal colors.
 */
export declare const ConversationRowV2: React.ForwardRefExoticComponent<ConversationRowProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=ConversationRowV2.d.ts.map