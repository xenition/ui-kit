"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCardV4 = ProductCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const CardV4_1 = require("../primitives/CardV4");
const TextV4_1 = require("../primitives/TextV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const v4_state_1 = require("../../primitives/internal/v4-state");
const PriceTagV4_1 = require("./PriceTagV4");
const GenerativeCoverV4_1 = require("./GenerativeCoverV4");
/** The named ratios as RN's `aspectRatio` (width ÷ height). */
const ASPECT_VALUE = {
    '1:1': 1,
    '4:5': 4 / 5,
    '3:4': 3 / 4,
    '16:9': 16 / 9,
};
/**
 * **V4 product card (native)** — same props as the web `ProductCardV4`,
 * including defaults, except for the one prop the platforms cannot share:
 * navigation is `onPress` here and `href` there, exactly as the base line
 * splits it. Everything V4 adds — `badge`, `aspect`, `raised` — is identical.
 *
 * ## The anatomy, top to bottom
 *
 * ```
 * [ media at a FIXED ratio, one badge over it ]
 * [ title, at most two lines                  ]
 * [ PriceTagV4                                ]
 * [ optional add button, full width           ]
 * ```
 *
 * Nothing else. Every slot a catalog tile is tempted to grow — a rating, a
 * seller, a colour swatch row, a second badge — is a thing the grid has to
 * make room for in every column, and §7 asks for subtraction first.
 *
 * ## Six changes
 *
 * 1. **The ground is `card`, not `surface`.** The single most visible fix in
 *    the pass: every card in this module paints the same colour as the page it
 *    sits on, which is why the border was doing all the work and why a product
 *    grid on a dark page read as a flat sheet of identical rectangles.
 * 2. **The media ratio is fixed and named.** The base pinned `4 / 5` with no
 *    way to say otherwise.
 * 3. **The title is capped at two lines.** The base already did this on
 *    native; the web twin did not, and now both do.
 * 4. **The price is the price.** `PriceTagV4` — a step up the scale, tabular
 *    figures, the display face — instead of the base line's caption-sized
 *    number. A discounted price still does not turn red (§35.4).
 * 5. **The media placeholder is a semantic slot.** `colors.muted`, not
 *    `tokens.ramps.neutral[100]` — the ramps carry the *light* orientation in
 *    both schemes, so the base's placeholder was a pale rectangle on a dark
 *    page. The fallback art is `GenerativeCoverV4`, the same plate the web
 *    twin draws from the same seed (§10.5).
 * 6. **Press is a state layer, not a dimmer.** `opacity: pressed ? 0.9 : 1`
 *    fades the card's own *content*, which is the signal M3 spends 0.38 on to
 *    mean disabled. §4.3: the layer is the card's ink over the card's ground,
 *    flattened opaque so the title keeps the contrast promise it was measured
 *    for.
 *
 * **Renders nothing when `title` is empty.** §4.5: a component with nothing to
 * show renders nothing or an empty state, never a blank bordered box — and a
 * product tile with no product is exactly that box.
 */
function ProductCardV4({ title, priceCents, currency = 'USD', compareAtCents, imageUrl, imageAlt, slug, onPress, onAdd, addLabel = 'Add to cart', formatMoney, badge, aspect = '4:5', raised = true, style, }) {
    const { colors, tokens, state } = (0, theme_1.useXenitionTheme)();
    // A tile with no product is a blank bordered box (§4.5).
    if (!title)
        return null;
    const media = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            aspectRatio: ASPECT_VALUE[aspect],
            width: '100%',
            // `muted`, not a neutral ramp step: the ramps carry the light
            // orientation in both schemes, so a ramp placeholder is a pale
            // rectangle on a dark page.
            backgroundColor: colors.muted,
            overflow: 'hidden',
        }, children: [imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, accessible: true, accessibilityLabel: imageAlt ?? title, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : (
            // Deliberately unlabelled: the generated plate is a placeholder, not a
            // picture of the product, and the title is printed directly beneath
            // it. Labelling it would announce the product name twice.
            (0, jsx_runtime_1.jsx)(GenerativeCoverV4_1.GenerativeCoverV4, { seed: slug ?? title, style: { width: '100%', height: '100%' } })), badge ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', left: tokens.spacing.sm, top: tokens.spacing.sm }, children: badge })) : null] }));
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs, padding: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", numberOfLines: 2, children: title }), (0, jsx_runtime_1.jsx)(PriceTagV4_1.PriceTagV4, { cents: priceCents, currency: currency, compareAtCents: compareAtCents, formatMoney: formatMoney }), onAdd ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "sm", onPress: onAdd, style: { marginTop: tokens.spacing.xs }, children: addLabel })) : null] }));
    const card = (ground) => ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: raised ? 'elevated' : 'outlined', radius: "lg", padding: "none", 
        // `style` is the last entry in `CardV4`'s own array, so this is how a
        // composite overrides the `surface` fill the primitive hard-codes —
        // the native equivalent of the web twin's specificity sheet.
        style: [{ backgroundColor: ground, overflow: 'hidden' }, style], children: [media, body] }));
    if (!onPress)
        return card(colors.card);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, children: ({ pressed }) => 
        // The opaque flavour of the layer: the card's ink over the card's
        // ground, so the title's contrast promise survives the press.
        card(pressed ? (0, v4_state_1.stateMix)(colors.card, colors.onCard, 'pressed', state) : colors.card) }));
}
//# sourceMappingURL=ProductCardV4.js.map