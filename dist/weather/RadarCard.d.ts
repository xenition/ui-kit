import * as React from 'react';
export interface RadarCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'aria-label'> {
    /** Card title. Default `'Radar'`. */
    title?: string;
    /** Caption under the title (e.g. `'Live · 2 min ago'`). */
    caption?: string;
    /** Height of the static radar canvas in px. Default `180`. */
    height?: number;
    /** Overlay label shown centred on the canvas. Default `'Radar preview'`. */
    placeholderLabel?: string;
}
/**
 * Static radar map placeholder (web parity of the native `RadarCard`) —
 * INTENTIONALLY dependency-free: no maps SDK, no image, no chart. The "canvas"
 * is built purely from styled `div`s: a token-tinted backdrop, three concentric
 * range rings, a crosshair, and a labelled centre. It gives weather layouts a
 * radar slot before (or without) a real tile provider is wired. Pass `onClick`
 * to open a full view (renders a keyboard-focusable button). All colors come
 * from the `--xen-*` tokens via Tailwind classes — no literal colors, no deps.
 */
export declare const RadarCard: React.ForwardRefExoticComponent<RadarCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RadarCard.d.ts.map