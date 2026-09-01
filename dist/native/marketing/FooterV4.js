"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterV4 = FooterV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Footer — **V4** "showcase" design (native mirror of the web V4). A refined
 * multi-column marketing footer on `colors.surface` opened by a top hairline:
 * the `logo` brand slot above a wrapping row of link groups (`columns`, each
 * `{ title, links }`), then a bordered bottom bar carrying the legal line +
 * social/`bottom` row. NOT a gradient surface. Column headings are bold,
 * uppercase, wide-tracked; links are muted and each a `≥44px` tap target that
 * dims on press. `logo` and `bottom` are node slots. Honors every prop —
 * `logo`, `columns` (`title`/`links` with `label`/`onPress`), `bottom`. Same
 * props/behavior as {@link FooterProps}; token-only colors, no literals.
 */
function FooterV4({ logo, columns, bottom, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                backgroundColor: colors.surface,
                borderTopWidth: 1,
                borderTopColor: colors.border,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    paddingVertical: tokens.spacing['2xl'],
                    paddingHorizontal: tokens.spacing.lg,
                    gap: tokens.spacing.xl,
                }, children: [logo !== undefined && logo !== null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.md }, children: logo })) : null, columns && columns.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: tokens.spacing.xl,
                        }, children: columns.map((column) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm, minWidth: 120 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: colors.onSurface,
                                        fontSize: tokens.typography.scale.xs,
                                        fontWeight: '800',
                                        textTransform: 'uppercase',
                                        letterSpacing: 1.5,
                                    }, children: column.title }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: column.links.map((link) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: link.onPress ? 'link' : 'text', accessibilityLabel: link.label, disabled: !link.onPress, onPress: link.onPress, style: ({ pressed }) => ({
                                            minHeight: 44,
                                            justifyContent: 'center',
                                            opacity: pressed && link.onPress ? 0.6 : 1,
                                        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                                color: colors.muted,
                                                fontSize: tokens.typography.scale.sm,
                                            }, children: link.label }) }, link.label))) })] }, column.title))) })) : null] }), bottom !== undefined && bottom !== null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    paddingVertical: tokens.spacing.md,
                    paddingHorizontal: tokens.spacing.lg,
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: tokens.spacing.md,
                    }, children: bottom }) })) : null] }));
}
//# sourceMappingURL=FooterV4.js.map