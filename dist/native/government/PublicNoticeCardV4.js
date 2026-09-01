"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicNoticeCardV4 = PublicNoticeCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const civic_v4_1 = require("./internal/civic-v4");
/**
 * Category → its word and its glyph. The tone is gone: a category is
 * **identity**, and the base spent `warn` on Roadwork, `primary` on a hearing
 * and `accent` on a meeting — three status colours describing what kind of
 * notice it is rather than how anything turned out.
 */
const CATEGORY_V4 = {
    hearing: { label: 'Public hearing', glyph: '⚖️' },
    meeting: { label: 'Meeting', glyph: '📋' },
    roadwork: { label: 'Roadwork', glyph: '🚧' },
    election: { label: 'Election', glyph: '🗳️' },
    ordinance: { label: 'Ordinance', glyph: '📜' },
    bid: { label: 'Bid / RFP', glyph: '📑' },
    general: { label: 'Notice', glyph: '📢' },
};
/**
 * **V4 public notice** — same props as {@link PublicNoticeCard} plus
 * `categoryLabels` and `newLabel`.
 *
 * ## Four changes
 *
 * 1. **The date and the venue join the name.** The card announced
 *    `` `${category}: ${title}` `` and stopped, so a hearing notice's date —
 *    the legally operative field, the one that decides whether you can still
 *    object — was pruned, along with the address it concerns.
 * 2. **"New" stops being `danger`.** Unread is not a hazard, and `danger` is
 *    the same tone this module uses for Denied, Rejected and Urgent, so an
 *    unread roadwork notice read visually as a rejection. It is `primary`
 *    emphasis now — the module's tone for open and just-arrived.
 * 3. **The category stops wearing a status colour** at all, badge and disc
 *    alike: `IDENTITY_TONE`, so `warn` keeps meaning "look at this" rather
 *    than "this one is about roads".
 * 4. **The press is a state layer**, not `opacity: 0.85` — an opacity that
 *    fades the card's own content, which is how M3 draws *disabled*. The meta
 *    line is built before it is tested, so a notice whose agency, date and
 *    location are all empty strings renders no empty caption where the web
 *    twin renders none either.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
function PublicNoticeCardV4({ category, title, body, agency, date, location, isNew = false, categoryLabels, newLabel = 'New', onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!title)
        return null;
    const cat = CATEGORY_V4[category] ?? CATEGORY_V4.general;
    const categoryWord = categoryLabels?.[category] ?? cat.label;
    const meta = (0, tone_v4_1.metaLine)([agency, location, date]);
    const disc = tokens.spacing.xl + tokens.spacing.sm;
    const spoken = (0, civic_v4_1.spokenLine)([
        isNew ? newLabel : null,
        categoryWord,
        title,
        date,
        location,
        agency,
    ]);
    const content = (pressed) => ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: civic_v4_1.CARD_V4, style: [
            pressed ? { backgroundColor: (0, state_v4_1.pressOver)(theme, colors.surface, colors.onSurface) } : null,
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: disc,
                            height: disc,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: (0, civic_v4_1.tintGround)(theme, civic_v4_1.IDENTITY_TONE),
                        }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: cat.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flex: 1,
                            minWidth: 0,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                            flexWrap: 'wrap',
                        }, children: [(0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: civic_v4_1.IDENTITY_TONE, ...civic_v4_1.BADGE_V4, children: categoryWord }), isNew ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "primary", ...civic_v4_1.BADGE_V4, children: `● ${newLabel}` })) : null] })] }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onSurface", style: { marginTop: tokens.spacing.sm }, children: title }), body ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "onSurface", numberOfLines: 3, style: { marginTop: tokens.spacing.xs / 2 }, children: body })) : null, meta !== '' ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", style: { marginTop: tokens.spacing.sm }, children: meta })) : null] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, children: content(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, children: ({ pressed }) => content(pressed) }));
}
//# sourceMappingURL=PublicNoticeCardV4.js.map