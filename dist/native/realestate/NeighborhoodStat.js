"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NeighborhoodStat = NeighborhoodStat;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/**
 * A single neighborhood metric tile — a labelled value with an optional trend
 * delta, wrapped in a token-styled card with an optional leading glyph and a
 * caption. Composes the shared `Statistic` (which owns the delta tone/arrow
 * logic) and `Icon`. Presentational only; token-only colors.
 */
function NeighborhoodStat({ label, value, delta, trend, suffix, glyph, caption, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                padding: tokens.spacing.lg,
            },
            style,
        ], children: [glyph ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "xl", color: "primary" }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Statistic, { label: label, value: value, delta: delta, trend: trend, suffix: suffix }), caption ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: tokens.spacing.xs }, children: caption })) : null] })] }));
}
//# sourceMappingURL=NeighborhoodStat.js.map