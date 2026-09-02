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
exports.JobCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const cn_1 = require("../primitives/cn");
const v4_state_1 = require("../primitives/internal/v4-state");
const types_1 = require("./types");
const ApplyButtonV4_1 = require("./ApplyButtonV4");
const SalaryRangeV4_1 = require("./SalaryRangeV4");
const SkillTagV4_1 = require("./SkillTagV4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 job card** — same props as {@link JobCard} plus `saveLabel`,
 * `savedLabel`, `formatRelative` and `overflowLabel`.
 *
 * ## Six changes
 *
 * 1. **The save star works from the keyboard.** It was a `<button>` *inside* a
 *    `<div role="button">` that carried its own Enter/Space handler. The
 *    star's click was guarded with `stopPropagation`; its keydown was not — so
 *    the card caught the bubbled key, called `preventDefault()`, which cancels
 *    the star's own activation (Enter's default action on a button **is** that
 *    click, and Space fires on keyup, already cancelled), and opened the job
 *    detail instead. A keyboard user pressing Enter on "Save job" saved
 *    nothing and navigated away. The card is now a plain container, the
 *    activation is a real `<button>` around the logo and the title, and the
 *    star, the chips and the Apply CTA are its **siblings** — the whole class
 *    of bug goes away rather than being guarded against.
 * 2. **The card is one accessible name.** ARIA forbids naming a `generic`
 *    element, and it forbids interactive content inside `role="button"`; the
 *    base did both, so on Chrome and Firefox the card announced its children
 *    as a scatter of stops with the title's own label discarded. The
 *    activation now carries title, company, location, arrangement, pay,
 *    posted age and skills as one sentence.
 * 3. **`maxSkills={0}` no longer swallows the skills entirely.** Six skills
 *    with a cap of zero rendered no chips *and* no "+6", because the overflow
 *    chip was inside the `shown.length > 0` branch — so the cap that most
 *    obviously means "collapse them all" was the one case that lost the
 *    count.
 * 4. **Employment type stops spending a status colour.** `contract → warn` and
 *    `remote → success` said a contract role is a warning and a remote one is
 *    good news. They are two of four arrangements — identity — and the word
 *    already distinguishes them.
 * 5. **The posted age stops rounding up.** `formatRelative` rounded, so a job
 *    posted 25 days ago read "1mo ago" and one posted 90 minutes ago read "2h
 *    ago". Elapsed time has passed or it has not.
 * 6. **The skeleton and the press feedback stop inverting.** The placeholders
 *    were `bg-neutral-100`, a ramp step that mirrors under a dark seed into a
 *    near-white slab; press was `hover:opacity-95`, which fades the card's
 *    content — the signal M3 spends on *disabled*.
 */
exports.JobCardV4 = React.forwardRef(function JobCardV4({ job, saved, onSave, applyState, onApply, onWithdraw, applyLoading, onClick, loading = false, maxSkills = 4, saveLabel = 'Save job', savedLabel = 'Saved — tap to remove', formatRelative, overflowLabel, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    const surface = (0, cn_1.cn)('flex flex-col gap-md rounded-[var(--xen-radius-lg)] border border-border', 'bg-card p-lg text-on-card', className);
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-v4-job-card": "loading", role: "status", "aria-live": "polite", "aria-label": "Loading job", className: surface, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-xl w-xl shrink-0 rounded-[var(--xen-radius-md)]', tone_v4_1.PLACEHOLDER_CLASS) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-md w-[70%]', tone_v4_1.PLACEHOLDER_CLASS) }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-sm w-[45%]', tone_v4_1.PLACEHOLDER_CLASS) })] })] }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-sm w-[55%]', tone_v4_1.PLACEHOLDER_CLASS) })] }));
    }
    const skills = job.skills ?? [];
    const shown = skills.slice(0, Math.max(0, Math.floor(maxSkills)));
    const overflow = skills.length - shown.length;
    const overflowText = (overflowLabel ?? ((n) => `+${n}`))(overflow);
    const showApply = applyState != null || onApply != null;
    const posted = (0, tone_v4_1.relativeLabel)(job.postedAt, formatRelative);
    const typeLabel = types_1.EMPLOYMENT_LABEL[job.type];
    const pay = (0, tone_v4_1.salaryLabelV4)(job.salary).text;
    const name = (0, tone_v4_1.spokenLine)([
        job.title,
        job.companyName,
        job.location,
        typeLabel,
        pay,
        posted,
        ...shown,
        overflow > 0 ? overflowText : undefined,
        saved ? savedLabel : undefined,
    ]);
    const summary = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: job.companyLogoUrl, name: job.companyName, size: "md", alt: "" }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs text-left", children: [(0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 text-base font-semibold text-on-card", children: job.title }), (0, jsx_runtime_1.jsxs)("span", { className: "truncate text-sm text-muted-text", children: [job.companyName, job.location ? ` · ${job.location}` : ''] })] })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-v4-job-card": "", className: surface, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-md", children: [onClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": name, onClick: () => onClick(job), "data-xen-v4-state": "", style: (0, tone_v4_1.cardStateVars)(), className: (0, cn_1.cn)('flex min-w-0 flex-1 items-start gap-md rounded-[var(--xen-radius-md)] text-left', tone_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: summary })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-1 items-start gap-md", children: summary })), onSave ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": saved ? savedLabel : saveLabel, "aria-pressed": !!saved, onClick: () => onSave(job), "data-xen-v4-state": "", style: (0, tone_v4_1.cardStateVars)(), className: (0, cn_1.cn)('flex shrink-0 items-center justify-center rounded-[var(--xen-radius-full)]', 'text-lg leading-none', saved ? 'text-primary-text' : 'text-muted-text', tone_v4_1.MIN_TAP_SQUARE_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: saved ? '★' : '☆' }) })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-sm", children: [(0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: tone_v4_1.EMPLOYMENT_TONE_V4[job.type], children: typeLabel }), posted ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: posted }) : null] }), job.salary ? (0, jsx_runtime_1.jsx)(SalaryRangeV4_1.SalaryRangeV4, { salary: job.salary, size: "sm" }) : null, shown.length > 0 || overflow > 0 ? ((0, jsx_runtime_1.jsxs)("div", { "aria-hidden": "true", className: "flex flex-wrap gap-xs", children: [shown.map((s, i) => ((0, jsx_runtime_1.jsx)(SkillTagV4_1.SkillTagV4, { label: s }, `${s}-${i}`))), overflow > 0 ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-flex items-center self-start rounded-[var(--xen-radius-sm)]', 'border border-border bg-card px-sm py-xs text-xs font-medium text-on-card'), children: overflowText })) : null] })) : null, showApply ? ((0, jsx_runtime_1.jsx)(ApplyButtonV4_1.ApplyButtonV4, { state: applyState, loading: applyLoading, onApply: onApply ? () => onApply(job) : undefined, onWithdraw: onWithdraw ? () => onWithdraw(job) : undefined, block: true })) : null] }));
});
//# sourceMappingURL=JobCardV4.js.map