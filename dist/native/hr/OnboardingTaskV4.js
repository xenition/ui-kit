"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingTaskV4 = OnboardingTaskV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const CheckboxV4_1 = require("../primitives/CheckboxV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const workforce_v4_1 = require("../../hr/workforce-v4");
const StatusPillV4_1 = require("./StatusPillV4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 onboarding task** — same props as {@link OnboardingTask} plus
 * `blockedReason` and `overdueLabel`.
 *
 * ## Five changes
 *
 * 1. **The checkbox is reachable.** It sat inside the row's own `Pressable`,
 *    which is `accessible` by default and flattens its whole subtree into one
 *    leaf named "Onboarding task Sign employment contract" — so the tick, the
 *    only control on the row, was not a focus stop and a VoiceOver user could
 *    open the task and never complete it. The row is a plain `View` now and the
 *    checkbox is a sibling, which is also how the **web twin already had it**:
 *    there, the activation wraps only the title, and this brings the native
 *    twin to the same shape rather than to a third one.
 * 2. **The checkbox is a target.** A 20pt box with no wrapper is under half the
 *    44pt floor. `CheckboxV4` opens its own touch area, and the slot it sits in
 *    is `minTap` square, so the two agree.
 * 3. **A blocked task says what it is waiting on.** `blocked` was one of six
 *    adverse statuses in the module with nowhere to record a reason, and it is
 *    the one whose entire meaning is "somebody else has to do something first".
 * 4. **Overdue is inked with ink, and its word is a prop.**
 *    `toneColor(colors, 'danger')` returns the `danger` **fill** slot and the
 *    base assigned it straight to `color:`.
 * 5. **The row announces its whole state** — title, category, due date, status,
 *    overdue, the blocking reason and the assignee — instead of the title
 *    alone, with the completion state left to a checkbox nobody could reach.
 *
 * The assignee's avatar is `xs` on both twins; the web base used `sm`.
 *
 * **Renders nothing without a `title`.**
 */
function OnboardingTaskV4({ title, category, status = 'todo', dueDate, overdue = false, assignee, assigneeAvatarUrl, variant = 'default', blockedReason, overdueLabel = '⚠ Overdue', onToggle, onPress, testID, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!title)
        return null;
    const compact = variant === 'compact';
    const done = status === 'done';
    const statusMeta = tone_v4_1.TASK_STATUS_V4[status];
    /*
      A status pill that sits BESIDE the activation is hidden from the reader when
      the row is interactive — the activation's own name already carries the
      status word, and hearing "Denied" twice in a row is worse than hearing it
      once. On a static row there is no activation to carry it, so the pill speaks
      for itself and the name leaves it out. Same rule on both twins.
    */
    const interactive = onPress != null;
    const caption = (0, tone_v4_1.metaLine)([category, dueDate ? `Due ${dueDate}` : null]);
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const why = (0, workforce_v4_1.isAdverse)(status) ? blockedReason : undefined;
    const isOverdue = overdue && !done;
    const spoken = (0, tone_v4_1.spokenLine)([
        title,
        category,
        dueDate ? `Due ${dueDate}` : null,
        interactive ? statusMeta.label : null,
        isOverdue ? overdueLabel : null,
        why,
        assignee,
    ]);
    const titleText = (pressed) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            justifyContent: 'center',
            minHeight: tap,
            paddingHorizontal: tokens.spacing.xs,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
        }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", numberOfLines: 2, style: {
                color: done ? colors.mutedText : colors.onCard,
                textDecorationLine: done ? 'line-through' : 'none',
            }, children: title }) }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: testID, style: [
            {
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: tap, height: tap, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(CheckboxV4_1.CheckboxV4, { checked: done, onCheckedChange: (next) => onToggle?.(next), accessibilityLabel: `${done ? 'Mark incomplete' : 'Mark complete'}: ${title}` }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, style: { borderRadius: tokens.radius.md }, children: ({ pressed }) => titleText(pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, children: titleText(false) })), !compact && caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: caption })) : null, why ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", numberOfLines: 2, accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { color: colors.dangerText }, children: why })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: tokens.spacing.xs,
                        }, children: [(0, jsx_runtime_1.jsx)(StatusPillV4_1.StatusPillV4, { meta: statusMeta, size: "sm", decorative: interactive }), isOverdue ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { color: colors.dangerText }, children: overdueLabel })) : null, !compact && assignee ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { size: "xs", name: assignee, src: assigneeAvatarUrl }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: assignee })] })) : null] })] })] }));
}
//# sourceMappingURL=OnboardingTaskV4.js.map