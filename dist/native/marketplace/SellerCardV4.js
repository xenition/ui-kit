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
exports.SellerCardV4 = SellerCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const RatingV4_1 = require("../primitives/RatingV4");
const TextV4_1 = require("../primitives/TextV4");
const nav_v4_1 = require("../primitives/internal/nav-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const icon_names_1 = require("../../primitives/icon-names");
/**
 * **V4 seller card** — half of the trust pair, with `RatingBreakdownV4`, and
 * the highest-stakes read in the kit.
 *
 * Brief §3 Group C: "rating as a number *and* stars *and* a count, never stars
 * alone", and rule 6: "a verified seller… ships an icon **and** a label".
 * Everything below is one of those two sentences.
 *
 * 1. **The rating is three channels, not one.** The base composed
 *    `Rating showValue` — glyphs with a small number tucked inside them — and
 *    a parenthesised count beside it. V4 pulls the figure out as its own
 *    tabular text at a step the eye lands on first, keeps `RatingV4` beside it
 *    as the shape, and spells the count as words (`1,204 reviews`) rather than
 *    as `(1,204)`, which reads as a footnote marker when announced.
 * 2. **A missing rating says so.** See
 *    {@link SellerCardV4Props.emptyRatingLabel}.
 * 3. **Verified is a mark and a word**, and the mark is not announced —
 *    "check Verified" is noise, so the badge is one accessibility element
 *    named `Verified seller` and the tick stays visual. It also moves from
 *    `accent` to `primary`: verification is the marketplace's own assurance,
 *    which is the brand's job, and it matches the web twin, which used
 *    `primary` all along.
 * 4. **The ground is `card`** (§4.2) for the `card` variant; `inline` keeps no
 *    container at all, because an identity block dropped into a listing detail
 *    is a *row*, and §4.3 gives a row a transparent ground so the container
 *    owns the surface.
 * 5. **The identity block clears the tap floor** (44) and takes the state
 *    layer instead of `opacity: pressed ? 0.85 : 1` — dimming fades the card's
 *    own content, which is the signal M3 spends `0.38` on to mean *disabled*,
 *    so a pressed seller and a suspended one looked alike.
 * 6. **The contact button stays outside the press target**, as the base
 *    already had it right, so contacting never also navigates.
 *
 * Composes `CardV4`, `AvatarV4`, `RatingV4`, `BadgeV4`, `ButtonV4` and
 * `TextV4` (rule 7). Renders **nothing** without a name (§4.5) — an identity
 * block with no identity is a blank bordered box.
 */
function SellerCardV4({ name, avatarUrl, rating, reviewCount, salesCount, location, verified = false, actionLabel = 'Contact', onContact, onPress, variant = 'card', raised = true, verifiedLabel = 'Verified', emptyRatingLabel = 'No ratings yet', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const [pressed, setPressed] = React.useState(false);
    const inline = variant === 'inline';
    // An identity block with no identity is the blank bordered box §4.5 rules
    // out.
    if (name === undefined || name === null || name === '')
        return null;
    const word = verifiedLabel === '' ? 'Verified' : verifiedLabel;
    const rated = typeof rating === 'number';
    const counted = typeof reviewCount === 'number';
    const meta = [];
    if (typeof salesCount === 'number')
        meta.push(`${salesCount.toLocaleString()} sales`);
    if (location !== undefined && location !== '')
        meta.push(location);
    const trust = rated ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-v4-seller-trust", style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: inline ? 'onSurface' : 'onCard', numeric: "tabular", children: rating.toFixed(1) }), (0, jsx_runtime_1.jsx)(RatingV4_1.RatingV4, { value: rating, size: "sm" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numeric: "tabular", numberOfLines: 1, children: counted
                    ? `${reviewCount.toLocaleString()} ${reviewCount === 1 ? 'review' : 'reviews'}`
                    : emptyRatingLabel })] })) : ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { testID: "xen-v4-seller-trust", size: "sm", tone: "mutedText", numberOfLines: 1, children: emptyRatingLabel }));
    const identity = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, flex: 1 }, children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: avatarUrl, name: name, size: inline ? 'md' : 'lg' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: inline ? 'onSurface' : 'onCard', numberOfLines: 1, style: { flexShrink: 1 }, children: name }), verified ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: `${word} seller`, testID: "xen-v4-seller-verified", children: (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "primary", variant: "soft", size: "sm", children: `${(0, icon_names_1.resolveIconGlyph)('check')} ${word}` }) })) : null] }), trust, meta.length > 0 ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: meta.join(' · ') })) : null] })] }));
    const a11yLabel = `${name}${verified ? `, ${word.toLowerCase()} seller` : ''}` +
        `${rated ? `, rated ${rating.toFixed(1)} of 5` : ''}` +
        `${counted ? `, ${reviewCount.toLocaleString()} reviews` : ''}`;
    const ground = inline ? colors.surface : colors.card;
    const ink = inline ? colors.onSurface : colors.onCard;
    const identityBlock = onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { testID: "xen-v4-seller-identity", accessibilityRole: "button", accessibilityLabel: a11yLabel, onPress: onPress, onPressIn: () => setPressed(true), onPressOut: () => setPressed(false), style: {
            flex: 1,
            minHeight: (0, nav_v4_1.minTap)(tokens.spacing),
            justifyContent: 'center',
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, ground, ink) : 'transparent',
        }, children: identity })) : (identity);
    const action = onContact != null ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "outline", size: "sm", onPress: onContact, children: actionLabel })) : null;
    const row = {
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.md,
    };
    if (inline) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-v4-seller-card-inline", style: [row, style], children: [identityBlock, action] }));
    }
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { testID: "xen-v4-seller-card", variant: raised ? 'elevated' : 'outlined', radius: "lg", padding: "lg", style: [row, { backgroundColor: colors.card }, style], children: [identityBlock, action] }));
}
//# sourceMappingURL=SellerCardV4.js.map