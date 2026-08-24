"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FundraiserCardV3 = FundraiserCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("../primitives/Avatar");
const Button_1 = require("../primitives/Button");
const internal_1 = require("./internal");
/**
 * FundraiserCard — design variant **V3**: a **compact list row**. Organizer
 * avatar on the left, title + a hairline progress bar with a raised/percent line
 * in the middle, and a small Donate button on the right — a dense row for feeds
 * and search results. Progress is sized via `goalPct` (divide-by-zero guarded)
 * and always paired with a printed percent, never color alone. Same props as
 * {@link FundraiserCardProps}. Token-only; money is integer cents.
 */
function FundraiserCardV3({ title, organizerName, organizerAvatarUrl, raisedCents, goalCents, currency = 'USD', donorCount, onDonate, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const containerStyle = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            padding: tokens.spacing.md,
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading fundraiser", style: containerStyle, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 40, height: 40, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[200] ?? colors.border } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.spacing.md, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] ?? colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.spacing.sm, width: '90%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] ?? colors.border } })] })] }));
    }
    const pct = (0, internal_1.goalPct)(raisedCents, goalCents);
    const pctLabel = `${Math.round(pct)}%`;
    const fillWidth = `${pct}%`;
    const donors = typeof donorCount === 'number' ? ` · ${donorCount} donors` : '';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: containerStyle, children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { name: organizerName, src: organizerAvatarUrl, size: "md" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 4, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[200] ?? colors.border, overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: '100%', width: fillWidth, backgroundColor: colors.primary, borderRadius: tokens.radius.full } }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `${(0, internal_1.formatMoney)(raisedCents, currency)} · ${pctLabel}${donors}` })] }), (0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "primary", size: "sm", onPress: onDonate, children: "Donate" })] }));
}
//# sourceMappingURL=FundraiserCardV3.js.map