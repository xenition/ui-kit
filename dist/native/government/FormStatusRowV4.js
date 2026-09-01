"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormStatusRowV4 = FormStatusRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const civic_v4_1 = require("./internal/civic-v4");
const status_1 = require("./internal/status");
/** What the form number identifies — the word the base's own spoken name used. */
const FORM_LABEL = 'Form';
/**
 * **V4 form status row** — same props as {@link FormStatusRow} plus `reason`
 * and `statusLabels`.
 *
 * ## Four changes
 *
 * 1. **`action-needed` and `rejected` can say why.** The two states that exist
 *    to make somebody act carried no field for what to do or what went wrong —
 *    the row said "Action needed" and left the applicant to phone the agency.
 *    `isAdverse()` decides when the `reason` renders, and the line is an
 *    assertive live region so a status that changes under a reader is heard.
 * 2. **The form number is labelled.** It rendered as a bare "APP-77412",
 *    visibly and in the spoken name, with nothing saying what it identified.
 * 3. **The row is one name carrying the agency and the date.** The base's
 *    three-field template — number, title, status — pruned exactly the two
 *    fields an applicant chasing a form needs.
 * 4. **It is a row from the shared row line**, with the family's 44 leading
 *    slot, its metrics and its state layer, instead of `opacity: 0.7` — an
 *    opacity that dims the row's content the way M3 marks a *disabled* one.
 *    The status disc takes the contrast-corrected ink on a ground composited
 *    against an opaque ground, not a fill slot washed over whatever is behind
 *    it — a translucent tint is a different colour on every surface it lands on.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
function FormStatusRowV4({ formNumber, title, status, agency, date, reason, statusLabels, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!title)
        return null;
    const sd = (0, status_1.formStatus)(status);
    const statusWord = statusLabels?.[status] ?? sd.label;
    const adverse = (0, civic_v4_1.isAdverse)(status);
    const idLine = (0, civic_v4_1.labelledId)(FORM_LABEL, formNumber);
    const showReason = adverse && Boolean(reason);
    const name = (0, civic_v4_1.spokenLine)([
        title,
        idLine,
        agency,
        statusWord,
        date,
        showReason ? reason : null,
    ]);
    const content = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            (0, row_v4_1.rowContainerStyle)(theme, { twoLine: true }),
            {
                backgroundColor: pressed ? (0, row_v4_1.rowPressFill)(theme, colors.surface, colors.onSurface) : 'transparent',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
                    (0, row_v4_1.rowLeadingStyle)(theme),
                    {
                        borderRadius: tokens.radius.full,
                        backgroundColor: (0, civic_v4_1.tintGround)(theme, sd.tone),
                    },
                ], children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: sd.glyph, style: { color: (0, civic_v4_1.tintInk)(theme, sd.tone) } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", numberOfLines: 1, children: title }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: (0, tone_v4_1.metaLine)([idLine, agency]) }), showReason ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", accessibilityLiveRegion: "assertive", style: { color: (0, civic_v4_1.tintInk)(theme, sd.tone) }, children: reason })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [(0, row_v4_1.rowTrailingStyle)(theme), { alignItems: 'flex-end', flexDirection: 'column' }], children: [(0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: sd.tone, ...civic_v4_1.BADGE_V4, children: `${sd.glyph} ${statusWord}` }), date ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: date })) : null] })] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, children: content(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: onPress, style: { borderRadius: tokens.radius.md }, children: ({ pressed }) => content(pressed) }));
}
//# sourceMappingURL=FormStatusRowV4.js.map