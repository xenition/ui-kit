"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToastProviderV4 = ToastProviderV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_dom_1 = require("react-dom");
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const IconV4_1 = require("./IconV4");
const TextV4_1 = require("./TextV4");
const feedback_v4_1 = require("./internal/feedback-v4");
const v4_depth_1 = require("./internal/v4-depth");
const v4_motion_1 = require("./internal/v4-motion");
const v4_state_1 = require("./internal/v4-state");
const Toast_1 = require("./Toast");
/**
 * `useToast()` must keep working under `ToastProviderV4`, so this file provides
 * the **same** `ToastContext` the base declares rather than a second one. A
 * duplicate context is not a styling difference: every component already
 * calling `useToast()` reads the base's context, would find nothing under a V4
 * provider, and would throw — or worse, silently bind to a stale provider
 * higher in the tree.
 *
 * `Toast.tsx` exports the context for exactly this, and keeps it out of the
 * package barrel so the public surface is unchanged.
 */
/**
 * The minimum touch target, in CSS pixels.
 *
 * §10.1 allows exactly this: a named control metric with a comment. WCAG 2.2
 * 2.5.8 sets 24×24 as the floor and §46/§2 of the house spec hold the kit to
 * 44, which is also Apple's HIG number and the one `IconV4`'s badge already
 * uses. The base's dismiss was a bare `×` character in a `<button>` with no
 * size at all — roughly 8×19px of hit area, on the control most likely to be
 * tapped in a hurry.
 *
 * It is interpolated into the injected sheet rather than written as a Tailwind
 * arbitrary value, so the number exists once, here.
 */
const TAP_TARGET_PX = 44;
/**
 * Auto-dismiss default, in milliseconds — the base's number, unchanged.
 *
 * Not on `V4_MOTION`, and deliberately so: M3's scale measures how long a thing
 * takes to move from one state to another. This is a *dwell* — how long a
 * message stays readable — which is a content decision, not a motion one, and
 * putting it on a 400ms motion token would make toasts unreadable.
 */
const DEFAULT_DURATION_MS = 4000;
/**
 * The stacking layer the viewport sits on.
 *
 * The V4 overlay line — `ModalV4`, `DrawerV4`, `BottomSheetV4`, `MenuV4`,
 * `TooltipV4` — all sit at `z-50`, the top of Tailwind's own ten-step ladder.
 * A toast has to survive *above* those: a "Saved" confirmation fired from
 * inside a dialog is worthless if the dialog covers it, and DOM order does not
 * help, because the provider mounts at the app root and so its portal node is
 * appended to `<body>` **before** any dialog's.
 *
 * So it is one step further, named here so it cannot drift. A z-index is a
 * stacking order rather than a spacing, a radius or a font size, so §10.1's
 * scale rule does not reach it — but the base's `z-[100]` was a number typed at
 * a call site with nothing to compare it to, which is the same defect one level
 * down.
 */
const TOAST_LAYER_CLASS = 'z-[60]';
/**
 * The widest a toast is allowed to get, composed from the spacing scale.
 *
 * The base used `max-w-sm` — 384px of Tailwind's own scale, which does not move
 * when the seed's spacing does. `2xl × 8` lands on the same 384 at the default
 * scale and re-scales with the seed, the same trick `TextV4`'s reading measure
 * uses.
 */
const TOAST_MAX_WIDTH_CLASS = 'max-w-[calc(var(--xen-space-2xl)*8)]';
/**
 * Per-tone ground and rule, taken from the shared feedback slot table so a
 * toast and an `AlertV4` cannot drift on what a tone means.
 *
 * This is `AlertV4`'s `subtle` treatment exactly — a 10% opaque `color-mix`
 * into `surface`, a hairline all round, and the tone at full strength on the
 * leading edge — because a toast and an alert are the same statement at two
 * durations, and §35.4 says the colour IS the content. The class names are
 * literal strings because Tailwind's scanner is static.
 */
