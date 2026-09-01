import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { MediaTrack } from './types';
export interface UpNextProps {
    /** The next few upcoming tracks, in play order. An empty array renders nothing. */
    tracks: readonly MediaTrack[];
    /** Header label above the queue preview. */
    title?: string;
    /** Called with a track `id` when a row is tapped — jump to that track. */
    onSelect?: (id: string) => void;
    /** When provided, a subtle "Clear" affordance appears in the header. */
    onClear?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * UpNext — **V4** "spotlight" design. A compact "playing next" queue preview: a
 * clean elevated card listing the next few tracks (small artwork thumb +
 * title/artist, with the duration via {@link formatTime}), each row tappable to
 * jump ahead. The header carries the label and an optional Clear affordance. The
 * surface stays clean — the V4 gradient is reserved for the immersive/artwork
 * moments. Presentational only; token-only colors via `useXenitionTheme()`
 * (no literal hex). Dark-mode safe.
 */
export declare function UpNext({ tracks, title, onSelect, onClear, style, }: UpNextProps): React.ReactElement | null;
//# sourceMappingURL=UpNext.d.ts.map