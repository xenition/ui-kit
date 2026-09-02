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
exports.ApplicationRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const AvatarV4_1 = require("../primitives/AvatarV4");
const cn_1 = require("../primitives/cn");
const row_v4_1 = require("../dashboard/internal/row-v4");
const StatusPipelineV4_1 = require("./StatusPipelineV4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 application row** — same props as {@link ApplicationRow} plus
 * `rejectionReason`, `formatRelative` and `last`.
 *
 * ## Six changes
 *
 * 1. **The stage is announced.** This is the module's headline defect and this
 *    row is where it costs the most: the row's whole purpose is to say where
 *    an application sits, and it said it nowhere. The stage arrived through a
 *    `StatusPipeline variant="compact"`, whose only accessible name hung off
 *    `role="text"` — not an ARIA role, a WebKit extension that Chrome and
 *    Firefox drop along with the `aria-label` — and the row's own label sat on
 *    a bare `<div>`, which ARIA forbids naming. So
 *    `<ApplicationRow application={{stage:'interview'}} />` announced neither
 *    the title nor the stage. One real `<button>` now carries title, company,
 *    applied age, stage and rejection as a single sentence.
 * 2. **An unknown stage is no longer reported as stage 1.** The base's
 *    `Math.max(0, indexOf(stage))` announced "Stage 1 of 5: Applied" for a
 *    withdrawn application — the most confident possible statement of the
 *    wrong thing.
 * 3. **A rejection can say why.** See `rejectionReason`.
 * 4. **The `accessory` slot is a sibling of the activation, not a child of
 *    it.** Whatever an app puts there — a chevron, a withdraw button, a menu —
 *    was nested inside `role="button"`, which makes it invalid ARIA and, if it
 *    was interactive, loses its keyboard activation to the row's own handler.
 * 5. **The applied age stops rounding up.** 25 days ago read "1mo ago"; 90
 *    minutes read "2h ago".
 * 6. **It joins the shared row family**, so an application row and a
 *    conversation row are one height with one state layer and one separator,
 *    instead of `border-b` plus `hover:opacity-95` — which fades the row's own
 *    content, the signal M3 spends on *disabled*.
 */
exports.ApplicationRowV4 = React.forwardRef(function ApplicationRowV4({ application, onClick, accessory, rejectionReason, formatRelative, last = false, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(row_v4_1.V4_STATE_STYLE_ID, row_v4_1.V4_STATE_CSS);
        (0, inject_1.injectStyleOnce)(row_v4_1.ROW_V4_STYLE_ID, row_v4_1.ROW_V4_CSS);
    }, []);
    const rejected = !!application.rejected;
    const applied = (0, tone_v4_1.relativeLabel)(application.appliedAt, formatRelative);
    const stage = (0, tone_v4_1.stageSummaryV4)(application.stage, { rejected });
    const reason = rejected ? rejectionReason : undefined;
    const name = (0, tone_v4_1.spokenLine)([
        application.jobTitle,
        application.companyName,
        applied ? `applied ${applied}` : undefined,
        stage.summary,
        reason,
    ]);
    const summary = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_LEADING_CLASS, children: (0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { name: application.companyName, size: "sm", alt: "" }) }), (0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-baseline justify-between gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-sm font-semibold text-on-card", children: application.jobTitle }), applied ? (0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-xs text-muted-text", children: applied }) : null] }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: application.companyName })] })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-v4-application-row": "", "data-xen-v4-row": "", className: (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, 'flex-wrap', (0, row_v4_1.rowHeightClass)(true), !last && (0, row_v4_1.rowEdgeClass)(), className), ...rest, children: [onClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": name, onClick: () => onClick(application), "data-xen-v4-state": "", style: (0, tone_v4_1.cardStateVars)(), className: (0, cn_1.cn)('flex min-w-0 flex-1 items-center gap-md rounded-[var(--xen-radius-md)] text-left', tone_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: summary })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-1 items-center gap-md", children: summary })), accessory ? (0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_TRAILING_CLASS, children: accessory }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex w-full flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)(StatusPipelineV4_1.StatusPipelineV4, { stage: application.stage, rejected: rejected, variant: "compact", "aria-hidden": onClick != null || undefined }), reason ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-danger-text", children: reason })) : null] })] }));
});
//# sourceMappingURL=ApplicationRowV4.js.map