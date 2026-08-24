"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamCard = TeamCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const LeagueBadge_1 = require("./LeagueBadge");
const FORM_LABEL = { W: 'win', D: 'draw', L: 'loss' };
/**
 * A team summary card — crest, name, league, W/D/L record, rank, and a recent
 * form strip whose results read by letter + a11y label, not color alone.
 * Presentational: shaped props plus an optional `onPress`. `tile` is a slim
 * pickable variant. Reuses `LeagueBadge` for the crest. Token-only colors.
 */
function TeamCard({ name, crest, league, won, drawn, lost, rank, form = [], variant = 'full', selected = false, loading = false, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const tile = variant === 'tile';
    const container = {
        backgroundColor: colors.surface,
        borderColor: selected ? colors.primary : colors.border,
        borderWidth: selected ? 2 : 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.md,
        gap: tokens.spacing.sm,
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityState: { busy: true }, accessibilityLabel: "Loading team", style: [container, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.xl, borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.base, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } })] }));
    }
    const hasRecord = won !== undefined || drawn !== undefined || lost !== undefined;
    const recordLabel = `${won ?? 0}W · ${drawn ?? 0}D · ${lost ?? 0}L`;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [container, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(LeagueBadge_1.LeagueBadge, { name: name, crest: crest, label: "", size: tile ? 'sm' : 'lg' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), league ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: league })) : null] }), rank !== undefined ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Rank" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: ["#", rank] })] })) : null] }), !tile && hasRecord ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: recordLabel })) : null, !tile && form.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs }, children: form.slice(-5).map((f, i) => {
                    const c = f === 'W' ? colors.success : f === 'L' ? colors.danger : colors.muted;
                    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: FORM_LABEL[f], style: {
                            width: 20,
                            height: 20,
                            borderRadius: tokens.radius.full,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: tokens.ramps.neutral[100],
                            borderWidth: 1,
                            borderColor: c,
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: c, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: f }) }, i));
                }) })) : null] }));
    const a11y = `${name}${rank !== undefined ? `, rank ${rank}` : ''}${hasRecord ? `, ${recordLabel}` : ''}`;
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected }, accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, children: body }));
}
//# sourceMappingURL=TeamCard.js.map