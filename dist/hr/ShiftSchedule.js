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
exports.ShiftSchedule = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * A shift roster for a day (or period): a header date and a list of shift rows,
 * each showing time range, role / location, assignee, and a scheduling-status
 * pill (open → warn, confirmed → success — glyph + word, never color alone).
 * Open (unassigned) shifts are tinted and labelled. Renders a token-styled
 * empty state when there are no shifts. Rows with `onSelectShift` are real
 * `<button>`s. All colors are `--xen-*` token classes — no literals. `forwardRef`
 * to the root `<div>`.
 */
exports.ShiftSchedule = React.forwardRef(function ShiftSchedule({ shifts, dateLabel, variant = 'default', onSelectShift, emptyLabel = 'No shifts scheduled', className }, ref) {
    const compact = variant === 'compact';
    if (shifts.length === 0) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: className, children: [dateLabel ? (0, jsx_runtime_1.jsx)("p", { className: "mb-3 text-sm font-bold text-on-surface", children: dateLabel }) : null, (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { title: emptyLabel, description: "Shifts you add will appear here." })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-3', className), children: [dateLabel ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm font-bold text-on-surface", children: dateLabel }) : null, (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-2", children: shifts.map((shift) => {
                    const meta = internal_1.SHIFT_STATUS_META[shift.status ?? (shift.assignee ? 'scheduled' : 'open')];
                    const isOpen = !shift.assignee;
                    const rowClasses = (0, cn_1.cn)('flex w-full items-center gap-3 rounded-[var(--xen-radius-md)] px-3 py-1.5 text-left', isOpen ? 'bg-neutral-100' : 'bg-transparent');
                    const rowInner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-24 shrink-0", children: [(0, jsx_runtime_1.jsxs)("p", { className: "text-sm font-semibold text-on-surface", children: [shift.start, "\u2013", shift.end] }), shift.role ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: shift.role }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('truncate text-sm', isOpen ? 'text-muted' : 'text-on-surface'), children: shift.assignee ?? 'Unassigned' }), !compact && shift.location ? ((0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: shift.location })) : null] }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: meta, size: "sm" })] }));
                    return onSelectShift ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Shift ${shift.start} to ${shift.end}, ${meta.label}`, onClick: () => onSelectShift(shift), className: (0, cn_1.cn)(rowClasses, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:brightness-95'), children: rowInner }, shift.id)) : ((0, jsx_runtime_1.jsx)("div", { className: rowClasses, children: rowInner }, shift.id));
                }) })] }));
});
//# sourceMappingURL=ShiftSchedule.js.map