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
exports.XenitionNativeMotionContext = void 0;
exports.XenitionNativeThemeProviderV4 = XenitionNativeThemeProviderV4;
exports.useXenitionMotionPreference = useXenitionMotionPreference;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Internal wiring, exported because `internal/useReducedMotion.ts` reads it to
 * decide whether a V4 root is holding the subscription. `null` means no V4
 * provider is mounted, and every hook falls back to its own listener.
 *
 * Prefer {@link useXenitionMotionPreference} in app code.
 */
exports.XenitionNativeMotionContext = React.createContext(null);
/** Not-yet-answered: suppress motion, and say so. */
const UNRESOLVED = { reducedMotion: true, resolved: false };
/**
 * **V4 root provider** — a superset of {@link XenitionNativeThemeProvider},
 * with no visual output of its own. It takes the same `theme` / `scheme` props
 * and composes the base provider verbatim, so `useXenitionTheme()` works
 * underneath exactly as it does today: same seed compilation, same
 * `scheme ?? (seed.mode === 'dark' ? 'dark' : 'light')` default, same context.
 *
 * What it adds is the thing 34 V4 components were each doing for themselves.
 * `useReducedMotion()` reads `AccessibilityInfo` per call site, which means a
 * screen with twenty V4 components holds twenty duplicate OS listeners and
 * makes twenty duplicate async reads — but the waste is the small half of the
 * problem. The hook starts at `false` (motion ON) and only flips once its
 * promise resolves, so on a device with Reduce Motion enabled **the entry
 * animations play once, on first mount, before the real value arrives.** That
 * is an accessibility defect: design.md §36.10 and every V4 component's
 * reduced-motion branch are load-bearing precisely for the users who then see
 * the animation anyway.
 *
 * So this provider resolves the preference once, for the whole tree, and holds
 * the first paint until it has an answer. Two invariants follow, and both are
 * deliberate:
 *
 * 1. **It never reports motion-on before it knows.** The pre-answer value is
 *    `reducedMotion: true`. Guessing wrong in that direction costs a
 *    non-reduce-motion user at most one skipped entry animation; guessing
 *    wrong in the other direction is the defect above.
 * 2. **One listener, one read.** Every `useReducedMotion()` below this
 *    provider reads the context instead of subscribing, so mounting fifty
 *    animated components costs one `reduceMotionChanged` subscription. With no
 *    V4 provider mounted the hook is byte-for-byte what it always was.
 *
 * Nothing else is hoisted here. The OS motion toggle is the only per-component
 * recomputation in the native layer worth centralising — appearance, elevation
 * and the state layers are pure functions of tokens the base already provides,
 * and moving them would buy nothing but surface.
 *
 * ```tsx
 * <XenitionNativeThemeProviderV4 theme={seed} scheme={useColorScheme() ?? undefined}>
 *   <App />
 * </XenitionNativeThemeProviderV4>
 * ```
 */
function XenitionNativeThemeProviderV4({ theme, scheme, reducedMotion, gateFirstPaint = true, design = 'v4', children, }) {
    // `null` until AccessibilityInfo answers. Kept separate from the forced prop
    // so toggling the prop back to `undefined` re-reads the OS rather than
    // stranding the tree on a stale forced value.
    const [observed, setObserved] = React.useState(null);
    React.useEffect(() => {
        // An explicit `reducedMotion` means the app owns the answer: no OS read,
        // no listener, nothing to clean up.
        if (reducedMotion !== undefined)
            return;
        let mounted = true;
        react_native_1.AccessibilityInfo.isReduceMotionEnabled()
            .then((value) => {
            if (mounted)
                setObserved(value);
        })
            .catch(() => {
            // Older platforms may reject. Treat as motion-on — matching the
            // standalone hook — and resolve, so the gate can never hang on a
            // platform that simply has no answer to give.
            if (mounted)
                setObserved(false);
        });
        const sub = react_native_1.AccessibilityInfo.addEventListener('reduceMotionChanged', (value) => setObserved(value));
        return () => {
            mounted = false;
            // RN >= 0.65 returns a subscription with `.remove()`.
            sub?.remove?.();
        };
    }, [reducedMotion]);
    const motion = React.useMemo(() => {
        if (reducedMotion !== undefined)
            return { reducedMotion, resolved: true };
        if (observed === null)
            return UNRESOLVED;
        return { reducedMotion: observed, resolved: true };
    }, [reducedMotion, observed]);
    const gated = gateFirstPaint && !motion.resolved;
    return ((0, jsx_runtime_1.jsx)(theme_1.XenitionNativeThemeProvider, { theme: theme, scheme: scheme, children: (0, jsx_runtime_1.jsx)(theme_1.DesignLineProvider, { design: design, children: (0, jsx_runtime_1.jsx)(exports.XenitionNativeMotionContext.Provider, { value: motion, children: gated ? null : children }) }) }));
}
/**
 * The tree's resolved motion preference.
 *
 * Throws outside a {@link XenitionNativeThemeProviderV4}, matching
 * `useXenitionTheme()`: a screen that branches on `resolved` is asking a
 * question only this provider can answer, and a silent default would hand it a
 * confident-looking lie. Components that only need the boolean should keep
 * calling `useReducedMotion()`, which works with or without a V4 root.
 */
function useXenitionMotionPreference() {
    const value = React.useContext(exports.XenitionNativeMotionContext);
    if (value === null) {
        throw new Error('useXenitionMotionPreference must be used inside <XenitionNativeThemeProviderV4 theme={...}>.');
    }
    return value;
}
//# sourceMappingURL=XenitionNativeThemeProviderV4.js.map