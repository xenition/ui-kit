"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobSiteCardV2 = JobSiteCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const STATUS = {
    active: { label: 'On site', glyph: '▶', tone: 'success' },
    scheduled: { label: 'Scheduled', glyph: '📅', tone: 'primary' },
    completed: { label: 'Completed', glyph: '✓', tone: 'neutral' },
    blocked: { label: 'Blocked', glyph: '⚠', tone: 'danger' },
};
function StatTile({ value, label, colors, tokens, }) {
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flex: 1,
            alignItems: 'center',
            gap: 2,
            borderRadius: tokens.radius.md,
            paddingVertical: tokens.spacing.sm,
            backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.08),
        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: value }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: label })] }));
}
function JobSiteCardV2({ name, address, status, crewCount, openOrders, distance, glyph = '🏗', onNavigate, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const sd = STATUS[status] ?? STATUS.scheduled;
    const surface = {
        borderRadius: tokens.radius.lg,
        backgroundColor: colors.surface,
        overflow: 'hidden',
        ...(0, elevation_1.shadow)('md', tokens),
    };
    const hasStats = crewCount != null || openOrders != null || distance != null;
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: surface, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.md,
                    padding: tokens.spacing.lg,
                    backgroundColor: (0, color_1.withAlpha)(colors.accent, 0.12),
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 56,
                            height: 56,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: (0, color_1.withAlpha)(colors.accent, 0.18),
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "2xl", accessibilityLabel: "Job site" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }, children: name }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: address })] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: sd.tone, variant: "soft", children: `${sd.glyph} ${sd.label}` })] }), hasStats ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm, paddingHorizontal: tokens.spacing.lg, paddingTop: tokens.spacing.md }, children: [crewCount != null ? (0, jsx_runtime_1.jsx)(StatTile, { value: `${Math.max(0, Math.trunc(crewCount))}`, label: "crew", colors: colors, tokens: tokens }) : null, openOrders != null ? (0, jsx_runtime_1.jsx)(StatTile, { value: `${Math.max(0, Math.trunc(openOrders))}`, label: "open orders", colors: colors, tokens: tokens }) : null, distance != null ? (0, jsx_runtime_1.jsx)(StatTile, { value: distance, label: "away", colors: colors, tokens: tokens }) : null] })) : null, onNavigate ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { padding: tokens.spacing.lg, paddingTop: tokens.spacing.md }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", size: "sm", onPress: onNavigate, accessibilityLabel: `Directions to ${name}`, children: "\uD83E\uDDED Directions" }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.spacing.lg } }))] }));
    const a11y = `${name}, ${address}, ${sd.label}`;
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, style: style, children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [{ transform: [{ scale: press.scale }] }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessible: true, accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, children: inner }) }));
}
//# sourceMappingURL=JobSiteCardV2.js.map