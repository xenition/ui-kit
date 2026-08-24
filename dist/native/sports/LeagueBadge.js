"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeagueBadge = LeagueBadge;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const DIAMETER = { sm: 24, md: 32, lg: 44 };
const TEXT = { sm: 'xs', md: 'sm', lg: 'base' };
function initials(name) {
    const parts = name.trim().split(/\s+/).slice(0, 2);
    const joined = parts.map((w) => w[0]?.toUpperCase() ?? '').join('');
    return joined || '?';
}
/**
 * A league / competition crest — a small token-styled emblem (crest glyph or
 * derived initials) with an optional name label. Purely presentational and
 * dependency-free; the crest tile is a styled `View`, never an image fetch.
 * `variant` recolors from the primary slot / ramp tints; all colors resolve
 * from the compiled theme — no literals.
 */
function LeagueBadge({ name, crest, label, size = 'md', variant = 'soft', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const d = DIAMETER[size];
    const text = label === undefined ? name : label;
    const solid = variant === 'solid';
    const outline = variant === 'outline';
    const tileBg = solid ? colors.primary : outline ? colors.surface : tokens.ramps.primary[100];
    const tileFg = solid ? colors.onPrimary : colors.primary;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "image", accessibilityLabel: `${name} badge`, style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: d,
                    height: d,
                    borderRadius: tokens.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: tileBg,
                    borderWidth: outline ? 1 : 0,
                    borderColor: outline ? colors.primary : 'transparent',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, numberOfLines: 1, style: { color: tileFg, fontSize: tokens.typography.scale[TEXT[size]], fontWeight: '700' }, children: crest ?? initials(name) }) }), text ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale[TEXT[size]], fontWeight: '600' }, children: text })) : null] }));
}
//# sourceMappingURL=LeagueBadge.js.map