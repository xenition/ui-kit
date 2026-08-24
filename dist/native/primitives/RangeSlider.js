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
exports.RangeSlider = RangeSlider;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const THUMB = 20;
const TRACK_H = 4;
/**
 * Two-thumb range slider — a two-handle extension of the native `Slider`. A
 * token-styled rail carries a `primary` fill between two draggable thumbs driven
 * by a single `PanResponder` that grabs whichever thumb is nearer the touch;
 * values snap to `step` in `[min, max]` and the pair is kept ordered. No literal
 * colors.
 */
function RangeSlider({ value, min = 0, max = 100, step = 1, onChange, disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [width, setWidth] = React.useState(0);
    const widthRef = React.useRef(0);
    const valueRef = React.useRef(value);
    valueRef.current = value;
    const activeRef = React.useRef(0);
    const clampSnap = (v) => {
        const clamped = Math.max(min, Math.min(max, v));
        const snapped = Math.round((clamped - min) / step) * step + min;
        return Math.max(min, Math.min(max, snapped));
    };
    const ratioOf = (v) => max > min ? Math.max(0, Math.min(1, (v - min) / (max - min))) : 0;
    const valueAt = (x) => {
        const usable = Math.max(0, widthRef.current - THUMB);
        const ratio = usable > 0 ? Math.max(0, Math.min(1, (x - THUMB / 2) / usable)) : 0;
        return clampSnap(min + ratio * (max - min));
    };
    const pickThumb = (x) => {
        const usable = Math.max(0, widthRef.current - THUMB);
        const [lo, hi] = valueRef.current;
        const loX = ratioOf(lo) * usable + THUMB / 2;
        const hiX = ratioOf(hi) * usable + THUMB / 2;
        activeRef.current = Math.abs(x - loX) <= Math.abs(x - hiX) ? 0 : 1;
    };
    const update = (x) => {
        if (disabled)
            return;
        const next = valueAt(x);
        const [lo, hi] = valueRef.current;
        if (activeRef.current === 0) {
            onChange?.([Math.min(next, hi), hi]);
        }
        else {
            onChange?.([lo, Math.max(next, lo)]);
        }
    };
    const responder = React.useMemo(() => react_native_1.PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (e) => {
            pickThumb(e.nativeEvent.locationX);
            update(e.nativeEvent.locationX);
        },
        onPanResponderMove: (e) => update(e.nativeEvent.locationX),
    }), []);
    const usable = Math.max(0, width - THUMB);
    const loRatio = ratioOf(value[0]);
    const hiRatio = ratioOf(value[1]);
    const thumb = (ratio, label, now) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "adjustable", accessibilityLabel: label, accessibilityValue: { min, max, now }, style: {
            position: 'absolute',
            top: 0,
            left: ratio * usable,
            width: THUMB,
            height: THUMB,
            borderRadius: tokens.radius.full,
            backgroundColor: colors.primary,
            borderWidth: 1,
            borderColor: colors.surface,
        } }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { ...responder.panHandlers, onLayout: (e) => {
            const w = e.nativeEvent.layout.width;
            widthRef.current = w;
            setWidth(w);
        }, style: [
            { width: '100%', height: THUMB, justifyContent: 'center', opacity: disabled ? 0.5 : 1 },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: TRACK_H, borderRadius: tokens.radius.full, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    top: (THUMB - TRACK_H) / 2,
                    left: THUMB / 2 + loRatio * usable,
                    width: Math.max(0, (hiRatio - loRatio) * usable),
                    height: TRACK_H,
                    borderRadius: tokens.radius.full,
                    backgroundColor: colors.primary,
                } }), thumb(loRatio, 'Range minimum', value[0]), thumb(hiRatio, 'Range maximum', value[1])] }));
}
//# sourceMappingURL=RangeSlider.js.map