"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimesheetRowV4 = TimesheetRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const workforce_v4_1 = require("../../hr/workforce-v4");
const StatusPillV4_1 = require("./StatusPillV4");
const internal_1 = require("./internal");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 timesheet row** — same props as {@link TimesheetRow} plus
 * `decisionReason` and `approver`.
 *
 * ## Five changes
 *
 * 1. **A rejection says why, and who.** `rejected` was one of six adverse
 *    statuses in the module with nowhere to record a reason, and this is the
 *    one attached to somebody's pay: the row said "✕ Rejected" and the employee
 *    had to go and ask which of five days was wrong.
 * 2. **Overtime cannot exceed the day.** Overtime is documented as *included
 *    in* `hours`, but the base only ever tested it for `> 0`, so
 *    `hours={2} overtimeHours={10}` rendered "2h 0m" with "+10h 0m OT" beneath
 *    it — two numbers that cannot both be true, printed as confidently as each
 *    other. `hoursParts()` clamps the overtime and the row *says* the input is
 *    inconsistent rather than quietly drawing a corrected figure.
 * 3. **The overtime flag is inked with ink.** `toneColor(colors, 'warn')`
 *    returns the `warn` **fill** slot and the base assigned it straight to
 *    `color:`. It is `warnText` now.
 * 4. **It is a row from the shared row family**, so a timesheet, a settings row
 *    and a notification are one height, one gutter and one press layer instead
 *    of a hand-rolled box with its own border and `gap: 2`.
 * 5. **The row announces its whole state** — date, hours, overtime, clock,
 *    project, status, approver and the rejection reason. The base named itself
 *    "Timesheet Mon Aug 24, 7h 30m" and left the status, which is the part a
 *    manager is scanning for, to a pill the reader walked past separately.
 *
 * **Renders nothing without a `date`.**
 */
function TimesheetRowV4({ date, hours, status, clockIn, clockOut, project, overtimeHours = 0, variant = 'default', decisionReason, approver, onPress, testID, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!date)
        return null;
    const compact = variant === 'compact';
    const parts = (0, workforce_v4_1.hoursParts)(hours, overtimeHours);
    const statusMeta = status ? tone_v4_1.TIMESHEET_STATUS_V4[status] : undefined;
    const clock = clockIn && clockOut ? `${clockIn} – ${clockOut}` : (clockIn ?? clockOut);
    const caption = (0, tone_v4_1.metaLine)([clock, project]);
    const overtimeLabel = parts.overtime > 0 ? `+${(0, internal_1.formatHours)(parts.overtime)} OT` : null;
    // The input is wrong and someone's pay depends on it — say so.
    const inconsistentLabel = parts.inconsistent ? 'Overtime exceeds hours worked' : null;
    const why = status && (0, workforce_v4_1.isAdverse)(status) ? decisionReason : undefined;
    const decidedBy = approver && statusMeta && (status === 'approved' || status === 'rejected')
        ? `${statusMeta.label} by ${approver}`
        : null;
    const spoken = (0, tone_v4_1.spokenLine)([
        date,
        (0, internal_1.formatHours)(parts.total),
        overtimeLabel,
        inconsistentLabel,
        caption,
        statusMeta?.label,
        decidedBy,
        why,
    ]);
    const body = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            (0, row_v4_1.rowContainerStyle)(theme, { twoLine: !compact }),
            { backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed }), borderRadius: tokens.radius.md },
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onCard", numberOfLines: 1, children: date }), !compact && caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: caption })) : null, why ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", numberOfLines: 2, style: { color: colors.dangerText }, children: why })) : decidedBy ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: decidedBy })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", numeric: "tabular", children: (0, internal_1.formatHours)(parts.total) }), overtimeLabel ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", numeric: "tabular", style: { color: colors.warnText }, children: overtimeLabel })) : null, inconsistentLabel ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", style: { color: colors.dangerText }, children: inconsistentLabel })) : null] }), statusMeta ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, row_v4_1.rowTrailingStyle)(theme), children: (0, jsx_runtime_1.jsx)(StatusPillV4_1.StatusPillV4, { meta: statusMeta, size: "sm", decorative: true }) })) : null] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, testID: testID, style: style, children: body(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, testID: testID, style: [{ borderRadius: tokens.radius.md }, style], children: ({ pressed }) => body(pressed) }));
}
//# sourceMappingURL=TimesheetRowV4.js.map