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
exports.JobCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const primitives_1 = require("../primitives");
const cn_1 = require("../primitives/cn");
const types_1 = require("./types");
const SalaryRange_1 = require("./SalaryRange");
const SkillTag_1 = require("./SkillTag");
const ApplyButton_1 = require("./ApplyButton");
const format_1 = require("./format");
/** Employment type → a token accent-bar class for the left rail (tokens only). */
const TYPE_ACCENT = {
    'full-time': 'bg-primary',
    'part-time': 'bg-accent',
    contract: 'bg-warn',
    remote: 'bg-success',
};
/**
 * JobCard — design V3 (web). A minimal, borderless line item: a thin colored
 * accent rail on the left keyed to the employment type, then the title, a single
 * inline `company · location · type · posted` meta line, salary, and a tight
 * skill row. Separation comes from spacing, not a box. Same props as
 * {@link JobCardProps} (drop-in). Token-pure — the accent is a semantic fill.
 */
exports.JobCardV3 = React.forwardRef(function JobCardV3({ job, saved, onSave, applyState, onApply, onWithdraw, applyLoading, onClick, loading = false, maxSkills = 3, className, ...rest }, ref) {
    const wrap = (0, cn_1.cn)('flex gap-md py-md', className);
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-job-card": "loading", "aria-label": "Loading job", className: wrap, ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "w-1 shrink-0 rounded-full bg-neutral-100" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-3.5 w-[70%] animate-pulse rounded-sm bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-[45%] animate-pulse rounded-sm bg-neutral-100" })] })] }));
    }
    const skills = job.skills ?? [];
    const shown = skills.slice(0, Math.max(0, maxSkills));
    const overflow = skills.length - shown.length;
    const showApply = applyState != null || onApply != null;
    const posted = (0, format_1.formatRelative)(job.postedAt);
    const accent = TYPE_ACCENT[job.type] ?? 'bg-primary';
    const meta = [job.companyName, job.location, types_1.EMPLOYMENT_LABEL[job.type], posted]
        .filter(Boolean)
        .join(' · ');
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-job-card": "v3", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${job.title} at ${job.companyName}, ${types_1.EMPLOYMENT_LABEL[job.type]}`, onClick: interactive ? () => onClick(job) : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick(job);
                }
            }
            : undefined, className: (0, cn_1.cn)(wrap, interactive &&
            'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('w-1 shrink-0 self-stretch rounded-full', accent) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-sm", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: job.companyLogoUrl, name: job.companyName, size: "xs", shape: "rounded" }), (0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 flex-1 text-base font-semibold text-on-surface", children: job.title }), onSave ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": saved ? 'Saved — tap to remove' : 'Save job', "aria-pressed": !!saved, onClick: (e) => {
                                    e.stopPropagation();
                                    onSave(job);
                                }, className: (0, cn_1.cn)('text-base leading-none', saved ? 'text-primary' : 'text-muted'), children: saved ? '★' : '☆' })) : null] }), meta ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: meta }) : null, job.salary ? (0, jsx_runtime_1.jsx)(SalaryRange_1.SalaryRange, { salary: job.salary, size: "sm" }) : null, shown.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-xs", children: [shown.map((s, i) => ((0, jsx_runtime_1.jsx)(SkillTag_1.SkillTag, { label: s }, `${s}-${i}`))), overflow > 0 ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: `+${overflow}` }) : null] })) : null, showApply ? ((0, jsx_runtime_1.jsx)(ApplyButton_1.ApplyButton, { state: applyState, loading: applyLoading, size: "sm", onApply: onApply ? () => onApply(job) : undefined, onWithdraw: onWithdraw ? () => onWithdraw(job) : undefined })) : null] })] }));
});
//# sourceMappingURL=JobCardV3.js.map