"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PunchListItemV4 = PunchListItemV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CheckboxV4_1 = require("../primitives/CheckboxV4");
const TextV4_1 = require("../primitives/TextV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const job_v4_1 = require("./internal/job-v4");
const SEVERITY_META = {
    minor: { label: 'Minor', glyph: '·', tone: 'neutral' },
    major: { label: 'Major', glyph: '▲', tone: 'warn' },
    critical: { label: 'Critical', glyph: '!', tone: 'danger' },
};
/**
 * **V4 punch list item** — same props as {@link PunchListItem} plus
 * `severityLabels`.
 *
 * ## Four changes
 *
 * 1. **The whole row toggles**, and the target clears 44. The base put the
 *    entire affordance on a 20px box with no `hitSlop` — 16px on the web twin
 *    — on a list a superintendent walks a site with, one-handed, in gloves.
 * 2. **Severity, location and assignee join the control's name.** The
 *    checkbox announced the description and nothing else, so "Critical" and
 *    who owns the defect never reached a reader.
 * 3. **A checkbox nobody can tick is not enabled.** With no `onToggle` the
 *    base still rendered a live control that could be pressed forever and
 *    never changed; it now says it cannot be changed.
 * 4. **The row is a row from the shared row line**, with the shared press
 *    fill and the module's one badge shape — the base drew no press feedback
 *    at all, so pressing a row answered nothing.
 *
 * **Renders nothing without a `label`.**
 */
function PunchListItemV4({ label, done, severity, location, assignee, severityLabels, onToggle, disabled = false, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (!label)
        return null;
    const meta = severity ? SEVERITY_META[severity] : undefined;
    const severityWord = severity ? (severityLabels?.[severity] ?? meta?.label) : undefined;
    const caption = (0, tone_v4_1.metaLine)([location, assignee]);
    const interactive = Boolean(onToggle) && !disabled;
    const spoken = (0, job_v4_1.spokenLine)([label, severityWord, location, assignee]);
    const content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: (0, row_v4_1.rowLeadingStyle)(theme), children: (0, jsx_runtime_1.jsx)(CheckboxV4_1.CheckboxV4, { checked: done, disabled: !interactive, onCheckedChange: interactive ? onToggle : undefined }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: done ? 'mutedText' : 'onCard', numberOfLines: 3, style: { textDecorationLine: done ? 'line-through' : 'none' }, children: label }), caption !== '' ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: caption })) : null] }), meta && severityWord != null ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, ...job_v4_1.BADGE_V4, children: `${meta.glyph} ${severityWord}` })) : null] }));
    if (!interactive) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "checkbox", accessibilityLabel: spoken, accessibilityState: { checked: done, disabled: true }, style: [(0, row_v4_1.rowContainerStyle)(theme, { twoLine: caption !== '' }), style], children: content }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityLabel: spoken, accessibilityState: { checked: done, disabled: false }, onPress: () => onToggle?.(!done), style: [{ borderRadius: tokens.radius.md }, style], children: ({ pressed }) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
                (0, row_v4_1.rowContainerStyle)(theme, { twoLine: caption !== '' }),
                { borderRadius: tokens.radius.md, backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed }) },
            ], children: content })) }));
}
//# sourceMappingURL=PunchListItemV4.js.map