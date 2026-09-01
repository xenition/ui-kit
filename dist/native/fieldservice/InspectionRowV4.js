"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InspectionRowV4 = InspectionRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const job_v4_1 = require("./internal/job-v4");
/**
 * Result → word, glyph and tone.
 *
 * `pending` is a checkpoint nobody has looked at yet — identity, not an
 * outcome — so it stops wearing the brand colour and answers in neutral. The
 * two real outcomes keep theirs.
 */
const RESULT_META = {
    pass: { label: 'Pass', glyph: '✓', tone: 'success' },
    fail: { label: 'Fail', glyph: '✕', tone: 'danger' },
    na: { label: 'N/A', glyph: '–', tone: 'neutral' },
    pending: { label: 'Pending', glyph: '○', tone: 'neutral' },
};
/**
 * **V4 inspection row** — same props as {@link InspectionRow} plus
 * `resultLabels`.
 *
 * ## Four changes
 *
 * 1. **The defect note is announced.** The row's name was
 *    `"${label}, ${result}"`, which replaces the subtree — so on a *failed*
 *    checkpoint the one thing a technician needs, the inspector's note saying
 *    what is wrong with it, was the thing the label threw away. The reference
 *    code went with it.
 * 2. **The result is announced once.** The disc carried an
 *    `accessibilityLabel` and the badge carried the same word, so a reader
 *    heard "Fail" twice for one checkpoint. The disc is decorative now.
 * 3. **The row is a row from the shared row line** — one height that clears
 *    44, one 44 leading slot, one press fill — instead of a 36px disc on a
 *    `paddingVertical: sm` box that dimmed itself to `0.7` when held.
 * 4. **The caller's `style` lands on the root**, the element the web twin puts
 *    it on; here it went *inside* the pressable, so the same prop moved two
 *    different boxes on the two platforms.
 *
 * **Renders nothing without a `label`.**
 */
function InspectionRowV4({ label, result, code, note, resultLabels, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (!label)
        return null;
    const meta = RESULT_META[result] ?? RESULT_META.pending;
    const resultWord = resultLabels?.[result] ?? meta.label;
    const name = (0, job_v4_1.spokenLine)([label, resultWord, code, note]);
    const content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: [
                    (0, row_v4_1.rowLeadingStyle)(theme),
                    { borderRadius: tokens.radius.full, backgroundColor: (0, job_v4_1.discGround)(theme, meta.tone) },
                ], children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: meta.glyph, style: { color: (0, job_v4_1.discInk)(theme, meta.tone) } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", numberOfLines: 2, children: label }), code != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: code })) : null, note != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: note })) : null] }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, ...job_v4_1.BADGE_V4, children: `${meta.glyph} ${resultWord}` })] }));
    const twoLine = code != null || note != null;
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, style: [(0, row_v4_1.rowContainerStyle)(theme, { twoLine }), style], children: content }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: onPress, style: [{ borderRadius: tokens.radius.md }, style], children: ({ pressed }) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
                (0, row_v4_1.rowContainerStyle)(theme, { twoLine }),
                { borderRadius: tokens.radius.md, backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed }) },
            ], children: content })) }));
}
//# sourceMappingURL=InspectionRowV4.js.map