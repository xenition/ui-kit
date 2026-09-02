"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveRequestV4 = LeaveRequestV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const workforce_v4_1 = require("../../hr/workforce-v4");
const StatusPillV4_1 = require("./StatusPillV4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 leave request** — same props as {@link LeaveRequest} plus
 * `decisionReason`, `approveLabel`, `denyLabel` and `formatDays`.
 *
 * ## Six changes
 *
 * 1. **Approve and Deny are reachable.** They were `Button`s inside the card's
 *    own `Pressable`, which is `accessible` by default and flattens its whole
 *    subtree into one leaf named "Leave request, Vacation, Pending" — so on
 *    native the two decisions this card exists for were not focus stops at all.
 *    (On the web twin the same nesting had teeth: the card's `onKeyDown` caught
 *    the bubbled Enter, `preventDefault()` cancelled the button's own
 *    activation, and the card navigated instead. The manager navigated away
 *    without approving and nothing told them.) The card is a plain `CardV4`
 *    now; the activation wraps only the identity region, and the two buttons
 *    are its siblings.
 * 2. **A denial says why.** `denied` was one of six adverse statuses in this
 *    module with nowhere to put a reason, so a rejected request rendered a red
 *    "✕ Denied" above the requester's own note and the employee had to ask.
 * 3. **A day count is validated.** `days={0}` rendered "0 days" and `days={-1}`
 *    rendered "-1 days" — both drawn as confidently as a real figure. A count
 *    that is not a positive number is not drawn, and the plural comes from
 *    `pluralizeCount` rather than an appended `'s'`.
 * 4. **Leave type stops being a diagnosis.** `sick` was toned `danger` and
 *    `parental` `success` — a doctor's note in alarm red and a birth as a
 *    success condition. A type is identity: glyph, word, neutral chip.
 * 5. **The copy is props.** "Approve" and "Deny" were hard-coded English in the
 *    one component in the module a non-English HR team is guaranteed to see.
 * 6. **The card announces the whole request** — employee, type, dates, days and
 *    status — instead of three fragments and a subtree the reader cannot enter.
 *
 * `denyLabel`'s button keeps `variant="outline" tone="danger"` on **both**
 * twins. The web base spelled the destructive action `variant="danger"`, a
 * filled button, so the same request card put a heavier weight on "Deny" on the
 * web than on the phone; `tone` is the axis both platforms have.
 */
function LeaveRequestV4({ type, startDate, endDate, days, status, employeeName, employeeAvatarUrl, approver, reason, actionable = false, variant = 'default', decisionReason, approveLabel = 'Approve', denyLabel = 'Deny', formatDays, onApprove, onDeny, onPress, testID, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!startDate)
        return null;
    const compact = variant === 'compact';
    const typeMeta = tone_v4_1.LEAVE_TYPE_V4[type];
    const statusMeta = tone_v4_1.LEAVE_STATUS_V4[status];
    /*
      A status pill that sits BESIDE the activation is hidden from the reader when
      the row is interactive — the activation's own name already carries the
      status word, and hearing "Denied" twice in a row is worse than hearing it
      once. On a static row there is no activation to carry it, so the pill speaks
      for itself and the name leaves it out. Same rule on both twins.
    */
    const interactive = onPress != null;
    const range = endDate && endDate !== startDate ? `${startDate} – ${endDate}` : startDate;
    const showActions = actionable && status === 'pending';
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    // A count that is not a positive number is bad data, not a small request.
    const count = Number.isFinite(days) && days > 0 ? days : null;
    const daysLabel = count == null ? null : (formatDays ?? ((n) => (0, workforce_v4_1.pluralizeCount)(n, 'day')))(count);
    const why = (0, workforce_v4_1.isAdverse)(status) ? decisionReason : undefined;
    const decidedBy = approver && (status === 'approved' || status === 'denied')
        ? `${statusMeta.label} by ${approver}`
        : null;
    const spoken = (0, tone_v4_1.spokenLine)([
        employeeName,
        typeMeta.label,
        range,
        daysLabel,
        interactive ? statusMeta.label : null,
        why,
        decidedBy,
    ]);
    const identity = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            minHeight: tap,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
        }, children: [employeeName ? (0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { size: "sm", name: employeeName, src: employeeAvatarUrl }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [employeeName ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", numberOfLines: 1, children: employeeName })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, tone_v4_1.chipStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "onCard", children: typeMeta.glyph }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onCard", children: typeMeta.label })] })] })] }));
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: "outlined", padding: compact ? 'sm' : 'md', testID: testID, style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, style: { flex: 1, borderRadius: tokens.radius.md }, children: ({ pressed }) => identity(pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, style: { flex: 1 }, children: identity(false) })), (0, jsx_runtime_1.jsx)(StatusPillV4_1.StatusPillV4, { meta: statusMeta, size: "sm", decorative: interactive })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "onCard", children: range }), daysLabel ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "mutedText", numeric: "tabular", children: daysLabel })) : null] }), !compact && reason ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 2, children: reason })) : null, why ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", style: { color: colors.dangerText }, children: why })) : null, showActions ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "sm", tone: "success", onPress: onApprove, accessibilityLabel: approveLabel, style: { flex: 1, minHeight: tap }, children: approveLabel }), (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "sm", variant: "outline", tone: "danger", onPress: onDeny, accessibilityLabel: denyLabel, style: { flex: 1, minHeight: tap }, children: denyLabel })] })) : decidedBy ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: decidedBy })) : null] }));
}
//# sourceMappingURL=LeaveRequestV4.js.map