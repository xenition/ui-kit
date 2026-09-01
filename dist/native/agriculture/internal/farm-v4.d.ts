/**
 * The `agriculture` module's tone vocabulary — now a **thin delegation** to
 * `primitives/internal/tone-v4`.
 *
 * This file wrote the tone-to-ink table first, for the module's ten status
 * enums. `automotive` then needed five more of the same and `beauty` five
 * more again, which is where a module-local helper stops being local: twenty
 * enums across three modules cannot each own a copy of one correction.
 *
 * The names stay exactly as they were, so nothing in this module moved; the
 * table lives one level up. `FarmTone` is `ToneV4` under the module's own
 * noun, kept because the twelve components read better naming their own
 * domain.
 *
 * Nothing here is exported from the package.
 */
import type { ViewStyle } from 'react-native';
import type { XenitionNativeTheme } from '../../theme';
import { clampPercent, metaLine, skeletonFill, toneInk, type ToneV4 } from '../../primitives/internal/tone-v4';
/** The tones this module's states resolve to. */
export type FarmTone = ToneV4;
export { clampPercent, metaLine, skeletonFill, toneInk };
/** One skeleton bar: a fraction of the width, at a step of the type scale. */
export declare function skeletonBarStyle(theme: XenitionNativeTheme, options: {
    width: `${number}%`;
    step?: 'sm' | 'base' | 'lg';
}): ViewStyle;
//# sourceMappingURL=farm-v4.d.ts.map