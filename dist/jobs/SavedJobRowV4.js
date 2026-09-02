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
exports.SavedJobRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const cn_1 = require("../primitives/cn");
const row_v4_1 = require("../dashboard/internal/row-v4");
const types_1 = require("./types");
const SalaryRangeV4_1 = require("./SalaryRangeV4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 saved job row** — same props as {@link SavedJobRow} plus `removeLabel`,
 * `formatRelative` and `last`.
 *
 * ## Six changes
 *
 * 1. **The ★ removes the job from the keyboard.** It was a `<button>` inside a
 *    `<div role="button">` whose Enter/Space handler ran `preventDefault()` on
 *    the bubbled keydown — which cancels the star's own activation and fires
 *    the row instead. So a keyboard user pressing Enter on "Remove from saved"
 *    removed nothing and opened the job. The row is now a plain container with
 *    a real `<button>` activation and the ★ as its **sibling**.
 * 2. **The ★ stops claiming to be a toggle.** It hard-coded
 *    `aria-pressed={true}`, so it announced "pressed" — a state the user can
 *    never change and that is not what the control does. Removing a job from a
 *    list is an action; it now announces as one.
 * 3. **The row is one accessible name.** The base's `aria-label` sat on a
 *    `generic` element, which ARIA forbids naming, so on Chrome and Firefox
 *    nothing carried the title at all and the pay and the saved age were
 *    separate stops.
 * 4. **Employment type stops spending a status colour** — `contract → warn`,
 *    `remote → success`. An arrangement is identity.
 * 5. **The saved age stops rounding up.** 25 days saved read "1mo ago".
 * 6. **It joins the shared row family** — one height, one 44 leading slot, one
 *    state layer, one separator — with `ListRow`, `NotificationItem` and
 *    `ConversationRow`, instead of its own `border-b` and `hover:opacity-95`.
 */
exports.SavedJobRowV4 = React.forwardRef(function SavedJobRowV4({ job, savedAt, onClick, onRemove, removeLabel, formatRelative, last = false, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(row_v4_1.V4_STATE_STYLE_ID, row_v4_1.V4_STATE_CSS);
        (0, inject_1.injectStyleOnce)(row_v4_1.ROW_V4_STYLE_ID, row_v4_1.ROW_V4_CSS);
    }, []);
    const saved = (0, tone_v4_1.relativeLabel)(savedAt, formatRelative);
    const savedText = saved ? `Saved ${saved}` : undefined;
    const typeLabel = types_1.EMPLOYMENT_LABEL[job.type];
    const pay = (0, tone_v4_1.salaryLabelV4)(job.salary).text;
    const name = (0, tone_v4_1.spokenLine)([job.title, job.companyName, typeLabel, pay, savedText]);
    const summary = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_LEADING_CLASS, children: (0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: job.companyLogoUrl, name: job.companyName, size: "sm", alt: "" }) }), (0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-card", children: job.title }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: job.companyName }), savedText ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: savedText }) : null] })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-v4-saved-job-row": "", "data-xen-v4-row": "", className: (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(true), !last && (0, row_v4_1.rowEdgeClass)(), className), ...rest, children: [onClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": name, onClick: () => onClick(job), "data-xen-v4-state": "", style: (0, tone_v4_1.cardStateVars)(), className: (0, cn_1.cn)('flex min-w-0 flex-1 items-center gap-md rounded-[var(--xen-radius-md)] text-left', tone_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: summary })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-1 items-center gap-md", children: summary })), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)(row_v4_1.ROW_V4_TRAILING_CLASS, 'gap-sm'), children: [(0, jsx_runtime_1.jsxs)("span", { "aria-hidden": "true", className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: tone_v4_1.EMPLOYMENT_TONE_V4[job.type], size: "sm", children: typeLabel }), job.salary ? (0, jsx_runtime_1.jsx)(SalaryRangeV4_1.SalaryRangeV4, { salary: job.salary, size: "sm", glyph: null }) : null] }), onRemove ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": removeLabel ?? `Remove ${job.title} from saved`, onClick: () => onRemove(job), "data-xen-v4-state": "", style: (0, tone_v4_1.cardStateVars)(), className: (0, cn_1.cn)('flex shrink-0 items-center justify-center rounded-[var(--xen-radius-full)]', 'text-lg leading-none text-primary-text', tone_v4_1.MIN_TAP_SQUARE_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u2605" }) })) : null] })] }));
});
//# sourceMappingURL=SavedJobRowV4.js.map