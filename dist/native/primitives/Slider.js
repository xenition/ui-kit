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
exports.Slider = Slider;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const THUMB = 20;
const TRACK_H = 4;
/**
 * Range slider — the native mirror of the web `Slider`. RN has no
 * `<input type=range>`, so this is a token-styled track with a draggable thumb
 * driven by `PanResponder`, snapping to `step` within `[min, max]`. No literal
 * colors.
 */
function Slider({ value, min = 0, max = 100, step = 1, onValueChange, onChange, disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    // Two spellings, one callback: the original wins when both are passed, so a
    // caller who has migrated half a file never gets the change reported twice.
    const emit = onValueChange ?? onChange;
    const [width, setWidth] = React.useState(0);
    const widthRef = React.useRef(0);
    const clampSnap = (v) => {
        const clamped = Math.max(min, Math.min(max, v));
        const snapped = Math.round((clamped - min) / step) * step + min;
        return Math.max(min, Math.min(max, snapped));
    };
    // Latest values live in a ref so the once-created PanResponder never goes stale.
    const updateRef = React.useRef(() => undefined);
    updateRef.current = (x) => {
        if (disabled)
            return;
        const usable = Math.max(0, widthRef.current - THUMB);
        const ratio = usable > 0 ? Math.max(0, Math.min(1, (x - THUMB / 2) / usable)) : 0;
        emit?.(clampSnap(min + ratio * (max - min)));
    };
    const responder = React.useMemo(() => react_native_1.PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (e) => updateRef.current(e.nativeEvent.locationX),
        onPanResponderMove: (e) => updateRef.current(e.nativeEvent.locationX),
    }), []);
    const ratio = max > min ? Math.max(0, Math.min(1, (value - min) / (max - min))) : 0;
    const usable = Math.max(0, width - THUMB);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { ...responder.panHandlers, accessibilityRole: "adjustable", accessibilityValue: { min, max, now: value }, onLayout: (e) => {
            const w = e.nativeEvent.layout.width;
            widthRef.current = w;
            setWidth(w);
        }, style: [
            { width: '100%', height: THUMB, justifyContent: 'center', opacity: disabled ? 0.5 : 1 },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: TRACK_H, borderRadius: tokens.radius.full, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    left: 0,
                    top: (THUMB - TRACK_H) / 2,
                    height: TRACK_H,
                    width: THUMB / 2 + ratio * usable,
                    borderRadius: tokens.radius.full,
                    backgroundColor: colors.primary,
                } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    top: 0,
                    left: ratio * usable,
                    width: THUMB,
                    height: THUMB,
                    borderRadius: tokens.radius.full,
                    backgroundColor: colors.primary,
                    borderWidth: 1,
                    borderColor: colors.surface,
                } })] }));
}
//# sourceMappingURL=Slider.js.map