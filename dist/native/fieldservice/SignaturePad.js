"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignaturePad = SignaturePad;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
/**
 * A signature capture block. Because the kit adds no native drawing
 * dependency, this is a dependency-free capture-state surface: an empty state
 * (a dashed baseline + "Tap to sign" prompt that fires `onSign`) and a captured
 * state (the signer name over a baseline, a timestamp, and a Clear action that
 * fires `onClear`). Capture is conveyed by text + a check glyph, not color
 * alone. All colors trace to tokens or a token-derived tint — no literals.
 */
function SignaturePad({ label, signed = false, signerName, signedAt, onSign, onClear, disabled = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const header = label != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
            marginBottom: tokens.spacing.xs,
            color: colors.muted,
            fontSize: tokens.typography.scale.xs,
            fontWeight: '600',
        }, children: label })) : null;
    if (signed) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: style, children: [header, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        borderWidth: 1,
                        borderColor: colors.border,
                        borderRadius: tokens.radius.md,
                        backgroundColor: (0, format_1.withAlpha)(colors.success, 0.06),
                        padding: tokens.spacing.md,
                        gap: tokens.spacing.sm,
                    }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { minHeight: 48, justifyContent: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                        color: colors.onSurface,
                                        fontSize: tokens.typography.scale.xl,
                                        fontStyle: 'italic',
                                        fontWeight: '600',
                                    }, children: signerName ?? 'Signed' }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.xs, height: 1, backgroundColor: colors.border } })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2713", size: "sm", color: "success", accessibilityLabel: "Signed" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Captured", signedAt != null ? ` · ${signedAt}` : ''] })] }), onClear ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "ghost", size: "sm", tone: "danger", onPress: onClear, disabled: disabled, children: "Clear" })) : null] })] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: style, children: [header, (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label != null ? `${label}: tap to sign` : 'Tap to sign', accessibilityState: { disabled }, disabled: disabled || !onSign, onPress: onSign, style: ({ pressed }) => ({
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    borderColor: colors.border,
                    borderRadius: tokens.radius.md,
                    backgroundColor: colors.surface,
                    paddingHorizontal: tokens.spacing.md,
                    paddingVertical: tokens.spacing.xl,
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: tokens.spacing.xs,
                    opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
                }), children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u270D", size: "2xl", color: "muted" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '500' }, children: "Tap to sign" }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.sm, width: '80%', height: 1, backgroundColor: colors.border } })] })] }));
}
//# sourceMappingURL=SignaturePad.js.map