"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SleepStagesV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const tone_v4_1 = require("./internal/tone-v4");
/** Drawn outermost-first, deepest to lightest — the order a hypnogram reads in. */
const STAGE_ORDER = ['deep', 'rem', 'light', 'awake'];
const STAGE_LABEL = {
    deep: 'Deep',
    rem: 'REM',
    light: 'Light',
    awake: 'Awake',
};
/**
 * The four fills.
 *
 * **Identity, not status**, so none of them is `success`, `warn` or `danger`:
 * REM is not a warning and being briefly awake is not an error. Two brand slots
 * plus two derived steps of the card's own ink give four fills that stay
 * distinguishable in either scheme, and every one of them is named in words in
 * the legend so the chart never rests on hue alone.
 */
const STAGE_FILL = {
    deep: 'var(--xen-primary)',
    rem: 'var(--xen-accent)',
    light: 'color-mix(in srgb, var(--xen-primary) 45%, var(--xen-card))',
    awake: 'color-mix(in srgb, var(--xen-on-card) 20%, var(--xen-card))',
};
/** `95` → `'1h 35m'`; `40` → `'40m'`. */
function defaultDuration(minutes) {
    const whole = Math.max(Math.round(minutes), 0);
    const hours = Math.floor(whole / 60);
    const rest = whole % 60;
    return hours > 0 ? `${hours}h ${rest}m` : `${rest}m`;
}
/**
 * **V4 sleep stages** — deep, REM, light and awake across one night, with a
 * legend and a single spoken sentence.
 *
 * There is no base component. This is the piece the `health` line kept needing
 * and did not have.
 *
 * ## Why it exists
 *
 * 1. **`SleepBar` collapses a whole night to one number and one adjective.**
 *    "7.5h, Good" cannot distinguish a night of unbroken deep sleep from seven
 *    and a half hours of light sleep broken eleven times, which is the
 *    difference a sleep screen exists to show.
 * 2. **A stacked band is the one chart that needs no axis.** Each stretch is
 *    drawn at its true share of the night, so the picture is the proportion —
 *    and the same proportions are printed as words and minutes in the legend,
 *    because a band of four colours with no numbers is decoration.
 * 3. **The stages take no status colour.** Being briefly awake is not an error
 *    and REM is not a warning; spending `warn` on either is what left the rest
 *    of the module unable to say when something genuinely was wrong.
 * 4. **A night with nothing in it says so.** An empty `stages` array renders a
 *    real empty state rather than a bar of width nought.
 */
exports.SleepStagesV4 = React.forwardRef(function SleepStagesV4({ stages, stageLabels, formatDuration, showLegend = true, emptyLabel = 'No sleep stages recorded', emptyDescription, label = 'Sleep stages', appearance = 'classic', className, ...rest }, ref) {
    const show = formatDuration ?? defaultDuration;
    const word = (stage) => stageLabels?.[stage] ?? STAGE_LABEL[stage];
    const drawn = stages.filter((segment) => Number.isFinite(segment.minutes) && segment.minutes > 0);
    const total = drawn.reduce((sum, segment) => sum + segment.minutes, 0);
    const shell = (0, cn_1.cn)('flex flex-col gap-sm', tone_v4_1.HEALTH_CARD_CLASS, (0, tone_v4_1.appearanceClass)(appearance), className);
    if (total <= 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: shell, ...rest, children: (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: emptyLabel, description: emptyDescription }) }));
    }
    // Totalled per stage, because a night interleaves them: five separate
    // stretches of light sleep are one fact about the night, not five.
    const totals = STAGE_ORDER.map((stage) => ({
        stage,
        minutes: drawn
            .filter((segment) => segment.stage === stage)
            .reduce((sum, segment) => sum + segment.minutes, 0),
    })).filter((entry) => entry.minutes > 0);
    const summary = (0, tone_v4_1.spokenLine)([
        label,
        show(total),
        ...totals.map((entry) => {
            const share = Math.round((entry.minutes / total) * 100);
            return `${word(entry.stage)} ${show(entry.minutes)}, ${share}%`;
        }),
    ]);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: shell, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: label }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-card", children: show(total) })] }), (0, jsx_runtime_1.jsx)("div", { role: "img", "aria-label": summary, className: "flex h-3 w-full overflow-hidden rounded-full", children: drawn.map((segment, index) => ((0, jsx_runtime_1.jsx)("span", { className: "h-full", style: {
                        width: `${(segment.minutes / total) * 100}%`,
                        backgroundColor: STAGE_FILL[segment.stage],
                    } }, index))) }), showLegend ? ((0, jsx_runtime_1.jsx)("ul", { "aria-hidden": true, className: "flex flex-wrap gap-md", children: totals.map((entry) => ((0, jsx_runtime_1.jsxs)("li", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "h-2.5 w-2.5 shrink-0 rounded-full", style: { backgroundColor: STAGE_FILL[entry.stage] } }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-on-card", children: word(entry.stage) }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: show(entry.minutes) })] }, entry.stage))) })) : null] }));
});
//# sourceMappingURL=SleepStagesV4.js.map