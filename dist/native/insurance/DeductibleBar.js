"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeductibleBar = DeductibleBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
/**
 * Progress toward an annual deductible: a token `Progress` bar sized to
 * `met / deductible` with a "met of ceiling" caption and a remaining/"met"
 * line. The bar tone shifts as the deductible is satisfied — `warn` in
 * progress, `success` once fully met — both tracing to `SemanticColors`. A
 * `deductibleCents <= 0` ceiling is guarded (treated as fully met, no
 * divide-by-zero). Amounts are integer cents via `formatMoney`.
 */
function DeductibleBar({ metCents, deductibleCents, label = 'Deductible', currency = 'USD', formatMoney: format = format_1.formatMoney, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const met = Number.isFinite(metCents) ? Math.max(0, Math.trunc(metCents)) : 0;
    const ceiling = Number.isFinite(deductibleCents) ? Math.max(0, Math.trunc(deductibleCents)) : 0;
    const clampedMet = ceiling > 0 ? Math.min(met, ceiling) : met;
    const ratio = ceiling > 0 ? clampedMet / ceiling : 1;
    const fullyMet = ratio >= 1;
    const remaining = Math.max(0, ceiling - met);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600', flex: 1 }, children: label }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [format(clampedMet, currency), " / ", format(ceiling, currency)] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: `${label}, ${(0, format_1.formatPct)(ratio * 100)} met`, children: (0, jsx_runtime_1.jsx)(primitives_2.Progress, { value: ratio * 100, max: 100, tone: fullyMet ? 'success' : 'warn' }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fullyMet ? colors.success : colors.muted, fontSize: tokens.typography.scale.xs }, children: fullyMet ? 'Deductible met' : `${format(remaining, currency)} to go` })] }));
}
//# sourceMappingURL=DeductibleBar.js.map