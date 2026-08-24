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
exports.MetricTile = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const TONE_CLASS = {
    neutral: 'text-on-surface',
    primary: 'text-primary',
    success: 'text-success',
    warn: 'text-warn',
    danger: 'text-danger',
};
/**
 * A compact metric tile — a smaller, denser cousin of {@link StatCard} for grids
 * of secondary numbers. Optional accent `tone` colors the value. Renders as a
 * `<button>` when `onClick` is set. Token-only.
 */
exports.MetricTile = React.forwardRef(function MetricTile({ label, value, icon, tone = 'neutral', onClick, className }, ref) {
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs", children: [icon ? (0, jsx_runtime_1.jsx)("span", { className: "shrink-0", children: icon }) : null, (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: label })] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xl font-bold', TONE_CLASS[tone]), children: value })] }));
    const classes = (0, cn_1.cn)('flex w-full flex-col gap-xs rounded-[var(--xen-radius-md)] border border-border bg-surface p-md text-left', className);
    const label2 = `${label}: ${String(value)}`;
    if (!onClick) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": label2, className: classes, children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)("button", { ref: ref, type: "button", "aria-label": label2, onClick: onClick, className: (0, cn_1.cn)(classes, 'transition-opacity hover:opacity-80'), children: inner }));
});
//# sourceMappingURL=MetricTile.js.map