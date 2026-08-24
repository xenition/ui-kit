import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type CallState = 'idle' | 'connecting' | 'active' | 'ended';
export interface TelehealthCallBarProps {
    /** The other party's display name. */
    participantName: string;
    /** Optional avatar image for the participant. */
    participantAvatar?: string;
    /** Call lifecycle state; drives the status line and controls. Defaults `idle`. */
    state?: CallState;
    /** Preformatted elapsed time, e.g. "04:12". Shown while `active`. */
    elapsed?: string;
    /** Whether the local mic is muted. */
    muted?: boolean;
    /** Whether the local camera is off. */
    cameraOff?: boolean;
    /** Fires when the join/connect action is pressed (shown while `idle`). */
    onJoin?: () => void;
    /** Toggles the mic; receives the next muted state. */
    onToggleMute?: (nextMuted: boolean) => void;
    /** Toggles the camera; receives the next off state. */
    onToggleCamera?: (nextOff: boolean) => void;
    /** Ends the call. */
    onEnd?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A persistent telehealth call bar: the participant's identity, a connection
 * status line (idle / connecting / active / ended), an elapsed timer, and the
 * standard round controls (mute, camera, end) plus a "Join call" CTA while
 * idle. Mute/camera state is shown by glyph swap + tint, not color alone.
 * Informational UI only — not a medical device. Token-only colors.
 */
export declare function TelehealthCallBar({ participantName, participantAvatar, state, elapsed, muted, cameraOff, onJoin, onToggleMute, onToggleCamera, onEnd, style, }: TelehealthCallBarProps): React.ReactElement;
//# sourceMappingURL=TelehealthCallBar.d.ts.map