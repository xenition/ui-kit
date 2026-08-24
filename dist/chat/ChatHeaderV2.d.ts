import * as React from 'react';
import type { ChatHeaderProps } from './ChatHeader';
/** Drop-in alternate design for {@link ChatHeader} — identical props. */
export type ChatHeaderV2Props = ChatHeaderProps;
/**
 * ChatHeader — **prominent** variant. A taller, elevated bar (drop shadow
 * instead of a divider) with a large `lg` avatar, a big extra-bold title, and
 * the presence/subtitle rendered as a colored status line — success-tinted when
 * online. Trailing actions read as real filled circular buttons in a
 * primary-tinted well rather than bare glyphs. Same props as `ChatHeader`. No
 * literal colors.
 */
export declare const ChatHeaderV2: React.ForwardRefExoticComponent<ChatHeaderProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=ChatHeaderV2.d.ts.map