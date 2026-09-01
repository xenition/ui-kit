"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TriageLevelV4 = TriageLevelV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const LEVEL_META = {
    1: { label: 'Immediate', glyph: '⚠', color: 'danger', hint: 'Life-threatening — resuscitate now' },
    2: { label: 'Emergent', glyph: '▲', color: 'danger', hint: 'High risk — see within minutes' },
    3: { label: 'Urgent', glyph: '◆', color: 'warn', hint: 'Needs prompt evaluation' },
    4: { label: 'Less urgent', glyph: '●', color: 'primary', hint: 'Can wait — routine care' },
    5: { label: 'Non-urgent', glyph: '○', color: 'success', hint: 'Minor — lowest priority' },
};
function clampLevel(n) {
    const r = Math.round(n);
    const c = r < 1 ? 1 : r > 5 ? 5 : r;
    return c;
}
/**
 * TriageLevel — **V4** "clinic" design. The calm, clinical acuity indicator
 * (1 = Immediate/resuscitation … 5 = Non-urgent): a big legible **tabular-nums**
 * number in a soft-tone well, a text label, and a glyph, so severity is always
 * number + label + glyph + supporting tone — never a color fill alone (no
 * gradient — clinical surfaces stay clean). Renders an elevated rounded card with
 * a guidance hint, or a `compact` chip. Identical props/behavior to
 * {@link TriageLevelProps}. Token-only colors via `useXenitionTheme()`.
 * Informational UI only — not a medical device.
 */
function TriageLevelV4({ level, label, description, compact = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const safe = clampLevel(level);
    const meta = LEVEL_META[safe];
    const accent = colors[meta.color];
    const text = label ?? meta.label;
    const hint = description ?? meta.hint;
    const a11y = `Triage level ${safe}, ${text}. ${hint}`;
    const shellStyle = {
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
    if (compact) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: a11y, style: [
                shellStyle,
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    alignSelf: 'flex-start',
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.md,
                    borderRadius: tokens.radius.full,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: accent, fontSize: tokens.typography.scale.sm }, children: meta.glyph }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale.sm, fontWeight: '700', fontVariant: ['tabular-nums'] }, children: [safe, " \u00B7 ", text] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: a11y, style: [
            shellStyle,
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                padding: tokens.spacing.lg,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 56,
                    height: 56,
                    borderRadius: tokens.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale['3xl'], fontWeight: '800', fontVariant: ['tabular-nums'] }, children: safe }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: accent, fontSize: tokens.typography.scale.sm }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: text })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: hint })] })] }));
}
//# sourceMappingURL=TriageLevelV4.js.map