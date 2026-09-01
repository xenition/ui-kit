"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceRowV4 = PriceRowV4;
exports.PriceListV4 = PriceListV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const Eyebrow_1 = require("../primitives/Eyebrow");
const OrnamentRule_1 = require("./OrnamentRule");
/**
 * PriceRow — **V4** "showcase" design (native mirror of the web V4). One
 * menu-style row: `name ········ price` — the leading name left, a spaced dotted
 * leader (a flex spacer with a thin soft-primary dotted bottom border, since RN
 * has no CSS `color-mix` leader), and an extra-bold `tabular-nums` price right,
 * with an optional description beneath. Token-only colors, no literals.
 */
function PriceRowV4({ row }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const leaderColor = (0, color_1.withAlpha)(tokens.ramps.primary[400], 0.4);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-price-row", children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
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
                            color: colors.primary,
                            fontSize: tokens.typography.scale.lg,
                            fontWeight: '800',
                            fontVariant: ['tabular-nums'],
                        }, children: row.price })] }), row.description !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    marginTop: tokens.spacing.xs,
                    color: colors.muted,
                    fontSize: tokens.typography.scale.sm,
                }, children: row.description })) : null] }));
}
/**
 * PriceList — **V4** "showcase" design (native mirror of the web V4). A clean
 * menu-style price group: an optional ornamented rule, a small-caps group
 * heading, and dotted-leader `PriceRowV4`s from the base's `rows` data array
 * (the web V4 composes children). Same props/behavior as {@link PriceListProps};
 * token-only colors, no literals.
 */
function PriceListV4({ heading, rows, ornament = 'diamond', style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-price-list", style: [{ gap: tokens.spacing.lg }, style], children: [ornament !== 'none' ? (0, jsx_runtime_1.jsx)(OrnamentRule_1.OrnamentRule, { ornament: ornament, tone: "primary" }) : null, heading !== undefined ? ((0, jsx_runtime_1.jsx)(Eyebrow_1.Eyebrow, { align: "center", tone: "primary", children: heading })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.lg }, children: rows.map((row, i) => ((0, jsx_runtime_1.jsx)(PriceRowV4, { row: row }, i))) })] }));
}
//# sourceMappingURL=PriceListV4.js.map