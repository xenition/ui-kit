import * as React from 'react';
import type { MediaItem } from '../../media/types';
export interface LightboxProps {
    /** The full item set. */
    items: MediaItem[];
    /** Index of the open item, or `null`/out-of-range to render nothing (closed). */
    index: number | null;
    /** Close the overlay (backdrop press, close button, Android back). */
    onClose: () => void;
    /** Go to the previous item (prev button / swipe right). */
    onPrev?: () => void;
    /** Go to the next item (next button / swipe left). */
    onNext?: () => void;
    /** Wrap around at the ends (default false). */
    loop?: boolean;
    /** Accessible name for the dialog (default `Media viewer`). */
    label?: string;
    closeLabel?: string;
    prevLabel?: string;
    nextLabel?: string;
}
/**
 * Fullscreen overlay media viewer — the native mirror of the web `Lightbox`.
 * A transparent RN `Modal` (`animationType` fade, dropped to `none` under the
 * OS "Reduce Motion" setting) with a token-styled backdrop derived from the
 * darkest neutral token, prev/next `Pressable` controls, and horizontal swipe
 * navigation via `PanResponder` (RN core — no extra gesture dependency). The
 * Android hardware back button routes through `onRequestClose` → `onClose`.
 * Renders nothing when `index` is `null` or out of range. Presentational — the
 * parent owns `index` and the prev/next handlers.
 */
export declare function Lightbox({ items, index, onClose, onPrev, onNext, loop, label, closeLabel, prevLabel, nextLabel, }: LightboxProps): React.ReactElement | null;
//# sourceMappingURL=Lightbox.d.ts.map