"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusPipelineV4 = StatusPipelineV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const StepsV4_1 = require("../primitives/StepsV4");
const TextV4_1 = require("../primitives/TextV4");
const hiring_v4_1 = require("../../jobs/hiring-v4");
const types_1 = require("./types");
const tone_v4_1 = require("./internal/tone-v4");
/** Called out as text, never as a hue alone. */
const REJECTED = 'Rejected';
/**
 * **V4 status pipeline** — same props as {@link StatusPipeline} plus
 * `stageLabels`, `formatPosition` and `unknownStageLabel`.
 *
 * ## Four changes
 *
 * 1. **The stage is spoken.** The base put its summary on a `View` that was
 *    never `accessible` (and, on the web twin, on `role="text"` — not an ARIA
 *    role at all). So `<ApplicationRow application={{stage:'interview'}} />`
 *    announced the job title and nothing else: where the application actually
 *    stands, the entire reason the row exists, was silent on both platforms.
 * 2. **An unknown stage is admitted, not invented.** `Math.max(0,
 *    indexOf(stage))` turned "not found" into the first stage, so a withdrawn
 *    application announced "Stage 1 of 5: Applied" with total confidence.
 *    `stageParts` reports the miss; the track then draws no current marker and
 *    the name says `unknownStageLabel` instead of a position it does not know.
 * 3. **The two twins stopped disagreeing.** For an unrecognised stage the base
 *    fell back to the label `'Applied'` on web and to the raw union member
 *    `'applied'` on native — the same input, two different sentences, one of
 *    them an internal identifier read out loud. Neither survives: an unknown
 *    stage is named by `unknownStageLabel` on both twins.
 * 4. **The position is a real value, not a caption.** The track is a drawn
 *    progress indicator, so it carries `accessibilityRole="progressbar"` with
 *    an `accessibilityValue` — which is what lets a reader say "3 of 5"
 *    without the user having to parse a row of circles.
 *
 * Colour still means status here and only here: `danger` for a rejection,
 * `success` for hired, `primary` for in-flight. The employment *type* tinting
 * this module also carried — `contract → warn`, `remote → success` — was
 * identity wearing a status colour, and is gone from `JobCardV4` and
 * `SavedJobRowV4`.
 */
function StatusPipelineV4({ stage, rejected = false, variant = 'full', stageLabels, formatPosition = (index, total) => `Stage ${index + 1} of ${total}`, unknownStageLabel = 'Stage unknown', style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const { index, total, known } = (0, hiring_v4_1.stageParts)(stage, types_1.APPLICATION_STAGES);
    const label = known ? (stageLabels?.[stage] ?? types_1.STAGE_LABEL[stage]) : unknownStageLabel;
    const position = known ? formatPosition(index, total) : unknownStageLabel;
    const summary = rejected
        ? (0, tone_v4_1.spokenName)([REJECTED, position, label])
        : (0, tone_v4_1.spokenName)([position, label]);
    // Only claim a value when there is one. A progressbar reporting `now: 1` for
    // a stage nobody recognised is the same lie the base told in words.
    const progress = {
        accessibilityRole: 'progressbar',
        accessibilityValue: known
            ? { min: 1, max: total, now: index + 1, text: summary }
            : { text: summary },
    };
    if (variant === 'compact') {
        const tone = rejected ? 'danger' : stage === 'hired' ? 'success' : 'primary';
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: summary, ...progress, style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: known ? tone : 'neutral', size: "sm", children: rejected ? `${label} · ${REJECTED}` : label }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: position })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: summary, ...progress, style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(StepsV4_1.StepsV4, { steps: types_1.APPLICATION_STAGES.map((s) => ({ title: stageLabels?.[s] ?? types_1.STAGE_LABEL[s] })), 
                // `-1` marks nothing done and nothing current, which is the honest
                // drawing of "we do not know where this is".
                current: known ? index : -1 }), rejected ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "dangerText", children: `✕ ${REJECTED} at ${label}` })) : null] }));
}
//# sourceMappingURL=StatusPipelineV4.js.map