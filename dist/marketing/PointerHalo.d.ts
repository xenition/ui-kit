import * as React from 'react';
export type PointerHaloMode = 'idle' | 'link' | 'grow';
export interface PointerHaloProps {
    /** Halo diameter at rest, px (default 22). */
    size?: number;
    /** Diameter when hovering interactive elements — a "tighten" (default 12). */
    linkSize?: number;
    /** Diameter over `[data-halo="grow"]` targets (default 72). */
    growSize?: number;
    /** Caption shown inside the grown halo (default none). */
    label?: React.ReactNode;
    className?: string;
}
/**
 * Optional custom-cursor affordance generalized from the portfolio template:
 * a small accent halo trailing the pointer that tightens over interactive
 * elements and swells into a labelled disc over `[data-halo="grow"]` targets
 * (project covers, oversized CTAs).
 *
 * Safety rails: renders nothing on the server, under
 * `prefers-reduced-motion`, and on coarse/touch pointers (runtime
 * `(pointer: fine)` check + CSS fallback); non-mouse pointer events are
 * ignored; the native cursor is never suppressed. The trailing ease is a
 * rAF lerp written straight to the element style — no re-render per move,
 * no animation library.
 */
export declare function PointerHalo({ size, linkSize, growSize, label, className, }: PointerHaloProps): React.ReactElement | null;
//# sourceMappingURL=PointerHalo.d.ts.map