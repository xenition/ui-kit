"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeRowV4 = ResumeRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 résumé row** — same props as {@link ResumeRow} plus `defaultLabel`,
 * `setDefaultLabel`, `downloadLabel` and `formatRelative`.
 *
 * ## Five changes
 *
 * 1. **Download and Set default are reachable.** Both sat inside the row's own
 *    `Pressable`, which flattens its subtree on native — so neither was a
 *    focus stop, and the ⬇ had `hitSlop={8}` and no size of its own, roughly
 *    28 points of target for the row's primary action. Both are now siblings
 *    of the activation, with names and 44 targets.
 * 2. **`Default` stopped being a success badge.** Which of three files is the
 *    default one is **identity**, not health — spending `success` on it means
 *    the other two résumés read as somehow not-good. A neutral outline chip
 *    says the same thing and leaves green meaning green.
 * 3. **The file tile stopped being drawn in `border`.** `border` is the
 *    hairline colour; as a 40-square fill it made the tile read as an empty
 *    input. It is now a soft `IconV4` badge, whose ground and glyph are a
 *    measured pair.
 * 4. **The row announces the file, not just its name.** The updated age, the
 *    size and the default marker are all inside the activation and flattened
 *    into it, so they belong in its name.
 * 5. **Tokens and press.** `muted` inking the meta line becomes `mutedText`,
 *    `surface` becomes `card`, and `opacity: 0.9` becomes a state layer.
 *
 * **Renders nothing without a file name** (§4.5).
 */
function ResumeRowV4({ resume, onPress, onDownload, onSetDefault, defaultLabel = 'Default', setDefaultLabel = 'Set default', downloadLabel = 'Download', formatRelative, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!resume?.name)
        return null;
    const isDefault = resume.isDefault === true;
    const meta = (0, tone_v4_1.metaLine)([(0, tone_v4_1.relativeLabel)(resume.updatedAt, formatRelative), resume.sizeLabel]);
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const name = (0, tone_v4_1.spokenName)([resume.name, isDefault ? defaultLabel : null, meta]);
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "document", size: "lg", color: "primary", badge: "soft", badgeShape: "rounded" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onCard", numberOfLines: 1, style: { flexShrink: 1 }, children: resume.name }), isDefault ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "neutral", variant: "outline", size: "sm", children: defaultLabel })) : null] }), meta ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: meta })) : null] })] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            (0, tone_v4_1.cardSurfaceStyle)(theme),
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                borderRadius: tokens.radius.md,
                padding: tokens.spacing.md,
            },
            style,
        ], children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: () => onPress(resume), style: ({ pressed }) => ({
                    flex: 1,
                    minWidth: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.md,
                    borderRadius: tokens.radius.md,
                    backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
                }), children: body })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, style: {
                    flex: 1,
                    minWidth: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.md,
                }, children: body })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [!isDefault && onSetDefault ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "ghost", size: "sm", onPress: () => onSetDefault(resume), accessibilityLabel: (0, tone_v4_1.spokenName)([setDefaultLabel, resume.name]), style: { minHeight: tap }, children: setDefaultLabel })) : null, onDownload ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: (0, tone_v4_1.spokenName)([downloadLabel, resume.name]), onPress: () => onDownload(resume), style: ({ pressed }) => ({
                            minWidth: tap,
                            minHeight: tap,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: tokens.radius.full,
                            backgroundColor: pressed
                                ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard)
                                : 'transparent',
                        }), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "download", size: "lg", color: "primaryText" }) })) : null] })] }));
}
//# sourceMappingURL=ResumeRowV4.js.map