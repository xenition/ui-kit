import * as React from 'react';
export interface VoiceNoteBubbleProps {
    /** `me` aligns right on the primary fill; `them` aligns left on a surface fill. */
    side?: 'me' | 'them';
    /** Total clip length in seconds. */
    durationSec: number;
    /** Whether the clip is currently playing (controlled). */
    playing?: boolean;
    /** Playback progress 0–1 (drives the waveform fill). */
    progress?: number;
    /** Normalized waveform samples 0–1; a default pattern is used when omitted. */
    waveform?: number[];
    /** Optional meta (author / time) shown above the bubble. */
    meta?: React.ReactNode;
    /** Toggle play/pause. */
    onPlayToggle?: () => void;
    className?: string;
}
/**
 * Voice-message bubble — a play/pause control, a waveform whose fill reflects
 * `progress`, and a duration readout, wrapped in the primitive `ChatBubble` so
 * it shares alignment and theming with text messages. Colors adapt to the
 * `me`/`them` side (onPrimary vs. onSurface). No literal colors.
 */
export declare const VoiceNoteBubble: React.ForwardRefExoticComponent<VoiceNoteBubbleProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=VoiceNoteBubble.d.ts.map