"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Descriptions = Descriptions;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Key/value detail grid — the native mirror of the web `Descriptions`. Renders
 * a token-bound label/value pair per item, laid out in 1 or 2 columns via a
 * flex-wrap grid. For record/detail views. No literal colors.
 */
function Descriptions({ items, columns = 1, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                flexWrap: 'wrap',
                columnGap: tokens.spacing.xl,
                rowGap: tokens.spacing.md,
            },
            style,
        ], children: items.map((it, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2, width: columns === 2 ? '45%' : '100%', flexGrow: 1 }, children: [typeof it.label === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: colors.muted,
                        fontSize: tokens.typography.scale.xs,
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                    }, children: it.label })) : (it.label), typeof it.value === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: it.value })) : (it.value)] }, i))) }));
}
//# sourceMappingURL=Descriptions.js.map