"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientCardV4 = PatientCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const STATUS_META = {
    stable: { label: 'Stable', tone: 'success', glyph: '●' },
    observation: { label: 'Observation', tone: 'warn', glyph: '◐' },
    critical: { label: 'Critical', tone: 'danger', glyph: '⚠' },
    discharged: { label: 'Discharged', tone: 'neutral', glyph: '✓' },
};
/**
 * PatientCard — **V4** "clinic" design. The calm, clinical take on a patient
 * roster / chart-header row: an elevated rounded card with a soft shadow, the
 * avatar + name + an age·sex·MRN demographic line, an optional room, and a
 * labelled clinical-status badge whose meaning is carried by a glyph + label as
 * well as tone (never color alone). Tap to open the record. Honors the V4
 * `variant` — `full` (card, default) and `compact` (a dense single row) —
 * identical props/behavior to {@link PatientCardProps}. Token-only colors via
 * `useXenitionTheme()`. Informational UI only — not a medical device.
 */
function PatientCardV4({ name, avatar, age, sex, mrn, status, room, onPress, variant = 'full', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = status ? STATUS_META[status] : undefined;
    const shell = {
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    };
    const demo = [age != null ? `${age}y` : undefined, sex, mrn ? `MRN ${mrn}` : undefined].filter(Boolean);
    const a11y = `${name}${demo.length ? `, ${demo.join(', ')}` : ''}${meta ? `, ${meta.label}` : ''}`;
    const isCompact = variant === 'compact';
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            shell,
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: isCompact ? tokens.spacing.sm : tokens.spacing.md,
                padding: isCompact ? tokens.spacing.sm : tokens.spacing.lg,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatar, name: name, size: isCompact ? 'sm' : 'lg' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: isCompact ? 2 : 3 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: isCompact ? tokens.typography.scale.sm : tokens.typography.scale.base, fontWeight: '700' }, children: name }), demo.length ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: isCompact ? tokens.typography.scale.xs : tokens.typography.scale.sm }, children: demo.join('  ·  ') })) : null, !isCompact && room ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignSelf: 'flex-start', marginTop: 2, backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1), borderRadius: tokens.radius.sm, paddingHorizontal: tokens.spacing.xs, paddingVertical: 1 }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDECF ", room] }) })) : null] }), meta ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: isCompact ? 'sm' : 'md', children: `${meta.glyph} ${meta.label}` })) : null] }));
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: body });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: body }));
}
//# sourceMappingURL=PatientCardV4.js.map