"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceList = PriceList;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const Eyebrow_1 = require("../primitives/Eyebrow");
const OrnamentRule_1 = require("./OrnamentRule");
/**
 * Editorial price group — the native mirror of the web `PriceList` + `PriceRow`.
 * The web version composes children; native takes a `rows` data array (idiomatic
 * for RN lists). Each row is `name ········ price`: the label sits left, the price
 * right, and the web dotted leader is approximated with a flex spacer carrying a
 * thin low-opacity accent bottom border (RN has no CSS dotted `color-mix` leader).
 * Reuses the native `OrnamentRule` + `Eyebrow`. Token-only.
 */
function PriceList({ heading, rows, ornament = 'diamond', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const leaderColor = (0, color_1.withAlpha)(tokens.ramps.accent[400], 0.4);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-price-list", style: [{ gap: tokens.spacing.lg }, style], children: [ornament !== 'none' ? (0, jsx_runtime_1.jsx)(OrnamentRule_1.OrnamentRule, { ornament: ornament, tone: "accent" }) : null, heading !== undefined ? ((0, jsx_runtime_1.jsx)(Eyebrow_1.Eyebrow, { align: "center", tone: "accent", children: heading })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.lg }, children: rows.map((row, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-price-row", children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: colors.onSurface,
                                        fontSize: tokens.typography.scale.xl,
                                        fontWeight: '600',
                                    }, children: row.name }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no", style: {
                                        flex: 1,
                                        minWidth: 32,
                                        marginHorizontal: tokens.spacing.sm,
                                        marginBottom: 6,
                                        borderBottomWidth: 1,
                                        borderStyle: 'dotted',
                                        borderColor: leaderColor,
                                    } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: colors.accent,
                                        fontSize: tokens.typography.scale.lg,
                                    }, children: row.price })] }), row.description !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                marginTop: tokens.spacing.xs,
                                color: colors.muted,
                                fontSize: tokens.typography.scale.sm,
                            }, children: row.description })) : null] }, i))) })] }));
}
//# sourceMappingURL=PriceList.js.map