"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealCardV4 = MealCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const tone_v4_1 = require("./internal/tone-v4");
const MEAL_GLYPH = {
    breakfast: '🍳',
    lunch: '🥗',
    dinner: '🍽️',
    snack: '🍎',
};
const MEAL_LABEL = {
    breakfast: 'Breakfast',
    lunch: 'Lunch',
    dinner: 'Dinner',
    snack: 'Snack',
};
const MACRO_LABEL = {
    protein: 'Protein',
    carbs: 'Carbs',
    fat: 'Fat',
};
/** Macro order, and the **shape** each one's key is drawn as. */
const MACRO_ORDER = [
    { key: 'protein', shape: 'circle' },
    { key: 'carbs', shape: 'square' },
    { key: 'fat', shape: 'bar' },
];
/**
 * **V4 meal card** — same props as {@link MealCard} plus `macroLabels` and
 * `formatCalories`.
 *
 * ## Five changes
 *
 * 1. **Carbohydrate stops being a warning.** The base drew the macro key as
 *    `protein: primary`, `carbs: warn`, `fat: accent` — an amber dot beside
 *    the word "Carbs" on every meal anyone ever logged. A status colour has to
 *    mean status or it means nothing, so a macro is identified by its **shape**
 *    now — a disc, a square, a bar — in neutral ink.
 * 2. **The macro strip is a sibling of the card's activation.** A `Pressable`
 *    is `accessible` by default and flattens its subtree, so on iOS the whole
 *    breakdown was pruned and the card announced only its slot, name and
 *    calories.
 * 3. **The card announces its macros and its time**, which the base computed
 *    and drew but left out of the name that replaces them.
 * 4. **Press is a state layer**, not `opacity: pressed ? 0.85 : 1`, which sits
 *    inside M3's disabled band.
 * 5. **The non-pressable branch is `accessible`**, so its label is no longer
 *    dead on iOS.
 *
 * **Renders nothing without a `name`.**
 */
function MealCardV4({ name, variant, calories, macros, time, macroLabels, formatCalories, onPress, appearance = 'classic', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!name)
        return null;
    const slot = MEAL_LABEL[variant];
    const kcal = formatCalories ?? ((n) => `${n} kcal`);
    const shown = MACRO_ORDER.filter((macro) => macros?.[macro.key] != null).map((macro) => ({
        ...macro,
        label: macroLabels?.[macro.key] ?? MACRO_LABEL[macro.key],
        grams: macros?.[macro.key],
    }));
    const macroLine = shown.map((macro) => `${macro.label} ${macro.grams}g`);
    const name_ = (0, tone_v4_1.spokenLine)([
        slot,
        name,
        time,
        calories != null ? kcal(calories) : null,
        ...macroLine,
    ]);
    const heading = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            gap: tokens.spacing.sm,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? (0, state_v4_1.pressFill)(theme) : 'transparent',
        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", allowFontScaling: false, accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: MEAL_GLYPH[variant] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "mutedText", children: slot }), time ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: time })) : null] }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", numberOfLines: 1, children: name })] })] }), calories != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", tone: "onSurface", numeric: "tabular", children: kcal(calories) })) : null] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [(0, tone_v4_1.cardStyle)(theme, appearance), style], children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name_, onPress: onPress, children: ({ pressed }) => heading(pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name_, children: heading(false) })), shown.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: (0, tone_v4_1.metaLine)(macroLine), style: { flexDirection: 'row', gap: tokens.spacing.lg }, children: shown.map((macro) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: tokens.spacing.sm,
                                height: macro.shape === 'bar' ? tokens.spacing.xs : tokens.spacing.sm,
                                borderRadius: macro.shape === 'circle'
                                    ? tokens.radius.full
                                    : macro.shape === 'bar'
                                        ? tokens.radius.full
                                        : 0,
                                backgroundColor: macro.shape === 'square' ? colors.onSurface : (0, tone_v4_1.trackGround)(theme),
                                borderWidth: macro.shape === 'square' ? 0 : 1,
                                borderColor: colors.onSurface,
                            } }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: `${macro.label} ${macro.grams}g` })] }, macro.key))) })) : null] }));
}
//# sourceMappingURL=MealCardV4.js.map