"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamCardV4 = TeamCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const LeagueBadge_1 = require("./LeagueBadge");
const FORM_LABEL = { W: 'win', D: 'draw', L: 'loss' };
/**
 * TeamCard — **V4** "broadcast" design. The matchday take on a team summary: an
 * elevated card with the crest, name, and league; the current rank shown as a big
 * bold numeral in a soft-primary tile; the W/D/L record and a recent-form strip
 * whose results read by letter + a11y label, never color alone. `selected`
 * promotes to an accent border and stays a pressed affordance. Same props/behavior
 * as {@link TeamCardProps}; token-only colors via `useXenitionTheme()`. `loading`
 * swaps in a token skeleton.
 */
function TeamCardV4({ name, crest, league, won, drawn, lost, rank, form = [], variant = 'full', selected = false, loading = false, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const tile = variant === 'tile';
    const container = {
        backgroundColor: colors.card,
        borderColor: selected ? colors.primary : colors.border,
        borderWidth: selected ? 2 : 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.md,
        gap: tokens.spacing.sm,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityState: { busy: true }, accessibilityLabel: "Loading team", style: [container, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.xl, borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.1) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.base, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.1) } })] }));
    }
    const hasRecord = won !== undefined || drawn !== undefined || lost !== undefined;
    const recordLabel = `${won ?? 0}W · ${drawn ?? 0}D · ${lost ?? 0}L`;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [container, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(LeagueBadge_1.LeagueBadge, { name: name, crest: crest, label: "", size: tile ? 'sm' : 'lg' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: name }), league ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: league })) : null] }), rank !== undefined ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            alignItems: 'center',
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: tokens.spacing.xs,
                            borderRadius: tokens.radius.md,
                            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.12),
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "Rank" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: ["#", rank] })] })) : null] }), !tile && hasRecord ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: recordLabel })) : null, !tile && form.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs }, children: form.slice(-5).map((f, i) => {
                    const c = f === 'W' ? colors.success : f === 'L' ? colors.danger : colors.muted;
                    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: FORM_LABEL[f], style: {
                            width: 20,
                            height: 20,
                            borderRadius: tokens.radius.full,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.05),
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
//# sourceMappingURL=TeamCardV4.js.map