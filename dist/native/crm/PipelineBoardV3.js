"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineBoardV3 = PipelineBoardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const charts_1 = require("../charts");
const money_1 = require("../commerce/money");
/**
 * PipelineBoard **design V3** — no columns at all. A *horizontal stage-total
 * strip* (a token `BarChart` of each stage's summed value) sits above a flat,
 * vertically stacked *list* of every stage and its deals — a single-column,
 * no-horizontal-scroll layout for phones. Same props as {@link PipelineBoard}:
 * `onDealPress` taps a deal line, `onMoveDeal` adds guarded `← →` nudges
 * disabled at the pipeline ends. Empty board shows `emptyLabel`; empty stages
 * show a muted placeholder. Token-pure.
 */
function PipelineBoardV3({ stages, currency = 'USD', onDealPress, onMoveDeal, emptyLabel = 'No stages in this pipeline yet', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (stages.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: emptyLabel, style: [
                {
                    padding: tokens.spacing.xl,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: tokens.radius.md,
                    backgroundColor: colors.surface,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xl, color: colors.muted }, children: "\u25A4" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, marginTop: tokens.spacing.xs }, children: emptyLabel })] }));
    }
    const totals = stages.map((s) => s.deals.reduce((sum, d) => sum + (Number.isFinite(d.valueCents) ? d.valueCents : 0), 0));
    const labels = stages.map((s) => s.name);
    const grandTotal = totals.reduce((a, b) => a + b, 0);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: tokens.radius.md,
                    backgroundColor: colors.surface,
                    padding: tokens.spacing.md,
                    gap: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: "Pipeline total" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: (0, money_1.formatMoney)(grandTotal, currency) })] }), (0, jsx_runtime_1.jsx)(charts_1.BarChart, { data: totals, labels: labels, height: 80, color: "primary", accessibilityLabel: `Stage totals across ${stages.length} stages` })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.md }, children: stages.map((stage, stageIndex) => {
                    const canBack = stageIndex > 0;
                    const canForward = stageIndex < stages.length - 1;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: stage.name }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: `${stage.deals.length} · ${(0, money_1.formatMoney)(totals[stageIndex] ?? 0, currency)}` })] }), stage.deals.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, paddingVertical: tokens.spacing.xs }, children: "No deals" })) : (stage.deals.map((deal) => {
                                const dotColor = deal.outcome === 'won' ? colors.success : deal.outcome === 'lost' ? colors.danger : colors.primary;
                                const line = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: tokens.spacing.sm,
                                        paddingVertical: tokens.spacing.xs,
                                        paddingHorizontal: tokens.spacing.sm,
                                        borderRadius: tokens.radius.sm,
                                        borderWidth: 1,
                                        borderColor: colors.border,
                                        backgroundColor: colors.surface,
                                    }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: dotColor } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: deal.name }), deal.company ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: deal.company })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: (0, money_1.formatMoney)(deal.valueCents, currency) }), onMoveDeal ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(MoveButton, { label: `Move ${deal.name} back`, glyph: "\u2190", disabled: !canBack, onPress: canBack ? () => onMoveDeal(deal, stage, 'back') : undefined }), (0, jsx_runtime_1.jsx)(MoveButton, { label: `Move ${deal.name} forward`, glyph: "\u2192", disabled: !canForward, onPress: canForward ? () => onMoveDeal(deal, stage, 'forward') : undefined })] })) : null] }));
                                return onDealPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Deal ${deal.name}`, onPress: () => onDealPress(deal, stage), children: line }, deal.id)) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { children: line }, deal.id));
                            }))] }, stage.id));
                }) })] }));
}
function MoveButton({ label, glyph, disabled, onPress }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, accessibilityState: { disabled }, disabled: disabled, onPress: onPress, hitSlop: 6, style: {
            width: 28,
            alignItems: 'center',
            paddingVertical: tokens.spacing.xs / 2,
            borderRadius: tokens.radius.sm,
            borderWidth: 1,
            borderColor: colors.border,
            opacity: disabled ? 0.4 : 1,
        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: glyph }) }));
}
//# sourceMappingURL=PipelineBoardV3.js.map