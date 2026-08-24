"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobSiteCardV3 = JobSiteCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const STATUS = {
    active: { label: 'On site', glyph: '▶', tone: 'success' },
    scheduled: { label: 'Scheduled', glyph: '📅', tone: 'primary' },
    completed: { label: 'Completed', glyph: '✓', tone: 'neutral' },
    blocked: { label: 'Blocked', glyph: '⚠', tone: 'danger' },
};
function JobSiteCardV3({ name, address, status, crewCount, openOrders, distance, glyph = '🏗', onNavigate, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const sd = STATUS[status] ?? STATUS.scheduled;
    const rowStyle = {
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.sm,
        borderRadius: tokens.radius.md,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        paddingVertical: tokens.spacing.sm,
        paddingHorizontal: tokens.spacing.md,
    };
    const meta = [
        crewCount != null ? `👷 ${Math.max(0, Math.trunc(crewCount))}` : null,
        openOrders != null ? `🗒 ${Math.max(0, Math.trunc(openOrders))}` : null,
        distance != null ? `📍 ${distance}` : null,
    ]
        .filter(Boolean)
        .join('   ');
    const a11y = `${name}, ${address}, ${sd.label}`;
    const Container = onPress ? react_native_1.Pressable : react_native_1.View;
    return ((0, jsx_runtime_1.jsxs)(Container, { accessible: true, accessibilityRole: onPress ? 'button' : undefined, accessibilityLabel: a11y, onPress: onPress, style: onPress ? ({ pressed }) => [rowStyle, style, { opacity: pressed ? 0.85 : 1 }] : [rowStyle, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 34,
                    height: 34,
                    borderRadius: tokens.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, color_1.withAlpha)(colors.accent, 0.14),
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "base", accessibilityLabel: "Job site" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: meta ? `${address}   ·   ${meta}` : address })] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: sd.tone, variant: "soft", size: "sm", children: `${sd.glyph} ${sd.label}` }), onNavigate ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Directions to ${name}`, onPress: onNavigate, style: ({ pressed }) => ({
                    width: 32,
                    height: 32,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.14),
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: pressed ? 0.6 : 1,
                }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83E\uDDED", size: "sm" }) })) : null] }));
}
//# sourceMappingURL=JobSiteCardV3.js.map