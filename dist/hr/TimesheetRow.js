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
exports.TimesheetRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * One timesheet entry: date, hours worked (formatted `Hh Mm`), optional clock
 * in/out and project, plus an approval-status pill (glyph + word, never color
 * alone). Overtime is surfaced as a labelled word (`+Xh OT`) rather than only a
 * color. `compact` shows just date + hours + status. When `onClick` is set the
 * row becomes a keyboard-operable `role="button"`. All colors are `--xen-*`
 * token classes — no literals. `forwardRef` to the root `<div>`.
 */
exports.TimesheetRow = React.forwardRef(function TimesheetRow({ date, hours, status, clockIn, clockOut, project, overtimeHours = 0, variant = 'default', onClick, className, }, ref) {
    const compact = variant === 'compact';
    const clock = clockIn && clockOut ? `${clockIn} – ${clockOut}` : (clockIn ?? clockOut);
    const hasOvertime = Number.isFinite(overtimeHours) && overtimeHours > 0;
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `Timesheet ${date}, ${(0, internal_1.formatHours)(hours)}` : undefined, onClick: interactive ? onClick : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.();
                }
            }
            : undefined, className: (0, cn_1.cn)('flex items-center gap-3 rounded-[var(--xen-radius-md)] border border-border bg-surface px-3 py-2', interactive && 'cursor-pointer hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: date }), !compact ? ((0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: [clock, project].filter(Boolean).join('  ·  ') || '—' })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: (0, internal_1.formatHours)(hours) }), hasOvertime ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-xs font-semibold', internal_1.TONE_TEXT_CLASS.warn), children: ["+", (0, internal_1.formatHours)(overtimeHours), " OT"] })) : null] }), status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.TIMESHEET_STATUS_META[status], size: "sm" }) : null] }));
});
//# sourceMappingURL=TimesheetRow.js.map