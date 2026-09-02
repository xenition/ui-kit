"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationRowV4 = ApplicationRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const hiring_v4_1 = require("../../jobs/hiring-v4");
const types_1 = require("./types");
const StatusPipelineV4_1 = require("./StatusPipelineV4");
const tone_v4_1 = require("./internal/tone-v4");
/** Called out as a word, never as a hue alone. */
const REJECTED = 'Rejected';
/**
 * **V4 application row** — same props as {@link ApplicationRow} plus
 * `rejectionReason`, `formatRelative` and `last`.
 *
 * ## Five changes
 *
 * 1. **The stage is announced.** This is the module's headline defect in one
 *    component: `<ApplicationRow application={{stage:'interview'}} />` said
 *    the job title and stopped. The pipeline drew the stage into a `View` that
 *    was never `accessible`, and the row's own `Pressable` flattened it
 *    anyway, so where the application stands — the only reason anyone opens
 *    this list — was silent. The stage is now part of the row's name, and the
 *    pipeline beneath it is hidden from the reader so the fact is stated once.
 * 2. **A rejection can say why.** `Application.rejected` is a bare boolean
 *    with no reason and no stage-of-rejection, so the row could report the
 *    worst outcome in the funnel and offer nothing else. `rejectionReason` is
 *    drawn under the pipeline and joined into the name — an adverse outcome is
 *    the one state in this module that owes the reader an explanation.
 * 3. **The `accessory` is a sibling.** Anything a caller passes — a chevron, a
 *    withdraw button — sat inside the row's activation and was flattened into
 *    it, so a real control there was unreachable. The row container is a plain
 *    `View` now and the accessory sits beside the activation.
 * 4. **`muted` stopped inking text.** Three captions here were drawn in
 *    `muted`, a ramp step with no contrast promise; they take `mutedText`.
 * 5. **Press is a state layer**, not `opacity: 0.9` — M3 reserves fading for
 *    disabled, and the base's press made a tapped row read as a dead one.
 *
 * **Renders nothing without a job title** (§4.5).
 */
function ApplicationRowV4({ application, onPress, accessory, rejectionReason, formatRelative, last = false, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!application?.jobTitle)
        return null;
    const applied = (0, tone_v4_1.relativeLabel)(application.appliedAt, formatRelative);
    const { known } = (0, hiring_v4_1.stageParts)(application.stage, types_1.APPLICATION_STAGES);
    const stageWord = known ? types_1.STAGE_LABEL[application.stage] : null;
    const rejected = application.rejected === true;
    // Only an adverse outcome is owed an explanation; a reason on a live
    // application is noise.
    const reason = rejected ? rejectionReason : undefined;
    const name = (0, tone_v4_1.spokenName)([
        application.jobTitle,
        application.companyName,
        applied,
        rejected ? (0, tone_v4_1.spokenName)([REJECTED, stageWord]) : stageWord,
        reason,
    ]);
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, row_v4_1.rowLeadingStyle)(theme), children: (0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { name: application.companyName, size: "sm" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            gap: tokens.spacing.sm,
                        }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onCard", numberOfLines: 1, style: { flex: 1 }, children: application.jobTitle }), applied ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: applied })) : null] }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: application.companyName }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: (0, jsx_runtime_1.jsx)(StatusPipelineV4_1.StatusPipelineV4, { stage: application.stage, rejected: rejected, variant: "compact" }) }), reason ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "dangerText", numberOfLines: 2, children: reason })) : null] })] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            (0, row_v4_1.rowContainerStyle)(theme, { twoLine: true }),
            !last ? (0, row_v4_1.rowEdgeStyle)(theme) : null,
            style,
        ], children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: () => onPress(application), style: ({ pressed }) => ({
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
                }, children: body })), accessory ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, row_v4_1.rowTrailingStyle)(theme), children: accessory }) : null] }));
}
//# sourceMappingURL=ApplicationRowV4.js.map