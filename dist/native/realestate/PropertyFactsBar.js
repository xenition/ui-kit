"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyFactsBar = PropertyFactsBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/**
 * PropertyFactsBar — **V4** "listing" design. A key-facts stat strip for a
 * property: a wrapping grid of fact cells, each a soft-primary tinted glyph
 * disc, a BIG bold value numeral and a muted label beneath, split by hairline
 * rules. Editorial, single-accent (primary), 8-pt spacing inside a rounded
 * elevated card. Presentational only — token-only colors via
 * `useXenitionTheme()`, no literals; dark-mode safe. Exposed as an a11y group.
 */
function PropertyFactsBar({ facts, columns, accessibilityLabel = 'Key facts', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const cols = columns != null ? Math.max(1, Math.min(6, Math.round(columns))) : 2;
    const widthPct = `${100 / cols}%`;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "summary", accessibilityLabel: accessibilityLabel, style: [
            {
                backgroundColor: colors.card,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                padding: tokens.spacing.sm,
                flexDirection: 'row',
                flexWrap: 'wrap',
                shadowColor: colors.onSurface,
                shadowOpacity: 0.08,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 6 },
                elevation: 3,
            },
            style,
        ], children: facts.map((fact, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                width: widthPct,
                alignItems: 'center',
                gap: tokens.spacing.xs,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.xs,
                // Hairline separator between cells within a row.
                borderLeftWidth: i % cols === 0 ? 0 : 1,
                borderLeftColor: colors.border,
            }, children: [fact.glyph ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: 32,
                        height: 32,
                        borderRadius: tokens.radius.full,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base, color: colors.primary }, children: fact.glyph }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xl, fontWeight: '700', color: colors.onSurface }, children: fact.value }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        fontSize: tokens.typography.scale.xs,
                        fontWeight: '500',
                        color: colors.mutedText,
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                    }, children: fact.label })] }, `${fact.label}-${i}`))) }));
}
//# sourceMappingURL=PropertyFactsBar.js.map