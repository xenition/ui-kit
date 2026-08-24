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
exports.DateNavigator = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Segmented_1 = require("../primitives/Segmented");
const VIEW_LABEL = {
    month: 'Month',
    week: 'Week',
    day: 'Day',
};
/**
 * The header control strip for any scheduling surface: prev/next chevrons
 * around a period `title`, an optional "Today" reset, and an optional
 * month/week/day `Segmented`. Purely presentational — the host owns the dates
 * and recomputes `title` on each change. Token colors only.
 */
exports.DateNavigator = React.forwardRef(function DateNavigator({ title, onPrev, onNext, onToday, view, onViewChange, views = ['month', 'week', 'day'], className, ...rest }, ref) {
    const chevron = (label, symbol, onClick) => ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": label, disabled: onClick == null, onClick: onClick, className: "flex h-8 w-8 items-center justify-center rounded-[var(--xen-radius-sm)] border border-border text-lg text-on-surface transition-opacity enabled:hover:opacity-70 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: symbol }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "toolbar", className: (0, cn_1.cn)('flex items-center justify-between gap-2', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-shrink items-center gap-1", children: [chevron('Previous', '‹', onPrev), chevron('Next', '›', onNext), (0, jsx_runtime_1.jsx)("span", { className: "ml-1 truncate text-lg font-bold text-on-surface", children: title })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [onToday ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Go to today", onClick: onToday, className: "rounded-[var(--xen-radius-sm)] border border-border px-2 py-1 text-sm font-semibold text-primary transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: "Today" })) : null, view != null && onViewChange != null ? ((0, jsx_runtime_1.jsx)(Segmented_1.Segmented, { value: view, onChange: (v) => onViewChange(v), options: views.map((v) => ({ value: v, label: VIEW_LABEL[v] })) })) : null] })] }));
});
//# sourceMappingURL=DateNavigator.js.map