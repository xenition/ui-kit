"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS_ANATOMY = void 0;
exports.StatusBadgeV4 = StatusBadgeV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const status_v4_1 = require("../../commerce/internal/status-v4");
Object.defineProperty(exports, "STATUS_ANATOMY", { enumerable: true, get: function () { return status_v4_1.STATUS_ANATOMY; } });
/**
 * **V4 status badge (native)** — same props as the web `StatusBadgeV4`,
 * including defaults, and the same anatomy table.
 *
 * {@link STATUS_ANATOMY} lives in `commerce/internal/status-v4.ts`, imported
 * by both twins rather than restated here: it is a plain lookup with no
 * platform in it, and a shopper checking an order on their phone and on the
 * web must not be shown two different marks for "shipped". The `formatMoney`
 * rule is the same argument about a different table.
 *
 * Three changes from the base.
 *
 * 1. **An icon and a word, never colour alone.** The base painted six statuses
 *    in five fills and left the colour doing the whole job, which makes `paid`
 *    and `cancelled` the same badge for a reader who cannot separate green
 *    from red. Brief rule 6, and the read it protects — "did my money
 *    arrive?" — is the highest-stakes one in the kit.
 * 2. **It composes `BadgeV4`.** The base re-rolled the pill: its own radius,
 *    its own padding, a literal `2` for the vertical inset, its own tone
 *    switch. `BadgeV4` already makes all of those, including the one the base
 *    got wrong — that a badge's shape follows the seed rather than defaulting
 *    to a capsule, so a `sharp` brand gets square tags.
 * 3. **It says what it is.** The badge is **one** accessibility element
 *    announcing "Order status: Paid", instead of a `View` containing a bare
 *    word. `accessible` collapses the glyph and the label into that one
 *    element, so nothing reads out the emoji's name first — the native
 *    spelling of the web twin's visually-hidden prefix.
 *
 * The badge variant is deliberately **not** a prop, for the reason the web
 * twin gives: `soft` and `outline` label themselves with the `*Text` slots
 * after a contrast correction only `BadgeV4` can see, so a glyph tinted to
 * match them would have to guess at what colour the label actually landed on.
 */
function StatusBadgeV4({ status, iconName, size = 'md', children, style, }) {
    const anatomy = status_v4_1.STATUS_ANATOMY[status];
    const label = children ?? (0, status_v4_1.statusLabel)(status);
    const spoken = typeof label === 'string' ? label : (0, status_v4_1.statusLabel)(status);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: (0, status_v4_1.statusAnnouncement)(spoken), style: [{ alignSelf: 'flex-start' }, style], children: (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: anatomy.tone, variant: "solid", size: size, children: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: iconName ?? anatomy.icon, size: "xs", color: anatomy.ink }), typeof label === 'string' ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: anatomy.ink, children: label })) : (label)] }) }) }));
}
//# sourceMappingURL=StatusBadgeV4.js.map