const TONE = {
    info: { tint: (0, feedback_v4_1.tintArbitrary)(feedback_v4_1.TONE_SLOTS.info.fill), rule: 'border-l-primary' },
    success: { tint: (0, feedback_v4_1.tintArbitrary)(feedback_v4_1.TONE_SLOTS.success.fill), rule: 'border-l-success' },
    warn: { tint: (0, feedback_v4_1.tintArbitrary)(feedback_v4_1.TONE_SLOTS.warn.fill), rule: 'border-l-warn' },
    danger: { tint: (0, feedback_v4_1.tintArbitrary)(feedback_v4_1.TONE_SLOTS.danger.fill), rule: 'border-l-danger' },
};
/**
 * Everything a toast paints that a utility class bound to a token cannot say:
 * a `box-shadow` that has to follow `[data-theme="dark"]`, an entrance
 * keyframe, a touch-target floor derived from a named constant, and a focus
 * ring off the compiled ring geometry.
 *
 * Every colour in it is a custom property — a `--xen-*` token or a
 * `--xen-v4-*` this component derived from the compiled theme — so the kit's
 * no-literal-colours rule holds.
 *
 * ## Depth
 *
 * `shadow-lg` is Tailwind's shadow, not this kit's: it is a fixed rgba stack
 * that ignores the seed entirely, so a `depth: 'flat'` app still got a floating
 * card and a `depth: 'glass'` app got the wrong one. The shadow here is
 * `elevation.sheet` — a toast is a floating panel above scrolling content,
 * which is exactly what that level is for, and the same one `ModalV4`,
 * `DrawerV4` and `BottomSheetV4` take. Under `depth: 'flat'` the compiler has
 * already zeroed the token, so `shadowCss` returns an invisible shadow and
 * there is no branch at the call site.
 *
 * The `var(--xen-elevation-sheet)` fallback covers the no-provider path, where
 * there is no compiled theme to read but `toCssVars` output may still be on the
 * page; `none` covers the case where neither is.
 *
 * ## Motion
 *
 * A toast arrives from off the top edge, so it is an arrival: `V4_MOTION.enter`
 * with `EASE_ENTER` (M3 emphasized-decelerate), the same pairing the V4 surface
 * line gives a sheet. Under `prefers-reduced-motion` the travel is replaced by
 * a plain fade rather than removed — §36.10, and an element that simply blinks
 * into existence reads as a glitch.
 *
 * The dismiss button's transition is restated here at a higher specificity than
 * the shared state sheet's. Both say the same thing (`background-color` at
 * `V4_MOTION.quick`), but the two sheets are injected under different ids and
 * equal-specificity rules resolve by source order — so the more specific
 * selector removes the race, and adds `color` so the glyph follows if a caller
 * overrides it.
 */
