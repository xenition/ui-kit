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
exports.PermitStatusV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const status_1 = require("./internal/status");
/**
 * PermitStatus, redesigned (v2): a **big node stepper**. The permit title/number
 * head a horizontal track of stage nodes (glyph + label) joined by connectors;
 * reached nodes fill primary, and a denial shows a danger end-state. Distinct from
 * v1's linear Steps. Same props, token-only.
 */
exports.PermitStatusV2 = React.forwardRef(function PermitStatusV2({ status, permitNumber, title, updatedDate, loading = false, className, ...rest }, ref) {
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-permit-status": "", "aria-label": "Loading permit status", className: (0, cn_1.cn)('h-28 animate-pulse rounded-lg bg-neutral-100', className), ...rest });
    }
    const denied = status === 'denied';
    const currentStep = denied ? 1 : status_1.PERMIT_STATUS[status].step;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-permit-status": "", className: (0, cn_1.cn)('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0", children: [title ? (0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: title }) : null, permitNumber ? (0, jsx_runtime_1.jsx)("p", { className: "font-mono text-xs text-muted", children: permitNumber }) : null] }), updatedDate ? (0, jsx_runtime_1.jsxs)("span", { className: "shrink-0 text-xs text-muted", children: ["Updated ", updatedDate] }) : null] }), denied ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 rounded-md bg-danger/10 px-3 py-2", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: "\u2715" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-danger", children: "Denied" })] })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center", children: status_1.PERMIT_STAGES.map((stage, i) => {
                    const meta = (0, status_1.permitStatus)(stage);
                    const reached = i <= currentStep;
                    const active = i === currentStep;
                    return ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-8 w-8 items-center justify-center rounded-full text-sm', active ? 'bg-primary text-on-primary ring-2 ring-primary ring-offset-2' : reached ? 'bg-primary/20 text-primary' : 'bg-neutral-100 text-muted'), children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-[10px]', reached ? 'text-on-surface' : 'text-muted'), children: meta.label })] }), i < status_1.PERMIT_STAGES.length - 1 ? (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('mx-1 h-px flex-1', i < currentStep ? 'bg-primary' : 'bg-border'), "aria-hidden": true }) : null] }, stage));
                }) }))] }));
});
//# sourceMappingURL=PermitStatusV2.js.map