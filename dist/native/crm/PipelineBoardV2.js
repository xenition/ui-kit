"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineBoardV2 = PipelineBoardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const money_1 = require("../commerce/money");
/** Tone slots cycled across the stage headers (all real SemanticColors keys). */
const HEADER_TONES = ['primary', 'accent', 'warn', 'success', 'danger'];
/**
 * PipelineBoard **design V2** — columns, but each stage header wears a *colored*
 * tone band (cycled across the pipeline) with the stage name, deal count and
 * summed value, and every deal renders as a *compact chip* (name + right-aligned
 * value) instead of a full card. Denser and more colorful than the original
 * board. Same props as {@link PipelineBoard}: `onDealPress` taps a chip,
 * `onMoveDeal` adds guarded `← →` nudges disabled at the pipeline ends. Empty
 * board shows `emptyLabel`; empty stages show a muted placeholder. Token-pure.
 */
function PipelineBoardV2({ stages, currency = 'USD', onDealPress, onMoveDeal, columnWidth = 268, emptyLabel = 'No stages in this pipeline yet', style, }) {
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
                const toneKey = HEADER_TONES[stageIndex % HEADER_TONES.length] ?? 'primary';
                const tone = colors[toneKey];
                const canBack = stageIndex > 0;
                const canForward = stageIndex < stages.length - 1;
                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        width: columnWidth,
                        borderWidth: 1,
                        borderColor: colors.border,
                        borderRadius: tokens.radius.md,
                        backgroundColor: colors.surface,
                        overflow: 'hidden',
                        gap: tokens.spacing.sm,
                        paddingBottom: tokens.spacing.sm,
                    }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                backgroundColor: (0, color_1.withAlpha)(tone, 0.12),
                                borderLeftWidth: 3,
                                borderLeftColor: tone,
                                paddingHorizontal: tokens.spacing.sm,
                                paddingVertical: tokens.spacing.sm,
                                gap: 2,
                            }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: stage.name }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                                minWidth: tokens.spacing.lg,
                                                alignItems: 'center',
                                                paddingHorizontal: tokens.spacing.xs,
                                                paddingVertical: 1,
                                                borderRadius: tokens.radius.full,
                                                backgroundColor: (0, color_1.withAlpha)(tone, 0.24),
                                            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: stage.deals.length }) })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: (0, money_1.formatMoney)(total, currency) })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingHorizontal: tokens.spacing.sm, gap: tokens.spacing.xs }, children: stage.deals.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingVertical: tokens.spacing.lg, alignItems: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "No deals" }) })) : (stage.deals.map((deal) => ((0, jsx_runtime_1.jsx)(DealChip, { deal: deal, currency: currency, accent: tone, onPress: onDealPress ? () => onDealPress(deal, stage) : undefined, onBack: onMoveDeal && canBack ? () => onMoveDeal(deal, stage, 'back') : undefined, onForward: onMoveDeal && canForward ? () => onMoveDeal(deal, stage, 'forward') : undefined, showMoves: !!onMoveDeal, canBack: canBack, canForward: canForward }, deal.id)))) })] }, stage.id));
            }) }) }));
}
function DealChip({ deal, currency, accent, onPress, onBack, onForward, showMoves, canBack, canForward }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const outcomeColor = deal.outcome === 'won' ? colors.success : deal.outcome === 'lost' ? colors.danger : accent;
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: tokens.spacing.xs,
            borderRadius: tokens.radius.sm,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 6, height: 6, borderRadius: tokens.radius.full, backgroundColor: outcomeColor } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: deal.name }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: (0, money_1.formatMoney)(deal.valueCents, currency) })] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs / 2 }, children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Deal ${deal.name}`, onPress: onPress, children: inner })) : (inner), showMoves ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(MoveButton, { label: `Move ${deal.name} back`, glyph: "\u2190", disabled: !canBack, onPress: onBack }), (0, jsx_runtime_1.jsx)(MoveButton, { label: `Move ${deal.name} forward`, glyph: "\u2192", disabled: !canForward, onPress: onForward })] })) : null] }));
}
function MoveButton({ label, glyph, disabled, onPress }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, accessibilityState: { disabled }, disabled: disabled, onPress: onPress, hitSlop: 6, style: {
            flex: 1,
            alignItems: 'center',
            paddingVertical: tokens.spacing.xs / 2,
            borderRadius: tokens.radius.sm,
            borderWidth: 1,
            borderColor: colors.border,
            opacity: disabled ? 0.4 : 1,
        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: glyph }) }));
}
//# sourceMappingURL=PipelineBoardV2.js.map