const TOAST_V4_CSS = `
@keyframes xen-v4-toast-in {
  from { opacity: 0; transform: translateY(calc(var(--xen-space-lg) * -1)); }
  to { opacity: 1; transform: none; }
}
@keyframes xen-v4-toast-fade { from { opacity: 0; } to { opacity: 1; } }

[data-xen-v4-toast] {
  box-shadow: var(--xen-v4-toast-shadow-l, var(--xen-elevation-sheet, none));
  animation: xen-v4-toast-in ${v4_motion_1.V4_MOTION.enter}ms ${v4_motion_1.EASE_ENTER};
}
[data-theme="dark"] [data-xen-v4-toast] {
  box-shadow: var(--xen-v4-toast-shadow-d, var(--xen-elevation-sheet, none));
}
[data-xen-v4-toast-close] {
  min-width: ${TAP_TARGET_PX}px;
  min-height: ${TAP_TARGET_PX}px;
}
[data-xen-v4-toast] [data-xen-v4-toast-close] {
  transition: ${(0, v4_motion_1.transitionCss)(['color', 'background-color'], v4_motion_1.V4_MOTION.quick)};
}
[data-xen-v4-toast-close]:focus-visible {
  /* Ring geometry off the compiled tokens; the fallbacks are ButtonV4's
     shipped values, for the no-provider path where the vars are absent and an
     invalid declaration would drop the focus indicator entirely. */
  outline: var(--xen-ring-width, 2px) solid var(--xen-ring);
  outline-offset: var(--xen-ring-offset, 2px);
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-v4-toast] { animation: xen-v4-toast-fade ${v4_motion_1.V4_MOTION.standard}ms ${v4_motion_1.EASE_EXIT}; }
  [data-xen-v4-toast] [data-xen-v4-toast-close] { transition: none; }
}
`;
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
function ToastProviderV4({ children }) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    (0, inject_1.injectStyleOnce)('xen-v4-toast-styles', TOAST_V4_CSS);
    const theme = (0, v4_depth_1.useOptionalCompiledTheme)();
    const [items, setItems] = React.useState([]);
    const idRef = React.useRef(0);
    const timers = React.useRef(new Map());
    const dismiss = React.useCallback((id) => {
        const timer = timers.current.get(id);
        if (timer !== undefined) {
            clearTimeout(timer);
            timers.current.delete(id);
        }
        setItems((list) => list.filter((item) => item.id !== id));
    }, []);
    const toast = React.useCallback((options) => {
        const id = (idRef.current += 1);
        setItems((list) => [...list, { ...options, id }]);
        const duration = options.duration ?? DEFAULT_DURATION_MS;
        if (duration > 0) {
            timers.current.set(id, setTimeout(() => dismiss(id), duration));
        }
        return id;
    }, [dismiss]);
    // The web base leaves its `window.setTimeout`s running after unmount, which
    // fires `setItems` on a dead tree. The native base already cleaned up; this
    // brings the twins level. Purely internal — the API is untouched.
    React.useEffect(() => {
        const map = timers.current;
        return () => {
            map.forEach((timer) => clearTimeout(timer));
            map.clear();
        };
    }, []);
    const value = React.useMemo(() => ({ toast, dismiss }), [toast, dismiss]);
    // One shadow per scheme, handed down as element-scoped custom properties so
    // `[data-theme="dark"]` picks between them — the pattern `ButtonV4` set.
    const shadowVars = {};
    if (theme !== null) {
        shadowVars['--xen-v4-toast-shadow-l'] = (0, v4_depth_1.shadowCss)(theme.lightElevation.sheet);
        shadowVars['--xen-v4-toast-shadow-d'] = (0, v4_depth_1.shadowCss)(theme.darkElevation.sheet);
    }
    // §12 / §10.6 — the empty state. With nothing to show, the viewport is not
    // rendered at all: no portal, no fixed-position node over the page, nothing
    // for a screen reader to walk into.
    const stack = items.length === 0 || typeof document === 'undefined'
        ? null
        : (0, react_dom_1.createPortal)((0, jsx_runtime_1.jsx)("div", { "data-xen-v4-toast-viewport": "", className: (0, cn_1.cn)('pointer-events-none fixed inset-x-0 flex flex-col items-center', 'top-[var(--xen-space-lg)] gap-[var(--xen-space-sm)] px-[var(--xen-space-md)]', TOAST_LAYER_CLASS), children: items.map((item) => {
                const tone = item.tone ?? 'info';
                const t = TONE[tone];
                return ((0, jsx_runtime_1.jsxs)("div", { "data-xen-v4-toast": tone, role: tone === 'danger' ? 'alert' : 'status', style: shadowVars, className: (0, cn_1.cn)('pointer-events-auto flex w-full items-start', TOAST_MAX_WIDTH_CLASS, 'gap-[var(--xen-space-sm)] p-[var(--xen-space-md)]', 'rounded-[var(--xen-radius-md)]', 'border border-border border-l-[length:var(--xen-space-xs)]', `bg-[${t.tint}]`, t.rule), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-[var(--xen-space-xs)]", children: [item.title != null &&
                                    (typeof item.title === 'string' ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", face: "heading", tone: "onSurface", children: item.title })) : (item.title)), item.description != null &&
                                    (typeof item.description === 'string' ? (
                                    // `mutedText`, never `muted` — defect 1.
                                    (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: item.description })) : (item.description))] }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Dismiss", "data-xen-v4-toast-close": "", "data-xen-v4-state": "", onClick: () => dismiss(item.id), className: (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center leading-none', 'rounded-[var(--xen-radius-sm)] text-muted-text'), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "close", size: "sm", style: { color: 'inherit' } }) })] }, item.id));
            }) }), document.body);
    return ((0, jsx_runtime_1.jsxs)(Toast_1.ToastContext.Provider, { value: value, children: [children, stack] }));
}
//# sourceMappingURL=ToastProviderV4.js.map