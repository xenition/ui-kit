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
exports.ConditionBadgeV4 = exports.CONDITION_V4_LABEL = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const BadgeV4_1 = require("../primitives/BadgeV4");
const icon_names_1 = require("../primitives/icon-names");
/**
 * The grade's mark, from the kit's named icon set rather than a picked emoji.
 *
 * Each one says what the grade *is* rather than how to feel about it: a
 * sparkle for factory-new, a star for as-new, a price tag for a used item
 * being resold, and the refresh arrow for something that was restored. None of
 * them is a status glyph — no ⚠, no ⊗ — because none of these is a status.
 */
const CONDITION_ICON = {
    new: 'sparkle',
    'like-new': 'star',
    used: 'tag',
    refurb: 'refresh',
};
/**
 * **The status colours are gone, on both twins.**
 *
 * The base painted `new` in `success`. Brief rule 3 reserves `success` /
 * `warn` / `danger` for good, caution and bad, and a condition grade is none
 * of those: a "used" listing is not a warning and a "new" one is not a passing
 * test. The grade is *emphasis*, and rule 3 says emphasis takes the brand.
 *
 * So the ladder is spelled by the icon and the word (rule 6), and the hue only
 * separates the three *kinds*: as-new (`primary`), used (`neutral`), and
 * restored (`accent` — a different thing rather than a lower rung).
 *
 * `refurb` also closes a **twin divergence**: native mapped it to `accent` and
 * web to `primary`, with a comment explaining that "the web `Badge` has no
 * `accent` tone". It has had one since the shadcn pass, so the two chips can
 * finally be the same colour.
 */
const CONDITION_TONE = {
    new: 'primary',
    'like-new': 'primary',
    used: 'neutral',
    refurb: 'accent',
};
/**
 * The humanized grade, exported because `ListingCardV4` needs the same words
 * for its accessible name. The base card announced the raw slug — "Vintage
 * camera, $125.00, like-new" — which is a database value read aloud to a
 * shopper. One map, two callers, no second spelling of "Refurbished".
 */
exports.CONDITION_V4_LABEL = {
    new: 'New',
    'like-new': 'Like New',
    used: 'Used',
    refurb: 'Refurbished',
};
const CONDITION_LABEL = exports.CONDITION_V4_LABEL;
/**
 * **V4 condition chip** — `new` / `like-new` / `used` / `refurb`, as an icon
 * **and** a word.
 *
 * Brief §3 Group C: "a condition grade is an icon plus a label. It is not
 * status — a 'used' item is not a warning, and rule 3 forbids spending `warn`
 * on it." Three changes follow from that sentence, and nothing else:
 *
 * 1. **An icon joined the word** (rule 6). The base carried a label and a
 *    tone; a tone is not a second channel when the reader is colour-blind or
 *    the chip is printed. See {@link CONDITION_ICON}.
 * 2. **No status colour is spent on a grade** (rule 3). `success` is gone from
 *    `new`. See {@link CONDITION_TONE} for what replaced it, and for the
 *    `accent` divergence between the twins that it also closes.
 * 3. **`variant` and `size` are real on the web.** Both were accepted and
 *    dropped on the floor by the web base "for parity with the native chip",
 *    which is the parity defect inverted: the twins had the same *signature*
 *    and different *behaviour*, which is worse than an honest asymmetry
 *    because nothing catches it.
 *
 * **The glyph is not announced.** A screen reader reading "sparkles New" on
 * every card in a grid is noise, so the chip carries an `aria-label` of the
 * words alone and the composed string stays visual. This is the same call
 * `PriceTagV4` makes for its struck compare-at price.
 *
 * Composes `BadgeV4` (rule 7). An unrecognised grade — one that arrived from
 * an API the types could not check — falls back to a neutral chip carrying the
 * raw value rather than an empty one.
 */
exports.ConditionBadgeV4 = React.forwardRef(function ConditionBadgeV4({ condition, variant = 'soft', size = 'md', label, showIcon = true, 'aria-label': ariaLabel, ...rest }, ref) {
    const tone = CONDITION_TONE[condition] ?? 'neutral';
    // An empty `label` is not a label; a chip with no words is the colour-only
    // badge rule 6 exists to prevent.
    const text = label !== undefined && label !== '' ? label : (CONDITION_LABEL[condition] ?? String(condition));
    const iconName = CONDITION_ICON[condition];
    const glyph = showIcon && iconName !== undefined ? (0, icon_names_1.resolveIconGlyph)(iconName) : '';
    return ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ref: ref, tone: tone, variant: variant, size: size, "data-xen-v4-condition-badge": condition, "aria-label": ariaLabel ?? text, ...rest, children: glyph === '' ? text : `${glyph} ${text}` }));
});
//# sourceMappingURL=ConditionBadgeV4.js.map