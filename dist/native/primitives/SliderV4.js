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
exports.SliderV4 = SliderV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("./internal/color");
const picker_v4_1 = require("./internal/picker-v4");
/**
 * **V4 slider** — the same props as {@link Slider}, a different design line.
 *
 * ## §36.4 is the whole component
 *
 * "Direct manipulation must track the finger." Not "ends up where the finger
 * was" — *tracks*. So there is **no `Animated` value anywhere in this file, and
 * no timing function at all.** The thumb's position is derived from `value` on
 * every render, and `value` is emitted from the gesture on every move. The
 * thumb is where the finger is because it is drawn there, not because something
 * is animating towards there.
 *
 * The press halo obeys the same rule: it is on or it is off, painted in the
 * same render as the position that produced it. A 120ms fade on a halo attached
 * to a dragging thumb is a halo that trails the thumb, which is worse than
 * having none.
 *
 * ## Tracking by delta, not by coordinate
 *
 * The base reads `nativeEvent.locationX` on every move. `locationX` is relative
 * to the view the touch is currently over — and once the drag starts, that view
 * is often the thumb, not the track, so the reported position is measured from
 * the wrong origin and the thumb drifts away from the finger.
 *
 * V4 grabs once and moves by delta: the tap that starts the gesture sets the
 * value from the track (so tapping the rail still jumps there, which is the
 * behaviour everyone expects), and every subsequent move adds `gestureState.dx`
 * to the value it started from. Delta is measured in screen space and cannot be
 * knocked off by which child the finger happens to be over.
 *
 * ## What it looks like
 *
 *   - **A grab strip at `tapTarget()`.** The rail is thin, but the whole 48px
 *     strip is live. A 20px-tall control is the single most common reason a
 *     slider feels like it is ignoring you.
 *   - **A rail with weight.** `spacing.sm` rather than a hairline, so the
 *     filled portion is a quantity you can read at a glance (§33 — optimise for
 *     scanning) rather than a thread.
 *   - **A thumb that looks grabbable.** `spacing.lg` across, `primary` with a
 *     `surface` collar so it reads on top of its own fill, and
 *     `elevation.card` — the one place depth is honest here, because a knob
 *     genuinely is above the track. `flatten()` has already zeroed it for a
 *     flat seed, so no depth check is needed.
 *
 * ## Keyboard and assistive tech
 *
 * `adjustable` with real increment/decrement actions, so the control is
 * operable by a screen reader's swipe gestures and not only by dragging.
 */
function SliderV4({ value, min = 0, max = 100, step = 1, onValueChange, onChange, disabled = false, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    // Two spellings, one callback: the original wins when both are passed, so a
    // caller who has migrated half a file never gets the change reported twice.
    const emit = onValueChange ?? onChange;
    const strip = (0, picker_v4_1.tapTarget)(theme);
    const thumb = tokens.spacing.lg;
    const rail = tokens.spacing.sm;
    const halo = tokens.spacing.xs;
    const [width, setWidth] = React.useState(0);
    const [dragging, setDragging] = React.useState(false);
    // Latest values live in refs so the once-created PanResponder never goes stale.
    const widthRef = React.useRef(0);
    const emitRef = React.useRef(emit);
    emitRef.current = emit;
    const disabledRef = React.useRef(disabled);
    disabledRef.current = disabled;
    // The value the current gesture started from — everything after grant is a
    // delta on top of this, never an absolute coordinate.
    const grabbedRef = React.useRef(value);
    const rangeRef = React.useRef({ min, max, step });
    rangeRef.current = { min, max, step };
    const clampSnap = React.useCallback((v) => {
        const r = rangeRef.current;
        const clamped = Math.max(r.min, Math.min(r.max, v));
        const snapped = Math.round((clamped - r.min) / r.step) * r.step + r.min;
        return Math.max(r.min, Math.min(r.max, snapped));
    }, []);
    const usableOf = (w) => Math.max(0, w - thumb);
    const responder = React.useMemo(() => react_native_1.PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (e) => {
            if (disabledRef.current)
                return;
            const r = rangeRef.current;
            const usable = usableOf(widthRef.current);
            // The grant IS a reliable coordinate: the touch lands on the strip
            // itself, so `locationX` is measured from the strip's own origin.
            const ratio = usable > 0
                ? Math.max(0, Math.min(1, (e.nativeEvent.locationX - thumb / 2) / usable))
                : 0;
            const next = clampSnap(r.min + ratio * (r.max - r.min));
            grabbedRef.current = next;
            setDragging(true);
            emitRef.current?.(next);
        },
        onPanResponderMove: (_e, g) => {
            if (disabledRef.current)
                return;
            const r = rangeRef.current;
            const usable = usableOf(widthRef.current);
            if (usable <= 0)
                return;
            // Delta from where the finger grabbed. Screen-space, so it cannot be
            // knocked off by which child the finger is currently over.
            const delta = (g.dx / usable) * (r.max - r.min);
            emitRef.current?.(clampSnap(grabbedRef.current + delta));
        },
        onPanResponderRelease: () => setDragging(false),
        onPanResponderTerminate: () => setDragging(false),
    }), 
    // `thumb` is a theme value and stable for the life of a theme; everything
    // else the responder needs is read through a ref.
    [clampSnap, thumb]);
    const ratio = max > min ? Math.max(0, Math.min(1, (value - min) / (max - min))) : 0;
    const usable = usableOf(width);
    const nudge = (delta) => {
        if (disabled)
            return;
        emit?.(clampSnap(value + delta * step));
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { ...responder.panHandlers, accessibilityRole: "adjustable", accessibilityValue: { min, max, now: value }, accessibilityState: { disabled }, accessibilityActions: [{ name: 'increment' }, { name: 'decrement' }], onAccessibilityAction: (event) => {
            if (event.nativeEvent.actionName === 'increment')
                nudge(1);
            if (event.nativeEvent.actionName === 'decrement')
                nudge(-1);
        }, onLayout: (e) => {
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
                } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    left: 0,
                    top: (strip - rail) / 2,
                    height: rail,
                    width: thumb / 2 + ratio * usable,
                    borderRadius: tokens.radius.full,
                    backgroundColor: colors.primary,
                } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: {
                    position: 'absolute',
                    top: (strip - thumb) / 2 - halo,
                    left: ratio * usable - halo,
                    width: thumb + halo * 2,
                    height: thumb + halo * 2,
                    borderRadius: tokens.radius.full,
                    backgroundColor: dragging ? (0, color_1.withAlpha)(colors.primary, 0.18) : 'transparent',
                } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: [
                    (0, picker_v4_1.elevationStyle)(theme.elevation.card),
                    {
                        position: 'absolute',
                        top: (strip - thumb) / 2,
                        left: ratio * usable,
                        width: thumb,
                        height: thumb,
                        borderRadius: tokens.radius.full,
                        backgroundColor: colors.primary,
                        // A surface-coloured collar, so the thumb reads on top of its fill.
                        borderWidth: 2,
                        borderColor: colors.surface,
                    },
                ] })] }));
}
//# sourceMappingURL=SliderV4.js.map