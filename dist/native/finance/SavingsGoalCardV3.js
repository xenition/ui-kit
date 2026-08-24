"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavingsGoalCardV3 = SavingsGoalCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const MoneyAmount_1 = require("./MoneyAmount");
const money_1 = require("../commerce/money");
/** Quarter milestones notched into the track. */
const MILESTONES = [25, 50, 75];
/**
 * SavingsGoalCard, redesigned (v3): a **thin milestone bar**. No ring — a slim
 * horizontal track (tinted with the goal color) fills to the saved percentage,
 * notched at the 25 / 50 / 75% milestones, with the title and percent on the
 * header row and the saved / target + "to go" caption beneath. A compact,
 * list-friendly form distinct at a glance from v1/v2's rings. Same props.
 */
function SavingsGoalCardV3({ title, savedCents, targetCents, currency = 'USD', deadline, color = 'success', formatMoney: format = money_1.formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const saved = Number.isFinite(savedCents) ? Math.max(Math.trunc(savedCents), 0) : 0;
    const target = Number.isFinite(targetCents) ? Math.trunc(targetCents) : 0;
    const pct = target > 0 ? Math.min(saved / target, 1) : 0;
    const remaining = Math.max(target - saved, 0);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                gap: tokens.spacing.sm,
                padding: tokens.spacing.md,
                borderRadius: tokens.radius.md,
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            flex: 1,
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.base,
                            fontWeight: '700',
                        }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors[color], fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: [Math.round(pct * 100), "%"] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityLabel: `${title}, ${Math.round(pct * 100)}% saved`, style: {
                    height: 8,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, color_1.withAlpha)(colors[color], 0.15),
                    overflow: 'hidden',
                    justifyContent: 'center',
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: `${Math.round(pct * 100)}%`,
                            backgroundColor: colors[color],
                            borderRadius: tokens.radius.full,
                        } }), MILESTONES.map((m) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            left: `${m}%`,
                            top: 0,
                            bottom: 0,
                            width: 2,
                            backgroundColor: colors.surface,
                        } }, m)))] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: saved, currency: currency, tone: "neutral", size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { flex: 1, color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["/ ", format(target, currency), " \u00B7 ", format(remaining, currency), " to go", deadline != null ? ` · by ${deadline}` : ''] })] })] }));
}
//# sourceMappingURL=SavingsGoalCardV3.js.map