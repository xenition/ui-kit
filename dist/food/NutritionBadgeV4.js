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
exports.NutritionBadgeV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const menu_v4_1 = require("./internal/menu-v4");
/** Glyph per attribute — carried over from the base preset unchanged. */
const GLYPH = {
    vegetarian: '🥬',
    vegan: '🌱',
    'gluten-free': '🌾',
    spicy: '🌶️',
    halal: '☪️',
    popular: '🔥',
    new: '✨',
    calories: '🔢',
};
/** Word per attribute — carried over from the base preset unchanged. */
const LABEL = {
    vegetarian: 'Vegetarian',
    vegan: 'Vegan',
    'gluten-free': 'Gluten-free',
    spicy: 'Spicy',
    halal: 'Halal',
    popular: 'Popular',
    new: 'New',
    calories: 'Calories',
};
/** The one attribute that measures something, and the unit it measures in. */
const UNIT = { calories: 'cal' };
/**
 * **V4 nutrition badge** — the web twin of the native `NutritionBadgeV4`, same
 * props as {@link NutritionBadge} plus `value` and `unit`.
 *
 * ## Four changes
 *
 * 1. **A dietary marker is identity, not status.** The preset typed
 *    `vegetarian` and `vegan` as `success`, `spicy` as `danger` and `popular`
 *    as `warn` — so a menu row of dietary markers read as a row of alerts, and
 *    a genuine status badge standing beside them became indistinguishable from
 *    a lettuce leaf. `DIET_TONE` settles it: everything dietary is `neutral`,
 *    `spicy` keeps a warm tone as `accent` because heat is the one case where
 *    the colour conventionally carries meaning, and `popular`/`new` are
 *    `primary` because they are the menu's own emphasis.
 * 2. **`calories` can carry its figure.** `value` and `unit` render as
 *    `420 cal` — tabular, so a column of them lines up — instead of leaving
 *    the caller to hand-assemble the string into `label` and hoping.
 * 3. **It takes the module's one badge shape.** `BADGE_V4` — `soft`, `sm` —
 *    so a dietary marker, a delivery estimate pill and a reservation status
 *    are visibly one family, and `BadgeV4`'s soft tint is an opaque
 *    `color-mix` rather than the base's neutral ramp step.
 * 4. **The glyph is hidden from the reader.** It was an `Icon` beside the word
 *    it duplicates, which is a second stop announcing the same thing.
 */
exports.NutritionBadgeV4 = React.forwardRef(function NutritionBadgeV4({ kind, label, tone, value, unit, hideGlyph = false, className }, ref) {
    const measured = [value, unit ?? UNIT[kind]].filter(Boolean).join(' ');
    const text = label ?? (measured !== '' ? measured : LABEL[kind]);
    // Identity first; an explicit `tone` still wins, and the preset's own tone
    // is the last resort so a kind DIET_TONE has never heard of still renders.
    const resolvedTone = tone ?? menu_v4_1.DIET_TONE[kind] ?? 'neutral';
    return ((0, jsx_runtime_1.jsxs)(BadgeV4_1.BadgeV4, { ref: ref, ...menu_v4_1.BADGE_V4, tone: resolvedTone, className: (0, cn_1.cn)(measured !== '' && !label && menu_v4_1.TABULAR_CLASS, className), children: [!hideGlyph ? (
            // The word is right beside it; a glyph that repeats the word is a
            // second reader stop saying nothing new.
            (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: GLYPH[kind] })) : null, text] }));
});
//# sourceMappingURL=NutritionBadgeV4.js.map