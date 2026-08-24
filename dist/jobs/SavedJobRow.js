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
exports.SavedJobRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const primitives_1 = require("../primitives");
const cn_1 = require("../primitives/cn");
const types_1 = require("./types");
const SalaryRange_1 = require("./SalaryRange");
const format_1 = require("./format");
const TYPE_TONE = {
    'full-time': 'primary',
    'part-time': 'neutral',
    contract: 'warn',
    remote: 'success',
};
/**
 * A compact row for the "saved jobs" list: company avatar, title, type badge +
 * salary, saved age, and a filled bookmark that removes the job when pressed.
 * Data + callbacks only; tokens only.
 */
exports.SavedJobRow = React.forwardRef(function SavedJobRow({ job, savedAt, onClick, onRemove, className, ...rest }, ref) {
    const saved = (0, format_1.formatRelative)(savedAt);
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-saved-job-row": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${job.title} at ${job.companyName}`, onClick: interactive ? () => onClick(job) : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick(job);
                }
            }
            : undefined, className: (0, cn_1.cn)('flex items-center gap-md border-b border-border bg-surface px-md py-md', interactive && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...rest, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: job.companyLogoUrl, name: job.companyName, size: "sm" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-surface", children: job.title }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-sm", children: [(0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: TYPE_TONE[job.type], children: types_1.EMPLOYMENT_LABEL[job.type] }), job.salary ? (0, jsx_runtime_1.jsx)(SalaryRange_1.SalaryRange, { salary: job.salary, size: "sm", glyph: null }) : null] }), saved ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: `Saved ${saved}` }) : null] }), onRemove ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Remove ${job.title} from saved`, "aria-pressed": true, onClick: (e) => {
                    e.stopPropagation();
                    onRemove(job);
                }, className: "text-lg leading-none text-primary", children: "\u2605" })) : null] }));
});
//# sourceMappingURL=SavedJobRow.js.map