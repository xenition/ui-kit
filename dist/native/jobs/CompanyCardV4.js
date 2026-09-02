"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyCardV4 = CompanyCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 company card** — same props as {@link CompanyCard} plus `followLabel`,
 * `followingLabel`, `formatEmployees` and `formatOpenRoles`.
 *
 * ## Five changes
 *
 * 1. **A dead Follow button is no longer drawn.**
 *    `<CompanyCard company={c} following />` rendered a focusable, pressable
 *    button wired to nothing — the worst kind of control, because it looks
 *    exactly like the working one. V4 draws the *button* only when
 *    `onToggleFollow` is given; a `following` flag with no handler is a fact,
 *    so it is drawn as a chip that states the fact and takes no focus.
 * 2. **The follow state is announced.** There was no `accessibilityState` (and
 *    no `aria-pressed` on the web twin) anywhere on it, so the reader heard
 *    "Following, button" and could not tell whether pressing would follow or
 *    unfollow. It is a toggle and now says so.
 * 3. **The button is a sibling of the card's activation**, not a child of it.
 *    A `Pressable` is `accessible` by default and flattens its subtree, so
 *    inside the card's own press the Follow button was not a focus stop at
 *    all — the same defect found in `PodcastRow`, `ContactCard`, `WalletCard`,
 *    `SessionCard` and `VenueCard` before it.
 * 4. **Both chips are localisable and neither is silent.** `${size} employees`
 *    and `${n} open roles` were hard-coded English inside a `View` nobody
 *    could read, and the card's name stopped at the industry — so the
 *    headcount and the open-roles count, the two facts a candidate is
 *    comparing, reached nobody. Both formatters are props and both strings are
 *    part of the card's name.
 * 5. **Tokens.** `muted` was inking the meta line — it is a fill with no
 *    contrast promise — and the card sat on `surface`, which is the page
 *    colour, so in dark mode a card was invisible against the page behind it.
 *    `card`/`onCard`, `mutedText`, and press as a state layer rather than
 *    `opacity: 0.9`.
 *
 * ## Why `formatEmployees` takes a number
 *
 * `Company.size` is documented as a **free-form** label — `'51–200'` — so a
 * numeric formatter can only be applied when an app happens to have stored a
 * plain count. It is, then; a range keeps the base's own wording rather than
 * being coerced into a number it is not. The prop's shape is fixed by the
 * spec's table and is identical on the web twin.
 *
 * **Renders nothing without a company name** (§4.5).
 */
function CompanyCardV4({ company, following, onToggleFollow, onPress, followLabel = 'Follow', followingLabel = 'Following', formatEmployees, formatOpenRoles, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!company?.name)
        return null;
    const meta = (0, tone_v4_1.metaLine)([company.industry, company.location]);
    const headcount = (0, tone_v4_1.headcountLabel)(company.size, formatEmployees);
    const roles = typeof company.openRoles === 'number'
        ? (formatOpenRoles ??
            ((n) => (n > 0 ? `${n} open roles` : 'No open roles')))(company.openRoles)
        : null;
    const isFollowing = following === true;
    const followWord = isFollowing ? followingLabel : followLabel;
    const name = (0, tone_v4_1.spokenName)([company.name, meta, headcount, roles]);
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: company.logoUrl, name: company.name, size: "lg" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "semibold", tone: "onCard", numberOfLines: 1, children: company.name }), meta ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: meta })) : null] })] }), headcount || roles ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    flexWrap: 'wrap',
                }, children: [headcount ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "neutral", size: "sm", children: headcount })) : null, roles ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: (company.openRoles ?? 0) > 0 ? 'primary' : 'neutral', variant: "soft", size: "sm", children: roles })) : null] })) : null] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [(0, tone_v4_1.cardSurfaceStyle)(theme), style], children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: () => onPress(company), style: ({ pressed }) => ({
                    gap: tokens.spacing.md,
                    borderRadius: tokens.radius.md,
                    backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
                }), children: body })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, style: { gap: tokens.spacing.md }, children: body })), onToggleFollow ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: isFollowing ? 'secondary' : 'primary', size: "sm", onPress: () => onToggleFollow(company), accessibilityLabel: (0, tone_v4_1.spokenName)([followWord, company.name]), accessibilityState: { selected: isFollowing }, style: { minHeight: (0, chrome_v4_1.minTap)(tokens.spacing) }, children: followWord })) : isFollowing ? (
            // A state with no handler is a fact, not a control: it says so and
            // takes no focus, where the base drew a button wired to nothing.
            (0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: (0, tone_v4_1.spokenName)([followingLabel, company.name]), style: { alignSelf: 'flex-start' }, children: (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "neutral", variant: "outline", size: "sm", children: followingLabel }) })) : null] }));
}
//# sourceMappingURL=CompanyCardV4.js.map