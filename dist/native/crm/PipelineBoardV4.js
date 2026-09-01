"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineBoardV4 = PipelineBoardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const money_1 = require("../commerce/money");
const DealCardV4_1 = require("./DealCardV4");
const crm_v4_1 = require("./internal/crm-v4");
/**
 * **V4 pipeline board** — same props as {@link PipelineBoard} plus
 * `stageEmptyLabel` and `formatStageCount`.
 *
 * ## Six changes
 *
 * 1. **The stage count is a real `Badge` on both twins.** Native hand-rolled a
 *    chip filled with `colors.muted` — a **text** token — and inked with
 *    `colors.surface`, which is not the pair for anything. Web already used a
 *    badge, so the same count was two objects.
 * 2. **The move buttons clear 44.** They were roughly 28px with a `hitSlop`,
 *    which is a hit area, not a target: nothing on screen tells a user where
 *    to aim.
 * 3. **They disable at 0.38**, M3's disabled-content band, rather than an
 *    invented `0.4` — and they finally acknowledge a press.
 * 4. **A stage column is a group.** Native exposed no grouping at all, so a
 *    reader walking the board never learned which stage a deal was in; each
 *    column's deals are now a named list.
 * 5. **Empty is the shared `EmptyState`** — for the whole board and for a
 *    single empty stage, which was one muted line in a blank region.
 * 6. **The count carries a unit and the stage totals are tabular**, so a row
 *    of columns lines its figures up.
 */
function PipelineBoardV4({ stages, currency = 'USD', onDealPress, onMoveDeal, columnWidth = 268, emptyLabel = 'No stages in this pipeline yet', stageEmptyLabel = 'No deals', formatStageCount, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const countLabel = formatStageCount ?? ((n) => `${n} deals`);
    if (stages.length === 0) {
        return ((0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { icon: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xl", tone: "mutedText", children: "\u25A4" }), title: emptyLabel, style: style }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, style: style, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md }, children: stages.map((stage, stageIndex) => {
                const total = stage.deals.reduce((sum, d) => sum + (Number.isFinite(d.valueCents) ? d.valueCents : 0), 0);
                const canBack = stageIndex > 0;
                const canForward = stageIndex < stages.length - 1;
                const totalLabel = (0, money_1.formatMoney)(total, currency);
                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        width: columnWidth,
                        borderWidth: 1,
                        borderColor: colors.border,
                        borderRadius: tokens.radius.md,
                        backgroundColor: colors.surface,
                        padding: tokens.spacing.sm,
                        gap: tokens.spacing.sm,
                    }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "header", accessibilityLabel: (0, crm_v4_1.spokenLine)([
                                stage.name,
                                countLabel(stage.deals.length),
                                totalLabel,
                            ]), style: { gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: tokens.spacing.xs,
                                        justifyContent: 'space-between',
                                    }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "bold", tone: "onSurface", numberOfLines: 1, style: { flex: 1 }, children: stage.name }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...crm_v4_1.BADGE_V4, tone: "neutral", children: `${stage.deals.length}` })] }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "mutedText", style: crm_v4_1.TABULAR, children: totalLabel })] }), stage.deals.length === 0 ? ((0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: stageEmptyLabel })) : ((0, jsx_runtime_1.jsx)(react_native_1.View
                        // Grouping, so a reader learns which stage a deal sits in.
                        , { 
                            // Grouping, so a reader learns which stage a deal sits in.
                            accessibilityRole: "list", accessibilityLabel: (0, crm_v4_1.spokenLine)([stage.name, countLabel(stage.deals.length)]), style: { gap: tokens.spacing.sm }, children: stage.deals.map((deal) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(DealCardV4_1.DealCardV4, { name: deal.name, company: deal.company, valueCents: deal.valueCents, currency: currency, probability: deal.probability, outcome: deal.outcome, owner: deal.owner, variant: "compact", onPress: onDealPress ? () => onDealPress(deal, stage) : undefined }), onMoveDeal ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            gap: tokens.spacing.xs,
                                        }, children: [(0, jsx_runtime_1.jsx)(MoveButtonV4, { label: `Move ${deal.name} back`, glyph: "\u2190", disabled: !canBack, onPress: () => onMoveDeal(deal, stage, 'back') }), (0, jsx_runtime_1.jsx)(MoveButtonV4, { label: `Move ${deal.name} forward`, glyph: "\u2192", disabled: !canForward, onPress: () => onMoveDeal(deal, stage, 'forward') })] })) : null] }, deal.id))) }))] }, stage.id));
            }) }) }));
}
function MoveButtonV4({ label, glyph, disabled, onPress }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, accessibilityState: { disabled }, disabled: disabled, onPress: onPress, style: ({ pressed }) => ({
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            // A real target, not a `hitSlop` around a 28px glyph.
            minHeight: (0, chrome_v4_1.minTap)(tokens.spacing),
            borderRadius: tokens.radius.sm,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: pressed
                ? (0, state_v4_1.pressOver)(theme, colors.surface, colors.onSurface)
                : 'transparent',
            opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, disabled),
        }), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "bold", tone: "onSurface", children: glyph }) }));
}
//# sourceMappingURL=PipelineBoardV4.js.map