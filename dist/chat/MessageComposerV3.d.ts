import * as React from 'react';
import type { MessageComposerProps } from './MessageComposer';
/** Drop-in alternate design for {@link MessageComposer} — identical props. */
export type MessageComposerV3Props = MessageComposerProps;
/**
 * MessageComposer — **flat toolbar** variant. No pill and no circular button: a
 * borderless field flanked by a flat inline attach button on the left and a
 * plain **"Send"** text button on the right that lights up in the primary token
 * once there's something to send. The utilitarian, desktop-messenger
 * counterpart to the v1 bordered box and the v2 pill+FAB. Same props as
 * `MessageComposer`. Enter sends (Shift+Enter inserts a newline). No literal
 * colors.
 */
export declare const MessageComposerV3: React.ForwardRefExoticComponent<MessageComposerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MessageComposerV3.d.ts.map