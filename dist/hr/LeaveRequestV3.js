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
exports.LeaveRequestV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/** Tone → solid dot background (token-bound, never a literal). */
const DOT_BG = {
    neutral: 'bg-neutral-200',
    primary: 'bg-primary',
    success: 'bg-success',
    warn: 'bg-warn',
    danger: 'bg-danger',
    accent: 'bg-accent',
};
/**
 * LeaveRequest, design **V3** — a dense single line for tight queues. A leading
 * tone status-dot (paired with the status word for a11y — never color alone),
 * the leave type + optional employee and date range, and the day-count pinned
 * right. Same Props as {@link LeaveRequest}; approve/deny chrome is intentionally
 * dropped in favour of a tappable, borderless divider row. Token-pure.
 */
exports.LeaveRequestV3 = React.forwardRef(function LeaveRequestV3({ type, startDate, endDate, days, status, employeeName, onClick, className, }, ref) {
    const typeMeta = internal_1.LEAVE_TYPE_META[type];
    const statusMeta = internal_1.LEAVE_STATUS_META[status];
    const range = endDate && endDate !== startDate ? `${startDate} – ${endDate}` : startDate;
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `Leave request, ${typeMeta.label}, ${statusMeta.label}` : undefined, onClick: interactive ? onClick : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.();
                }
            }
            : undefined, className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border bg-surface px-2 py-2 transition-colors motion-reduce:transition-none', interactive &&
            'cursor-pointer hover:bg-neutral-100 active:scale-[.99] motion-reduce:active:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), children: [(0, jsx_runtime_1.jsx)("span", { role: "img", "aria-label": statusMeta.label, className: (0, cn_1.cn)('h-2.5 w-2.5 shrink-0 rounded-full', DOT_BG[statusMeta.tone]) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("p", { className: "flex items-center gap-1 truncate text-sm font-semibold text-on-surface", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: typeMeta.glyph }), typeMeta.label, employeeName ? (0, jsx_runtime_1.jsxs)("span", { className: "font-normal text-muted", children: ["\u00B7 ", employeeName] }) : null] }), (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: range })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-right", children: [(0, jsx_runtime_1.jsxs)("p", { className: "text-sm font-bold text-on-surface", children: [days, "d"] }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: statusMeta.label })] })] }));
});
//# sourceMappingURL=LeaveRequestV3.js.map