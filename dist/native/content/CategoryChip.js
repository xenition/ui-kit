"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryChip = CategoryChip;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/**
 * A small category / section label for news & blog UIs — the "Technology",
 * "Opinion", "Sport" tag you see above a headline. Three token-bound variants
 * (`solid`/`soft`/`outline`); optional `onPress` turns it into a section
 * filter. Colors come only from `SemanticColors`; no literal hex.
 */
function CategoryChip({ label, variant = 'solid', onPress, active = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const bg = {
        solid: 'accent',
        soft: 'surface',
        outline: 'transparent',
    };
    const fg = {
        solid: 'onAccent',
        soft: 'accent',
        outline: 'accent',
    };
    const bgKey = bg[variant];
    const inner = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                alignSelf: 'flex-start',
                borderRadius: tokens.radius.sm,
                paddingVertical: 3,
                paddingHorizontal: tokens.spacing.sm,
                backgroundColor: bgKey === 'transparent' ? 'transparent' : colors[bgKey],
                borderWidth: variant === 'outline' || active ? 1 : 0,
                borderColor: active ? colors.accent : colors.border,
            },
            style,
        ], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                color: colors[fg[variant]],
                fontSize: tokens.typography.scale.xs,
                fontWeight: '700',
                letterSpacing: 0.6,
                textTransform: 'uppercase',
            }, children: label }) }));
    if (!onPress)
        return inner;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Category ${label}`, accessibilityState: { selected: active }, onPress: onPress, hitSlop: 6, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: inner }));
}
//# sourceMappingURL=CategoryChip.js.map