import * as React from 'react';
import type { ChatHeaderProps } from './ChatHeader';
/** Drop-in alternate design for {@link ChatHeader} — identical props. */
export type ChatHeaderV3Props = ChatHeaderProps;
/**
 * ChatHeader — **compact centered** variant. A slim iOS-style bar: the back
 * affordance pinned far-left and the trailing actions far-right (each in a
 * fixed-width cluster so the center stays optically centered), with a small
 * `xs` avatar stacked above a centered title + subtitle in the middle. Minimal
 * height, borderless-but-for a hairline rule — the counterpart to the roomy v2
 * header. Same props as `ChatHeader`. No literal colors.
 */
export declare const ChatHeaderV3: React.ForwardRefExoticComponent<ChatHeaderProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=ChatHeaderV3.d.ts.map