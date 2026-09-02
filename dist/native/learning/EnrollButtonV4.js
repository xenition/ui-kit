"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollButtonV4 = EnrollButtonV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const primitives_1 = require("../primitives");
/**
 * EnrollButton — **V4** "campus" design (native twin of the web V4). The course
 * enrollment CTA built on the primitive `Button`, mapping the lifecycle to
 * appearance: `idle` → primary CTA, `enrolling` → loading, `enrolled` → a
 * soft-success confirmation pill with a ✓ (not pressable), `full` → a disabled
 * "Class full". State is announced and carried by a word + glyph, never color
 * alone. Token-only colors via `useXenitionTheme()`.
 */
function EnrollButtonV4({ state = 'idle', label = 'Enroll now', price, onEnroll, block = true, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const container = [{ alignSelf: block ? 'stretch' : 'flex-start', gap: 4 }, style];
    if (state === 'enrolled') {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: "Enrolled", style: container, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.xs, paddingVertical: tokens.spacing.md, paddingHorizontal: tokens.spacing.lg, borderRadius: tokens.radius.md, backgroundColor: (0, color_1.withAlpha)(colors.success, 0.12), borderWidth: 1, borderColor: (0, color_1.withAlpha)(colors.success, 0.3) }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.success, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: "\u2713" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.success, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: "Enrolled" })] }) }));
    }
    if (state === 'full') {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: container, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", disabled: true, onPress: () => { }, children: "Class full" }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: container, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", loading: state === 'enrolling', onPress: onEnroll, accessibilityLabel: state === 'enrolling' ? 'Enrolling' : label, children: state === 'enrolling' ? 'Enrolling…' : price ? `${label} · ${price}` : label }) }));
}
//# sourceMappingURL=EnrollButtonV4.js.map