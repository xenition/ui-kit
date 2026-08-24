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
exports.PermitStatusV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const status_1 = require("./internal/status");
const TONE_TEXT = { neutral: 'text-muted', warn: 'text-warn', success: 'text-success', danger: 'text-danger', primary: 'text-primary', accent: 'text-accent' };
/**
 * PermitStatus, redesigned (v3): a **compact status line**. The current stage's
 * glyph + label (in its tone) and the permit number sit inline over a tiny
 * progress-dot strip. The opposite of v2's node stepper. Same props, token-only.
 */
exports.PermitStatusV3 = React.forwardRef(function PermitStatusV3({ status, permitNumber, title, updatedDate, loading = false, className, ...rest }, ref) {
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-permit-status": "", "aria-label": "Loading permit status", className: (0, cn_1.cn)('flex items-center gap-3 py-2', className), ...rest, children: (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" }) });
    }
    const meta = (0, status_1.permitStatus)(status);
    const denied = status === 'denied';
    const currentStep = denied ? 1 : status_1.PERMIT_STATUS[status].step;
    const toneText = TONE_TEXT[meta.tone] ?? 'text-on-surface';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-permit-status": "", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: meta.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("p", { className: "truncate text-sm font-semibold text-on-surface", children: [title ?? 'Permit', " \u00B7 ", (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('font-normal', toneText), children: meta.label })] }), (permitNumber || updatedDate) ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: [permitNumber, updatedDate ? `Updated ${updatedDate}` : null].filter(Boolean).join(' · ') }) : null] }), !denied ? ((0, jsx_runtime_1.jsx)("div", { className: "flex gap-1", children: status_1.PERMIT_STAGES.map((s, i) => (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-1.5 w-1.5 rounded-full', i <= currentStep ? 'bg-primary' : 'bg-neutral-200'), "aria-hidden": true }, s)) })) : null] }));
});
//# sourceMappingURL=PermitStatusV3.js.map