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
exports.ScheduleRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const STATUS_LABEL = {
    scheduled: '',
    live: 'Live now',
    ended: 'Ended',
    cancelled: 'Cancelled',
};
/** Token text-color class for each status caption. */
const STATUS_TONE = {
    scheduled: 'text-muted',
    live: 'text-success',
    ended: 'text-muted',
    cancelled: 'text-danger',
};
/**
 * A single row of a day schedule — a time gutter, an accent track rail, and the
 * title/room details, with an optional status caption. Designed to stack into a
 * printed-timetable feel. The status is always spelled out in words (never
 * color alone). Passing `onClick` makes the row an accessible button. Colors
 * come from the `--xen-*` tokens; no literal colors.
 */
exports.ScheduleRow = React.forwardRef(function ScheduleRow({ time, endTime, title, room, track, status = 'scheduled', onClick, onKeyDown, className, ...rest }, ref) {
    const statusLabel = STATUS_LABEL[status];
    const isCancelled = status === 'cancelled';
    const clickable = typeof onClick === 'function';
    const handleKeyDown = (e) => {
        onKeyDown?.(e);
        if (clickable && (e.key === 'Enter' || e.key === ' ') && !e.defaultPrevented) {
            e.preventDefault();
            e.currentTarget.click();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-row items-stretch gap-md py-sm', clickable && 'cursor-pointer rounded-md transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), onClick: onClick, onKeyDown: clickable ? handleKeyDown : onKeyDown, role: clickable ? 'button' : undefined, tabIndex: clickable ? 0 : undefined, "aria-label": clickable ? `${time} ${title}` : undefined, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex w-16 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-surface", children: time }), endTime ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: endTime }) : null] }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('w-[3px] shrink-0 rounded-full', track ? 'bg-primary' : 'bg-border') }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-base font-semibold text-on-surface', isCancelled && 'line-through'), children: title }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row flex-wrap items-center gap-sm", children: [track ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-primary", children: track }) : null, room ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: room }) : null, statusLabel ? (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-bold', STATUS_TONE[status]), children: statusLabel }) : null] })] })] }));
});
//# sourceMappingURL=ScheduleRow.js.map