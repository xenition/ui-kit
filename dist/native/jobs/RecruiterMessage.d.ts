import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { RecruiterMessagePayload } from './types';
export interface RecruiterMessageProps {
    /** The message to render. */
    message: RecruiterMessagePayload;
    /** Fired when the message is pressed (open thread). */
    onPress?: (message: RecruiterMessagePayload) => void;
    /** Fired when the reply affordance is pressed. */
    onReply?: (message: RecruiterMessagePayload) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * An inbox row for a recruiter message: sender avatar, name + company, a
 * one-line preview, sent age, and an unread state. Unread is signalled by BOTH
 * a token dot and bold text (never color alone) and announced in the accessible
 * label. Data + callbacks only; tokens only.
 */
export declare function RecruiterMessage({ message, onPress, onReply, style, }: RecruiterMessageProps): React.ReactElement;
//# sourceMappingURL=RecruiterMessage.d.ts.map