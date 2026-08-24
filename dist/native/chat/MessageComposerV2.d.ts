import * as React from 'react';
import type { MessageComposerProps } from './MessageComposer';
/** Drop-in alternate design for {@link MessageComposer} — identical props. */
export type MessageComposerV2Props = MessageComposerProps;
/**
 * MessageComposer — **pill + FAB** variant. The attach button and the growing
 * field live together inside one fully-rounded pill; the send affordance is a
 * separate prominent circular **FAB** that floats to the right of the pill and
 * lifts on a drop shadow once there's something to send. A softer, more modern
 * silhouette than the v1 bordered box + inline send. Same props as
 * `MessageComposer`. No literal colors.
 */
export declare function MessageComposerV2({ value, onChangeText, onSend, onAttach, attachments, onRemoveAttachment, placeholder, disabled, appearance, style, }: MessageComposerV2Props): React.ReactElement;
//# sourceMappingURL=MessageComposerV2.d.ts.map