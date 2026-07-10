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
exports.Skeleton = Skeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Shimmering loading placeholder — the native mirror of the web `Skeleton`.
 * Where the web shape shimmers via `animate-pulse`, native drives an `Animated`
 * opacity loop. The block is filled with the `muted` token; the corner radius is
 * keyed off the variant (`circle`→full, `rect`→md, `text`→sm). No literal colors.
 */
function Skeleton({ variant = 'text', width, height, lines = 1, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const opacity = React.useRef(new react_native_1.Animated.Value(0.4)).current;
    React.useEffect(() => {
        const loop = react_native_1.Animated.loop(react_native_1.Animated.sequence([
            react_native_1.Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
            react_native_1.Animated.timing(opacity, { toValue: 0.4, duration: 700, useNativeDriver: true }),
        ]));
        loop.start();
        return () => loop.stop();
    }, [opacity]);
    const radius = variant === 'circle' ? tokens.radius.full : variant === 'rect' ? tokens.radius.md : tokens.radius.sm;
    const block = (w, h) => ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { accessibilityRole: "none", style: { width: w, height: h, borderRadius: radius, backgroundColor: colors.muted, opacity } }));
    if (variant === 'text' && lines > 1) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: Array.from({ length: lines }).map((_, i) => React.cloneElement(block(i === lines - 1 ? '60%' : '100%', height ?? 14), { key: i })) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: style, children: block(width ?? (variant === 'text' ? '100%' : 40), height ?? (variant === 'text' ? 14 : 40)) }));
}
//# sourceMappingURL=Skeleton.js.map