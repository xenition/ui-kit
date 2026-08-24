"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientCard = PatientCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const STATUS_META = {
    stable: { label: 'Stable', tone: 'success', glyph: '●' },
    observation: { label: 'Observation', tone: 'warn', glyph: '◐' },
    critical: { label: 'Critical', tone: 'danger', glyph: '⚠' },
    discharged: { label: 'Discharged', tone: 'neutral', glyph: '✓' },
};
/**
 * A patient roster / chart-header card: avatar, name, an age·sex·MRN demographic
 * line, an optional room, and a clinical status badge whose meaning is carried
 * by a glyph + label as well as tone. Tap to open the record. Informational UI
 * only — not a medical device. Token-only colors.
 */
function PatientCard({ name, avatar, age, sex, mrn, status, room, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = status ? STATUS_META[status] : undefined;
    const demo = [age != null ? `${age}y` : undefined, sex, mrn ? `MRN ${mrn}` : undefined].filter(Boolean);
    const a11y = `${name}${demo.length ? `, ${demo.join(', ')}` : ''}${meta ? `, ${meta.label}` : ''}`;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatar, name: name, size: "lg" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 3 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), demo.length ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: demo.join('  ·  ') })) : null, room ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDECF ", room] })) : null] }), meta ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", children: `${meta.glyph} ${meta.label}` })) : null] }));
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: body });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: body }));
}
//# sourceMappingURL=PatientCard.js.map