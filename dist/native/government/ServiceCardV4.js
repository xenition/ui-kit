"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCardV4 = ServiceCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const civic_v4_1 = require("./internal/civic-v4");
const CATEGORY_V4 = {
    license: { label: 'Licensing', glyph: '🪪' },
    permit: { label: 'Permits', glyph: '📋' },
    tax: { label: 'Tax', glyph: '🧾' },
    records: { label: 'Records', glyph: '🗂️' },
    benefit: { label: 'Benefits', glyph: '🤝' },
    health: { label: 'Public health', glyph: '⚕️' },
    utility: { label: 'Utilities', glyph: '💧' },
    other: { label: 'Service', glyph: '🏛️' },
};
const CHANNEL_V4 = {
    online: { label: 'Online', glyph: '🌐', tone: 'success' },
    'in-person': { label: 'In person', glyph: '🏢', tone: 'warn' },
    phone: { label: 'By phone', glyph: '☎️', tone: 'neutral' },
    unavailable: { label: 'Unavailable', glyph: '⛔', tone: 'danger' },
};
/**
 * **V4 service tile** — same props as {@link ServiceCard} plus
 * `categoryLabels` and `channelLabels`.
 *
 * ## Four changes
 *
 * 1. **"Start" is a sibling of the card's activation, not a child of it.** The
 *    base wrapped the whole card — Start included — in one `Pressable` that is
 *    `accessible` by default and carries the card's own name, so VoiceOver
 *    flattened the tile to a single leaf and the button was not a focus stop at
 *    all. It could not be reached, let alone pressed. The card is a plain
 *    surface now; the activation wraps only the glyph-and-text region and
 *    carries the spoken name, and Start sits beside it with a name of its own.
 * 2. **"Unavailable" joins the name.** The tile announced
 *    `` `${title}, ${category}` `` and stopped, so a service that cannot be
 *    used today announced as an ordinary, startable one — with a live Start
 *    button under it.
 * 3. **The press is a state layer.** `opacity: pressed ? 0.85 : 1` fades the
 *    tile's own content, which is the signal M3 spends on *disabled*; the
 *    pressed tile now tints its container and leaves the content alone.
 * 4. **Start clears 44.** `size="sm"` renders about 34 on this platform, and
 *    neither `Button` primitive sets a floor. The category disc drops its
 *    duplicate label — the category is already written under the title —
 *    stops wearing `primary`, because a category is identity and not a state,
 *    and takes a tint composited opaquely rather than washed over whatever is
 *    behind it.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
function ServiceCardV4({ category, title, description, channel, estimatedTime, actionLabel = 'Start', onStart, onPress, categoryLabels, channelLabels, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!title)
        return null;
    const cat = CATEGORY_V4[category] ?? CATEGORY_V4.other;
    const categoryWord = categoryLabels?.[category] ?? cat.label;
    const ch = channel ? (CHANNEL_V4[channel] ?? CHANNEL_V4.online) : undefined;
    const channelWord = channel && ch ? (channelLabels?.[channel] ?? ch.label) : undefined;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const disc = tokens.spacing['2xl'];
    const name = (0, civic_v4_1.spokenLine)([title, categoryWord, channelWord, estimatedTime]);
    const head = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flex: 1,
            minWidth: 0,
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.surface, colors.onSurface) : 'transparent',
        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: disc,
                    height: disc,
                    borderRadius: tokens.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, civic_v4_1.tintGround)(theme, civic_v4_1.IDENTITY_TONE),
                }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: cat.glyph, size: "xl" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", tone: "onSurface", numberOfLines: 2, children: title }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: categoryWord })] })] }));
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: civic_v4_1.CARD_V4, style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: onPress, style: { flex: 1, minWidth: 0 }, children: ({ pressed }) => head(pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, style: { flex: 1, minWidth: 0 }, children: head(false) })), ch != null && channelWord != null ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: ch.tone, ...civic_v4_1.BADGE_V4, children: `${ch.glyph} ${channelWord}` })) : null] }), description ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "onSurface", style: { marginTop: tokens.spacing.sm }, children: description })) : null, estimatedTime || onStart != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.md,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                }, children: [estimatedTime ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: `⏱ ${estimatedTime}` })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), onStart != null ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "md", onPress: onStart, style: { minHeight: tap }, children: actionLabel })) : null] })) : null] }));
}
//# sourceMappingURL=ServiceCardV4.js.map