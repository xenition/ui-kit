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
exports.Drawer = Drawer;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Themed side sheet — the native mirror of the web `Drawer`. RN has no DOM
 * portal, so this is a full-screen `Modal` with the panel anchored to `side`
 * over a translucent backdrop (tap to dismiss). The panel slides in with
 * `Animated`; the scrim is the `onSurface` token faded via `opacity` so every
 * rendered color stays a pure theme token. No literal colors.
 */
function Drawer({ open, onClose, side = 'right', title, children, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const { width, height } = (0, react_native_1.useWindowDimensions)();
    const isHorizontal = side === 'left' || side === 'right';
    const progress = React.useRef(new react_native_1.Animated.Value(0)).current;
    React.useEffect(() => {
        react_native_1.Animated.timing(progress, {
            toValue: open ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [open, progress]);
    const offset = isHorizontal ? width : height;
    const sign = side === 'left' || side === 'top' ? -1 : 1;
    const translate = progress.interpolate({ inputRange: [0, 1], outputRange: [sign * offset, 0] });
    return ((0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: open, transparent: true, animationType: "fade", onRequestClose: onClose, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                flex: 1,
                flexDirection: isHorizontal ? 'row' : 'column',
                justifyContent: side === 'right' || side === 'bottom' ? 'flex-end' : 'flex-start',
            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityLabel: "Close", onPress: onClose, style: {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: colors.onSurface,
                        opacity: 0.5,
                    } }), (0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { accessibilityViewIsModal: true, style: [
                        {
                            backgroundColor: colors.surface,
                            padding: tokens.spacing.lg,
                            transform: isHorizontal ? [{ translateX: translate }] : [{ translateY: translate }],
                        },
                        isHorizontal
                            ? { height: '100%', width: '85%', maxWidth: 360 }
                            : { width: '100%', maxHeight: '85%' },
                        style,
                    ], children: [title != null &&
                            (typeof title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    fontSize: 18,
                                    fontWeight: '600',
                                    color: colors.onSurface,
                                    marginBottom: tokens.spacing.md,
                                }, children: title })) : (title)), (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { children: children })] })] }) }));
}
//# sourceMappingURL=Drawer.js.map