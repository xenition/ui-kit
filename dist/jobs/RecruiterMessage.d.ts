import * as React from 'react';
import type { RecruiterMessagePayload } from './types';
export interface RecruiterMessageProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** The message to render. */
    message: RecruiterMessagePayload;
    /** Fired when the message is pressed (open thread). `onPress` → `onClick`. */
    onClick?: (message: RecruiterMessagePayload) => void;
    /** Fired when the reply affordance is pressed. */
    onReply?: (message: RecruiterMessagePayload) => void;
}
/**
 * An inbox row for a recruiter message: sender avatar, name + company, a
 * one-line preview, sent age, and an unread state. Unread is signalled by BOTH
 * a token dot and bold text (never color alone) and announced in the accessible
 * label. Data + callbacks only; tokens only.
 */
export declare const RecruiterMessage: React.ForwardRefExoticComponent<RecruiterMessageProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RecruiterMessage.d.ts.map