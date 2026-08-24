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
exports.Switch = Switch;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TRACK_W = 44;
const TRACK_H = 24;
const KNOB = 20;
const PAD = 2;
/**
 * Themed on/off switch — the native mirror of the web `Switch` (`role="switch"`,
 * `checked` / `onCheckedChange` contract). A token-bound track with an animated
 * knob; built from `Pressable` (not RN's `Switch`) to stay fully theme-driven.
 * No literal colors.
 */
function Switch({ checked = false, onCheckedChange, disabled = false, accessibilityLabel, style, }) {
    const { colors } = (0, theme_1.useXenitionTheme)();
    const anim = React.useRef(new react_native_1.Animated.Value(checked ? 1 : 0)).current;
    React.useEffect(() => {
        react_native_1.Animated.timing(anim, {
            toValue: checked ? 1 : 0,
            duration: 150,
            useNativeDriver: true,
        }).start();
    }, [checked, anim]);
    const translateX = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [PAD, TRACK_W - KNOB - PAD],
    });
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "switch", accessibilityState: { checked, disabled }, accessibilityLabel: accessibilityLabel, disabled: disabled, onPress: () => onCheckedChange?.(!checked), style: [
            {
                width: TRACK_W,
                height: TRACK_H,
                borderRadius: TRACK_H / 2,
                justifyContent: 'center',
                backgroundColor: checked ? colors.primary : colors.border,
                opacity: disabled ? 0.5 : 1,
            },
            style,
        ], children: (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: {
                width: KNOB,
                height: KNOB,
                borderRadius: KNOB / 2,
                backgroundColor: colors.surface,
                transform: [{ translateX }],
            } }) }));
}
//# sourceMappingURL=Switch.js.map