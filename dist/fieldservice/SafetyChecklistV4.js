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
exports.SafetyChecklistV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const AlertV4_1 = require("../primitives/AlertV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CardV4_1 = require("../primitives/CardV4");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const IconV4_1 = require("../primitives/IconV4");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const job_v4_1 = require("./internal/job-v4");
/** Verdict → glyph, tone and word. `unchecked` is an absence, so it is `muted`. */
const VERDICT_V4 = {
    pass: { glyph: '✓', tone: 'success', label: 'Pass' },
    fail: { glyph: '✕', tone: 'danger', label: 'Fail' },
    unchecked: { glyph: '○', tone: 'muted', label: 'Unchecked' },
};
/**
 * **V4 safety checklist** — the web twin of the native `SafetyChecklistV4`,
 * same props as {@link SafetyChecklist} plus `confirmHazardLabel`,
 * `verdictLabels`, `hazardLabel` and `formatHazardCount`.
 *
 * ## Five changes
 *
 * 1. **A glove brushing the screen no longer certifies a site as safe.** A
 *    failing fall-protection anchor showed a red "Hazard — do not proceed"
 *    banner over a 40px row, tapped one-handed and outdoors. One tap moved the
 *    row `fail → unchecked`, which dropped it out of the hazard count,
 *    unmounted the banner and flipped the header to "All clear" — with no
 *    confirmation, no undo, and no prop through which a caller could ask for
 *    either. `clearsHazard()` names that one transition: the first press arms
 *    the row and says so, in the accessible name *and* on screen, and only the
 *    second press calls `onToggle`. Every other transition is unchanged and
 *    immediate, because passing is the ordinary case and making it cost two
 *    taps would be a worse component rather than a safer one.
 * 2. **The row's name says what pressing will do**, and carries the hazard
 *    flag. `` `${label}, ${verdict}` `` replaced the subtree, so the one word
 *    that decides whether a technician walks onto the site — "Hazard" — was
 *    the word the label dropped.
 * 3. **The verdict is announced once.** The glyph disc had an accessible label
 *    of its own, so a reader said "Fail" from the disc and "Fail" again from
 *    the row.
 * 4. **A checklist with no handler is not a wall of live buttons.** Without
 *    `onToggle` every row was a fully controlled control that could be pressed
 *    forever and never change; the rows are now plain text.
 * 5. **Rows clear 44 and answer with a state layer**, not `hover:opacity-80` —
 *    a dimmed row reads as an unavailable one.
 */
exports.SafetyChecklistV4 = React.forwardRef(function SafetyChecklistV4({ title, items, onToggle, loading = false, emptyLabel = 'No safety items', confirmHazardLabel = (label) => `Confirm clearing hazard: ${label}`, verdictLabels, hazardLabel = 'Hazard', formatHazardCount = (count) => `${count} blocking safety ${count === 1 ? 'item is' : 'items are'} failing.`, className, style, }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const [armedId, setArmedId] = React.useState(null);
    const list = Array.isArray(items) ? items : [];
    const hazards = (0, job_v4_1.hazardCount)(list);
    const failCount = list.filter((item) => item.verdict === 'fail').length;
    const interactive = onToggle != null;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, className: className, style: style, children: (0, jsx_runtime_1.jsxs)("div", { role: "status", "aria-label": "Loading safety checklist", className: "flex flex-col gap-md", children: [(0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "text", width: "50%" }), (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "text", lines: 3 })] }) }));
    }
    if (list.length === 0) {
        return ((0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { ref: ref, title: emptyLabel, description: "Safety checkpoints will appear here.", className: className, style: style }));
    }
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, className: className, style: style, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-md", children: [title != null ? ((0, jsx_runtime_1.jsx)("span", { className: "font-heading text-base font-bold text-on-card", children: title })) : ((0, jsx_runtime_1.jsx)("span", {})), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: failCount > 0 ? 'danger' : 'success', ...job_v4_1.BADGE_V4, children: failCount > 0 ? `✕ ${failCount} failing` : '✓ All clear' })] }), hazards > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-md", children: (0, jsx_runtime_1.jsx)(AlertV4_1.AlertV4, { tone: "danger", title: "Hazard \u2014 do not proceed", children: formatHazardCount(hazards) }) })) : null, (0, jsx_runtime_1.jsx)("div", { className: "mt-md flex flex-col gap-xs", children: list.map((item) => {
                    const vd = VERDICT_V4[item.verdict] ?? VERDICT_V4.unchecked;
                    const word = verdictLabels?.[item.verdict] ?? vd.label;
                    const next = (0, job_v4_1.nextVerdict)(item.verdict);
                    const nextWord = verdictLabels?.[next] ?? VERDICT_V4[next].label;
                    const armed = armedId === item.id;
                    const guarded = (0, job_v4_1.clearsHazard)(item, next);
                    // The trailing fragment is the verdict the press moves to — the
                    // thing the base's `label, verdict` name never said.
                    const name = armed
                        ? confirmHazardLabel(item.label)
                        : (0, job_v4_1.spokenLine)([item.label, word, item.hazard ? hazardLabel : null, nextWord]);
                    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "flex h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] shrink-0 items-center justify-center rounded-[var(--xen-radius-full)]", style: { background: (0, job_v4_1.discGround)(vd.tone) }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: vd.glyph, size: "sm", className: (0, job_v4_1.discInkClass)(vd.tone) }) }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium text-on-card", children: item.label }), armed ? (
                                    // The confirmation is on the screen too, not carried by the
                                    // accessible name alone.
                                    (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-warn-text", children: confirmHazardLabel(item.label) })) : null] }), item.hazard ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "danger", ...job_v4_1.BADGE_V4, children: `⚠ ${hazardLabel}` })) : null, (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: vd.tone, ...job_v4_1.BADGE_V4, children: word })] }));
                    if (!interactive) {
                        return ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex items-center gap-md py-xs', chrome_v4_1.MIN_TAP_CLASS), children: body }, item.id));
                    }
                    return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": name, onClick: () => {
                            if (guarded && !armed) {
                                setArmedId(item.id);
                                return;
                            }
                            setArmedId(null);
                            onToggle?.(item.id, next);
                        }, 
                        // Walking away disarms, so a checklist left open never sits one
                        // stray press from clearing the banner.
                        onBlur: () => setArmedId((current) => (current === item.id ? null : current)), "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)'), className: (0, cn_1.cn)('flex items-center gap-md rounded-[var(--xen-radius-md)] px-xs py-xs text-left', chrome_v4_1.MIN_TAP_CLASS), children: body }, item.id));
                }) })] }));
});
//# sourceMappingURL=SafetyChecklistV4.js.map