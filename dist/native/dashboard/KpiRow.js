"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KpiRow = KpiRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const StatCard_1 = require("./StatCard");
/**
 * A wrapping row of {@link StatCard}s — the KPI strip at the top of a dashboard.
 * Cards flex to at least ~44% width so two sit per row on a phone and wrap
 * gracefully. Token-only spacing.
 */
function KpiRow({ items, style }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md },
            style,
        ], children: items.map((item, i) => ((0, jsx_runtime_1.jsx)(StatCard_1.StatCard, { ...item, style: [{ flexGrow: 1, flexBasis: '44%' }, item.style] }, `${item.label}-${i}`))) }));
}
//# sourceMappingURL=KpiRow.js.map