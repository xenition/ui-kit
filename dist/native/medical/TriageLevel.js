"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TriageLevel = TriageLevel;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/** Token-derived translucent tint (no literal hex; mirrors GlassPanel). */
function withAlpha(hex, alpha) {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
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
 * A triage acuity indicator (1 = immediate … 5 = non-urgent). The level is
 * always conveyed by the number + a text label + a glyph, so severity never
 * relies on the color fill alone (the color is a supporting cue only). Renders
 * a full card with a guidance hint, or a `compact` chip. Informational UI only
 * — not a medical device. Token-only colors.
 */
function TriageLevel({ level, label, description, compact = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const safe = clampLevel(level);
    const meta = LEVEL_META[safe];
    const accent = colors[meta.color];
    const text = label ?? meta.label;
    const hint = description ?? meta.hint;
    const a11y = `Triage level ${safe}, ${text}. ${hint}`;
    if (compact) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: a11y, style: [
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    alignSelf: 'flex-start',
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.md,
                    borderRadius: tokens.radius.full,
                    backgroundColor: withAlpha(accent, 0.14),
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: accent, fontSize: tokens.typography.scale.sm }, children: meta.glyph }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: [safe, " \u00B7 ", text] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: a11y, style: [
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
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 48,
                    height: 48,
                    borderRadius: tokens.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: withAlpha(accent, 0.14),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale.xl, fontWeight: '800' }, children: safe }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: accent, fontSize: tokens.typography.scale.sm }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: text })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: hint })] })] }));
}
//# sourceMappingURL=TriageLevel.js.map