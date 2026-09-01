import * as React from 'react';
import type { ToastOptions, ToastTone } from './Toast';
export type { ToastOptions, ToastTone };
/** Props of {@link ToastProviderV4} — identical to the base `ToastProvider`. */
export interface ToastProviderV4Props {
    children: React.ReactNode;
}
/**
 * **V4 toast provider** — the native twin of the web `ToastProviderV4`, the
 * same props and the same `useToast()` API as {@link ToastProvider}, a
 * different design line.
 *
 * The context half of the base was already right, so it is **reused rather than
 * rebuilt** — see {@link useSharedToastProvider}. What V4 replaces is the half
 * that paints:
 *
 * 1. **`colors.muted` was a text colour, twice.** `muted` is a FILL — the
 *    compiler's own comment in `theme/types.ts` says it "carries NO contrast
 *    promise" — and `mutedText` is the same hue corrected against `surface` to
 *    AA. The description and the dismiss glyph now read `mutedText`.
 * 2. **Off-scale literals.** `maxWidth: 420`, `borderLeftWidth: 4` and the
 *    web twin's `top-4 / gap-2 / px-4 / p-3 / z-[100]` were numbers with
 *    nothing to compare them to. Everything is now a step on
 *    `tokens.spacing` / `tokens.radius`, except the hairline `1` and the named
 *    {@link TAP_TARGET_PX}, both of which §10.1 allows.
 * 3. **No depth at all.** The base toast sat flat on the page while claiming to
 *    float over it. Now `elevation.sheet`, the same level the V4 surface line
 *    gives a sheet — and zeroed for free under `depth: 'flat'`.
 * 4. **The dismiss had no target.** `hitSlop={8}` around a `✕` grows the touch
 *    area but not the control; now a real {@link TAP_TARGET_PX} square with the
 *    shared M3 state layer.
 * 5. **No motion.** Toasts appeared instantaneously. Now `V4_MOTION.enter` with
 *    M3's emphasized-decelerate, respecting the OS Reduce Motion switch.
 * 6. **The surface.** `popover`/`onPopover` exist for a floating panel and a
 *    toast is one, so they looked like the obvious ground. They are measurably
 *    wrong here: the compiler guarantees its TEXT slots against `surface` and
 *    nothing else, and `popover` compiles one step *lighter than surface* in
 *    dark. Measured on the two reference seeds (and asserted in this
 *    component's spec) the dark scheme gives `mutedText` 4.33:1 on `popover`
 *    against 6.29:1 on `surface`, and `dangerText` 3.13:1 — all below AA. The
 *    feedback line's tints are composited into `surface` by construction, too.
 *    So the ground stays `surface` (tinted with the tone, exactly as
 *    `AlertV4 variant="subtle"`) and the "above the page" claim is made by
 *    `elevation` — by depth, which is what depth is for, rather than by hue.
 *
 * Where the web twin portals to `<body>`, native renders the stack in an
 * absolutely-positioned, top-anchored overlay with `pointerEvents="box-none"`
 * so it never blocks the app beneath it. With nothing to show, the overlay is
 * not rendered at all (§12 — every component survives its empty state).
 */
export declare function ToastProviderV4({ children }: ToastProviderV4Props): React.ReactElement;
//# sourceMappingURL=ToastProviderV4.d.ts.map