"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketPriority = TicketPriority;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const internal_1 = require("./internal");
// urgent → danger, high → warn, normal → primary, low → muted. Distinct glyph +
// bar count so priority is never conveyed by color alone.
const LEVEL = {
    low: { slot: 'muted', glyph: '▽', label: 'Low', rank: 1 },
    normal: { slot: 'primary', glyph: '▷', label: 'Normal', rank: 2 },
    high: { slot: 'warn', glyph: '△', label: 'High', rank: 3 },
    urgent: { slot: 'danger', glyph: '⚑', label: 'Urgent', rank: 4 },
};
const TOTAL_BARS = 4;
/**
 * Ticket priority indicator (`low`/`normal`/`high`/`urgent`). Two variants: a
 * `chip` (glyph + label pill) and `bars` (a four-step signal indicator whose
 * filled count encodes the level). Tone maps to `SemanticColors`
 * (`danger`/`warn`/`primary`/`muted`) via a token tint; the glyph and the bar
 * count carry the level independently of color. No literal hex. Presentational.
 */
function TicketPriority({ level, variant = 'chip', size = 'md', hideLabel = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const spec = LEVEL[level] ?? LEVEL.normal;
    const accent = colors[spec.slot];
    const textKey = size === 'sm' ? 'xs' : 'sm';
    const a11y = `Priority ${spec.label}`;
    if (variant === 'bars') {
        const barH = size === 'sm' ? 10 : 14;
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "image", accessibilityLabel: a11y, style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', gap: 2 }, children: Array.from({ length: TOTAL_BARS }, (_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: size === 'sm' ? 3 : 4,
                            height: Math.round((barH * (i + 1)) / TOTAL_BARS),
                            borderRadius: 1,
                            backgroundColor: i < spec.rank ? accent : (0, internal_1.withAlpha)(colors.onSurface, 0.16),
                        } }, i))) }), hideLabel ? null : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale[textKey], fontWeight: '600' }, children: spec.label }))] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: a11y, style: [
            {
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                backgroundColor: (0, internal_1.withAlpha)(accent, 0.14),
                borderRadius: tokens.radius.full,
                paddingVertical: size === 'sm' ? 1 : 3,
                paddingHorizontal: tokens.spacing[size === 'sm' ? 'xs' : 'sm'],
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale[textKey] }, children: spec.glyph }), hideLabel ? null : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale[textKey], fontWeight: '600' }, children: spec.label }))] }));
}
//# sourceMappingURL=TicketPriority.js.map