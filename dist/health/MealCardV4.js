"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const tone_v4_1 = require("./internal/tone-v4");
const MEAL_META = {
    breakfast: { glyph: '🍳', label: 'Breakfast' },
    lunch: { glyph: '🥗', label: 'Lunch' },
    dinner: { glyph: '🍽️', label: 'Dinner' },
    snack: { glyph: '🍎', label: 'Snack' },
};
/**
 * Macros in a fixed order, each with a **shape**.
 *
 * The base gave carbs `warn` and fat `accent`, which is a status colour spent
 * on a nutrient — see the docblock's change 1. A disc, a square and a diamond
 * separate the three for a quick scan without borrowing a vocabulary that is
 * supposed to mean "something is wrong", and they are decorative: the word is
 * beside every one of them.
 */
const MACROS = [
    { key: 'protein', label: 'Protein', shape: 'rounded-full' },
    { key: 'carbs', label: 'Carbs', shape: 'rounded-none' },
    { key: 'fat', label: 'Fat', shape: 'rotate-45 rounded-none' },
];
/**
 * **V4 meal card** — same props as {@link MealCard} plus `macroLabels`,
 * `formatCalories` and `appearance`.
 *
 * ## Five changes
 *
 * 1. **Carbohydrates stopped being a warning.** The macro strip painted carbs
 *    `warn` and `MealCardV2` painted breakfast `warn` — a status colour spent
 *    on *identity*, so a perfectly ordinary bowl of oats drew in the same hue
 *    the kit uses to say something is wrong. The three macros are told apart by
 *    shape and by their own word instead, and the status vocabulary is left
 *    free to mean status.
 * 2. **The calories and the macros were pruned from the reader.** The whole
 *    card was one `role="button"` whose `aria-label` named the meal and the
 *    dish and nothing else — and a button's name *replaces* its contents, so
 *    "420 kcal, Protein 30g, Carbs 45g, Fat 12g" reached nobody. The card is a
 *    plain container now, the activation wraps the dish, and the breakdown sits
 *    beside it where it can still be read.
 * 3. **The activation is a real `<button>` that clears 44.** `div` +
 *    `role="button"` + `tabIndex` + a hand-written Enter/Space handler is three
 *    approximations of a button.
 * 4. **Press is a state layer.** `hover:opacity-90` fades the card's own
 *    content, which is M3's *disabled* signal at close to the same strength.
 * 5. **"kcal" and the three macro words are props**, where a localised app
 *    previously had to fork the component to translate them.
 */
exports.MealCardV4 = React.forwardRef(function MealCardV4({ name, variant, calories, macros, time, onPress, macroLabels, formatCalories, appearance = 'classic', className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    const meta = MEAL_META[variant];
    const showCalories = formatCalories ?? ((kcal) => `${kcal} kcal`);
    const shown = MACROS.filter((macro) => macros?.[macro.key] != null);
    const head = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "text-lg leading-none", children: meta.glyph }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted-text", children: meta.label }), time ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: time }) : null] }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-card", children: name })] })] }), calories != null ? ((0, jsx_runtime_1.jsx)("span", { className: "text-lg font-bold text-on-card", children: showCalories(calories) })) : null] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-sm', tone_v4_1.HEALTH_CARD_CLASS, (0, tone_v4_1.appearanceClass)(appearance), className), ...rest, children: [onPress ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": (0, tone_v4_1.spokenLine)([
                    meta.label,
                    name,
                    calories != null ? showCalories(calories) : undefined,
                    time,
                ]), onClick: onPress, "data-xen-v4-state": "", style: (0, tone_v4_1.appearanceStateVars)(appearance), className: (0, cn_1.cn)('flex flex-col gap-sm rounded-[var(--xen-radius-md)] bg-transparent text-left', chrome_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: head })) : ((0, jsx_runtime_1.jsx)("span", { className: "flex flex-col gap-sm", children: head })), shown.length ? ((0, jsx_runtime_1.jsx)("ul", { className: "flex flex-wrap gap-sm", children: shown.map((macro) => ((0, jsx_runtime_1.jsxs)("li", { className: "flex items-center gap-xs rounded-[var(--xen-radius-full)] bg-[color-mix(in_srgb,var(--xen-on-card)_8%,var(--xen-card))] px-sm py-xs", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('h-2 w-2 shrink-0 bg-muted', macro.shape) }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-on-card", children: `${macroLabels?.[macro.key] ?? macro.label} ${macros?.[macro.key]}g` })] }, macro.key))) })) : null] }));
});
//# sourceMappingURL=MealCardV4.js.map