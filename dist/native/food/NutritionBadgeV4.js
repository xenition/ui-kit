"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NutritionBadgeV4 = NutritionBadgeV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const menu_v4_1 = require("./internal/menu-v4");
const META = {
    vegetarian: { label: 'Vegetarian', glyph: '🥬' },
    vegan: { label: 'Vegan', glyph: '🌱' },
    'gluten-free': { label: 'Gluten-free', glyph: '🌾' },
    spicy: { label: 'Spicy', glyph: '🌶️' },
    halal: { label: 'Halal', glyph: '☪️' },
    popular: { label: 'Popular', glyph: '🔥' },
    new: { label: 'New', glyph: '✨' },
    calories: { label: 'Calories', glyph: '🔢' },
};
/**
 * **V4 nutrition badge** — same props as {@link NutritionBadge} plus `value`,
 * `unit` and `style`, with a `tone` union that matches the web twin.
 *
 * ## Five changes
 *
 * 1. **A dietary marker is identity, not status.** The base typed `vegetarian`
 *    and `vegan` as `success`, `spicy` as `danger` and `popular` as `warn`. A
 *    row of dish markers therefore rendered as a row of alerts — vegan read as
 *    a passing check and spicy as a failure — and a genuine status badge next
 *    to them was indistinguishable from a diet chip. Tones now come from the
 *    shared `DIET_TONE` table, where the identity markers are neutral and only
 *    `spicy` keeps a warm tone: `accent`, because heat is the one case where
 *    the colour is conventional, and `accent` cannot be read as a failure.
 * 2. **`calories` can carry its figure.** The preset ships the label
 *    "Calories" with no number and no unit, so a caller had to type
 *    `label="420 cal"` by hand and nothing in the component knew 420 was a
 *    quantity. `value` and `unit` compose the label and set the figure in
 *    tabular numerals.
 * 3. **`tone` takes the same union on both platforms** — see
 *    {@link NutritionToneV4}.
 * 4. **The label is inked with the tone's text slot.** The base painted the
 *    label `onSurface` / `onPrimary` — colours the compiler guarantees against
 *    a *fill* that a soft badge never draws.
 * 5. **Native gains `style`**, which every other component in the module has
 *    and this one did not, so a badge could not be given a margin without a
 *    wrapper view around it.
 */
function NutritionBadgeV4({ kind, label, tone, hideGlyph = false, value, unit, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors } = theme;
    const meta = META[kind];
    // Identity, not status. An unknown kind falls back to neutral rather than to
    // a colour that would claim something about the dish.
    const resolved = tone ?? menu_v4_1.DIET_TONE[kind] ?? 'neutral';
    const isMuted = resolved === 'muted';
    const badgeTone = isMuted ? 'neutral' : resolved;
    const ink = isMuted ? colors.mutedText : (0, menu_v4_1.toneInk)(theme, badgeTone);
    // `calories` is the one kind whose unit is not a caller's decision.
    const resolvedUnit = unit ?? (kind === 'calories' ? 'cal' : undefined);
    const figure = value != null && value !== '' ? [value, resolvedUnit].filter(Boolean).join(' ') : null;
    const text = label ?? figure ?? meta.label;
    // Only a figure gets tabular numerals; a word does not need them.
    const numeric = label == null && figure != null ? 'tabular' : 'proportional';
    return ((0, jsx_runtime_1.jsxs)(BadgeV4_1.BadgeV4, { tone: badgeTone, variant: menu_v4_1.BADGE_V4.variant, size: menu_v4_1.BADGE_V4.size, style: style, children: [!hideGlyph ? (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: meta.glyph, size: "xs" }) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", numeric: numeric, style: { color: ink }, children: text })] }));
}
//# sourceMappingURL=NutritionBadgeV4.js.map