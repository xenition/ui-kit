import * as React from 'react';
import type { FloatButtonPlacement, FloatButtonProps } from './FloatButton';
export type { FloatButtonProps as FloatButtonV4Props, FloatButtonPlacement };
/**
 * **V4 floating action button** — same props as {@link FloatButton}, a
 * different design line.
 *
 * §35.11 asks that gradients stay rare and purposeful, and §5 asks every screen
 * for exactly one dominant action. A FAB is both of those things at once: it is
 * the single primary action, and it is literally floating above the content. If
 * a brand gradient and `elevation.action` are right anywhere in this kit, they
 * are right here — and nowhere else in the identity group has earned either.
 *
 * So:
 *
 * - **The fill is `gradient.brand`**, resolved for the active scheme, run
 *   through {@link gradientInk} so the label and the icon clear AA against
 *   **both** stops rather than against the one flat colour `onPrimary` was
 *   measured on. `from` doubles as the opaque layer under the sweep, so the
 *   shadow has something real to fall from — and a `depth: 'flat'` seed, where
 *   the compiler has already collapsed both stops to one colour, lands on a
 *   solid `primary` FAB with no branch anywhere in this file.
 * - **The lift is `elevation.action`**, the seed's own decision, instead of the
 *   hand-picked `shadowOpacity: 0.3 / radius 8 / offset 4` the base carried —
 *   which also took its colour from `tokens.ramps.neutral[950]`, the LIGHT
 *   orientation in both schemes. A shadow on a dark page needs MORE opacity,
 *   not a lighter colour, and only the compiled token knows that.
 * - **The press is a press.** The base dipped opacity to 0.85, which reads as
 *   "disabled" rather than "pushed". V4 scales through `usePressScale` — which
 *   is reduced-motion aware by construction (§36.10), so with Reduce Motion on
 *   the scale stays at 1 — and drops the elevation to half, so the button sits
 *   back down whether or not the animation runs.
 *
 * Everything else is unchanged: the anchor offsets, the safe-area lift over the
 * home indicator, and the pill-when-labelled shape. 56pt clears the 44pt touch
 * minimum with room to spare, which is the one number a FAB must never lose.
 */
export declare function FloatButtonV4({ onPress, onPressIn, onPressOut, icon, label, placement, disabled, accessibilityLabel, style, ...rest }: FloatButtonProps): React.ReactElement;
//# sourceMappingURL=FloatButtonV4.d.ts.map