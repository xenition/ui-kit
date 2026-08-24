"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnicianCardV3 = TechnicianCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const STATUS = {
    available: { label: 'Available', glyph: '✓', tone: 'success', presence: 'online' },
    'on-job': { label: 'On job', glyph: '⟳', tone: 'primary', presence: 'busy' },
    'en-route': { label: 'En route', glyph: '→', tone: 'warn', presence: 'away' },
    offline: { label: 'Offline', glyph: '○', tone: 'neutral', presence: 'offline' },
};
function TechnicianCardV3({ name, role, status, avatarUrl, jobsToday, phone, onCall, onAssign, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const sd = STATUS[status] ?? STATUS.offline;
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
    const sub = [role, jobsToday != null ? `🗒 ${Math.max(0, Math.trunc(jobsToday))}` : null].filter(Boolean).join('   ·   ');
    const a11y = `Technician ${name}${role != null ? `, ${role}` : ''}, ${sd.label}`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, style: [rowStyle, style], children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUrl, name: name, size: "sm", status: sd.presence }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: name }), sub ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: sub })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: sd.tone, variant: "soft", size: "sm", children: `${sd.glyph} ${sd.label}` }), phone != null && onCall ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Call ${name}`, onPress: onCall, style: ({ pressed }) => ({
                    width: 32,
                    height: 32,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.14),
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: pressed ? 0.6 : 1,
                }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDCDE", size: "sm" }) })) : null, onAssign ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Assign ${name}`, onPress: onAssign, style: ({ pressed }) => ({
                    width: 32,
                    height: 32,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.14),
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: pressed ? 0.6 : 1,
                }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uFF0B", size: "sm", color: "primaryText" }) })) : null] }));
}
//# sourceMappingURL=TechnicianCardV3.js.map