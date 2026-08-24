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
exports.LeaveRequestV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * LeaveRequest, design **V2** — a card built around an explicit date-range block.
 * The range renders as two dated columns (From → To) joined by an arrow with the
 * day-count between; status is a glyph + word pill (never color alone). When
 * `actionable` and still `pending`, approve / deny buttons show; otherwise the
 * approver is named. Same Props as {@link LeaveRequest}. Elevated with a subtle
 * hover lift; token-pure (no literals).
 */
exports.LeaveRequestV2 = React.forwardRef(function LeaveRequestV2({ type, startDate, endDate, days, status, employeeName, employeeAvatarUrl, approver, reason, actionable = false, onApprove, onDeny, onClick, className, }, ref) {
    const typeMeta = internal_1.LEAVE_TYPE_META[type];
    const statusMeta = internal_1.LEAVE_STATUS_META[status];
    const showActions = actionable && status === 'pending';
    const hasEnd = !!endDate && endDate !== startDate;
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, variant: "elevated", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `Leave request, ${typeMeta.label}, ${statusMeta.label}` : undefined, onClick: interactive ? onClick : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.();
                }
            }
            : undefined, className: (0, cn_1.cn)('flex flex-col gap-3 transition duration-200 motion-reduce:transition-none', interactive &&
            'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] motion-reduce:hover:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 items-center gap-3", children: [employeeName ? (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "sm", name: employeeName, src: employeeAvatarUrl }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [employeeName ? ((0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-on-surface", children: employeeName })) : null, (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1 text-sm font-semibold text-muted", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: typeMeta.glyph }), typeMeta.label] })] })] }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: statusMeta, size: "sm" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-3 rounded-md bg-primary/5 p-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: "From" }), (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-bold text-on-surface", children: startDate })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-base text-primary", children: "\u2192" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-semibold text-muted", children: [days, " day", days === 1 ? '' : 's'] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1 text-right", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: "To" }), (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-bold text-on-surface", children: hasEnd ? endDate : startDate })] })] }), reason ? (0, jsx_runtime_1.jsx)("p", { className: "line-clamp-2 text-xs text-muted", children: reason }) : null, showActions ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [(0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "primary", className: "flex-1", onClick: (e) => {
                            e.stopPropagation();
                            onApprove?.();
                        }, children: "Approve" }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "danger", className: "flex-1", onClick: (e) => {
                            e.stopPropagation();
                            onDeny?.();
                        }, children: "Deny" })] })) : approver && (status === 'approved' || status === 'denied') ? ((0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted", children: [status === 'approved' ? 'Approved' : 'Denied', " by ", approver] })) : null] }));
});
//# sourceMappingURL=LeaveRequestV2.js.map