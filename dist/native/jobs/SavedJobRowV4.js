"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedJobRowV4 = SavedJobRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const types_1 = require("./types");
const SalaryRangeV4_1 = require("./SalaryRangeV4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 saved-job row** — same props as {@link SavedJobRow} plus `removeLabel`,
 * `formatRelative` and `last`.
 *
 * ## Five changes
 *
 * 1. **The remove control is reachable.** It sat inside the row's own
 *    `Pressable`, which flattens its subtree on native — so the only way to
 *    un-save a job was invisible to a screen reader, and on the web twin
 *    pressing Enter on it opened the job instead of removing it. The row
 *    container is now a plain `View`, the activation wraps the avatar and text,
 *    and the ★ sits beside it as a real focus stop with a 44 target.
 * 2. **Removing is an action, not a toggle.** The base hard-coded
 *    `accessibilityState={{ selected: true }}` on it (and `aria-pressed={true}`
 *    on web), so the reader announced a permanently-on toggle. Pressing it
 *    removes the job; there is no second state to be in.
 * 3. **The row says what it is.** Its name was the title and the company. The
 *    pay, the employment type and the saved age are all inside the activation
 *    and flattened into it, so they are now part of the name — otherwise they
 *    are drawn for sighted users only.
 * 4. **Employment type lost its status colour.** `contract → warn` and
 *    `remote → success` are identity wearing the palette's two warning
 *    colours. A neutral chip carries the same fact and leaves `warn` meaning
 *    "caution".
 * 5. **It is a row from the shared row line** — one height, one 44 leading
 *    slot, one state layer, one hairline — with `mutedText` inking the
 *    captions instead of `muted`, which is a fill with no contrast promise.
 *
 * **Renders nothing without a job title** (§4.5).
 */
function SavedJobRowV4({ job, savedAt, onPress, onRemove, removeLabel = 'Remove from saved', formatRelative, last = false, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!job?.title)
        return null;
    const saved = (0, tone_v4_1.relativeLabel)(savedAt, formatRelative);
    const savedText = saved ? `Saved ${saved}` : '';
    const pay = (0, tone_v4_1.salaryText)(job.salary).text;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const name = (0, tone_v4_1.spokenName)([
        job.title,
        job.companyName,
        types_1.EMPLOYMENT_LABEL[job.type],
        pay,
        savedText,
    ]);
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, row_v4_1.rowLeadingStyle)(theme), children: (0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: job.companyLogoUrl, name: job.companyName, size: "sm" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onCard", numberOfLines: 1, children: job.title }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.sm,
                            flexWrap: 'wrap',
                        }, children: [(0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "neutral", size: "sm", children: types_1.EMPLOYMENT_LABEL[job.type] }), job.salary ? (0, jsx_runtime_1.jsx)(SalaryRangeV4_1.SalaryRangeV4, { salary: job.salary, size: "sm", glyph: null }) : null] }), savedText ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: savedText })) : null] })] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            (0, row_v4_1.rowContainerStyle)(theme, { twoLine: true }),
            { alignItems: 'flex-start' },
            !last ? (0, row_v4_1.rowEdgeStyle)(theme) : null,
            style,
        ], children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: () => onPress(job), style: ({ pressed }) => ({
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
                }, children: body })), onRemove ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, row_v4_1.rowTrailingStyle)(theme), children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", 
                    // No `selected` state: this removes the job, it does not toggle it.
                    accessibilityLabel: (0, tone_v4_1.spokenName)([removeLabel, job.title]), onPress: () => onRemove(job), style: ({ pressed }) => ({
                        minWidth: tap,
                        minHeight: tap,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: tokens.radius.full,
                        backgroundColor: pressed
                            ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard)
                            : 'transparent',
                    }), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", tone: "primaryText", children: "\u2605" }) }) })) : null] }));
}
//# sourceMappingURL=SavedJobRowV4.js.map