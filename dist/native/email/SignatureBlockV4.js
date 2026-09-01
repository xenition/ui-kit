"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureBlockV4 = SignatureBlockV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
/**
 * **V4 signature block** — same props as {@link SignatureBlock} plus
 * `onContactPress`.
 *
 * ## Four changes
 *
 * 1. **A line that looks like a link is one.** The base painted every contact
 *    in `colors.primary` — the brand colour, the universal signal for "tap
 *    this" — with no `href`, no `onPress`, and nothing in the type that could
 *    ever have carried one. Every phone number and address in the kit was a
 *    dead link. With `onContactPress` the lines become real buttons that clear
 *    44; without it they are drawn as the plain text they are.
 * 2. **The brand colour is the `*Text` slot.** `primary` is a *fill*; as ink
 *    on `surface` it measured as low as 1.32:1 on a pale seed, which is what
 *    the contrast-corrected `primaryText` exists to replace.
 * 3. **The avatar is the same shape on both twins.** This one drew a rounded
 *    square and the web twin a circle. A signature is a person, so both are
 *    circles — the `Avatar` default, which is also what the web base already
 *    rendered.
 * 4. **Nothing renders without a name.** The block's whole anatomy hangs off
 *    it; with an empty `name` the base drew an accent rule, an empty avatar
 *    and a blank line.
 */
function SignatureBlockV4({ name, title, company, avatarUri, contacts, tagline, onContactPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!name)
        return null;
    const safeContacts = contacts ?? [];
    // A visible caption, so this one keeps the middle dot.
    const roleLine = (0, tone_v4_1.metaLine)([title, company]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.md,
                paddingLeft: tokens.spacing.md,
                // The anchoring rule, off the spacing scale rather than the base's
                // literal 3. A painted rule is a graphic, not ink, so the fill slot
                // is the right one here.
                borderLeftWidth: tokens.spacing.xs,
                borderLeftColor: colors.primary,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { size: "lg", src: avatarUri, name: name }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onSurface", children: name }), roleLine ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: roleLine })) : null, safeContacts.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.xs }, children: safeContacts.map((c) => onContactPress ? ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "link", accessibilityLabel: c.value, onPress: () => onContactPress(c), style: ({ pressed }) => ({
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: tokens.spacing.xs,
                                minHeight: (0, chrome_v4_1.minTap)(tokens.spacing),
                                paddingHorizontal: tokens.spacing.xs,
                                marginHorizontal: -tokens.spacing.xs,
                                borderRadius: tokens.radius.sm,
                                backgroundColor: pressed ? (0, state_v4_1.pressLayer)(theme) : 'transparent',
                            }), children: [c.glyph ? (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: c.glyph, size: "xs", color: "mutedText" }) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "primaryText", numberOfLines: 1, children: c.value })] }, c.id)) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: tokens.spacing.xs,
                                paddingVertical: tokens.spacing.xs,
                            }, children: [c.glyph ? (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: c.glyph, size: "xs", color: "mutedText" }) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "onSurface", numberOfLines: 1, children: c.value })] }, c.id))) })) : null, tagline ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", style: { marginTop: tokens.spacing.xs }, children: tagline })) : null] })] }));
}
//# sourceMappingURL=SignatureBlockV4.js.map