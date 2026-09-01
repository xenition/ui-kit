"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeLogRowV4 = TimeLogRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const money_1 = require("../../commerce/money");
const format_1 = require("./internal/format");
const job_v4_1 = require("./internal/job-v4");
const STATUS_META = {
    running: { label: 'Running', glyph: '⏱', tone: 'primary' },
    stopped: { label: 'Logged', glyph: '■', tone: 'neutral' },
    approved: { label: 'Approved', glyph: '✓', tone: 'success' },
    rejected: { label: 'Rejected', glyph: '✕', tone: 'danger' },
};
/**
 * **V4 time log row** — same props as {@link TimeLogRow} plus `billableLabel`.
 *
 * ## Four changes
 *
 * 1. **The money and the billable flag are announced.** The row's name was
 *    `"${label}, ${duration}, ${status}"`, which replaces the subtree — so on
 *    a timesheet the two facts an approver is actually reading, the line total
 *    and whether it bills, were spoken to nobody.
 * 2. **The literal `$` is gone.** The chip read "$ Billable" while the total
 *    beside it was formatted by `currency`, so a EUR timesheet printed "€12.50"
 *    under a dollar sign. Billable is a word; the currency belongs to the
 *    number.
 * 3. **The stacked figures are tabular**, so a column of durations and totals
 *    lines up digit-for-digit down a timesheet instead of drifting.
 * 4. **The row is a row from the shared row line** — 44 clear, a press that is
 *    a state layer rather than `opacity: 0.7`, a decorative disc, and the
 *    module's one badge shape.
 *
 * **Renders nothing without a `label`.**
 */
function TimeLogRowV4({ label, minutes, status, window, billable = false, rateCentsPerHour, currency = 'USD', formatMoney = money_1.formatMoney, billableLabel = 'Billable', onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (!label)
        return null;
    const meta = STATUS_META[status] ?? STATUS_META.stopped;
    const safeMinutes = Number.isFinite(minutes) ? Math.max(0, Math.trunc(minutes)) : 0;
    const duration = (0, format_1.formatDuration)(safeMinutes);
    const totalCents = rateCentsPerHour != null && Number.isFinite(rateCentsPerHour)
        ? Math.round((safeMinutes / 60) * Math.max(0, rateCentsPerHour))
        : undefined;
    const total = totalCents != null ? formatMoney(totalCents, currency) : null;
    const spoken = (0, job_v4_1.spokenLine)([
        label,
        window,
        duration,
        meta.label,
        total,
        billable ? billableLabel : null,
    ]);
    const content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: [
                    (0, row_v4_1.rowLeadingStyle)(theme),
                    { borderRadius: tokens.radius.full, backgroundColor: (0, job_v4_1.discGround)(theme, meta.tone) },
                ], children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: meta.glyph, style: { color: (0, job_v4_1.discInk)(theme, meta.tone) } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", numberOfLines: 1, children: label }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [window != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: window })) : null, (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, ...job_v4_1.BADGE_V4, children: `${meta.glyph} ${meta.label}` }), billable ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "accent", ...job_v4_1.BADGE_V4, children: billableLabel })) : null] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [(0, row_v4_1.rowTrailingStyle)(theme), { flexDirection: 'column', alignItems: 'flex-end' }], children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", numeric: "tabular", children: duration }), total != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: total })) : null] })] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, style: [(0, row_v4_1.rowContainerStyle)(theme, { twoLine: true }), style], children: content }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, style: [{ borderRadius: tokens.radius.md }, style], children: ({ pressed }) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
                (0, row_v4_1.rowContainerStyle)(theme, { twoLine: true }),
                { borderRadius: tokens.radius.md, backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed }) },
            ], children: content })) }));
}
//# sourceMappingURL=TimeLogRowV4.js.map