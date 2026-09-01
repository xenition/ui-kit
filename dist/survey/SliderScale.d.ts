import * as React from 'react';
export interface SliderScaleProps {
    /** Current numeric value. Kept controlled — always render what you're told. */
    value: number;
    /** Fires with the new value after clamping and snapping to `step`. */
    onChange: (value: number) => void;
    /** Low end of the range. Default `0`. */
    min?: number;
    /** High end of the range. Default `10`. */
    max?: number;
    /** Snap increment between stops. Default `1`. */
    step?: number;
    /** Anchor caption under the `min` end (e.g. `'Not at all'`). */
    minLabel?: string;
    /** Anchor caption under the `max` end (e.g. `'Completely'`). */
    maxLabel?: string;
    /** Show the big current-value numeral above the track. Default `true`. */
    showValue?: boolean;
    /** Accessible name for the slider. Default `'Rating'`. */
    'aria-label'?: string;
    /** Non-interactive + dimmed when `true`. Default `false`. */
    disabled?: boolean;
    /** Extra classes on the root. */
    className?: string;
}
/**
 * SliderScale — **V4** "clean form / focus" numeric slider question. A calm,
 * legible take: a big current-value numeral sits above a primary-filled track
 * with a large (≥44px) draggable thumb, flanked by min/max anchor captions. The
 * single accent is `primary`; the rail is `border`, the surface is neutral — no
 * gradients. Fully keyboard driven (Arrow / Home / End / PageUp / PageDown) and
 * exposed as `role="slider"` with `aria-valuemin/max/now`. Controlled via
 * `value` + `onChange`. All colors come from `--xen-*` token classes.
 */
export declare const SliderScale: React.ForwardRefExoticComponent<SliderScaleProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SliderScale.d.ts.map