"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetHealthLog = PetHealthLog;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const KIND_META = {
    symptom: { glyph: '🤒', label: 'Symptom', slot: 'danger' },
    observation: { glyph: '👀', label: 'Observation', slot: 'primary' },
    medication: { glyph: '💊', label: 'Medication', slot: 'accent' },
    diet: { glyph: '🍽️', label: 'Diet', slot: 'warn' },
    incident: { glyph: '⚠️', label: 'Incident', slot: 'danger' },
    note: { glyph: '📝', label: 'Note', slot: 'muted' },
};
/**
 * A timeline of pet-health log entries — each a kind icon, text, and timestamp
 * threaded on a connective rail. Handles a `loading` skeleton and an explicit
 * empty state. Kind is conveyed by icon + label text, not color alone.
 * Token-only colors.
 */
function PetHealthLog({ entries, title, loading = false, emptyLabel = 'No health entries yet', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const container = [
        {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
            gap: tokens.spacing.md,
        },
        style,
    ];
    const heading = title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title })) : null;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading health log", style: container, children: [heading, [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 14, borderRadius: tokens.radius.sm, backgroundColor: colors.border } }, i)))] }));
    }
    if (entries.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: emptyLabel, style: container, children: [heading, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', paddingVertical: tokens.spacing.lg, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['2xl'] }, children: "\uD83D\uDCCB" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel })] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: container, children: [heading, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.md }, children: entries.map((entry, i) => {
                    const meta = KIND_META[entry.kind] ?? KIND_META.note;
                    const last = i === entries.length - 1;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${meta.label}: ${entry.text}${entry.timestamp ? `, ${entry.timestamp}` : ''}`, style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                            width: 28,
                                            height: 28,
                                            borderRadius: tokens.radius.full,
                                            borderWidth: 1,
                                            borderColor: colors[meta.slot],
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm }, children: meta.glyph }) }), !last ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, width: 1, marginTop: 2, backgroundColor: colors.border } })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2, paddingBottom: last ? 0 : tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[meta.slot], fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }, children: meta.label }), entry.timestamp ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: entry.timestamp })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: entry.text }), entry.author ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\u2014 ", entry.author] })) : null] })] }, entry.id ?? i));
                }) })] }));
}
//# sourceMappingURL=PetHealthLog.js.map