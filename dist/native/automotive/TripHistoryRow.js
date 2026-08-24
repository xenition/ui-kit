"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripHistoryRow = TripHistoryRow;
exports.TripHistoryEmpty = TripHistoryEmpty;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/** Outcome → tone + spelled-out word (never color alone). */
const OUTCOME = {
    completed: { tone: 'success', word: 'Completed' },
    cancelled: { tone: 'danger', word: 'Cancelled' },
    'no-show': { tone: 'warn', word: 'No-show' },
};
function formatMoney(cents, currency) {
    try {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(cents / 100);
    }
    catch {
        return `$${(cents / 100).toFixed(2)}`;
    }
}
/**
 * One past trip in a history list — the from→to route, when it happened, the
 * fare, an outcome (completed/cancelled/no-show, shown as a text-labelled badge
 * so meaning never rests on color), and an optional rider rating. Data +
 * `onPress` only; nothing fetches. Colors come from semantic tokens and
 * `withAlpha` tints — no literal colors. `variant="compact"` tightens the row.
 * For an empty history list, render {@link TripHistoryEmpty} instead.
 */
function TripHistoryRow({ from, to, dateLabel, fareCents, currency = 'USD', outcome = 'completed', rating, variant = 'default', onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const o = OUTCOME[outcome] ?? OUTCOME.completed;
    const compact = variant === 'compact';
    const a11y = `Trip from ${from} to ${to}${dateLabel ? `, ${dateLabel}` : ''}, ${o.word}${typeof fareCents === 'number' ? `, ${formatMoney(fareCents, currency)}` : ''}`;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: [from, " \u2192 ", to] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }, children: [dateLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: dateLabel })) : null, (0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: (o.tone === 'muted' ? 'neutral' : o.tone), variant: "soft", size: "sm", children: o.word }), typeof rating === 'number' && !compact ? (0, jsx_runtime_1.jsx)(primitives_2.Rating, { value: rating, size: "sm" }) : null] })] }), typeof fareCents === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: formatMoney(fareCents, currency) })) : null] }));
    const containerStyle = {
        borderRadius: tokens.radius.md,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        paddingVertical: compact ? tokens.spacing.sm : tokens.spacing.md,
        paddingHorizontal: tokens.spacing.md,
    };
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, style: [containerStyle, style], children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessible: true, accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => [containerStyle, style, { opacity: pressed ? 0.9 : 1 }], children: body }));
}
/**
 * The empty-state companion to {@link TripHistoryRow} — shown when a rider or
 * driver has no past trips. Token-only colors; a plain informative panel.
 */
function TripHistoryEmpty({ title = 'No trips yet', message = 'Completed rides will appear here.', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: `${title}. ${message}`, style: [
            {
                alignItems: 'center',
                gap: tokens.spacing.xs,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                borderStyle: 'dashed',
                backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.06),
                paddingVertical: tokens.spacing.xl,
                paddingHorizontal: tokens.spacing.lg,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale['2xl'] }, children: "\uD83D\uDE97" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }, children: message })] }));
}
//# sourceMappingURL=TripHistoryRow.js.map