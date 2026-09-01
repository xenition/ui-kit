"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewCardV4 = ReviewCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const RatingV4_1 = require("../primitives/RatingV4");
const TextV4_1 = require("../primitives/TextV4");
const salon_v4_1 = require("./internal/salon-v4");
/**
 * **V4 review card** — same props as {@link ReviewCard} plus `verifiedLabel`
 * and `replyLabel`.
 *
 * ## Four changes
 *
 * 1. **The rating carries its number**, and the whole header is announced as
 *    one string — the base left the author, the stars and the date as three
 *    loose fragments a reader walks through separately.
 * 2. **The reply is attributed.** An indented paragraph under a review does
 *    not say who wrote it; `replyLabel` does, which matters because the reply
 *    is the *business* answering a customer.
 * 3. **`verified` is a chip with a word**, not a bare checkmark glyph.
 * 4. **The reply's ground is a mixed tint on the card**, so it reads as a
 *    nested quote in both schemes rather than a grey box that vanishes on a
 *    dark page.
 *
 * **Renders nothing without an `author`** (§4.5).
 */
function ReviewCardV4({ author, rating, text, date, service, avatarUrl, verified = false, variant = 'default', reply, verifiedLabel = 'Verified visit', replyLabel = 'Reply from the salon', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!author)
        return null;
    const compact = variant === 'compact';
    const caption = (0, salon_v4_1.metaLine)([service, date]);
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { accessible: true, accessibilityLabel: (0, salon_v4_1.metaLine)([
            author,
            typeof rating === 'number' ? `rated ${rating}` : null,
            verified ? verifiedLabel : null,
            caption,
            text,
        ]), style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: avatarUrl, name: author, size: compact ? 'xs' : 'sm' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onCard", numberOfLines: 1, style: { flexShrink: 1 }, children: author }), verified ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "success", variant: "soft", size: "sm", children: verifiedLabel })) : null] }), caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: caption })) : null] }), (0, jsx_runtime_1.jsx)(RatingV4_1.RatingV4, { value: rating, size: "sm", showValue: true })] }), text ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "onCard", numberOfLines: compact ? 3 : undefined, children: text })) : null, reply ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    gap: tokens.spacing.xs / 2,
                    borderRadius: tokens.radius.md,
                    borderLeftWidth: 2,
                    borderLeftColor: colors.primary,
                    backgroundColor: colors.selected,
                    padding: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "send", size: "xs", color: "primaryText" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "mutedText", children: replyLabel })] }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "onSelected", children: reply })] })) : null] }));
}
//# sourceMappingURL=ReviewCardV4.js.map