import * as React from 'react';
import type { ToastOptions, ToastTone } from './Toast';
export type { ToastOptions, ToastTone };
/** Props of {@link ToastProviderV4} — identical to the base `ToastProvider`. */
export interface ToastProviderV4Props {
    children: React.ReactNode;
}
/**
 * **V4 toast provider** — the web twin of the native `ToastProviderV4`, the
 * same props and the same `useToast()` API as {@link ToastProvider}, a
 * different design line.
 *
 * The context half of the base was already right, so it is **reused rather than
 * rebuilt** — it provides the base's own `ToastContext`. What V4 replaces is the half
 * that paints, which carried six defects:
 *
 * 1. **`text-muted` was a text colour, twice.** `muted` is a FILL — the
 *    compiler's own comment in `theme/types.ts` says it "carries NO contrast
 *    promise" — and `mutedText` is the same hue corrected against `surface` to
 *    AA, exactly as shadcn/ui carries `--muted-foreground` beside `--muted`.
 *    The description now reads `mutedText` (via `TextV4 tone="mutedText"`) and
 *    so does the dismiss glyph.
 * 2. **Off-scale literals.** `top-4`, `gap-2`, `gap-3`, `px-4`, `p-3`,
 *    `border-l-4`, `max-w-sm` and `z-[100]` were Tailwind's scale, not the
 *    seed's — a re-scaled theme moved every token except these. Every one now
 *    resolves through `--xen-*`, except the two named constants above, which
 *    are a touch target and a stacking order rather than spacings.
 * 3. **`shadow-lg` was Tailwind's shadow.** Now `elevation.sheet` off the
 *    compiled theme, one value per scheme, so a `depth: 'flat'` seed gets a
 *    flat toast with no branch here.
 * 4. **The dismiss had no target.** A bare `×` in an unsized button. Now
 *    {@link TAP_TARGET_PX} square with the shared M3 state layer, so pressing
 *    it tints the container instead of dimming the glyph — dimming *content* is
 *    the signal M3 spends `0.38` on to mean disabled, which is why the base's
 *    hovered ✕ and a dead ✕ looked alike.
 * 5. **`transition-colors` had no duration.** Now `V4_MOTION`, with a
 *    `prefers-reduced-motion` block.
 * 6. **The surface.** See below.
 *
 * ## Why the ground is `surface`, not `popover`
 *
 * `popover`/`onPopover` exist for a floating panel and a toast is one, so this
 * looked like the obvious answer. It is measurably wrong here, and the reason
 * is the same one that makes defect 1 a defect.
 *
 * The compiler guarantees its TEXT slots against `surface` and against nothing
 * else. `popover` compiles to `mixHex(surface, white, …)` — pure white in
 * light, and one step *lighter than surface* in dark. Measured across the two
 * reference seeds (`theme/compile` + `theme/color`, and asserted in this
 * component's spec) the dark scheme gives:
 *
 * ```
 *            on surface   on popover
 * mutedText     6.29         4.33   ← below AA
 * dangerText    —            3.13   ← far below AA
 * primaryText   —            3.20   ← below AA
 * ```
 *
 * A toast is mostly `mutedText` description, and the feedback line's tone tints
 * are `color-mix(…, surface)` by construction (`feedback-v4.tintCss`), so
 * moving to `popover` would put a surface-mixed tint on a non-surface ground
 * AND drop the description below AA in dark — trading a token that reads
 * correctly for a token whose name reads correctly. No other V4 overlay uses
 * `popover` either: `ModalV4`, `DrawerV4`, `MenuV4`, `TooltipV4` and
 * `PopoverV4` all paint `surface` and let `elevation` do the floating.
 *
 * So: `surface`, tinted 10% with the tone exactly as `AlertV4 variant="subtle"`
 * does, and the "this is above the page" claim is made by
 * `elevation.sheet` — by depth, which is what depth is for, rather than by hue.
 *
 * ## Accessibility
 *
 * The live region survives: `role="status"` (polite) for `info`/`success`/
 * `warn`, `role="alert"` (assertive) for `danger`. That is what the *native*
 * base already does and what `AlertV4` and `BannerV4` do, so all four now
 * agree; the web base announced a failure as politely as a confirmation.
 */
export declare function ToastProviderV4({ children }: ToastProviderV4Props): React.ReactElement;
//# sourceMappingURL=ToastProviderV4.d.ts.map