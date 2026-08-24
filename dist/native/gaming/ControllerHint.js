"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerHint = ControllerHint;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const CAP = {
    sm: { box: 20, text: 'xs', label: 'xs' },
    md: { box: 26, text: 'sm', label: 'sm' },
};
/**
 * A controller / keybind hint — a rounded "key cap" showing the button glyph
 * next to its action label (e.g. `Ⓐ Jump`). Pass a single `button`/`action`
 * or a `hints` array for a HUD strip. The action text always accompanies the
 * glyph, so the mapping never relies on the symbol alone. Reads only the theme
 * primitive; token-only.
 */
function ControllerHint({ button, action, hints, variant = 'pill', size = 'md', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const sz = CAP[size];
    const list = hints && hints.length > 0
        ? hints
        : button != null
            ? [{ button, action: action ?? '' }]
            : [];
    if (list.length === 0)
        return null;
    const renderHint = (hint, key) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: hint.action ? `${hint.action}: ${hint.button}` : hint.button, style: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            ...(variant === 'pill'
                ? {
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                    borderRadius: tokens.radius.full,
                    paddingVertical: 3,
                    paddingHorizontal: tokens.spacing.sm,
                }
                : null),
        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    minWidth: sz.box,
                    height: sz.box,
                    paddingHorizontal: 4,
                    borderRadius: tokens.radius.sm,
                    backgroundColor: colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onPrimary, fontSize: tokens.typography.scale[sz.text], fontWeight: '700' }, children: hint.button }) }), hint.action ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale[sz.label] }, children: hint.action })) : null] }, key));
    if (list.length === 1) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: style, children: renderHint(list[0], 'h0') });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, style], children: list.map((h, i) => renderHint(h, `h${i}`)) }));
}
//# sourceMappingURL=ControllerHint.js.map