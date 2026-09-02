"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetainerBalanceV4 = RetainerBalanceV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
function deriveStatus(balanceCents, low) {
    if (balanceCents <= 0)
        return 'depleted';
    if (balanceCents <= low)
        return 'low';
    return 'healthy';
}
/**
 * RetainerBalance — **V4** "chambers" design (native twin of the web V4). An
 * elevated rounded card with a soft shadow, a big legible **tabular-nums**
 * balance (money carried as integer cents through the shared `formatMoney`), a
 * labelled glyph + word health pill (never color alone), a fill meter against the
 * initial retainer, and a "Replenish" action when funds run low. Exposes an ARIA
 * `progressbar`. Reuses the base `variant` (`default` / `compact`). Token-only
 * colors via `useXenitionTheme()`.
 */
function RetainerBalanceV4({ balanceCents, initialCents, lowThresholdCents = 0, currency = 'USD', status, label, loading = false, variant = 'default', onReplenish, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const resolved = status ?? deriveStatus(balanceCents, lowThresholdCents);
    const statusMeta = internal_1.RETAINER_STATUS_META[resolved];
    const fillColor = (0, internal_1.toneColor)(colors, statusMeta.tone);
    const pct = initialCents && initialCents > 0 ? (0, internal_1.clampPct)(Math.round((Math.max(0, balanceCents) / initialCents) * 100)) : undefined;
    const showReplenish = onReplenish && (resolved === 'low' || resolved === 'depleted');
    const shell = {
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: compact ? tokens.spacing.md : tokens.spacing.lg,
        gap: tokens.spacing.md,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading retainer", testID: testID, style: [shell, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.xs, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale['2xl'], width: '60%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 8, width: '100%', borderRadius: tokens.radius.full, backgroundColor: colors.border } })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: testID, style: [shell, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600', letterSpacing: 0.4 }, children: label ?? 'Retainer balance' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700', fontVariant: ['tabular-nums'] }, children: (0, internal_1.formatMoney)(balanceCents, currency) }), !compact && initialCents ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }, children: ["of ", (0, internal_1.formatMoney)(initialCents, currency), " initial"] })) : null] }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: statusMeta, variant: "soft", size: "sm" })] }), pct != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityValue: { min: 0, max: 100, now: pct }, accessibilityLabel: `${statusMeta.label}, ${pct}% remaining`, style: { height: 10, borderRadius: tokens.radius.full, backgroundColor: colors.border, overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${pct}%`, height: '100%', borderRadius: tokens.radius.full, backgroundColor: fillColor } }) })) : null, showReplenish ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "primary", onPress: onReplenish, style: { alignSelf: 'flex-start' }, children: "Replenish" })) : null] }));
}
//# sourceMappingURL=RetainerBalanceV4.js.map