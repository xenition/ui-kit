"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsageComparison = UsageComparison;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
const GradientSurface_1 = require("./internal/GradientSurface");
const brand_1 = require("./internal/brand");
/**
 * This period vs last — the clean, trust-first usage card: the utility glyph in a
 * small brand-gradient disc, the current quantity big (`formatUsage`), and a
 * delta chip that spells out the change in **words + an arrow** (never color
 * alone): more usage reads `warn` (⬆), less reads `success` (⬇), equal is muted.
 * Two thin bars compare current against previous by ratio. Token-only colors.
 */
function UsageComparison({ kind, current, previous, unit, period = 'last period', decimals = 0, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const kd = (0, status_1.utilityKind)(kind);
    const u = unit ?? kd.unit;
    const cur = Number.isFinite(current) ? current : 0;
    const prev = Number.isFinite(previous) ? previous : 0;
    const pct = prev > 0 ? ((cur - prev) / prev) * 100 : cur > 0 ? 100 : 0;
    const direction = cur > prev ? 'more' : cur < prev ? 'less' : 'same';
    const deltaTone = direction === 'more'
        ? { fg: colors.warnText, bg: (0, format_1.withAlpha)(colors.warn, 0.14), arrow: '⬆', word: 'more' }
        : direction === 'less'
            ? { fg: colors.successText, bg: (0, format_1.withAlpha)(colors.success, 0.14), arrow: '⬇', word: 'less' }
            : { fg: colors.mutedText, bg: (0, format_1.withAlpha)(colors.muted, 0.5), arrow: '→', word: 'same as' };
    const max = Math.max(cur, prev, 1);
    const curRatio = (0, format_1.clamp)(cur / max, 0, 1);
    const prevRatio = (0, format_1.clamp)(prev / max, 0, 1);
    const card = {
        backgroundColor: colors.card,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.1,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
    };
    const Bar = ({ label, value, ratio, strong }) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: (0, format_1.formatUsage)(value, u, decimals) })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 8, borderRadius: tokens.radius.full, backgroundColor: colors.muted, overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: `${ratio * 100}%`,
                        height: '100%',
                        borderRadius: tokens.radius.full,
                        backgroundColor: strong ? colors.primary : (0, format_1.withAlpha)(colors.primary, 0.4),
                    } }) })] }));
    const deltaLabel = direction === 'same' ? `Same as ${period}` : `${(0, format_1.formatPct)(Math.abs(pct))} ${deltaTone.word} than ${period}`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [card, style], accessibilityLabel: `${kd.label} usage, ${(0, format_1.formatUsage)(cur, u, decimals)}, ${deltaLabel}`, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, brand_1.brandDisc)(r), style: { width: 48, height: 48, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: kd.glyph, size: "xl", accessibilityLabel: `${kd.label} usage`, style: { color: (0, brand_1.brandInk)(r) } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: [kd.label, " this period"] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: (0, format_1.formatUsage)(cur, u, decimals) })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'flex-start',
                    gap: tokens.spacing.xs,
                    marginTop: tokens.spacing.md,
                    paddingHorizontal: tokens.spacing.sm,
                    paddingVertical: tokens.spacing.xs,
                    borderRadius: tokens.radius.full,
                    backgroundColor: deltaTone.bg,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm, color: deltaTone.fg }, children: deltaTone.arrow }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: deltaTone.fg, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: deltaLabel })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.lg, gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(Bar, { label: "This period", value: cur, ratio: curRatio, strong: true }), (0, jsx_runtime_1.jsx)(Bar, { label: period, value: prev, ratio: prevRatio, strong: false })] })] }));
}
//# sourceMappingURL=UsageComparison.js.map