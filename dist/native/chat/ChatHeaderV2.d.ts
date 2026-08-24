import * as React from 'react';
import type { ChatHeaderProps } from './ChatHeader';
/** Drop-in alternate design for {@link ChatHeader} — identical props. */
export type ChatHeaderV2Props = ChatHeaderProps;
/**
 * ChatHeader — **prominent** variant. A taller bar with a large `lg` avatar, a
 * big `2xl` title, and the presence/subtitle as a colored status line
 * (success-tinted when online). Trailing actions render as filled circular
 * buttons in a primary-tinted well — the call/video affordance reads as a real
 * button, not a bare glyph. Elevated with a drop shadow instead of a divider.
 * Same props as `ChatHeader`. No literal colors.
 */
export declare function ChatHeaderV2({ title, subtitle, avatarUri, presence, typing, onBack, onPressTitle, actions, appearance, style, }: ChatHeaderV2Props): React.ReactElement;
//# sourceMappingURL=ChatHeaderV2.d.ts.map