"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetHealthLogV4 = PetHealthLogV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const KIND_META = {
    symptom: { glyph: '🤒', label: 'Symptom', tone: 'danger' },
    observation: { glyph: '👀', label: 'Observation', tone: 'primary' },
    medication: { glyph: '💊', label: 'Medication', tone: 'accent' },
    diet: { glyph: '🍽️', label: 'Diet', tone: 'warn' },
    incident: { glyph: '⚠️', label: 'Incident', tone: 'danger' },
    note: { glyph: '📝', label: 'Note', tone: 'neutral' },
};
/**
 * PetHealthLog — **V4** "companion" design (native parity of the web V4). The
 * warm, friendly take on a pet-health log: an elevated rounded card with a soft
 * shadow (no gradient — a clean surface) wrapping a list of entry rows. Each entry
 * is a soft-primary tinted well holding the kind glyph, a labelled kind Badge, the
 * text, and a muted timestamp. Kind is conveyed by glyph + labelled Badge (never
 * color alone). Preserves the `loading` skeleton and the explicit empty state.
 * Same props/behavior as {@link PetHealthLogProps}. Token-only colors via
 * `useXenitionTheme()`.
 */
function PetHealthLogV4({ entries, title, loading = false, emptyLabel = 'No health entries yet', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const container = [
        {
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
            gap: tokens.spacing.md,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 3,
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
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: container, children: [heading, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: entries.map((entry, i) => {
                    const meta = KIND_META[entry.kind] ?? KIND_META.note;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${meta.label}: ${entry.text}${entry.timestamp ? `, ${entry.timestamp}` : ''}`, style: {
                            flexDirection: 'row',
                            gap: tokens.spacing.sm,
                            borderWidth: 1,
                            borderColor: colors.border,
                            borderRadius: tokens.radius.md,
                            padding: tokens.spacing.sm,
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: 36,
                                    height: 36,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base }, children: meta.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: meta.label }), entry.timestamp ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: entry.timestamp })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: entry.text }), entry.author ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\u2014 ", entry.author] })) : null] })] }, entry.id ?? i));
                }) })] }));
}
//# sourceMappingURL=PetHealthLogV4.js.map