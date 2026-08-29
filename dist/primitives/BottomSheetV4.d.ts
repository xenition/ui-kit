import * as React from 'react';
import type { BottomSheetProps } from './BottomSheet';
export type { BottomSheetProps as BottomSheetV4Props };
/**
 * `BottomSheet`, V4 — the same props, designed as a real sheet.
 *
 * ## What the depth is saying
 *
 * A bottom sheet is not a panel that happens to be at the bottom of the
 * viewport; it is a layer that has come up from below and is now sitting ON the
 * page. V4 spends exactly three tokens to say that, and nothing on decoration:
 *
 *   - **`--xen-elevation-sheet`** — the shadow. Its offset is *negative*: the
 *     sheet casts upward, onto the content it has covered, which is where a
 *     real object's shadow would fall. That contact shadow is the whole reason
 *     the scrim can be lighter than the base component's flat `bg-neutral-950/50`
 *     and the sheet still reads as separated.
 *   - **The scrim**, from `--xen-elevation-color`. `bg-neutral-950/50` inverts
 *     under `[data-theme="dark"]` — the dark block re-emits the ramp mirrored —
 *     so the base sheet paints a near-WHITE veil over a dark page. A shadow
 *     colour does not invert, because a shadow does not.
 *   - **`--xen-glass-*`**, but only when the seed asked for `depth: 'glass'`.
 *     That is the one depth check in the file, and it is necessary: the
 *     compiler's `flatten()` neutralises gradients and elevation and stops
 *     there, so glass is live even under `depth: 'flat'`. Elevation is consumed
 *     unconditionally, and flat falls out for free.
 *
 * What does NOT get depth is anything inside the sheet. §8 bans "cards inside
 * cards inside cards", and a translucent panel inside a translucent sheet is
 * that same mistake with a blur on it. The sheet is the layer; its contents are
 * flat.
 *
 * ## Motion
 *
 * The sheet rises from the bottom because that explains where it came from
 * (§36.1), inside §36.2's 220–320ms band, on a decelerating curve so it settles
 * rather than stops. Under `prefers-reduced-motion` the travel is replaced by a
 * fade rather than removed — an overlay that appears with no transition at all
 * reads as a glitch (§36.10).
 *
 * ## Layout
 *
 * The caller passes content, not padding. The grab handle, the title row and
 * the scrollable body each carry their own rhythm from the spacing scale.
 */
export declare function BottomSheetV4({ open, onClose, title, children, snap, className, }: BottomSheetProps): React.ReactElement | null;
//# sourceMappingURL=BottomSheetV4.d.ts.map