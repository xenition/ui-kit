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
const react_native_1 = require("react-native");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const feedback_v4_1 = require("../../primitives/internal/feedback-v4");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const theme_1 = require("../theme");
const IconV4_1 = require("./IconV4");
const TextV4_1 = require("./TextV4");
const surface_v4_1 = require("./internal/surface-v4");
const motion_v4_1 = require("./internal/motion-v4");
const state_v4_1 = require("./internal/state-v4");
const useReducedMotion_1 = require("./internal/useReducedMotion");
const Toast_1 = require("./Toast");
/**
 * The one thing this file is not allowed to get wrong.
 *
 * `useToast()` must keep working under `ToastProviderV4`. If V4 declared its
 * own `React.createContext`, every component that already calls `useToast()`
 * would read the BASE context — find nothing — and throw "useToast must be used
 * within <ToastProvider>", or worse, silently pick up a stale provider higher
 * in the tree. Two contexts for one API is not a styling difference; it is a
 * broken app.
 *
 * `Toast.tsx` does not export its `ToastContext`, and this component may not
 * edit `Toast.tsx`. So the context is **recovered** instead of duplicated:
 * `ToastProvider` is a function component whose entire return value is
 * `<ToastContext.Provider>…</ToastContext.Provider>`, and a React element
 * carries the component it will render on `element.type`. Invoking the base
 * function here — inside a real render, where a hook dispatcher is installed —
 * hands back that element, and `element.type` **is** the very provider
 * `useToast()`'s `useContext` reads from. Not a copy of it: the same object,
 * from the same module instance.
 *
 * Three properties make this safe rather than clever:
 *
 * 1. **It is called unconditionally, on every render.** Inlining a component
 *    function runs its hooks on *this* fiber, so the call has to sit in a fixed
 *    position in the hook order. It does — first, always. The base's hook list
 *    (`useXenitionTheme`, `useSafeAreaInsets`, `useState`, two `useRef`s, two
 *    `useCallback`s, `useEffect`, `useMemo`) has no branches, so the count
 *    never varies. Its two context reads are the same two this component makes
 *    anyway, so the probe adds no requirement the V4 provider did not already
 *    have — it needs a `XenitionNativeThemeProvider` and a `SafeAreaProvider`
 *    above it either way.
 * 2. **Nothing the probe produces is used.** Its state is never written, its
 *    `toast`/`dismiss` are discarded, and the element tree it returns is never
 *    mounted. Its timer-cleanup effect runs against an empty map.
 * 3. **The result is memoised at module scope.** `ToastContext.Provider` is a
 *    module-level object, so it is the same on every call and can be resolved
 *    once for the process.
 *
 * The alternative — nesting the real `<ToastProvider>` and painting on top —
 * does not work: the provider owns the item list in private state and exposes
 * only `toast`/`dismiss`, so there is no way for a V4 viewport to learn what is
 * currently showing, and the base's own (unstyled) stack would render anyway.
 */
let sharedToastProvider = null;
function useSharedToastProvider() {
    const probe = Toast_1.ToastProvider({
        children: null,
    });
    if (sharedToastProvider === null) {
        sharedToastProvider = probe.type;
    }
    return sharedToastProvider;
}
/**
 * The minimum touch target, in device-independent pixels.
 *
 * §10.1 allows exactly this: a named control metric with a comment. WCAG 2.2
 * 2.5.8 sets 24×24 as the floor and §46/§2 of the house spec hold the kit to
 * 44, which is also Apple's HIG number and the one `IconV4`'s badge already
 * uses. The base's dismiss was a bare `✕` glyph with `hitSlop={8}` — an
 * invisible margin that grows the touch area but not the *visible* control, so
 * the affordance stayed roughly 16pt tall and the extra 8 did not clear 44 in
 * either axis. A real minimum size does both jobs at once.
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
 * The widest a toast is allowed to get, as a multiple of the spacing scale.
 *
 * The base hard-coded `maxWidth: 420`, a number with nothing to compare it to
 * that does not move when the seed's spacing does. `2xl × 8` re-scales with the
 * seed and matches what the web twin composes with
 * `calc(var(--xen-space-2xl)*8)`, so the two twins are the same width.
 */
const MAX_WIDTH_STEPS = 8;
/**
 * How far a toast travels on arrival, as a step on the spacing scale.
 *
 * Small on purpose: §36.5 asks travel to be proportional to the distance the
 * thing actually moved, and a toast appears just above where it lands.
 */
const TRAVEL_STEP = 'lg';
/** The ground a toast wears, and the tone at full strength on its leading edge. */
function toneStyle(theme, tone) {
    const slot = feedback_v4_1.TONE_SLOTS[tone].fill;
    return {
        // Composited to an OPAQUE hex, not a translucent wash: a 10% alpha tint is
        // a different colour on a card, on a sheet and on the page, and the label
        // on top of it promises AA against exactly one of the three. See
        // `feedback-v4` — this is `AlertV4 variant="subtle"`, the same recipe.
        backgroundColor: (0, v4_depth_1.mixToken)(theme.colors.surface, theme.colors[slot], feedback_v4_1.TINT),
        borderColor: theme.colors.border,
        borderLeftColor: theme.colors[slot],
    };
}
/**
 * One toast card.
 *
 * Split out because it owns an entrance animation, and an `Animated.Value` per
 * item cannot live in the provider's own hook list.
 */
