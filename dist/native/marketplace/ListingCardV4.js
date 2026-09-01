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
exports.ListingCardV4 = ListingCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const TextV4_1 = require("../primitives/TextV4");
const nav_v4_1 = require("../primitives/internal/nav-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const PriceTagV4_1 = require("../commerce/PriceTagV4");
const GenerativeCoverV4_1 = require("../commerce/GenerativeCoverV4");
const money_1 = require("../commerce/money");
const ConditionBadgeV4_1 = require("./ConditionBadgeV4");
/** The named ratios as RN's `aspectRatio` (width ÷ height). */
const ASPECT_VALUE = {
    '1:1': 1,
    '4:5': 4 / 5,
    '3:4': 3 / 4,
    '16:9': 16 / 9,
};
/**
 * The default ratio per layout, so a caller who says nothing still gets the
 * right shape: a grid tile mirrors `ProductCardV4`'s `4:5`, a featured card is
 * a banner, and a list row's thumbnail is a square because the *row* owns the
 * height.
 */
const DEFAULT_ASPECT = {
    grid: '4:5',
    list: '1:1',
    featured: '16:9',
};
/**
 * **V4 listing card** — the marketplace's product card, and deliberately
 * indistinguishable from the storefront's.
 *
 * Brief §3 Group C: "`ListingCardV4` mirrors `ProductCardV4` — same ground,
 * same image ratio — so a storefront and a marketplace read as one product."
 * The anatomy below is that card's, slot for slot, read off
 * `commerce/ProductCardV4` rather than guessed:
 *
 * ```
 * [ media at a FIXED ratio, one badge over its top-left ]   ← edge to edge
 * [ title, at most two lines                            ]   ┐
 * [ PriceTagV4                                          ]   │ padding md
 * [ location line                                       ]   ┘
 * ```
 *
 * The card is `padding="none"` and the body carries the inset, so the photo
 * runs to the card's corners exactly as the storefront tile's does. The one
 * slot the storefront card does not have is the **watch toggle**, top-right,
 * opposite the badge — a marketplace affordance with no catalogue equivalent.
 *
 * That anatomy settles the one thing the base got backwards. **The price moved
 * below the title.** The base led with the price and put the title under it,
 * which reads as a price list rather than a catalogue: a shopper scanning a
 * grid is looking for *what a thing is*, then what it costs. It is also the
 * order `ProductCardV4` is built in, and the whole point of this component is
 * that the two are one card.
 *
 * The rest:
 *
 * 1. **The ground is `card`** (§4.2). The base painted `surface` — the colour
 *    of the page — so a grid on a dark page was a flat sheet of same-coloured
 *    rectangles held apart by hairlines.
 * 2. **The price is `PriceTagV4`** (rule 7), which carries the tabular figures
 *    (rule 2), the display face, the step up the type scale, and the announced
 *    `Was …` on a compare-at. Nothing here draws a number.
 * 3. **The watch chip clears the tap floor.** It was a 32 square — a control a
 *    shopper taps repeatedly, drawn below the 44 HIG floor, which is the same
 *    defect §2 records against `QuantityStepper`.
 * 4. **A watched listing is not in danger.** The base painted the filled heart
 *    `danger`; rule 3 reserves that tone for *bad*, and saving something you
 *    like is the opposite. It takes the brand.
 * 5. **The accessible name says the grade in words.** The base announced the
 *    raw slug — "Vintage camera, $125.00, like-new". See
 *    {@link CONDITION_V4_LABEL}.
 * 6. **Loading is a skeleton at the card's own footprint**, not the string
 *    "Loading listing…", which is a sentence where a card should be.
 * 7. **Press feedback is the state layer** (§4.3). `opacity: pressed ? 0.9`
 *    is deleted rather than translated: dimming fades the card's own content,
 *    which is the signal M3 spends `0.38` on to mean *disabled*.
 *
 * Composes `CardV4`, `PriceTagV4`, `ConditionBadgeV4`, `IconV4`, `TextV4` and
 * `SkeletonV4` (rule 7). Renders **nothing** without a title (§4.5).
 */
function ListingCardV4({ title, priceCents, currency = 'USD', compareAtCents, imageUrl, condition, subtitle, watched = false, onToggleWatch, onPress, variant = 'grid', loading = false, aspect, raised = true, formatMoney = money_1.formatMoney, badge, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const [pressed, setPressed] = React.useState(false);
    const horizontal = variant === 'list';
    // A listing with no headline is the blank bordered box §4.5 rules out.
    if (title === undefined || title === null || title === '')
        return null;
    const ratio = ASPECT_VALUE[aspect ?? DEFAULT_ASPECT[variant]];
    const tap = (0, nav_v4_1.minTap)(tokens.spacing);
    const chip = badge !== undefined ? (badge) : condition !== undefined ? ((0, jsx_runtime_1.jsx)(ConditionBadgeV4_1.ConditionBadgeV4, { condition: condition, size: "sm" })) : null;
    const watchChip = onToggleWatch != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: watched ? `Unwatch ${title}` : `Watch ${title}`, accessibilityState: { selected: watched }, onPress: () => onToggleWatch(!watched), style: {
            position: 'absolute',
            top: tokens.spacing.sm,
            right: tokens.spacing.sm,
            // The HIG tap floor, not a 32 square: this is a control a shopper
            // taps repeatedly.
            width: tap,
            height: tap,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.card,
        }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: watched ? 'heart' : undefined, glyph: watched ? undefined : '♡', size: "base", color: watched ? 'primary' : 'muted' }) })) : null;
    const media = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-v4-listing-media", style: {
            aspectRatio: ratio,
            width: horizontal ? tokens.spacing['2xl'] * 2 : '100%',
            /*
              `muted`, not a neutral ramp step. The ramps carry the LIGHT
              orientation in both schemes, so a ramp placeholder is a pale
              rectangle punched into a dark page — the same trap `ProductCardV4`
              documents, and the same semantic slot it reaches for instead.
            */
            backgroundColor: colors.muted,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
        }, children: [imageUrl !== undefined && imageUrl !== '' ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, style: { width: '100%', height: '100%' }, resizeMode: "cover" })) : (
            /*
              The same plate `ProductCardV4` falls back to, from the same seed — so
              a listing with no photo and a catalogue product with no photo are the
              same picture rather than two different apologies.
    
              Deliberately unlabelled: it is a placeholder, not a picture of the
              item, and the title is printed directly beneath it. Labelling it
              would announce the listing twice.
            */
            (0, jsx_runtime_1.jsx)(GenerativeCoverV4_1.GenerativeCoverV4, { seed: title, style: { width: '100%', height: '100%' } })), chip !== null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', left: tokens.spacing.sm, top: tokens.spacing.sm }, children: chip })) : null] }));
    const info = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs, padding: tokens.spacing.md, justifyContent: 'center' }, children: loading ? ((0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "text", lines: 3 })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", numberOfLines: 2, children: title }), (0, jsx_runtime_1.jsx)(PriceTagV4_1.PriceTagV4, { cents: priceCents, currency: currency, compareAtCents: compareAtCents, formatMoney: formatMoney, size: variant === 'featured' ? 'lg' : 'md' }), subtitle !== undefined && subtitle !== '' ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: subtitle })) : null] })) }));
    const card = (ground) => ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { testID: "xen-v4-listing-card", variant: raised ? 'elevated' : 'outlined', radius: "lg", 
        // The media runs to the card's corners; the body carries the inset.
        padding: "none", 
        // `style` is the last entry in `CardV4`'s own array, so this is how a
        // composite overrides the `surface` fill the primitive hard-codes — the
        // native equivalent of the web twin's specificity sheet.
        style: [
            { flexDirection: horizontal ? 'row' : 'column', backgroundColor: ground, overflow: 'hidden' },
            style,
        ], children: [media, info, watchChip] }));
    if (!onPress)
        return card(colors.card);
    const priceLabel = formatMoney(priceCents, currency);
    const grade = condition !== undefined ? (ConditionBadgeV4_1.CONDITION_V4_LABEL[condition] ?? condition) : undefined;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${title}, ${priceLabel}${grade !== undefined ? `, ${grade}` : ''}`, onPress: onPress, onPressIn: () => setPressed(true), onPressOut: () => setPressed(false), children: card(pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : colors.card) }));
}
//# sourceMappingURL=ListingCardV4.js.map