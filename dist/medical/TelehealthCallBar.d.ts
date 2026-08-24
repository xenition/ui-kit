import * as React from 'react';
export type CallState = 'idle' | 'connecting' | 'active' | 'ended';
export interface TelehealthCallBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
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
}
/**
 * A persistent telehealth call bar — the web mirror of the native
 * `TelehealthCallBar`. Shows the participant's identity, a connection status
 * line (idle / connecting / active / ended), an elapsed timer, and the standard
 * round controls (mute, camera, end) plus a "Join call" CTA while idle.
 * Mute/camera state is conveyed by a glyph swap + `aria-label`, not color
 * alone. Composes `Avatar` + `Button`; token-only colors. Informational UI only
 * — not a medical device.
 */
export declare const TelehealthCallBar: React.ForwardRefExoticComponent<TelehealthCallBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TelehealthCallBar.d.ts.map