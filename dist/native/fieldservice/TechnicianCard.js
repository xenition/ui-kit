"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnicianCard = TechnicianCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const TECHNICIAN_STATUS = {
    available: { label: 'Available', glyph: '✓', tone: 'success', presence: 'online' },
    'on-job': { label: 'On job', glyph: '⟳', tone: 'primary', presence: 'busy' },
    'en-route': { label: 'En route', glyph: '→', tone: 'warn', presence: 'away' },
    offline: { label: 'Offline', glyph: '○', tone: 'neutral', presence: 'offline' },
};
/**
 * A roster card for a field technician: avatar with a presence dot, name/role
 * stack, an availability pill (text + glyph + a color that traces to a
 * `SemanticColors` slot — never color alone), skill chips, and Call / Assign
 * actions. Skills are guarded against a missing array. No literal colors.
 */
function TechnicianCard({ name, role, status, avatarUrl, skills, jobsToday, phone, onCall, onAssign, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const sd = TECHNICIAN_STATUS[status] ?? TECHNICIAN_STATUS.offline;
    const skillList = Array.isArray(skills) ? skills : [];
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: "elevated", style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUrl, name: name, size: "lg", status: sd.presence }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: name }), role != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: role })) : null, jobsToday != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDDD2 ", Math.max(0, Math.trunc(jobsToday)), " jobs today"] })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: sd.tone, variant: "soft", children: `${sd.glyph} ${sd.label}` })] }), skillList.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.md, flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: skillList.map((skill, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        borderRadius: tokens.radius.full,
                        paddingVertical: 2,
                        paddingHorizontal: tokens.spacing.sm,
                        backgroundColor: (0, format_1.withAlpha)(colors.primary, 0.1),
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '500' }, children: skill }) }, `${skill}-${i}`))) })) : null, (phone != null && onCall) || onAssign ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.md, flexDirection: 'row', gap: tokens.spacing.sm }, children: [phone != null && onCall ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", size: "sm", onPress: onCall, style: { flex: 1 }, children: "Call" })) : null, onAssign ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "sm", onPress: onAssign, style: { flex: 1 }, children: "Assign" })) : null] })) : null] }));
}
//# sourceMappingURL=TechnicianCard.js.map