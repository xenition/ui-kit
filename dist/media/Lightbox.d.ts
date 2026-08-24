import * as React from 'react';
import { MediaItem } from './types';
export interface LightboxProps {
    /** The full item set. */
    items: MediaItem[];
    /** Index of the open item, or `null`/out-of-range to render nothing (closed). */
    index: number | null;
    /** Close the overlay (Esc, backdrop click, close button). */
    onClose: () => void;
    /** Go to the previous item (← / prev button). */
    onPrev?: () => void;
    /** Go to the next item (→ / next button). */
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
 * Fullscreen overlay media viewer. `role="dialog" aria-modal="true"` with a
 * focus trap (focus enters on open, cycles with Tab, and is restored to the
 * trigger on close), keyboard control (Esc closes, ←/→ navigate), a
 * token-styled backdrop, and an opacity-only fade that's disabled under
 * `prefers-reduced-motion`. SSR-safe (guards `document`) and renders nothing
 * when `index` is `null` or out of range. Presentational — the parent owns
 * `index` and the prev/next handlers.
 */
export declare function Lightbox({ items, index, onClose, onPrev, onNext, loop, label, closeLabel, prevLabel, nextLabel, }: LightboxProps): React.ReactElement | null;
//# sourceMappingURL=Lightbox.d.ts.map