"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollButton = EnrollButton;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * Course enrollment CTA built on the primitive `Button`. Maps the enrollment
 * lifecycle to button appearance: `idle` → primary CTA, `enrolling` → loading,
 * `enrolled` → a success confirmation (not pressable), `full` → a disabled
 * "Class full". Announces the current state. Token-only colors.
 */
function EnrollButton({ state = 'idle', label = 'Enroll now', price, onEnroll, block = true, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const container = [{ alignSelf: block ? 'stretch' : 'flex-start', gap: 4 }, style];
    if (state === 'enrolled') {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: "Enrolled", style: container, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: tokens.spacing.xs,
                    paddingVertical: tokens.spacing.md,
                    paddingHorizontal: tokens.spacing.lg,
                    borderRadius: tokens.radius.md,
                    backgroundColor: colors.success,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onSuccess, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: "\u2713" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSuccess, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: "Enrolled" })] }) }));
    }
    if (state === 'full') {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: container, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", disabled: true, onPress: () => { }, children: "Class full" }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: container, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", loading: state === 'enrolling', onPress: onEnroll, accessibilityLabel: state === 'enrolling' ? 'Enrolling' : label, children: state === 'enrolling' ? 'Enrolling…' : price ? `${label} · ${price}` : label }) }));
}
//# sourceMappingURL=EnrollButton.js.map