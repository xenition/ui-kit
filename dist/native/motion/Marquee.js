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
exports.Marquee = Marquee;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const useReducedMotion_1 = require("../primitives/internal/useReducedMotion");
/**
 * Infinite horizontal loop — the native mirror of the web `Marquee`. The web
 * version is a scroll-independent CSS keyframe loop, which maps directly onto
 * React Native's `Animated` (no scroll position / `IntersectionObserver`
 * needed), so unlike the pointer/scroll-driven `Parallax`/`TiltCard` this one
 * *does* have a native form. The content is rendered twice; the track
 * translates by one copy's width so the second copy seamlessly takes the
 * first's place. Under the OS "Reduce Motion" setting it renders as a single
 * static row. Motion-only — no literal colors.
 */
function Marquee({ speed = 40, gap, style, children, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const trackGap = gap ?? tokens.spacing.lg;
    const [width, setWidth] = React.useState(0);
    const x = React.useRef(new react_native_1.Animated.Value(0)).current;
    React.useEffect(() => {
        if (reduced || width === 0 || speed <= 0)
            return undefined;
        const distance = width + trackGap;
        const duration = (distance / speed) * 1000;
        x.setValue(0);
        const loop = react_native_1.Animated.loop(react_native_1.Animated.timing(x, {
            toValue: -distance,
            duration,
            easing: react_native_1.Easing.linear,
            useNativeDriver: true,
        }));
        loop.start();
        return () => loop.stop();
    }, [reduced, width, speed, trackGap, x]);
    // Reduced motion: a single static row (still clipped so it can't overflow).
    if (reduced) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ overflow: 'hidden' }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: trackGap }, children: children }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ overflow: 'hidden' }, style], children: (0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: { flexDirection: 'row', alignItems: 'center', transform: [{ translateX: x }] }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { onLayout: (e) => setWidth(e.nativeEvent.layout.width), style: { flexDirection: 'row', alignItems: 'center', gap: trackGap }, children: children }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: trackGap, marginLeft: trackGap }, children: children })] }) }));
}
//# sourceMappingURL=Marquee.js.map