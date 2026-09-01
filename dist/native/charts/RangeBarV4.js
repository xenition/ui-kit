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
exports.RangeBarV4 = RangeBarV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const v4_chart_1 = require("../../primitives/internal/v4-chart");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const TextV4_1 = require("../primitives/TextV4");
const motion_v4_1 = require("../primitives/internal/motion-v4");
const nav_v4_1 = require("../primitives/internal/nav-v4");
const useReducedMotion_1 = require("../primitives/internal/useReducedMotion");
const theme_1 = require("../theme");
const internal_v4_1 = require("./internal-v4");
/** Where a domain value falls on the track, as a fraction in `[0, 1]`. */
function position(value, domainMin, span) {
    if (!Number.isFinite(value) || span <= 0)
        return 0;
    return Math.min(Math.max((value - domainMin) / span, 0), 1);
}
/** The sentence a screen reader gets (brief §1 rule 6, §4.8). */
function rangeBarLabel(lo, hi, domainMin, domainMax, title, format) {
    const head = `Range bar${title ? `, ${title}` : ''}`;
    const range = lo === hi ? format(lo) : `${format(lo)} to ${format(hi)}`;
    return `${head}, ${range}, on a scale of ${format(domainMin)} to ${format(domainMax)}`;
}
/**
 * The entrance reveal (brief §4.7), as an opacity ramp. See the note in
 * `BarChartV4` for why native fades where web wipes, and why the hook is local
 * to each file for the length of this pass.
 */
function useChartRevealV4(animate) {
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const progress = React.useRef(new react_native_1.Animated.Value(animate ? 0 : 1)).current;
    React.useEffect(() => {
        if (!animate) {
            progress.setValue(1);
            return undefined;
        }
        const anim = react_native_1.Animated.timing(progress, {
            toValue: 1,
            duration: reduced ? motion_v4_1.V4_MOTION.standard : motion_v4_1.V4_MOTION.enter,
            easing: reduced ? motion_v4_1.EASING_STANDARD : motion_v4_1.EASING_ENTER,
            useNativeDriver: true,
        });
        anim.start();
        return () => anim.stop();
    }, [animate, reduced, progress]);
    return progress;
}
/**
 * **V4 floating bar (native)** — one band, `start` to `end`, on a domain.
 *
 * **This is the one bar form rounded at both ends**, and the reason is worth
 * stating because it is the exception that proves brief §4.4's rule. Every
 * other bar in this family has a baseline: it grows from zero, and rounding the
 * end it grows *from* lifts it off its own axis. A range bar has no baseline.
 * Both of its ends are data — `start` is as much a measurement as `end` — so
 * `CHART_MARK.endRadius` applies to both, and a square end here would read as a
 * bar that had been clipped rather than one that had been measured.
 *
 * What the base got wrong:
 *
 * - **`colors.border` as the track.** A hairline colour doing a fill's job, and
 *   one that does not follow the scheme the way the derived chrome neutral
 *   does. The track is `palette.grid` (brief §3.3).
 * - **No axis at all.** The range floats on a grey pill with nothing to read it
 *   against. V4 draws the domain axis at `palette.axis`, one step more present
 *   than the track behind it.
 * - **`color = 'primary'` as an identity.** A semantic slot standing in for a
 *   series colour, which is what brief §1 rule 2 exists to retire. Slot 1, or a
 *   `tone` that means something.
 * - **`radius.full` on the track and the fill.** Seed-dependent: on a `sharp`
 *   seed both compile to 0 and the range loses its ends entirely.
 *   `CHART_MARK.endRadius` is the mark spec and does not move with the seed.
 * - **`Math.max(domainMax - domainMin, 1)` as the divisor.** A collapsed or
 *   inverted domain then draws a confident-looking band at an arbitrary place.
 *   V4 renders the empty state instead, at the same footprint (brief §4.5).
 * - **A zero-width range drawn as nothing.** `start === end` is a real reading
 *   — a distribution collapsed to one value — so the mark floors at
 *   `CHART_MARK.dotSize`, this line's smallest painted point.
 *
 * The value labels sit **under the axis** rather than floating over the mark:
 * centring an unmeasured label over a percentage offset is not something React
 * Native can do without measuring first, and a twin pair where one platform
 * labels in place and the other labels underneath is a parity break dressed up
 * as a platform difference.
 */
function RangeBarV4({ start, end, domainMin = 0, domainMax = 100, height = 10, tone, showValues = true, format = String, title, summary, caption, loading = false, emptyLabel = 'No data', animate = true, tooltip = true, onSelect, accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const palette = (0, internal_v4_1.useChartPaletteV4)();
    const progress = useChartRevealV4(animate);
    const [pressed, setPressed] = React.useState(false);
    const lo = Math.min(start, end);
    const hi = Math.max(start, end);
    const label = accessibilityLabel ?? rangeBarLabel(lo, hi, domainMin, domainMax, title, format);
    const fill = tone ? colors[tone] : (0, internal_v4_1.chartSlotColor)(palette, 0);
    const header = title || summary || caption ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [title ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", numberOfLines: 1, children: title })) : null, summary ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", weight: "bold", numeric: "tabular", children: summary })) : null, caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: caption })) : null] })) : null;
    const frame = (children) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: label, style: [{ gap: tokens.spacing.sm }, style], children: [header, children] }));
    if (loading)
        return frame((0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: "100%", height: height }));
    const span = domainMax - domainMin;
    if (!Number.isFinite(lo) || !Number.isFinite(hi) || !Number.isFinite(span) || span <= 0) {
        return frame((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: emptyLabel }) }));
    }
    const left = position(lo, domainMin, span);
    const right = position(hi, domainMin, span);
    const showRange = showValues || (tooltip && pressed);
    return frame((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { testID: "xen-v4-range-hit", accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", onPress: () => {
                    setPressed((current) => !current);
                    onSelect?.(lo, hi);
                }, style: { minHeight: (0, nav_v4_1.minTap)(tokens.spacing), justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { testID: "xen-v4-chart-track", style: {
                        height,
                        backgroundColor: palette.grid,
                        borderRadius: v4_chart_1.CHART_MARK.endRadius,
                        opacity: progress,
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-v4-range", style: {
                            position: 'absolute',
                            top: 0,
                            left: `${left * 100}%`,
                            width: `${(right - left) * 100}%`,
                            height: '100%',
                            // A range of zero width is a point, and a point in this line is
                            // `dotSize` — below that it stops reading as a mark at all.
                            minWidth: v4_chart_1.CHART_MARK.dotSize,
                            backgroundColor: fill,
                            // Both ends, and only here: neither end of a range is a baseline.
                            borderRadius: v4_chart_1.CHART_MARK.endRadius,
                        } }) }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-v4-chart-axis", style: { height: 1, backgroundColor: palette.axis } }), showRange ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: format(domainMin) }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { testID: "xen-v4-chart-value", size: "xs", tone: "mutedText", weight: "semibold", numeric: "tabular", children: lo === hi ? format(lo) : `${format(lo)}–${format(hi)}` }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: format(domainMax) })] })) : null] }));
}
//# sourceMappingURL=RangeBarV4.js.map