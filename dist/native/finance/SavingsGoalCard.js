"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavingsGoalCard = SavingsGoalCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const appearance_1 = require("../primitives/internal/appearance");
const charts_1 = require("../charts");
const MoneyAmount_1 = require("./MoneyAmount");
const money_1 = require("../commerce/money");
/**
 * A savings-goal tile: a {@link ProgressRing} showing percent-to-target beside
 * a saved / target breakdown and an optional deadline. Progress is
 * `savedCents / targetCents` (guarded against a non-positive target), amounts
 * are integer cents through {@link MoneyAmount}, and the "to go" figure is the
 * remaining cents. Token-bound throughout.
 */
function SavingsGoalCard({ title, savedCents, targetCents, currency = 'USD', deadline, color = 'success', formatMoney: format = money_1.formatMoney, appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const saved = Number.isFinite(savedCents) ? Math.max(Math.trunc(savedCents), 0) : 0;
    const target = Number.isFinite(targetCents) ? Math.trunc(targetCents) : 0;
    const pct = target > 0 ? Math.min(saved / target, 1) : 0;
    const remaining = Math.max(target - saved, 0);
    // Appearance overrides the Card's default surface; classic → unchanged.
    const surface = appearance === 'classic' ? undefined : (0, appearance_1.appearanceStyle)(appearance, colors, tokens);
    return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { style: [surface, style], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsx)(charts_1.ProgressRing, { value: pct * 100, max: 100, size: 84, strokeWidth: 9, color: color, accessibilityLabel: `${title}, ${Math.round(pct * 100)}% saved` }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: saved, currency: currency, tone: "neutral", size: "md" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: ["/ ", format(target, currency)] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [format(remaining, currency), " to go", deadline != null ? ` · by ${deadline}` : ''] })] })] }) }));
}
//# sourceMappingURL=SavingsGoalCard.js.map