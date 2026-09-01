"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolCard = SchoolCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/**
 * Map a 0–10 rating to its tier: high (≥7) → success, mid (≥4) → warn,
 * low (<4) → danger. The score reads by BOTH number and color.
 */
function scoreTier(rating) {
    if (rating >= 7)
        return 'success';
    if (rating >= 4)
        return 'warn';
    return 'danger';
}
const TIER_SLOT = {
    success: 'success',
    warn: 'warn',
    danger: 'danger',
};
/**
 * SchoolCard — **V4** "listing" design. A nearby-school rating card: the 0–10
 * rating in a score-tinted disc (high → success, mid → warn, low → danger) on
 * the left, the school name as the headline, the level + distance beneath, and
 * an optional grades footnote. The score is legible by BOTH its big numeral and
 * its color. Editorial, rounded elevated card, 8-pt spacing. Presentational
 * only — token-only colors via `useXenitionTheme()`, no literals; dark-mode
 * safe. When `onPress` is set the card is a button.
 */
function SchoolCard({ name, rating, level, distanceLabel, gradesLabel, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const clamped = Math.max(0, Math.min(10, rating));
    const tier = scoreTier(clamped);
    const scoreColor = colors[TIER_SLOT[tier]];
    const scoreText = Number.isInteger(clamped) ? String(clamped) : clamped.toFixed(1);
    const meta = [level, distanceLabel].filter(Boolean).join(' · ');
    const label = `${name}, rated ${scoreText} out of 10${meta ? `, ${meta}` : ''}${gradesLabel ? `, grades ${gradesLabel}` : ''}`;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                backgroundColor: colors.card,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                padding: tokens.spacing.sm,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.08,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 6 },
                elevation: 3,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    width: 56,
                    height: 56,
                    borderRadius: tokens.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, color_1.withAlpha)(scoreColor, 0.15),
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale['2xl'], fontWeight: '700', color: scoreColor }, children: scoreText }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: 10, fontWeight: '600', color: scoreColor }, children: "/ 10" })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.base, fontWeight: '700', color: colors.onSurface }, children: name }), meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.sm, color: colors.mutedText }, children: meta })) : null, gradesLabel ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.xs, color: colors.mutedText }, children: ["Grades ", gradesLabel] })) : null] })] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }));
}
//# sourceMappingURL=SchoolCard.js.map