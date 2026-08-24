"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CauseCardV3 = CauseCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const internal_1 = require("./internal");
/**
 * CauseCard — design variant **V3**: a **horizontal media-left row**. A square
 * cover thumbnail on the left, the category badge, title, blurb, and a compact
 * raised/goal line on the right — a dense list row instead of a stacked card.
 * When a goal is present a slim bar (sized via `goalPct`, divide-by-zero guarded)
 * appears with a printed percent, so progress never rests on color alone. Same
 * props as {@link CauseCardProps}. Token-only; money is integer cents.
 */
function CauseCardV3({ title, description, imageUrl, imageAlt, category, raisedCents, goalCents, currency = 'USD', variant = 'default', onPress, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const thumb = variant === 'featured' ? 112 : 92;
    const containerStyle = [
        {
            flexDirection: 'row',
            overflow: 'hidden',
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading cause", style: containerStyle, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: thumb, height: thumb, backgroundColor: tokens.ramps.neutral[200] ?? colors.border } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, padding: tokens.spacing.md, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.spacing.lg, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] ?? colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.spacing.md, width: '90%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] ?? colors.border } })] })] }));
    }
    const hasProgress = typeof raisedCents === 'number' && typeof goalCents === 'number';
    const pct = hasProgress ? (0, internal_1.goalPct)(raisedCents, goalCents) : 0;
    const pctLabel = `${Math.round(pct)}%`;
    const fillWidth = `${pct}%`;
    const media = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: thumb, height: thumb, backgroundColor: tokens.ramps.neutral[100] ?? colors.surface }, children: imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, accessible: true, accessibilityLabel: imageAlt ?? title, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83E\uDD1D", size: "2xl" }) })) }));
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, padding: tokens.spacing.md, gap: tokens.spacing.xs, justifyContent: 'center' }, children: [category ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignSelf: 'flex-start' }, children: (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", variant: "soft", size: "sm", children: category }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: description })) : null, hasProgress ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 4, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[200] ?? colors.border, overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: '100%', width: fillWidth, backgroundColor: colors.primary, borderRadius: tokens.radius.full } }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `${(0, internal_1.formatMoney)(raisedCents, currency)} · ${pctLabel} of ${(0, internal_1.formatMoney)(goalCents, currency)}` })] })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, style: ({ pressed }) => [containerStyle, { opacity: pressed ? 0.9 : 1 }], children: [media, body] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: containerStyle, children: [media, body] }));
}
//# sourceMappingURL=CauseCardV3.js.map