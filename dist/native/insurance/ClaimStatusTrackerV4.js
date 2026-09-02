"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimStatusTrackerV4 = ClaimStatusTrackerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const coverage_v4_1 = require("../../insurance/coverage-v4");
const tone_v4_1 = require("./internal/tone-v4");
/** Non-colour marks for the three stage states. */
const STAGE_MARK = { done: '✓', current: '●', todo: '○' };
/**
 * **V4 claim status tracker** — same props as {@link ClaimStatusTracker} plus
 * `denialReason`, `stageLabels` and `deniedLabel`.
 *
 * ## Four changes
 *
 * 1. **The component stops inventing a denial reason.** The base hard-coded
 *    *"Reviewed after filing. Contact your agent to appeal."* as the body of
 *    the denial banner, and its props carried only `status` and `updated`. So a
 *    claim denied because the damage predates policy inception — or because the
 *    vehicle was not on the policy, or because the deductible exceeded the
 *    loss — rendered that same sentence, in the insurer's own voice, asserting
 *    a reason the caller never supplied and had no way to correct. The reason
 *    is a prop. Nothing is printed when there is not one.
 * 2. **The stages are readable.** The base rendered the `Steps` primitive,
 *    which has **no accessibility at all** — no `accessib*` prop anywhere in
 *    the native primitive, and on the web twin no `aria-current="step"`. An
 *    active step and a future step were both an outlined circle with the same
 *    numeral inside it, which is a difference no reader and no colour-blind
 *    user can see. The rail is drawn here instead: each stage carries a
 *    distinct mark (`✓` done, `●` current, `○` still to come), and the tracker
 *    reports its own position as a `progressbar` with the current stage's word
 *    as its value text, rather than relying on a primitive that cannot say it.
 * 3. **A denial is a state, drawn like one.** The banner hand-mixed
 *    `withAlpha(colors.danger, 0.1)` — a translucent wash that is a different
 *    colour on a card than on the page — and inked its heading with
 *    `colors.danger`, a fill slot with no contrast promise as text. It paints
 *    an opaque composite and uses `dangerText` now.
 * 4. **The copy is props.** Four stage names and a heading were hard-coded
 *    English in a component whose whole job is to tell somebody what happened
 *    to their claim.
 */
function ClaimStatusTrackerV4({ status, updated, denialReason, stageLabels, deniedLabel = 'Claim denied', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const meta = tone_v4_1.CLAIM_STATUS_V4[status] ?? tone_v4_1.CLAIM_STATUS_V4.filed;
    const labelOf = (stage) => stageLabels?.[stage] ?? tone_v4_1.CLAIM_STAGE_LABELS[stage];
    if ((0, coverage_v4_1.isAdverse)(status)) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: (0, tone_v4_1.spokenLine)([deniedLabel, denialReason, updated]), style: (0, tone_v4_1.bandStyle)(theme, 'danger'), children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { ...tone_v4_1.DECORATIVE, size: "lg", style: { color: (0, tone_v4_1.toneInk)(theme, 'danger') }, children: meta.glyph }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { accessibilityRole: "header", size: "base", weight: "bold", style: { color: (0, tone_v4_1.toneInk)(theme, 'danger') }, children: deniedLabel }), denialReason ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "onCard", children: denialReason })) : null, updated ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: `Updated ${updated}` })) : null] })] }) }) }));
    }
    /*
      `paid` completes the last stage, so the position runs one past the final
      index. Everything else sits *on* its stage. The index is derived from the
      status here rather than read off `internal/status`'s `step`, because `step`
      also has to describe `denied` — which is not a stage at all.
    */
    const index = tone_v4_1.CLAIM_STAGES.indexOf(status);
    const position = status === 'paid' ? tone_v4_1.CLAIM_STAGES.length : index < 0 ? 0 : index;
    const currentWord = labelOf(tone_v4_1.CLAIM_STAGES[Math.min(position, tone_v4_1.CLAIM_STAGES.length - 1)] ?? 'filed');
    const stateOf = (i) => i < position ? 'done' : i === position ? 'current' : 'todo';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "progressbar", accessibilityLabel: (0, tone_v4_1.spokenLine)([
            currentWord,
            ...tone_v4_1.CLAIM_STAGES.map((stage) => labelOf(stage)),
            updated ? `Updated ${updated}` : null,
        ]), accessibilityValue: {
            min: 1,
            max: tone_v4_1.CLAIM_STAGES.length,
            now: Math.min(position + 1, tone_v4_1.CLAIM_STAGES.length),
            text: currentWord,
        }, style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start' }, children: tone_v4_1.CLAIM_STAGES.map((stage, i) => {
                    const state = stateOf(i);
                    const reached = state !== 'todo';
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', width: '100%' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                            flex: 1,
                                            height: 1,
                                            backgroundColor: i === 0 ? 'transparent' : colors.border,
                                        } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                            width: tokens.spacing.lg,
                                            height: tokens.spacing.lg,
                                            borderRadius: tokens.radius.full,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderWidth: state === 'current' ? 2 : 1,
                                            borderColor: reached ? (0, tone_v4_1.toneFill)(theme, 'primary') : colors.border,
                                            backgroundColor: state === 'done' ? (0, tone_v4_1.toneFill)(theme, 'primary') : colors.card,
                                        }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "bold", style: {
                                                color: state === 'done'
                                                    ? colors.onPrimary
                                                    : state === 'current'
                                                        ? (0, tone_v4_1.toneInk)(theme, 'primary')
                                                        : colors.mutedText,
                                            }, children: STAGE_MARK[state] }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                            flex: 1,
                                            height: 1,
                                            backgroundColor: i === tone_v4_1.CLAIM_STAGES.length - 1 ? 'transparent' : colors.border,
                                        } })] }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: state === 'current' ? 'bold' : 'regular', tone: reached ? 'onCard' : 'mutedText', align: "center", numberOfLines: 2, children: labelOf(stage) })] }, stage));
                }) }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", align: "center", children: (0, tone_v4_1.metaLine)([`${meta.glyph} ${meta.label}`, updated ? `Updated ${updated}` : null]) })] }));
}
//# sourceMappingURL=ClaimStatusTrackerV4.js.map