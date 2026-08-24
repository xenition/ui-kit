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
exports.OnboardingChecklist = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * A getting-started checklist with a completion meter (design.md §42): a
 * progress bar + "N of M" count over a list of steps, each showing a check when
 * done. Completed steps are struck-through and muted. Token-only.
 */
exports.OnboardingChecklist = React.forwardRef(function OnboardingChecklist({ steps, title = 'Get started', className, ...rest }, ref) {
    const total = steps.length;
    const doneCount = steps.filter((s) => s.done).length;
    const pct = total === 0 ? 0 : Math.round((doneCount / total) * 100);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-md rounded-[var(--xen-radius-lg)] border border-border bg-surface p-lg text-on-surface', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-bold text-on-surface", children: title }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm text-muted", children: [doneCount, " of ", total] })] }), (0, jsx_runtime_1.jsx)("div", { role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": pct, className: "h-1.5 overflow-hidden rounded-full bg-border", children: (0, jsx_runtime_1.jsx)("div", { className: "h-full bg-primary", style: { width: `${pct}%` } }) })] }), (0, jsx_runtime_1.jsx)("ul", { className: "flex flex-col gap-xs", children: steps.map((step, i) => {
                    const marker = ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full text-sm font-bold', step.done
                            ? 'bg-success text-on-success'
                            : 'border border-border bg-surface'), children: step.done ? '✓' : '' }));
                    const text = ((0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-0.5 text-left", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-base font-semibold', step.done ? 'text-muted line-through' : 'text-on-surface'), children: step.label }), step.description ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: step.description })) : null] }));
                    const label = `${step.label}, ${step.done ? 'completed' : 'not completed'}`;
                    return ((0, jsx_runtime_1.jsx)("li", { children: step.onClick ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": label, onClick: step.onClick, className: "flex w-full items-start gap-sm py-xs text-left transition-opacity hover:opacity-80", children: [marker, text] })) : ((0, jsx_runtime_1.jsxs)("div", { "aria-label": label, className: "flex items-start gap-sm py-xs", children: [marker, text] })) }, `${step.label}-${i}`));
                }) })] }));
});
//# sourceMappingURL=OnboardingChecklist.js.map