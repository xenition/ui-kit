"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftScheduleV4 = ShiftScheduleV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const CardV4_1 = require("../primitives/CardV4");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const StatusPillV4_1 = require("./StatusPillV4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 shift schedule** — same props as {@link ShiftSchedule} plus
 * `unassignedLabel` and `emptyDescription`.
 *
 * ## Five changes
 *
 * 1. **A shift has one truth about who is on it.** The base derived the tint
 *    from `!shift.assignee` and the pill from `shift.status`, so
 *    `{ status: 'confirmed', assignee: undefined }` rendered a row tinted as
 *    open, the body text "Unassigned", and a green "✓ Confirmed" pill — three
 *    statements, two of them contradicting each other, on the roster a shift
 *    manager reads to decide whether anyone is coming in. The open flag is now
 *    the assignee and nothing else, and an unassigned shift is `open`
 *    regardless of what status was passed with it.
 * 2. **The open tint is a token, and it never carries the meaning alone.** The
 *    base washed an open row in `withAlpha(tone, 0.08)` — translucent, so the
 *    same row was a different colour on a card than on the page, and a
 *    different colour again from the web twin's own hand-rolled alpha. It is
 *    `toneGround()` now: one composited 10% mix, opaque, identical on both
 *    platforms. The tint is decoration on top of the word "Open", which is what
 *    a colour-blind user actually reads.
 * 3. **Every row is a target.** The rows were `Pressable`s whose height came
 *    from `xs` padding around two lines of `xs` text; they clear `minTap` now.
 * 4. **A press is a state layer**, where the base had no press feedback on the
 *    shift rows at all — a tap on a roster row did nothing visible until the
 *    next screen appeared.
 * 5. **The copy is props and the columns come off the scale.** "Unassigned" was
 *    hard-coded, the time column was a literal `width: 96`, and the row's spoken
 *    name was "Shift 09:00 to 17:00, Confirmed" — no assignee, no role, no
 *    location, which is everything a manager is scanning the roster for.
 */
function ShiftScheduleV4({ shifts, dateLabel, variant = 'default', unassignedLabel = 'Unassigned', emptyLabel = 'No shifts scheduled', emptyDescription = 'Shifts you add will appear here.', onSelectShift, testID, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const compact = variant === 'compact';
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const timeColumn = tokens.spacing['2xl'] * 2;
    const list = Array.isArray(shifts) ? shifts : [];
    const header = dateLabel ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "bold", tone: "onCard", children: dateLabel })) : null;
    if (list.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: testID, style: [{ gap: tokens.spacing.sm }, style], children: [header, (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: emptyLabel, description: emptyDescription })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: "outlined", padding: compact ? 'sm' : 'md', testID: testID, style: [{ gap: tokens.spacing.sm }, style], children: [header, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: list.map((shift) => {
                    /*
                      One source. An unassigned shift is open no matter what status came
                      with it — the roster's whole job is to say whether somebody is
                      coming in, and the assignee is the field that answers that.
                    */
                    const open = shift.assignee == null || shift.assignee === '';
                    const meta = tone_v4_1.SHIFT_STATUS_V4[open ? 'open' : (shift.status ?? 'scheduled')];
                    const who = open ? unassignedLabel : shift.assignee;
                    const time = `${shift.start}–${shift.end}`;
                    const spoken = (0, tone_v4_1.spokenLine)([
                        time,
                        shift.role,
                        who,
                        !compact ? shift.location : null,
                        meta.label,
                    ]);
                    // The shared 10% mix, not a hand-rolled alpha — see change 2.
                    const ground = open ? (0, tone_v4_1.toneGround)(theme, meta.tone) : colors.card;
                    const row = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.sm,
                            minHeight: tap,
                            paddingVertical: tokens.spacing.xs,
                            paddingHorizontal: tokens.spacing.sm,
                            borderRadius: tokens.radius.md,
                            backgroundColor: pressed
                                ? (0, state_v4_1.pressOver)(theme, ground, colors.onCard)
                                : open
                                    ? ground
                                    : 'transparent',
                        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: timeColumn }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onCard", numeric: "tabular", children: time }), shift.role ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: shift.role })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: open ? 'mutedText' : 'onCard', numberOfLines: 1, children: who }), !compact && shift.location ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: shift.location })) : null] }), (0, jsx_runtime_1.jsx)(StatusPillV4_1.StatusPillV4, { meta: meta, size: "sm", decorative: true })] }));
                    return onSelectShift ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: () => onSelectShift(shift), style: { borderRadius: tokens.radius.md }, children: ({ pressed }) => row(pressed) }, shift.id)) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, children: row(false) }, shift.id));
                }) })] }));
}
//# sourceMappingURL=ShiftScheduleV4.js.map