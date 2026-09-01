import * as React from 'react';
import type { RatingScaleInputProps } from './RatingScaleInput';
/** Drop-in for {@link RatingScaleInputProps} — same props, the V4 "focus" design. */
export type RatingScaleInputV4Props = RatingScaleInputProps;
/**
 * RatingScaleInput — **V4** "clean form / focus" design. A big, tappable rating
 * (min 44px targets) that reports a 1-based value: `star` fills glyphs up to the
 * selection with the **warn** star tone (empty = muted); `number` shows big
 * primary-filled chips; `emoji` maps each cell to a face. The chosen value is
 * echoed as a large **primary** numeral (`N / total`) so the answer reads at a
 * glance. Calm, one accent, no gradients. Each cell is a `radio` that announces
 * its value and selection via `aria-checked` — never color-alone. Guards
 * `max`/`emojis` indexing. Same props/behavior as {@link RatingScaleInputProps};
 * all colors from `--xen-*` token classes (no literal colors).
 */
export declare const RatingScaleInputV4: React.ForwardRefExoticComponent<RatingScaleInputProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RatingScaleInputV4.d.ts.map