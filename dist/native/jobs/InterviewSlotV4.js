"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewSlotV4 = InterviewSlotV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const hiring_v4_1 = require("../../jobs/hiring-v4");
const format_1 = require("./format");
const tone_v4_1 = require("./internal/tone-v4");
/** Mode → the glyph that says the channel without saying it in colour. */
const MODE_ICON = {
    onsite: 'location',
    video: 'camera',
    phone: 'phone',
};
/** Mode → its default word. */
const MODE_LABEL = {
    onsite: 'On-site',
    video: 'Video',
    phone: 'Phone',
};
/** Status → its default word. A status is never carried by hue alone. */
const STATUS_LABEL = {
    scheduled: 'Scheduled',
    confirmed: 'Confirmed',
    cancelled: 'Cancelled',
    rescheduled: 'Rescheduled',
};
/** Status → tone. These four are genuine statuses, so they may take one. */
const STATUS_TONE = {
    scheduled: 'neutral',
    confirmed: 'success',
    cancelled: 'danger',
    rescheduled: 'warn',
};
/**
 * **V4 interview slot** — same props as {@link InterviewSlot} plus `status`,
 * `statusReason`, `modeLabels`, `formatDate` and `formatTime`.
 *
 * ## Five changes
 *
 * 1. **A slot that cannot be read is not drawn.** An unparseable `startsAt`
 *    produced a blank date and a blank time whose accessible name was
 *    literally `" , Video"` — a control announcing a comma. A slot with no
 *    time is not a slot, so it renders nothing (§4.5).
 * 2. **An unknown mode is not called a video call.** `MODE[mode] ?? MODE.video`
 *    fell back to Video for any value outside the union, announcing a video
 *    interview for something that is not one — a candidate could turn up in
 *    the wrong place. An unrecognised mode now claims nothing: no glyph, no
 *    word.
 * 3. **Display-only is no longer drawn as unavailable.** A slot with no
 *    `onSelect` was rendered `disabled` — dimmed, and announced as
 *    unavailable, which for an interview reads as *cancelled*. It is now a
 *    plain announced element at full strength, and the actual adverse case has
 *    a `status` of its own to say so in a word, with `statusReason` for why.
 *    `disabled` still means what it says, and still dims — to M3's 0.38, not
 *    the base's picked 0.5.
 * 4. **Selected is the compiler's own slot.** The base filled the whole card
 *    with `primary` and inked everything `onPrimary`, which left no readable
 *    pair for a status badge sitting on top of it. `selected`/`onSelected`
 *    exist precisely for "the chosen one" and ship as a guaranteed pair.
 * 5. **44, and a state layer.** The base's press was `opacity: 0.9` — M3
 *    spends opacity on *disabled* — and a compact slot chip could fall well
 *    under the tap floor.
 */
function InterviewSlotV4({ interview, selected = false, disabled = false, onSelect, status, statusReason, modeLabels, formatDate, formatTime, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens, state } = theme;
    const startsAt = interview?.startsAt;
    const dateLabel = startsAt ? (formatDate ?? format_1.formatShortDate)(startsAt) : '';
    const start = startsAt ? (formatTime ?? format_1.formatTime)(startsAt) : '';
    // Both formatters return '' for an instant that does not parse, so this one
    // test covers a missing date, a malformed one and a caller's own formatter
    // declining to render it.
    if (!dateLabel && !start)
        return null;
    const end = interview.endsAt ? (formatTime ?? format_1.formatTime)(interview.endsAt) : '';
    const timeRange = end ? `${start} – ${end}` : start;
    // An unrecognised mode says nothing rather than something false.
    const known = interview.mode in MODE_LABEL;
    const modeLabel = known ? (modeLabels?.[interview.mode] ?? MODE_LABEL[interview.mode]) : null;
    const modeIcon = known ? MODE_ICON[interview.mode] : null;
    const statusWord = status ? STATUS_LABEL[status] : null;
    const reason = status && (0, hiring_v4_1.isAdverse)(status) ? statusReason : undefined;
    const ground = selected ? colors.selected : colors.card;
    const ink = selected ? colors.onSelected : colors.onCard;
    const name = (0, tone_v4_1.spokenName)([
        dateLabel,
        timeRange,
        modeLabel,
        interview.interviewer ? `with ${interview.interviewer}` : null,
        statusWord,
        reason,
    ]);
    const box = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                gap: tokens.spacing.xs,
                minHeight: (0, chrome_v4_1.minTap)(tokens.spacing),
                justifyContent: 'center',
                backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, ground, ink) : ground,
                borderColor: selected ? colors.primary : colors.border,
                borderWidth: selected ? 2 : 1,
                borderRadius: tokens.radius.md,
                padding: tokens.spacing.md,
                opacity: (0, chrome_v4_1.disabledOpacity)(state, disabled),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [modeIcon ? (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: modeIcon, size: "sm", color: "mutedText" }) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", style: { color: ink }, numberOfLines: 1, children: modeLabel ? `${dateLabel}  ·  ${modeLabel}` : dateLabel })] }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", numeric: "tabular", style: { color: ink }, children: timeRange }), interview.interviewer ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: interview.interviewer })) : null, statusWord ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: STATUS_TONE[status], variant: "soft", size: "sm", children: statusWord }) })) : null, reason ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "dangerText", numberOfLines: 2, children: reason })) : null] }));
    // No `onSelect` means this slot is a statement, not an offer. The base drew
    // it as a disabled button, which for an interview reads as cancelled.
    if (!onSelect) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, accessibilityState: { selected, disabled }, children: box(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, accessibilityState: { selected, disabled }, disabled: disabled, onPress: () => onSelect(interview), children: ({ pressed }) => box(pressed) }));
}
//# sourceMappingURL=InterviewSlotV4.js.map