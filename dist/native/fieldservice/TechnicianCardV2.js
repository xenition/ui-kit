"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnicianCardV2 = TechnicianCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const STATUS = {
    available: { label: 'Available', glyph: '✓', tone: 'success', presence: 'online', ringSlot: 'success' },
    'on-job': { label: 'On job', glyph: '⟳', tone: 'primary', presence: 'busy', ringSlot: 'primary' },
    'en-route': { label: 'En route', glyph: '→', tone: 'warn', presence: 'away', ringSlot: 'warn' },
    offline: { label: 'Offline', glyph: '○', tone: 'neutral', presence: 'offline', ringSlot: 'muted' },
};
function TechnicianCardV2({ name, role, status, avatarUrl, skills, jobsToday, phone, onCall, onAssign, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const sd = STATUS[status] ?? STATUS.offline;
    const skillList = Array.isArray(skills) ? skills : [];
    const surface = {
        borderRadius: tokens.radius.lg,
        backgroundColor: colors.surface,
        padding: tokens.spacing.lg,
        alignItems: 'center',
        gap: tokens.spacing.sm,
        ...(0, elevation_1.shadow)('md', tokens),
    };
    const a11y = `Technician ${name}${role != null ? `, ${role}` : ''}, ${sd.label}`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { accessible: true, accessibilityLabel: a11y, style: [{ opacity: enter.opacity, transform: enter.transform }, surface, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    padding: 4,
                    borderRadius: tokens.radius.full,
                    borderWidth: 2,
                    borderColor: (0, color_1.withAlpha)(colors[sd.ringSlot], 0.55),
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUrl, name: name, size: "xl", status: sd.presence }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: name }), role != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: role })) : null, (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: sd.tone, variant: "soft", children: `${sd.glyph} ${sd.label}` }), jobsToday != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDDD2 ", Math.max(0, Math.trunc(jobsToday)), " jobs today"] })) : null, skillList.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs, justifyContent: 'center' }, children: skillList.map((skill, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        borderRadius: tokens.radius.full,
                        paddingVertical: 2,
                        paddingHorizontal: tokens.spacing.sm,
                        backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: skill }) }, `${skill}-${i}`))) })) : null, (phone != null && onCall) || onAssign ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm, width: '100%', marginTop: tokens.spacing.xs }, children: [phone != null && onCall ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", size: "sm", onPress: onCall, accessibilityLabel: `Call ${name}`, children: "\uD83D\uDCDE Call" }) })) : null, onAssign ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "sm", onPress: onAssign, accessibilityLabel: `Assign ${name}`, children: "Assign" }) })) : null] })) : null] }));
}
//# sourceMappingURL=TechnicianCardV2.js.map