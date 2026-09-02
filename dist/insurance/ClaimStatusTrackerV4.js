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
exports.ClaimStatusTrackerV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const status_1 = require("./internal/status");
const coverage_v4_1 = require("./coverage-v4");
const tone_v4_1 = require("./internal/tone-v4");
const STAGE_ORDER = ['filed', 'review', 'approved', 'paid'];
const STAGE_DEFAULT_LABEL = {
    filed: 'Filed',
    review: 'In review',
    approved: 'Approved',
    paid: 'Paid',
};
/**
 * The word each stage's position gets, so the position is never carried by a
 * ring alone.
 */
const STAGE_STATE_LABEL = {
    done: 'Completed',
    current: 'Current stage',
    upcoming: 'Not started',
};
/**
 * **V4 claim status tracker** — same props as {@link ClaimStatusTracker} plus
 * `denialReason`, `stageLabels` and `deniedLabel`.
 *
 * ## Four changes
 *
 * 1. **It no longer invents a denial reason.** The base hard-coded *"Reviewed
 *    after filing. Contact your agent to appeal."* as the body of the denial
 *    banner, and its props carried only `status` and `updated`. A claim denied
 *    because the damage predates policy inception, or because the vehicle was
 *    not on the policy, or because the deductible exceeds the loss, rendered
 *    that same sentence — the screen asserted a reason the caller never
 *    supplied and had no way to correct. The reason is now `denialReason`, and
 *    when the caller has none the banner says the claim was denied and stops,
 *    which is the truth.
 * 2. **The stages are real, ordered, announced positions.** The base delegated
 *    to the `Steps` primitive, which has no accessibility at all — no
 *    `aria-current="step"`, and an active step and a future step are both an
 *    outlined circle with the same numeral, so the only thing distinguishing
 *    "you are here" from "this has not happened" was a border colour. The
 *    tracker draws its own ordered list, marks the current stage with
 *    `aria-current="step"`, and gives every stage a word — Completed, Current
 *    stage, Not started — so the position survives greyscale, and survives a
 *    reader that ignores `aria-current`.
 * 3. **The denial is announced, once, as an alert.** It is the one genuinely
 *    urgent thing in the module: a decision the claimant has a deadline to
 *    appeal. The banner's heading is a real heading rather than a `<p>`, and
 *    the `aria-label` that used to replace the banner's contents — deleting
 *    the sentence under it — is gone.
 * 4. **Every stage word is a prop**, and the banner is a tinted ground mixed
 *    from the tone rather than `bg-danger/10` over `border-danger`, so it
 *    follows `[data-theme]` instead of being a pale plate on a dark page.
 */
exports.ClaimStatusTrackerV4 = React.forwardRef(function ClaimStatusTrackerV4({ status, updated, denialReason, stageLabels, deniedLabel = 'Claim denied', className, ...rest }, ref) {
    const sd = (0, status_1.claimStatus)(status);
    const labelFor = (stage) => stageLabels?.[stage] ?? STAGE_DEFAULT_LABEL[stage];
    if ((0, coverage_v4_1.isAdverse)(status)) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { role: "alert", className: "flex items-start gap-sm rounded-[var(--xen-radius-md)] border border-danger px-md py-sm", style: (0, tone_v4_1.toneGroundStyle)('danger'), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-base', (0, tone_v4_1.toneInkClass)('danger')), children: sd.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-base font-bold text-danger-text", children: deniedLabel }), denialReason != null && denialReason !== '' ? ((0, jsx_runtime_1.jsx)("p", { className: "text-xs text-on-card", children: denialReason })) : null] })] }), updated != null ? (0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted-text", children: ["Updated ", updated] }) : null] }));
    }
    // `paid` completes the final stage, so the cursor sits one past the end.
    const currentIndex = status === 'paid' ? STAGE_ORDER.length : sd.step;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [(0, jsx_runtime_1.jsx)("ol", { "aria-label": (0, tone_v4_1.spokenLine)([
                    'Claim progress',
                    sd.label,
                    updated != null ? `Updated ${updated}` : undefined,
                ]), className: "flex items-start gap-xs", children: STAGE_ORDER.map((stage, index) => {
                    const done = index < currentIndex;
                    const current = index === currentIndex;
                    const state = done ? 'done' : current ? 'current' : 'upcoming';
                    return ((0, jsx_runtime_1.jsxs)("li", { "aria-current": current ? 'step' : undefined, className: "flex min-w-0 flex-1 flex-col items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-lg w-lg items-center justify-center rounded-[var(--xen-radius-full)] text-xs font-bold', done || current
                                    ? 'bg-primary text-on-primary'
                                    : (0, cn_1.cn)('border border-border', (0, tone_v4_1.toneInkClass)('muted'))), children: done ? '✓' : index + 1 }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('w-full truncate text-center text-xs', current ? 'font-semibold text-on-card' : 'text-muted-text'), children: labelFor(stage) }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: STAGE_STATE_LABEL[state] })] }, stage));
                }) }), (0, jsx_runtime_1.jsxs)("p", { className: "text-center text-xs text-muted-text", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: sd.glyph }), " ", sd.label, updated != null ? ` · Updated ${updated}` : ''] })] }));
});
//# sourceMappingURL=ClaimStatusTrackerV4.js.map