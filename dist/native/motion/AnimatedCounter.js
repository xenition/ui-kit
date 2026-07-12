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
exports.AnimatedCounter = AnimatedCounter;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const useReducedMotion_1 = require("../primitives/internal/useReducedMotion");
const defaultFormat = (value) => Math.round(value).toLocaleString('en-US');
/**
 * Counts up (or down) on mount — the native mirror of the web `AnimatedCounter`.
 * On mobile the norm is a **mount** entrance (like the native `Reveal`), so
 * instead of the web's scroll-into-view trigger this counts as soon as it
 * mounts, driven by the RN `Animated` clock with an ease-out curve. Under the
 * OS "Reduce Motion" setting the final value renders immediately. The animated
 * value is read on the JS thread (to format each frame), so this uses
 * `useNativeDriver: false`. Motion-only — inherit color via `style`.
 */
function AnimatedCounter({ to, from = 0, duration = 1500, format = defaultFormat, style, }) {
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const anim = React.useRef(new react_native_1.Animated.Value(from)).current;
    const [value, setValue] = React.useState(from);
    React.useEffect(() => {
        if (reduced || duration <= 0) {
            setValue(to);
            return undefined;
        }
        anim.setValue(from);
        const id = anim.addListener(({ value: v }) => setValue(v));
        const animation = react_native_1.Animated.timing(anim, {
            toValue: to,
            duration,
            easing: react_native_1.Easing.out(react_native_1.Easing.cubic),
            useNativeDriver: false,
        });
        animation.start();
        return () => {
            animation.stop();
            anim.removeListener(id);
        };
    }, [reduced, from, to, duration, anim]);
    return (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: style, children: format(value) });
}
//# sourceMappingURL=AnimatedCounter.js.map