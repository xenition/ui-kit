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
exports.StatusPipelineV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const BadgeV4_1 = require("../primitives/BadgeV4");
const StepsV4_1 = require("../primitives/StepsV4");
const cn_1 = require("../primitives/cn");
const types_1 = require("./types");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 status pipeline** — same props as {@link StatusPipeline} plus
 * `stageLabels`, `formatPosition` and `unknownStageLabel`.
 *
 * ## Five changes
 *
 * 1. **The stage was announced nowhere.** `compact` — the variant every
 *    `ApplicationRow` in the module renders — hung its entire accessible name
 *    off `role="text"`. That is not an ARIA role; it is a WebKit extension,
 *    and Chrome and Firefox drop it *and* the `aria-label` with it. The `full`
 *    variant was no better: it put `aria-label` on a bare `<div>`, and ARIA
 *    forbids naming a `generic` element. Where an application actually sits —
 *    the reason the component exists — reached nobody. It is now ordinary
 *    visible text in `compact`, and a named `role="group"` around the step
 *    track in `full`.
 * 2. **An unknown stage is admitted rather than guessed at.** The base's
 *    `Math.max(0, indexOf(stage))` turned "not found" into the first stage, so
 *    a withdrawn or archived application announced "Stage 1 of 5: Applied"
 *    with total confidence — and the two twins picked *different* fallback
 *    words for the same input. `stageParts` reports the miss; this says
 *    `unknownStageLabel` and draws an empty track, which is the honest picture
 *    of not knowing.
 * 3. **The current step carries `aria-current="step"`,** through `StepsV4`, so
 *    "where am I" is a state a reader can query and not a fill colour.
 * 4. **The position is drawn as well as spoken.** `full` showed five markers
 *    and left the reader to count them; the `n of m` line is now beside the
 *    track in both variants.
 * 5. **Status words stop being inked with fill tokens.** `text-danger` and
 *    `text-muted` are the fill slots — the compiler guarantees contrast for
 *    `on-danger` against `danger`, and nothing at all for `muted`. The
 *    rejection line and the position take `danger-text` and `muted-text`.
 */
exports.StatusPipelineV4 = React.forwardRef(function StatusPipelineV4({ stage, rejected = false, variant = 'full', stageLabels, formatPosition, unknownStageLabel = 'Stage unknown', className, ...rest }, ref) {
    const parts = (0, tone_v4_1.stageSummaryV4)(stage, {
        stageLabels,
        formatPosition,
        unknownStageLabel,
        rejected,
    });
    if (variant === 'compact') {
        // Rejection is a genuine status and keeps `danger`; `hired` is the good
        // terminal state; an unknown stage is not a status at all, so it stays
        // neutral rather than borrowing one.
        const tone = rejected
            ? 'danger'
            : !parts.known
                ? 'neutral'
                : stage === 'hired'
                    ? 'success'
                    : 'primary';
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-v4-status-pipeline": "compact", className: (0, cn_1.cn)('inline-flex items-center gap-sm', className), ...rest, children: [(0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: tone, "aria-current": parts.known && !rejected ? 'step' : undefined, children: rejected ? `${parts.label} · Rejected` : parts.label }), parts.position ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs text-muted-text', tone_v4_1.TABULAR_CLASS), children: parts.position })) : null] }));
    }
    return (
    // `role="group"` and not a bare `div`: a group is one of the few roles
    // ARIA allows an author to name, which is exactly what the base was
    // trying and failing to do with a label on a `generic`.
    (0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-v4-status-pipeline": "full", role: "group", "aria-label": parts.summary, className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [(0, jsx_runtime_1.jsx)(StepsV4_1.StepsV4, { steps: types_1.APPLICATION_STAGES.map((s) => ({ title: stageLabels?.[s] ?? types_1.STAGE_LABEL[s] })), current: parts.known ? parts.index : -1 }), parts.position ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs text-muted-text', tone_v4_1.TABULAR_CLASS), children: parts.position })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-warn-text", children: unknownStageLabel })), rejected ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-semibold text-danger-text", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u2715 " }), `Rejected at ${parts.label}`] })) : null] }));
});
//# sourceMappingURL=StatusPipelineV4.js.map