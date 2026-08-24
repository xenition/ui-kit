"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineBoard = PipelineBoard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const money_1 = require("../commerce/money");
const DealCard_1 = require("./DealCard");
/**
 * Horizontally scrolling sales pipeline: one column per stage, each headed by
 * the stage name, a deal count, and the summed stage value (integer cents via
 * `formatMoney`). Deals render as compact {@link DealCard}s; when `onMoveDeal`
 * is set, each card gains `←/→` affordances that advance or regress it a stage
 * (disabled at the pipeline ends, so indexing is always guarded). An empty
 * stage shows a muted placeholder; a board with **no stages** shows
 * `emptyLabel`. Non-drag — wire a gesture layer separately if you need it. All
 * colors are theme tokens.
 */
function PipelineBoard({ stages, currency = 'USD', onDealPress, onMoveDeal, columnWidth = 268, emptyLabel = 'No stages in this pipeline yet', style, }) {
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
    return ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, style: style, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md }, children: stages.map((stage, stageIndex) => {
                const total = stage.deals.reduce((sum, d) => sum + (Number.isFinite(d.valueCents) ? d.valueCents : 0), 0);
                const canBack = stageIndex > 0;
                const canForward = stageIndex < stages.length - 1;
                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        width: columnWidth,
                        borderWidth: 1,
                        borderColor: colors.border,
                        borderRadius: tokens.radius.md,
                        backgroundColor: colors.surface,
                        padding: tokens.spacing.sm,
                        gap: tokens.spacing.sm,
                    }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: stage.name }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                                minWidth: tokens.spacing.lg,
                                                alignItems: 'center',
                                                paddingHorizontal: tokens.spacing.xs,
                                                paddingVertical: 1,
                                                borderRadius: tokens.radius.full,
                                                backgroundColor: colors.muted,
                                            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.surface, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: stage.deals.length }) })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: (0, money_1.formatMoney)(total, currency) })] }), stage.deals.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingVertical: tokens.spacing.lg, alignItems: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "No deals" }) })) : (stage.deals.map((deal) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(DealCard_1.DealCard, { name: deal.name, company: deal.company, valueCents: deal.valueCents, currency: currency, probability: deal.probability, outcome: deal.outcome, owner: deal.owner, variant: "compact", onPress: onDealPress ? () => onDealPress(deal, stage) : undefined }), onMoveDeal ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(MoveButton, { label: `Move ${deal.name} back`, glyph: "\u2190", disabled: !canBack, onPress: () => onMoveDeal(deal, stage, 'back') }), (0, jsx_runtime_1.jsx)(MoveButton, { label: `Move ${deal.name} forward`, glyph: "\u2192", disabled: !canForward, onPress: () => onMoveDeal(deal, stage, 'forward') })] })) : null] }, deal.id))))] }, stage.id));
            }) }) }));
}
function MoveButton({ label, glyph, disabled, onPress }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, accessibilityState: { disabled }, disabled: disabled, onPress: onPress, hitSlop: 6, style: {
            flex: 1,
            alignItems: 'center',
            paddingVertical: tokens.spacing.xs,
            borderRadius: tokens.radius.sm,
            borderWidth: 1,
            borderColor: colors.border,
            opacity: disabled ? 0.4 : 1,
        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: glyph }) }));
}
//# sourceMappingURL=PipelineBoard.js.map