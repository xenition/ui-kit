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
exports.PermitStatusV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const StepsV4_1 = require("../primitives/StepsV4");
const v4_state_1 = require("../primitives/internal/v4-state");
const status_1 = require("./internal/status");
const civic_v4_1 = require("./internal/civic-v4");
/** Happy-path stages, in order. `denied` branches off `review`. */
const STAGES = status_1.PERMIT_STAGES.map((stage) => ({ title: status_1.PERMIT_STATUS[stage].label }));
/**
 * **V4 permit tracker** — the web twin of the native `PermitStatusV4`, same
 * props as {@link PermitStatus} plus `reason`, `statusLabel`, `formatStep` and
 * `referenceLabel`.
 *
 * ## Five changes
 *
 * 1. **The status always renders.** `<PermitStatus status="review" title="…" />`
 *    produced a card in which the words "Under review" appeared **nowhere in
 *    the DOM** — the only place they could surface was gated on `updatedDate`,
 *    an optional prop. An applicant heard the whole happy path, "1 Submitted 2
 *    Under review 3 Approved 4 Issued", with no indication which stage was
 *    theirs. `statusSentence()` renders the stage as a sentence whether or not
 *    a date was passed.
 * 2. **The tracker is `StepsV4`.** The base `Steps` conveyed position entirely
 *    by colour: the active marker and a pending one both draw a bare digit and
 *    differ only by `border-primary text-primary` against `border-border
 *    text-muted`. The V4 primitive already emits `aria-current="step"` and
 *    draws the walked rail as one continuous line, so a red-green deficient
 *    reader can see where they are.
 * 3. **A denial says why, and announces.** The base hard-coded the consolation
 *    "Review the notice and re-apply or appeal" and had no field for what the
 *    notice actually said. `reason` fills that, and the sentence reaches an
 *    assertive live region **one commit after mount** — a live region announces
 *    *changes*, so `role="alert"` on content present at first paint, which is
 *    what the base had, is silent in the ordinary case.
 * 4. **The permit number is labelled** — a reader heard "BLD-2026-0417" with no
 *    idea what it identified — and the denial headline takes the
 *    contrast-corrected `danger-text` ink rather than the `danger` **fill**
 *    drawn as words on a 12% tint of itself.
 * 5. **The dead `denied ? 1` branch is gone.** A denied permit renders the
 *    banner, never the tracker, so that index could not reach `Steps`; and the
 *    loading state draws the tracker's own shape instead of a grey slab off the
 *    neutral ramp, which mirrors under `[data-theme="dark"]`.
 */
exports.PermitStatusV4 = React.forwardRef(function PermitStatusV4({ status, permitNumber, title, updatedDate, loading = false, reason, statusLabel, formatStep, referenceLabel = 'Permit', className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const sd = (0, status_1.permitStatus)(status);
    const adverse = (0, civic_v4_1.isAdverse)(status);
    const word = statusLabel ?? sd.label;
    const reference = (0, civic_v4_1.labelledId)(referenceLabel, permitNumber);
    // Off the happy path there is no position to state, so the sentence is
    // just the word.
    const sentence = adverse
        ? word
        : (0, civic_v4_1.statusSentence)(word, sd.step, STAGES.length, formatStep);
    const announcement = (0, civic_v4_1.spokenLine)([sentence, reason]);
    // A live region reads CHANGES. Text that is already in the tree when the
    // region is created is never announced — which is exactly why the base's
    // `role="alert"` was silent in the only case that matters. Setting it in an
    // effect makes the denial arrive as a change.
    const [announced, setAnnounced] = React.useState('');
    React.useEffect(() => {
        setAnnounced(adverse && !loading ? announcement : '');
    }, [adverse, loading, announcement]);
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, variant: civic_v4_1.CARD_V4, className: className, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { role: "alert", "aria-live": "assertive", className: "sr-only", children: announced }), title != null || reference != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "mb-md flex flex-col gap-xs", children: [title != null ? ((0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-on-surface", children: title })) : null, reference != null ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted-text", children: reference }) : null] })) : null, loading ? (
            // The shape it is about to be: four markers on a rail, with their
            // captions. A centred spinner collapses the card and then jumps.
            (0, jsx_runtime_1.jsx)("div", { role: "progressbar", "aria-label": "Loading permit status", className: "flex w-full items-start gap-sm", children: STAGES.map((_, index) => ((0, jsx_runtime_1.jsxs)("span", { className: "flex flex-1 flex-col items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-xl w-xl rounded-[var(--xen-radius-full)]', civic_v4_1.PLACEHOLDER_CLASS) }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-sm w-full', civic_v4_1.PLACEHOLDER_CLASS) })] }, index))) })) : adverse ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-sm rounded-[var(--xen-radius-md)] border border-danger p-md", style: { background: (0, civic_v4_1.tintGround)('danger') }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: sd.glyph, "aria-hidden": true, className: (0, civic_v4_1.tintInkClass)('danger') }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-base font-bold', (0, civic_v4_1.tintInkClass)('danger')), children: word }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-on-surface", children: reason ?? 'Review the notice and re-apply or appeal.' })] })] })) : ((0, jsx_runtime_1.jsx)(StepsV4_1.StepsV4, { steps: STAGES, current: Math.min(sd.step, STAGES.length - 1) })), !loading ? ((0, jsx_runtime_1.jsxs)("p", { className: "mt-md text-sm font-semibold text-on-surface", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: sd.glyph }), " ", sentence, updatedDate != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "font-normal text-muted-text", children: [" \u00B7 updated ", updatedDate] })) : null] })) : null] }));
});
//# sourceMappingURL=PermitStatusV4.js.map