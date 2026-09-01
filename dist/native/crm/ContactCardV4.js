"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactCardV4 = ContactCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const TagV4_1 = require("../primitives/TagV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const crm_v4_1 = require("./internal/crm-v4");
/**
 * **V4 contact card** — same props as {@link ContactCard} plus `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **A quick action does one thing.** On web the pills were real buttons
 *    nested inside a root that `activate()` had turned into a `role="button"`
 *    with its own handler, and nothing stopped the event: tapping **Call**
 *    dialled *and* navigated. Native happened to escape it only because the
 *    inner `Pressable` consumed the touch — the same props, two behaviours.
 *    The card's own activation now wraps **only the identity region**, and the
 *    pills are its siblings inside the card, on both twins. That removes the
 *    double-fire and the invalid nesting in one move.
 * 2. **The card announces what it shows** — name, role, company and its tags.
 *    `Contact Ada` replaced the entire subtree (rule A).
 * 3. **A press is a state layer** (rule B), sized so the identity region
 *    itself clears 44.
 * 4. **The skeleton is the shared opaque placeholder.** It was `colors.border`
 *    — a hairline token spent as a fill — with a literal `20` for the avatar's
 *    radius.
 * 5. **The loading state is a real accessibility element.** `accessibilityLabel`
 *    sat on a plain `View`, which announces nothing.
 *
 * **Renders nothing without a `name`.**
 */
function ContactCardV4({ name, title, company, avatarUrl, tags, actions, variant = 'default', loading = false, loadingLabel = 'Loading contact', onPress, testID, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!name)
        return null;
    const compact = variant === 'compact';
    const hasTags = !compact && Array.isArray(tags) && tags.length > 0;
    const hasActions = !compact && Array.isArray(actions) && actions.length > 0;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const subtitle = (0, crm_v4_1.metaLine)([title, company]);
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { padding: compact ? 'sm' : 'md', testID: testID, style: [{ gap: tokens.spacing.sm }, style], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: loadingLabel, style: { flexDirection: 'row', gap: tokens.spacing.sm, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: tokens.spacing.xl + tokens.spacing.sm,
                            height: tokens.spacing.xl + tokens.spacing.sm,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, crm_v4_1.skeletonFill)(theme),
                        } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    height: tokens.spacing.md,
                                    width: '60%',
                                    borderRadius: tokens.radius.sm,
                                    backgroundColor: (0, crm_v4_1.skeletonFill)(theme),
                                } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    height: tokens.spacing.sm + tokens.spacing.xs,
                                    width: '40%',
                                    borderRadius: tokens.radius.sm,
                                    backgroundColor: (0, crm_v4_1.skeletonFill)(theme),
                                } })] })] }) }));
    }
    const identity = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: 'row',
            gap: tokens.spacing.sm,
            alignItems: 'center',
            minHeight: tap,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
        }, children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { size: compact ? 'sm' : 'md', name: name, src: avatarUrl }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", numberOfLines: 1, children: name }), subtitle ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: subtitle })) : null] })] }));
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { padding: compact ? 'sm' : 'md', testID: testID, style: [{ gap: tokens.spacing.sm }, style], children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: (0, crm_v4_1.spokenLine)([name, title, company, ...(hasTags ? tags : [])]), onPress: onPress, style: { borderRadius: tokens.radius.md }, children: ({ pressed }) => identity(pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: (0, crm_v4_1.spokenLine)([name, title, company, ...(hasTags ? tags : [])]), children: identity(false) })), hasTags ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: tags.map((t, i) => ((0, jsx_runtime_1.jsx)(TagV4_1.TagV4, { tone: "neutral", variant: "soft", size: "sm", children: t }, `${t}-${i}`))) })) : null, hasActions ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: actions.map((a) => ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "soft", size: "sm", onPress: a.onPress, accessibilityLabel: a.label, style: { minHeight: tap }, children: `${a.glyph} ${a.label}` }, a.key))) })) : null] }));
}
//# sourceMappingURL=ContactCardV4.js.map