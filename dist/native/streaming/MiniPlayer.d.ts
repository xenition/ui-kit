import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { MediaTrack, PlaybackState } from './types';
export type MiniPlayerVariant = 'bar' | 'floating';
export interface MiniPlayerProps {
    /** The track shown in the docked mini bar. */
    track: MediaTrack;
    /** Transport state — drives the play control + a11y label. Default `'paused'`. */
    state?: PlaybackState;
    /** Played fraction in `[0, 1]` for the thin top progress line. */
    progress?: number;
    /**
     * - `bar`      — full-width docked bar with a square edge (default).
     * - `floating` — inset rounded card that hovers above content.
     */
    variant?: MiniPlayerVariant;
    /** Called with the next playing state when the play/pause control is tapped. */
    onPlayToggle?: (next: boolean) => void;
    /** Next-track intent (shows a next control when set). */
    onNext?: () => void;
    /** Called when the body is tapped — expand to the full `NowPlaying`. */
    onPress?: (track: MediaTrack) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A docked **mini player** bar — the collapsed now-playing surface that sits
 * above a tab bar. UI shell only: `onPlayToggle(next)` / `onNext` report intent
 * and `onPress` expands to the full player. A thin `primary` progress line rides
 * the top edge. The play control's accessible label reflects `state`.
 * Token-only — no literal hex.
 */
export declare function MiniPlayer({ track, state, progress, variant, onPlayToggle, onNext, onPress, style, }: MiniPlayerProps): React.ReactElement;
//# sourceMappingURL=MiniPlayer.d.ts.map