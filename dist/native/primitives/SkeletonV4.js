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
exports.SkeletonV4 = SkeletonV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const feedback_v4_1 = require("../../primitives/internal/feedback-v4");
const useReducedMotion_1 = require("./internal/useReducedMotion");
/**
 * The two ends of the breath, both composited into `surface`.
 *
 * A placeholder has to sit clearly below real content in the hierarchy while
 * still reading as "something will be here". Eight and sixteen percent of
 * `onSurface` is the band that does that in both schemes — dark enough on a
 * light page to look like a filled shape, light enough on a dark one not to
 * look like a mistake.
 */
const REST = 0.08;
const PEAK = 0.16;
/**
 * **V4 skeleton** — same props as {@link Skeleton}, a different design line.
 *
 * ## The animation is not allowed to claim progress
 *
 * `design.md` §36.7 says loading feedback exists to reduce uncertainty and must
 * not fabricate precision. The usual skeleton treatment — a highlight sweeping
 * left to right — fails that quietly: a sweep *travels*, and travel across a
 * placeholder reads as loading moving through the content, which is a claim
 * about a request whose state the skeleton cannot see. V4 deliberately does not
 * add one. What it has is a symmetric fade, which says only "not yet", and that
 * is the entire truth available to this component.
 *
 * Under Reduce Motion the fade stops and the block rests at its brighter end
 * (§36.10) — still obviously a placeholder, just a still one.
 *
 * ## The block is opaque, at both ends of the breath
 *
 * The base animated `opacity` between 0.4 and 1 over a `muted` fill. That makes
 * the placeholder *translucent* for most of every cycle: on a plain page it
 * looks right, and on a filled card or a glass panel it turns into a window
 * showing whatever is behind it, at a different colour every 700ms.
 *
 * V4 fades one opaque colour over another instead — a second block at 16%
 * crossing over a first at 8%, both composited into `surface`. The visible
 * colour is always between two real theme colours, so the skeleton looks the
 * same wherever it lands, and the ground under it never shows through.
 *
 * `muted` was also the wrong token for a different reason: it is the kit's
 * de-emphasised **text** colour, sized for legibility of a word, not for a
 * field of it. A block of it is far heavier than the content it stands in for.
 *
 * ## Matching the layout
 *
 * §36.7 asks for a skeleton "when it matches actual layout", so the text line
 * takes its height from `typography.scale.sm` — the size of the line it is
 * standing in for — rather than from a number that happened to be 14.
 *
 * The whole tree is hidden from assistive technology. A screen reader should
 * hear the region's own busy state, never a list of empty boxes.
 */
function SkeletonV4({ variant = 'text', width, height, lines = 1, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const rest = (0, v4_depth_1.mixToken)(colors.surface, colors.onSurface, REST);
    const peak = (0, v4_depth_1.mixToken)(colors.surface, colors.onSurface, PEAK);
    const breath = React.useRef(new react_native_1.Animated.Value(0)).current;
    React.useEffect(() => {
        if (reduced) {
            breath.setValue(1);
            return;
        }
        const loop = react_native_1.Animated.loop(react_native_1.Animated.sequence([
            react_native_1.Animated.timing(breath, {
                toValue: 1,
                duration: feedback_v4_1.BUSY_MOTION.pulse,
                useNativeDriver: true,
            }),
            react_native_1.Animated.timing(breath, {
                toValue: 0,
                duration: feedback_v4_1.BUSY_MOTION.pulse,
                useNativeDriver: true,
            }),
        ]));
        loop.start();
        return () => loop.stop();
    }, [breath, reduced]);
    const radius = variant === 'circle'
        ? tokens.radius.full
        : variant === 'rect'
            ? tokens.radius.md
            : tokens.radius.sm;
    // The height of the line this block stands in for, not a number that happened
    // to be 14.
    const lineHeight = tokens.typography.scale.sm;
    const blockSize = tokens.spacing.xl + tokens.spacing.sm;
    const block = (key, w, h) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: w,
            height: h,
            borderRadius: radius,
            backgroundColor: rest,
            overflow: 'hidden',
        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { testID: "xen-v4-skeleton-peak", style: [
                react_native_1.StyleSheet.absoluteFillObject,
                { backgroundColor: peak, opacity: reduced ? 1 : breath },
            ] }) }, key));
    // A screen reader should hear the region's busy state, never a list of boxes.
    const hidden = {
        accessible: false,
        accessibilityElementsHidden: true,
        importantForAccessibility: 'no-hide-descendants',
    };
    if (variant === 'text' && lines > 1) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { ...hidden, style: [{ gap: tokens.spacing.sm }, style], children: Array.from({ length: lines }, (_, i) => block(i, i === lines - 1 ? '60%' : '100%', height ?? lineHeight)) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { ...hidden, style: style, children: block(0, width ?? (variant === 'text' ? '100%' : blockSize), height ?? (variant === 'text' ? lineHeight : blockSize)) }));
}
//# sourceMappingURL=SkeletonV4.js.map