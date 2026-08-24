import * as React from 'react';
import type { MessageComposerProps } from './MessageComposer';
/** Drop-in alternate design for {@link MessageComposer} — identical props. */
export type MessageComposerV2Props = MessageComposerProps;
/**
 * MessageComposer — **pill + FAB** variant. The attach button and the growing
 * field share one fully-rounded, primary-tinted capsule; the send affordance is
 * a separate prominent circular **FAB** that floats to the right of the pill and
 * lifts on a drop shadow once there's something to send. A softer, more modern
 * silhouette than the v1 bordered box + inline send. Same props as
 * `MessageComposer`. No literal colors.
 */
export declare const MessageComposerV2: React.ForwardRefExoticComponent<MessageComposerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MessageComposerV2.d.ts.map