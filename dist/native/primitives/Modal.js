"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = Modal;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Themed modal dialog — the native mirror of the web `Modal`. Wraps RN's
 * `Modal`; the backdrop scrim is the darkest neutral ramp step faded via
 * `opacity`, so every rendered color stays a pure theme token.
 */
function Modal({ open, onClose, title, children }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: open, transparent: true, animationType: "fade", onRequestClose: onClose, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityLabel: "Close", onPress: onClose, style: {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: tokens.ramps.neutral[950],
                        opacity: 0.5,
                    } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        width: '100%',
                        maxWidth: 480,
                        backgroundColor: colors.surface,
                        borderRadius: tokens.radius.lg,
                        padding: tokens.spacing.lg,
                    }, children: [title != null &&
                            (typeof title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    fontSize: tokens.typography.scale.lg,
                                    fontWeight: '600',
                                    color: colors.onSurface,
                                    marginBottom: tokens.spacing.md,
                                }, children: title })) : (title)), children] })] }) }));
}
//# sourceMappingURL=Modal.js.map