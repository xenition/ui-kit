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
exports.PermitStatus = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const Card_1 = require("../primitives/Card");
const Steps_1 = require("../primitives/Steps");
const Icon_1 = require("../primitives/Icon");
const status_1 = require("./internal/status");
/** Happy-path stages, in order. `denied` branches off `review`. */
const STAGES = status_1.PERMIT_STAGES.map((stage) => ({ title: status_1.PERMIT_STATUS[stage].label }));
/**
 * A permit / license application status tracker. Renders the ordered happy-path
 * stages (submitted → review → approved → issued) via the `Steps` primitive; a
 * `denied` permit branches into a `danger`-toned banner conveyed by **glyph +
 * text + color** (never color alone) and announced with `role="alert"`. Guarded
 * against unknown statuses. Token-bound throughout — no literal colors. Web
 * parity of the native `PermitStatus`.
 */
exports.PermitStatus = React.forwardRef(function PermitStatus({ status, permitNumber, title, updatedDate, loading = false, className, ...rest }, ref) {
    const sd = (0, status_1.permitStatus)(status);
    const denied = status === 'denied';
    const current = denied ? 1 : Math.min(sd.step, STAGES.length - 1);
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, className: className, ...rest, children: [title != null || permitNumber != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "mb-[var(--xen-space-md)]", children: [title != null ? ((0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-on-surface", children: title })) : null, permitNumber != null ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: permitNumber }) : null] })) : null, loading ? ((0, jsx_runtime_1.jsx)("div", { role: "progressbar", "aria-label": "Loading permit status", className: "h-12 animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-100" })) : denied ? ((0, jsx_runtime_1.jsxs)("div", { role: "alert", className: "flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-danger bg-danger/10 p-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: sd.glyph, color: "danger", "aria-label": "Denied" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-danger", children: "Permit denied" }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-on-surface", children: "Review the notice and re-apply or appeal." })] })] })) : ((0, jsx_runtime_1.jsx)(Steps_1.Steps, { steps: STAGES, current: current })), updatedDate != null && !loading ? ((0, jsx_runtime_1.jsxs)("p", { className: "mt-[var(--xen-space-md)] text-xs text-muted", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: sd.glyph }), " ", sd.label, " \u00B7 updated ", updatedDate] })) : null] }));
});
//# sourceMappingURL=PermitStatus.js.map