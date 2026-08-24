"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NutritionBadge = NutritionBadge;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const META = {
    vegetarian: { label: 'Vegetarian', glyph: '🥬', tone: 'success' },
    vegan: { label: 'Vegan', glyph: '🌱', tone: 'success' },
    'gluten-free': { label: 'Gluten-free', glyph: '🌾', tone: 'neutral' },
    spicy: { label: 'Spicy', glyph: '🌶️', tone: 'danger' },
    halal: { label: 'Halal', glyph: '☪️', tone: 'neutral' },
    popular: { label: 'Popular', glyph: '🔥', tone: 'warn' },
    new: { label: 'New', glyph: '✨', tone: 'primary' },
    calories: { label: 'Calories', glyph: '🔢', tone: 'neutral' },
};
/** Resolve a tone to its contrast-guaranteed on-tone text color. */
function onToneColor(tone, colors) {
    switch (tone) {
        case 'primary':
            return colors.onPrimary;
        case 'success':
            return colors.onSuccess;
        case 'warn':
            return colors.onWarn;
        case 'danger':
            return colors.onDanger;
        case 'neutral':
        default:
            return colors.onSurface;
    }
}
/**
 * A small dietary / nutrition tag — a `Badge` preset for common dish
 * attributes (vegetarian, vegan, spicy, halal, popular, …). Each `kind` maps
 * to a default label, glyph, and semantic tone, all overridable. Because the
 * badge carries a glyph *and* a text label, the attribute never relies on color
 * alone. Reuses the `Badge` and `Icon` primitives. Token-only.
 */
function NutritionBadge({ kind, label, tone, hideGlyph = false, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = META[kind];
    const text = label ?? meta.label;
    const resolvedTone = tone ?? meta.tone;
    return ((0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: resolvedTone, children: [!hideGlyph ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: meta.glyph, size: "xs" }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: onToneColor(resolvedTone, colors),
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '600',
                }, children: text })] }));
}
//# sourceMappingURL=NutritionBadge.js.map