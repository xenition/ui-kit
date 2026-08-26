import * as React from 'react';
import type { MultiSelectOption, MultiSelectProps } from './MultiSelect';
export type { MultiSelectProps as MultiSelectV4Props, MultiSelectOption };
/**
 * **V4 multi-select** — the same props as {@link MultiSelect}, a different
 * design line.
 *
 * The trigger is a **field**: it takes `FIELD_V4_SHELL`, which is the same
 * height, radius and padding `InputV4` and `SelectV4` take, from the same
 * shared constant. A form whose controls disagree about their own height reads
 * as parts that happened to land near each other; matching them is the cheapest
 * quality signal a kit has (§13).
 *
 * Three things changed beyond the metrics:
 *
 * 1. **The chips are not a second brand colour.** The base fills every chip
 *    with `bg-accent`, which puts the brand's secondary hue on screen once per
 *    selection — §35.5 asks for a limited number of simultaneous accents and
 *    §35.2 says the accent is for emphasis, not repetition. A V4 chip is a 14%
 *    brand tint mixed into `surface`, labelled in `--xen-primary-text`, which
 *    is the contrast-safe text form the compiler measured against `surface`.
 * 2. **The chips are not pills.** `--xen-radius-sm` from the seed, so a `sharp`
 *    brand gets square chips. §8 lists excessive pill-shaped controls among the
 *    tells of generic AI UI, and a row of capsules is exactly that shape.
 * 3. **The popover is a layer, and its rows are not.** It carries
 *    `--xen-elevation-sheet` instead of Tailwind's `shadow-lg`, so a
 *    `depth: 'flat'` seed flattens it for free; the hovered row is a token mix
 *    rather than `bg-neutral-100`, which keeps its light-mode orientation under
 *    `[data-theme="dark"]` and lit up as a pale bar on a dark page (§35.9).
 *
 * Focus is the shared V4 halo, drawn with `box-shadow` so arming it costs no
 * layout (§36.11), and `invalid` retints the border and the ring from one flag.
 */
export declare function MultiSelectV4({ options, value, onChange, placeholder, invalid, disabled, accessibilityLabel, className, }: MultiSelectProps): React.ReactElement;
//# sourceMappingURL=MultiSelectV4.d.ts.map