function ToastCardV4({ item, onDismiss, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const [held, setHeld] = React.useState(false);
    const enter = React.useRef(new react_native_1.Animated.Value(0)).current;
    const tone = item.tone ?? 'info';
    React.useEffect(() => {
        // A toast arrives from off the top edge, so it is an arrival: `enter` with
        // M3's emphasized-decelerate, the same pairing the V4 surface line gives a
        // sheet. Under Reduce Motion the travel is dropped and the fade is short
        // (§36.10) — removing the transition entirely makes the toast read as a
        // rendering glitch rather than as a new message.
        react_native_1.Animated.timing(enter, {
            toValue: 1,
            duration: reduced ? motion_v4_1.V4_MOTION.standard : motion_v4_1.V4_MOTION.enter,
            easing: motion_v4_1.EASING_ENTER,
            useNativeDriver: true,
        }).start();
    }, [enter, reduced]);
    const travel = tokens.spacing[TRAVEL_STEP];
    const isDanger = tone === 'danger';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View
    // The base announced every toast politely, so a failure interrupted
    // nothing. Danger is urgent and interrupts; the rest stay polite.
    , { 
        // The base announced every toast politely, so a failure interrupted
        // nothing. Danger is urgent and interrupts; the rest stay polite.
        accessibilityRole: isDanger ? 'alert' : 'summary', accessibilityLiveRegion: isDanger ? 'assertive' : 'polite', style: [
            {
                width: '100%',
                maxWidth: tokens.spacing['2xl'] * MAX_WIDTH_STEPS,
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                padding: tokens.spacing.md,
                // 1 is the hairline §10.1 allows as a bare number; the leading rule
                // is a spacing step, so the tone is identified before a word is read.
                borderWidth: 1,
                borderLeftWidth: tokens.spacing.xs,
                opacity: enter,
                transform: reduced
                    ? []
                    : [
                        {
                            translateY: enter.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-travel, 0],
                            }),
                        },
                    ],
            },
            toneStyle(theme, tone),
            // `elevation.sheet` off the compiled theme — a toast is a floating
            // panel above scrolling content, which is what that level is for. Under
            // `depth: 'flat'` the compiler has already zeroed the token, so this is
            // an invisible shadow and there is no branch here.
            (0, surface_v4_1.elevationStyle)(theme.elevation.sheet),
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [item.title != null ? (typeof item.title === 'string' ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", face: "heading", tone: "onSurface", children: item.title })) : (item.title)) : null, item.description != null ? (typeof item.description === 'string' ? (
                    // `mutedText`, never `muted` — see the provider's doc comment.
                    (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: item.description })) : (item.description)) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Dismiss", onPressIn: () => setHeld(true), onPressOut: () => setHeld(false), onPress: () => onDismiss(item.id), style: [
                    {
                        minWidth: TAP_TARGET_PX,
                        minHeight: TAP_TARGET_PX,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: tokens.radius.sm,
                    },
                    // M3's state layer: the control's own ink at the pressed opacity,
                    // laid over whatever is behind. Ground-independent, which matters
                    // here — the card's ground is a tone tint the button does not own.
                    // The base dimmed nothing at all and gave no press feedback; the web
                    // base swapped the glyph's colour, which is the signal M3 spends
                    // `0.38` on to mean disabled.
                    held ? { backgroundColor: (0, state_v4_1.pressLayer)(theme, colors.onSurface) } : null,
                ], children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "close", size: "sm", color: "mutedText" }) })] }));
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
function ToastProviderV4({ children }) {
    // MUST stay first and unconditional — see `useSharedToastProvider`.
    const SharedProvider = useSharedToastProvider();
    const { tokens } = (0, theme_1.useXenitionTheme)();
    // Offset the top-anchored viewport below the status bar / notch. Needs a
    // `SafeAreaProvider` above it (Expo default), exactly as the base does.
    const insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
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
    React.useEffect(() => {
        const map = timers.current;
        return () => {
            map.forEach((timer) => clearTimeout(timer));
            map.clear();
        };
    }, []);
    const value = React.useMemo(() => ({ toast, dismiss }), [toast, dismiss]);
    return ((0, jsx_runtime_1.jsxs)(SharedProvider, { value: value, children: [children, items.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "box-none", style: {
                    position: 'absolute',
                    top: tokens.spacing.xl + insets.top,
                    left: 0,
                    right: 0,
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                }, children: items.map((item) => ((0, jsx_runtime_1.jsx)(ToastCardV4, { item: item, onDismiss: dismiss }, item.id))) })) : null] }));
}
//# sourceMappingURL=ToastProviderV4.js.map