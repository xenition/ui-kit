"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetainerBalanceV2 = RetainerBalanceV2;
exports.RetainerBalanceV3 = RetainerBalanceV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
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
 * RetainerBalance, design v2 — an **elevated card** with a bold balance readout,
 * a health pill, a thick tinted **fill meter** with a percentage caption, and a
 * "Replenish" call to action when funds run low. Same Props as
 * {@link RetainerBalance}; a richer dashboard tile vs. the flat original.
 * Token-pure; status is a glyph + word, never color alone.
 */
function RetainerBalanceV2({ balanceCents, initialCents, lowThresholdCents = 0, currency = 'USD', status, label, loading = false, variant = 'default', onReplenish, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 8 });
    const compact = variant === 'compact';
    const resolved = status ?? deriveStatus(balanceCents, lowThresholdCents);
    const statusMeta = internal_1.RETAINER_STATUS_META[resolved];
    const fillColor = (0, internal_1.toneColor)(colors, statusMeta.tone);
    const pct = initialCents && initialCents > 0
        ? (0, internal_1.clampPct)(Math.round((Math.max(0, balanceCents) / initialCents) * 100))
        : undefined;
    const showReplenish = onReplenish && (resolved === 'low' || resolved === 'depleted');
    const body = ((0, jsx_runtime_1.jsx)(primitives_1.Card, { variant: "elevated", padding: compact ? 'sm' : 'md', radius: "lg", style: [{ gap: tokens.spacing.sm }, style], testID: testID, children: loading ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading retainer", style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.xs, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale['2xl'], width: '60%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '100%', borderRadius: tokens.radius.full, backgroundColor: colors.border } })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: label ?? 'Retainer balance' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '700' }, children: (0, internal_1.formatMoney)(balanceCents, currency) })] }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: statusMeta, variant: "soft", size: "sm" })] }), pct != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityValue: { min: 0, max: 100, now: pct }, accessibilityLabel: `${statusMeta.label}, ${pct}% remaining`, style: { height: 12, borderRadius: tokens.radius.full, backgroundColor: (0, color_1.withAlpha)(fillColor, 0.14), overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${pct}%`, height: '100%', borderRadius: tokens.radius.full, backgroundColor: fillColor } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: [pct, "% remaining"] }), initialCents ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["of ", (0, internal_1.formatMoney)(initialCents, currency)] })) : null] })] })) : null, showReplenish ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "primary", onPress: onReplenish, style: { alignSelf: 'flex-start' }, children: "Replenish" })) : null] })) }));
    return (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: body });
}
/**
 * RetainerBalance, design v3 — a **minimal balance row**: label + balance on the
 * left, health pill on the right, above a thin token fill meter. Same Props as
 * {@link RetainerBalance}; no card chrome, for dense summaries. Token-pure;
 * status stays a glyph + word, never color alone.
 */
function RetainerBalanceV3({ balanceCents, initialCents, lowThresholdCents = 0, currency = 'USD', status, label, loading = false, onReplenish, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 4 });
    const resolved = status ?? deriveStatus(balanceCents, lowThresholdCents);
    const statusMeta = internal_1.RETAINER_STATUS_META[resolved];
    const fillColor = (0, internal_1.toneColor)(colors, statusMeta.tone);
    const pct = initialCents && initialCents > 0
        ? (0, internal_1.clampPct)(Math.round((Math.max(0, balanceCents) / initialCents) * 100))
        : undefined;
    const showReplenish = onReplenish && (resolved === 'low' || resolved === 'depleted');
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [
            {
                opacity: enter.opacity,
                transform: enter.transform,
                gap: tokens.spacing.xs,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.xs,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
            },
            style,
        ], testID: testID, children: loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading retainer", style: { height: tokens.typography.scale.lg, borderRadius: tokens.radius.sm, backgroundColor: colors.border } })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: label ?? 'Retainer' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: (0, internal_1.formatMoney)(balanceCents, currency) }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: statusMeta, variant: "inline", size: "sm" })] }), pct != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityValue: { min: 0, max: 100, now: pct }, accessibilityLabel: `${statusMeta.label}, ${pct}% remaining`, style: { height: 4, borderRadius: tokens.radius.full, backgroundColor: colors.border, overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${pct}%`, height: '100%', borderRadius: tokens.radius.full, backgroundColor: fillColor } }) })) : null, showReplenish ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "link", onPress: onReplenish, style: { alignSelf: 'flex-start' }, children: "Replenish" })) : null] })) }));
}
//# sourceMappingURL=RetainerBalanceVariants.js.map