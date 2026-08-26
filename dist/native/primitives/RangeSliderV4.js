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
exports.RangeSliderV4 = RangeSliderV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("./internal/color");
const picker_v4_1 = require("./internal/picker-v4");
/**
 * **V4 two-thumb slider** — the same props as {@link RangeSlider}, a different
 * design line.
 *
 * ## Same §36.4 rule as `SliderV4`, twice over
 *
 * No `Animated` value, no timing function: both thumbs are drawn where their
 * values are, on every render, and the values are emitted from the gesture on
 * every move. A range slider is the control where a canned animation is most
 * obviously wrong — you are usually adjusting one end while watching the span
 * between them change.
 *
 * ## Grab the nearer thumb, then move by delta
 *
 * The base picks the nearer thumb at grant (right) and then reads
 * `nativeEvent.locationX` on every move (wrong): `locationX` is relative to the
 * view under the touch, which once the drag begins is usually a thumb rather
 * than the track, so the value is measured from the wrong origin and the thumb
 * slides away from the finger.
 *
 * V4 keeps the nearer-thumb rule and switches the tracking to
 * `gestureState.dx` on top of the value that thumb was grabbed at. Delta is
 * screen-space and cannot be knocked off by which child the finger is over.
 *
 * ## The two thumbs stay distinguishable
 *
 * Each carries its own `adjustable` role, its own label, and its own
 * increment/decrement actions, so a screen-reader user can move either end —
 * the base exposes the pair with no way to operate them at all. The low thumb
 * can never pass the high one, and vice versa, so a crossed range is not
 * representable.
 *
 * Everything visual is `SliderV4`'s: the grab strip at `tapTarget()`, a rail
 * with weight so the span reads as a quantity (§33), thumbs at `spacing.lg`
 * with a `surface` collar and `elevation.card` — the one honest use of depth
 * here, already zeroed by the compiler for a flat seed.
 */
function RangeSliderV4({ value, min = 0, max = 100, step = 1, onChange, disabled = false, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const strip = (0, picker_v4_1.tapTarget)(theme);
    const thumb = tokens.spacing.lg;
    const rail = tokens.spacing.sm;
    const halo = tokens.spacing.xs;
    const [width, setWidth] = React.useState(0);
    const [dragging, setDragging] = React.useState(null);
    const widthRef = React.useRef(0);
    const valueRef = React.useRef(value);
    valueRef.current = value;
    const onChangeRef = React.useRef(onChange);
    onChangeRef.current = onChange;
    const disabledRef = React.useRef(disabled);
    disabledRef.current = disabled;
    const rangeRef = React.useRef({ min, max, step });
    rangeRef.current = { min, max, step };
    /** Which thumb the gesture grabbed, and the value it started from. */
    const grabRef = React.useRef({ index: 0, from: 0 });
    const clampSnap = React.useCallback((v) => {
        const r = rangeRef.current;
        const clamped = Math.max(r.min, Math.min(r.max, v));
        const snapped = Math.round((clamped - r.min) / r.step) * r.step + r.min;
        return Math.max(r.min, Math.min(r.max, snapped));
    }, []);
    const ratioOf = React.useCallback((v) => {
        const r = rangeRef.current;
        return r.max > r.min ? Math.max(0, Math.min(1, (v - r.min) / (r.max - r.min))) : 0;
    }, []);
    const usableOf = (w) => Math.max(0, w - thumb);
    /** Emit an ordered pair: the moving end can never pass the other. */
    const emitAt = React.useCallback((index, next) => {
        const [lo, hi] = valueRef.current;
        if (index === 0)
            onChangeRef.current?.([Math.min(next, hi), hi]);
        else
            onChangeRef.current?.([lo, Math.max(next, lo)]);
    }, []);
    const responder = React.useMemo(() => react_native_1.PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (e) => {
            if (disabledRef.current)
                return;
            const r = rangeRef.current;
            const usable = usableOf(widthRef.current);
            const x = e.nativeEvent.locationX;
            const [lo, hi] = valueRef.current;
            // Whichever thumb is nearer the tap is the one that moves.
            const loX = ratioOf(lo) * usable + thumb / 2;
            const hiX = ratioOf(hi) * usable + thumb / 2;
            const index = Math.abs(x - loX) <= Math.abs(x - hiX) ? 0 : 1;
            const ratio = usable > 0 ? Math.max(0, Math.min(1, (x - thumb / 2) / usable)) : 0;
            const next = clampSnap(r.min + ratio * (r.max - r.min));
            grabRef.current = { index, from: next };
            setDragging(index);
            emitAt(index, next);
        },
        onPanResponderMove: (_e, g) => {
            if (disabledRef.current)
                return;
            const r = rangeRef.current;
            const usable = usableOf(widthRef.current);
            if (usable <= 0)
                return;
            const { index, from } = grabRef.current;
            const delta = (g.dx / usable) * (r.max - r.min);
            emitAt(index, clampSnap(from + delta));
        },
        onPanResponderRelease: () => setDragging(null),
        onPanResponderTerminate: () => setDragging(null),
    }), [clampSnap, emitAt, ratioOf, thumb]);
    const usable = usableOf(width);
    const loRatio = ratioOf(value[0]);
    const hiRatio = ratioOf(value[1]);
    const nudge = (index, direction) => {
        if (disabled)
            return;
        emitAt(index, clampSnap(value[index] + direction * step));
    };
    const handle = (index, ratio, label) => ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: {
                    position: 'absolute',
                    top: (strip - thumb) / 2 - halo,
                    left: ratio * usable - halo,
                    width: thumb + halo * 2,
                    height: thumb + halo * 2,
                    borderRadius: tokens.radius.full,
                    backgroundColor: dragging === index ? (0, color_1.withAlpha)(colors.primary, 0.18) : 'transparent',
                } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "adjustable", accessibilityLabel: label, accessibilityValue: { min, max, now: value[index] }, accessibilityState: { disabled }, accessibilityActions: [{ name: 'increment' }, { name: 'decrement' }], onAccessibilityAction: (event) => {
                    if (event.nativeEvent.actionName === 'increment')
                        nudge(index, 1);
                    if (event.nativeEvent.actionName === 'decrement')
                        nudge(index, -1);
                }, style: [
                    (0, picker_v4_1.elevationStyle)(theme.elevation.card),
                    {
                        position: 'absolute',
                        top: (strip - thumb) / 2,
                        left: ratio * usable,
                        width: thumb,
                        height: thumb,
                        borderRadius: tokens.radius.full,
                        backgroundColor: colors.primary,
                        // A surface-coloured collar, so a thumb reads on top of the span.
                        borderWidth: 2,
                        borderColor: colors.surface,
                    },
                ] })] }, label));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { ...responder.panHandlers, onLayout: (e) => {
            const w = e.nativeEvent.layout.width;
            widthRef.current = w;
            setWidth(w);
        }, style: [
            {
                width: '100%',
                height: strip,
                justifyContent: 'center',
                opacity: disabled ? theme.state.disabledContent : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    height: rail,
                    borderRadius: tokens.radius.full,
                    backgroundColor: colors.border,
                } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: {
                    position: 'absolute',
                    top: (strip - rail) / 2,
                    left: thumb / 2 + loRatio * usable,
                    width: Math.max(0, (hiRatio - loRatio) * usable),
                    height: rail,
                    borderRadius: tokens.radius.full,
                    backgroundColor: colors.primary,
                } }), handle(0, loRatio, 'Range minimum'), handle(1, hiRatio, 'Range maximum')] }));
}
//# sourceMappingURL=RangeSliderV4.js.map