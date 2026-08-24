"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleHealthRow = VehicleHealthRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/** Status → tone + spelled-out word + glyph (never color alone). */
const HEALTH = {
    ok: { tone: 'success', word: 'OK', glyph: '✓' },
    attention: { tone: 'warn', word: 'Attention', glyph: '!' },
    critical: { tone: 'danger', word: 'Critical', glyph: '✕' },
    unknown: { tone: 'muted', word: 'Unknown', glyph: '?' },
};
/**
 * One vehicle-health system row — its name, a reading, and a status conveyed by
 * a glyph plus a spelled-out word and an a11y label, so meaning never rests on
 * color; a `critical` status maps to the `danger` slot per contract. An optional
 * `percent` draws a token-tinted mini meter (brake life, oil, etc.).
 * Presentational: shaped data only. Colors come from semantic tokens and
 * `withAlpha` tints — no literal colors. `percent` is clamped to 0–100.
 */
function VehicleHealthRow({ system, status = 'ok', reading, glyph, percent, variant = 'default', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const h = HEALTH[status] ?? HEALTH.unknown;
    const toneColor = colors[h.tone];
    const compact = variant === 'compact';
    const hasMeter = typeof percent === 'number';
    const clamped = hasMeter ? Math.max(0, Math.min(100, Math.round(percent))) : 0;
    const a11y = `${system}: ${h.word}${reading ? `, ${reading}` : ''}${hasMeter ? `, ${clamped} percent` : ''}`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                paddingVertical: compact ? tokens.spacing.sm : tokens.spacing.md,
                paddingHorizontal: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 30,
                    height: 30,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, color_1.withAlpha)(toneColor, 0.16),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: toneColor, fontSize: tokens.typography.scale.sm, fontWeight: '800' }, children: glyph ?? h.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: system }), hasMeter ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                            marginTop: 4,
                            height: 6,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.2),
                            overflow: 'hidden',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${clamped}%`, height: '100%', backgroundColor: toneColor, borderRadius: tokens.radius.full } }) })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end' }, children: [reading ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: reading })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: toneColor, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: h.word })] })] }));
}
//# sourceMappingURL=VehicleHealthRow.js.map