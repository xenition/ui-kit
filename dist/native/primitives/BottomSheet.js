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
exports.BottomSheet = BottomSheet;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const theme_1 = require("../theme");
const useReducedMotion_1 = require("./internal/useReducedMotion");
/**
 * The scrim.
 *
 * NOT a semantic token. `onSurface` inverts with the scheme — it is near-black
 * on a light page and near-WHITE on a dark one — so a scrim built from it
 * paints a 50% white veil over a dark app. Verified: at the warm-neutral seed,
 * dark `onSurface` compiles to `#eeeded`.
 *
 * A scrim is not "the text colour, faded". It is the absence of light, and
 * absence does not invert. Black at a fixed alpha in both schemes.
 */
const SCRIM = '#000000';
const SCRIM_OPACITY = 0.5;
/**
 * Draggable bottom sheet — a bottom-anchored `Modal` panel with a top grabber
 * handle that the user can drag down to dismiss (release past a threshold calls
 * `onClose`). Distinct from the side `Drawer` by the grabber + drag gesture and
 * `snap` height. The panel is the `surface` token, the grabber the `border`
 * token, and the scrim the `onSurface` token faded via opacity. The entry slide
 * is skipped when the OS "Reduce Motion" setting is on. No literal colors.
 */
function BottomSheet({ open, onClose, title, children, snap = 0.5, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const { height } = (0, react_native_1.useWindowDimensions)();
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    // Pad the sheet body past the home indicator with the bottom safe-area inset.
    // Needs a `SafeAreaProvider` above it (Expo default).
    const insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    const sheetHeight = Math.max(120, Math.min(1, snap) * height);
    const translateY = React.useRef(new react_native_1.Animated.Value(sheetHeight)).current;
    React.useEffect(() => {
        if (open) {
            if (reduced) {
                translateY.setValue(0);
            }
            else {
                react_native_1.Animated.timing(translateY, { toValue: 0, duration: 220, useNativeDriver: true }).start();
            }
        }
        else {
            translateY.setValue(sheetHeight);
        }
    }, [open, reduced, sheetHeight, translateY]);
    const panResponder = React.useMemo(() => react_native_1.PanResponder.create({
        onMoveShouldSetPanResponder: (_e, g) => g.dy > 4,
        onPanResponderMove: (_e, g) => {
            if (g.dy > 0)
                translateY.setValue(g.dy);
        },
        onPanResponderRelease: (_e, g) => {
            if (g.dy > sheetHeight * 0.3 || g.vy > 0.8) {
                onClose();
            }
            else {
                react_native_1.Animated.timing(translateY, {
                    toValue: 0,
                    duration: reduced ? 0 : 160,
                    useNativeDriver: true,
                }).start();
            }
        },
    }), [onClose, reduced, sheetHeight, translateY]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: open, transparent: true, animationType: "fade", onRequestClose: onClose, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, justifyContent: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityLabel: "Close", onPress: onClose, style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: SCRIM, opacity: SCRIM_OPACITY } }), (0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { accessibilityViewIsModal: true, style: [
                        {
                            height: sheetHeight,
                            backgroundColor: colors.surface,
                            borderTopLeftRadius: tokens.radius.lg,
                            borderTopRightRadius: tokens.radius.lg,
                            paddingHorizontal: tokens.spacing.lg,
                            paddingBottom: tokens.spacing.lg + insets.bottom,
                            transform: [{ translateY }],
                        },
                        style,
                    ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { ...panResponder.panHandlers, style: { alignItems: 'center', paddingVertical: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Drag to dismiss", style: { width: 40, height: 4, borderRadius: tokens.radius.full, backgroundColor: colors.border } }) }), title != null &&
                            (typeof title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    fontSize: tokens.typography.scale.lg,
                                    fontWeight: '600',
                                    color: colors.onSurface,
                                    marginBottom: tokens.spacing.md,
                                }, children: title })) : (title)), (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { children: children })] })] }) }));
}
//# sourceMappingURL=BottomSheet.js.map