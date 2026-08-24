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
exports.JobCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const primitives_1 = require("../primitives");
const cn_1 = require("../primitives/cn");
const types_1 = require("./types");
const SalaryRange_1 = require("./SalaryRange");
const SkillTag_1 = require("./SkillTag");
const ApplyButton_1 = require("./ApplyButton");
const format_1 = require("./format");
/** Employment type → primitive `Badge` tone (tokens only). */
const TYPE_TONE = {
    'full-time': 'primary',
    'part-time': 'neutral',
    contract: 'warn',
    remote: 'success',
};
/**
 * JobCard — design V2 (web). An elevated, shadowed card led by a big rounded
 * company-logo tile, a full-width tinted salary rail, and a wrapped skill-chip
 * shelf. Same props as {@link JobCardProps} (drop-in), same token discipline:
 * fills are token tints, depth is the shared shadow scale, the employment type
 * is a `Badge` tone plus its text label. Subtle hover lift / press settle
 * (reduced-motion aware).
 */
exports.JobCardV2 = React.forwardRef(function JobCardV2({ job, saved, onSave, applyState, onApply, onWithdraw, applyLoading, onClick, loading = false, maxSkills = 4, className, ...rest }, ref) {
    const surface = (0, cn_1.cn)('flex flex-col gap-md rounded-lg border border-border bg-surface p-lg text-on-surface shadow-md', className);
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-job-card": "loading", "aria-label": "Loading job", className: surface, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-16 w-16 animate-pulse rounded-md bg-neutral-100" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-3.5 w-[70%] animate-pulse rounded-sm bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-[45%] animate-pulse rounded-sm bg-neutral-100" })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-[55%] animate-pulse rounded-sm bg-neutral-100" })] }));
    }
    const skills = job.skills ?? [];
    const shown = skills.slice(0, Math.max(0, maxSkills));
    const overflow = skills.length - shown.length;
    const showApply = applyState != null || onApply != null;
    const posted = (0, format_1.formatRelative)(job.postedAt);
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-job-card": "v2", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${job.title} at ${job.companyName}, ${types_1.EMPLOYMENT_LABEL[job.type]}`, onClick: interactive ? () => onClick(job) : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick(job);
                }
            }
            : undefined, className: (0, cn_1.cn)(surface, interactive &&
            'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-reduce:transition-none motion-reduce:hover:transform-none'), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-md", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-primary/10", children: (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: job.companyLogoUrl, name: job.companyName, size: "lg", shape: "rounded" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 text-lg font-bold text-on-surface", children: job.title }), (0, jsx_runtime_1.jsxs)("span", { className: "truncate text-sm text-muted", children: [job.companyName, job.location ? ` · ${job.location}` : ''] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-0.5 flex flex-wrap items-center gap-sm", children: [(0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: TYPE_TONE[job.type], children: types_1.EMPLOYMENT_LABEL[job.type] }), posted ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: posted }) : null] })] }), onSave ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": saved ? 'Saved — tap to remove' : 'Save job', "aria-pressed": !!saved, onClick: (e) => {
                            e.stopPropagation();
                            onSave(job);
                        }, className: (0, cn_1.cn)('text-lg leading-none', saved ? 'text-primary' : 'text-muted'), children: saved ? '★' : '☆' })) : null] }), job.salary ? ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center rounded-md bg-primary/5 px-md py-sm", children: (0, jsx_runtime_1.jsx)(SalaryRange_1.SalaryRange, { salary: job.salary, size: "md" }) })) : null, shown.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap gap-xs", children: [shown.map((s, i) => ((0, jsx_runtime_1.jsx)(SkillTag_1.SkillTag, { label: s }, `${s}-${i}`))), overflow > 0 ? ((0, jsx_runtime_1.jsx)("span", { className: "self-start rounded-sm bg-neutral-100 px-sm py-[3px] text-xs text-on-surface", children: `+${overflow}` })) : null] })) : null, showApply ? ((0, jsx_runtime_1.jsx)(ApplyButton_1.ApplyButton, { state: applyState, loading: applyLoading, onApply: onApply ? () => onApply(job) : undefined, onWithdraw: onWithdraw ? () => onWithdraw(job) : undefined, block: true })) : null] }));
});
//# sourceMappingURL=JobCardV2.js.map