"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamCardV2 = TeamCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const motion_1 = require("../primitives/internal/motion");
const elevation_1 = require("../primitives/internal/elevation");
const color_1 = require("../primitives/internal/color");
const FORM_LABEL = { W: 'win', D: 'draw', L: 'loss' };
/**
 * TeamCard, design variant 2 — a **crest hero card**. A large crest sits in a
 * tinted disc above the centered team name and league, an optional rank badge,
 * a three-up W / D / L record (built from the `Statistic` primitive), and a
 * centered recent-form strip whose results read by letter + a11y label, never
 * color alone. Same props as `TeamCard`; token-pure (elevation via `shadow`,
 * tint via `withAlpha`), reduced-motion aware.
 */
function TeamCardV2({ name, crest, league, won, drawn, lost, rank, form = [], selected = false, loading = false, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const press = (0, motion_1.usePressScale)();
    const container = {
        backgroundColor: colors.surface,
        borderColor: selected ? colors.primary : 'transparent',
        borderWidth: selected ? 2 : 0,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        gap: tokens.spacing.md,
        alignItems: 'center',
        ...(0, elevation_1.shadow)('md', tokens),
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityState: { busy: true }, accessibilityLabel: "Loading team", style: [container, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 72, height: 72, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[200] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.lg, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.base, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } })] }));
    }
    const hasRecord = won !== undefined || drawn !== undefined || lost !== undefined;
    const recordLabel = `${won ?? 0}W · ${drawn ?? 0}D · ${lost ?? 0}L`;
    const a11y = `${name}${rank !== undefined ? `, rank ${rank}` : ''}${hasRecord ? `, ${recordLabel}` : ''}`;
    const hero = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 72,
                    height: 72,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.08),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['3xl'] }, children: crest ?? '🛡' }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700', textAlign: 'center' }, children: name }), league ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: league })) : null] }), rank !== undefined ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", variant: "soft", children: `Rank #${rank}` })) : null] }));
    const record = hasRecord ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: 'row',
            alignSelf: 'stretch',
            justifyContent: 'space-around',
            paddingTop: tokens.spacing.sm,
            borderTopWidth: 1,
            borderColor: colors.border,
        }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Statistic, { label: "Won", value: won ?? 0, style: { alignItems: 'center' } }), (0, jsx_runtime_1.jsx)(primitives_1.Statistic, { label: "Drawn", value: drawn ?? 0, style: { alignItems: 'center' } }), (0, jsx_runtime_1.jsx)(primitives_1.Statistic, { label: "Lost", value: lost ?? 0, style: { alignItems: 'center' } })] })) : null;
    const formStrip = form.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs }, children: form.slice(-5).map((f, i) => {
            const c = f === 'W' ? colors.success : f === 'L' ? colors.danger : colors.muted;
            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: FORM_LABEL[f], style: {
                    width: 24,
                    height: 24,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, color_1.withAlpha)(c, 0.12),
                    borderWidth: 1,
                    borderColor: c,
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: c, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: f }) }, i));
        }) })) : null;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [container, style], children: [hero, record, formStrip] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected }, accessibilityLabel: a11y, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, children: body }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, children: body }) }));
}
//# sourceMappingURL=TeamCardV2.js.map