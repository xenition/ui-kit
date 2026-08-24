import * as React from 'react';
import type { MessageComposerProps } from './MessageComposer';
/** Drop-in alternate design for {@link MessageComposer} — identical props. */
export type MessageComposerV3Props = MessageComposerProps;
/**
 * MessageComposer — **flat toolbar** variant. No pill and no circular button:
 * a borderless field flanked by a row of flat inline actions (attach + camera)
 * on the left and a plain **"Send"** text button on the right that lights up in
 * the primary text token once there's something to send. The utilitarian,
 * desktop-messenger counterpart to the v1 box and the v2 pill+FAB. Same props as
 * `MessageComposer`. No literal colors.
 */
export declare function MessageComposerV3({ value, onChangeText, onSend, onAttach, attachments, onRemoveAttachment, placeholder, disabled, appearance, style, }: MessageComposerV3Props): React.ReactElement;
//# sourceMappingURL=MessageComposerV3.d.ts.map