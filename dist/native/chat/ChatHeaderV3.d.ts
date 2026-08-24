import * as React from 'react';
import type { ChatHeaderProps } from './ChatHeader';
/** Drop-in alternate design for {@link ChatHeader} — identical props. */
export type ChatHeaderV3Props = ChatHeaderProps;
/**
 * ChatHeader — **compact centered** variant. A slim iOS-style bar: back button
 * pinned far-left, trailing actions pinned far-right, and a small `xs` avatar
 * stacked above a centered title + subtitle in the middle. Minimal height, no
 * large avatar — the counterpart to the roomy v2 header. Same props as
 * `ChatHeader`. No literal colors.
 */
export declare function ChatHeaderV3({ title, subtitle, avatarUri, presence, typing, onBack, onPressTitle, actions, appearance, style, }: ChatHeaderV3Props): React.ReactElement;
//# sourceMappingURL=ChatHeaderV3.d.ts.map