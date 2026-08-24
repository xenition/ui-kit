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
exports.ProcessSteps = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/** Numbered "how it works" flow — horizontal on desktop, vertical on mobile, with connectors. */
exports.ProcessSteps = React.forwardRef(function ProcessSteps({ steps, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("ol", { ref: ref, "data-xen-process-steps": "", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-lg)] md:flex-row md:items-start', className), ...rest, children: steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            return ((0, jsx_runtime_1.jsxs)("li", { "data-xen-process-step": "", className: "relative flex flex-1 gap-[var(--xen-space-md)] md:flex-col md:text-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center md:w-full md:flex-row md:items-center", children: [(0, jsx_runtime_1.jsx)("span", { "data-xen-process-number": "", className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--xen-radius-full)] bg-primary text-on-primary font-heading text-base font-semibold md:mx-auto", children: step.icon ?? index + 1 }), !isLast ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", "data-xen-process-connector": "", className: "mt-[var(--xen-space-xs)] w-px flex-1 bg-border md:mt-0 md:ml-[var(--xen-space-sm)] md:h-px md:w-auto md:flex-1" })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)] pb-[var(--xen-space-md)] md:pb-0", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-heading text-lg font-semibold text-on-surface", children: step.title }), step.description !== undefined ? ((0, jsx_runtime_1.jsx)("p", { className: "text-sm leading-relaxed text-muted", children: step.description })) : null] })] }, index));
        }) }));
});
//# sourceMappingURL=ProcessSteps.js.map