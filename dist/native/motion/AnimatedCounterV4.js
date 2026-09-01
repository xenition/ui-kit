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
exports.COUNT_MS = void 0;
exports.AnimatedCounterV4 = AnimatedCounterV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const motion_v4_1 = require("../primitives/internal/motion-v4");
const useReducedMotion_1 = require("../primitives/internal/useReducedMotion");
const theme_1 = require("../theme");
/**
 * The default count duration, in ms — **deliberately not from the scale**.
 *
 * Brief §2 draws the line this constant sits on. The M3 scale governs a
 * *transition*: a thing moving from one state to another, where the duration is
 * a property of the interface. A counter is *playback*: the duration is a
 * property of the content. A count from 0 to 12 and a count from 0 to 4,000,000
 * are not the same event, and forcing both onto `enter` (400ms) would make the
 * first feel frantic and the second illegible. So the number stays a caller
 * decision and this is only a starting point — the base's 1500, kept because it
 * is defensible and because the web twin has to agree with it (brief §3
 * rule 4).
 *
 * The **easing** is a different question and does come from the scale: see the
 * component note.
 */
exports.COUNT_MS = 1500;
const defaultFormat = (value) => Math.round(value).toLocaleString('en-US');
/**
 * **V4 animated counter (native)** — the twin of the web `AnimatedCounterV4`.
 *
 * 1. **The easing comes from the scale; the duration does not.** The base ran
 *    `Easing.out(Easing.cubic)`, which `motion-v4.ts` names by hand as "what
 *    the line reached for when it needed something decelerating" — a fourth
 *    curve in a system that publishes three. {@link EASING_ENTER} is M3's
 *    emphasized-decelerate, and a number arriving at its value is an arrival
 *    (brief §2). It is the same four control points the web twin hands to
 *    `cubic-bezier()`, so the two counts trace the same arc. The duration stays
 *    the caller's — see {@link COUNT_MS}.
 * 2. **The value is announced once, at the end.** The base said nothing to
 *    assistive tech: a `Text` whose content changed sixty times a second, with
 *    no label and no live region. The naive fix is worse than the silence —
 *    `accessibilityLiveRegion="polite"` on a ticking counter is a screen reader
 *    reading hundreds of intermediate numbers, none of which was ever true. So
 *    the region stays `"none"` for the whole count and flips to `"polite"` on
 *    the last frame, when the text and the label finally agree; and
 *    `accessibilityLabel` carries the **final** value throughout, so a reader
 *    that lands on this element mid-count hears the number the caller meant
 *    rather than whichever frame it caught. Under reduced motion both are true
 *    from the first render.
 *
 * Reduced motion keeps the base's behaviour and does **not** take brief §3
 * rule 3's fade: that rule replaces a *spatial move* with a fade so nothing
 * appears without a transition. Nothing appears here — the element is on screen
 * throughout and only its text changes — so the honest reduction is to skip the
 * playback and show the final value, which is also what the number is for.
 *
 * `useNativeDriver: false`, unchanged and unavoidable: the animated value has
 * to be read on the JS thread to be formatted into text each frame.
 *
 * The `onSurface`-first / caller-`style`-second colour order is the base's, and
 * kept for the base's reason: React Native `Text` does not inherit colour from
 * a `View` ancestor, so a counter with no colour of its own is black — fine on
 * a light surface, 1.29:1 on a dark one.
 */
function AnimatedCounterV4({ to, from = 0, duration = exports.COUNT_MS, format = defaultFormat, style, }) {
    const { colors } = (0, theme_1.useXenitionTheme)();
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const anim = React.useRef(new react_native_1.Animated.Value(from)).current;
    const [value, setValue] = React.useState(from);
    const [settled, setSettled] = React.useState(false);
    React.useEffect(() => {
        if (reduced || duration <= 0) {
            setValue(to);
            setSettled(true);
            return undefined;
        }
        setSettled(false);
        anim.setValue(from);
        const id = anim.addListener(({ value: v }) => setValue(v));
        const animation = react_native_1.Animated.timing(anim, {
            toValue: to,
            duration,
            easing: motion_v4_1.EASING_ENTER,
            useNativeDriver: false,
        });
        animation.start(({ finished }) => {
            if (finished) {
                setValue(to);
                setSettled(true);
            }
        });
        return () => {
            animation.stop();
            anim.removeListener(id);
        };
    }, [reduced, from, to, duration, anim]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { testID: "xen-v4-counter", accessibilityLabel: format(to), accessibilityLiveRegion: settled ? 'polite' : 'none', style: [{ color: colors.onSurface }, style], children: format(value) }));
}
//# sourceMappingURL=AnimatedCounterV4.js.map