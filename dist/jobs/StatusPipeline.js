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
exports.StatusPipeline = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const primitives_1 = require("../primitives");
const cn_1 = require("../primitives/cn");
const types_1 = require("./types");
/**
 * Hiring-funnel progress: applied → screening → interview → offer → hired.
 * Built on the primitive `Steps`, so each stage carries a numbered/checked
 * marker AND its text label — stage is never conveyed by color alone (an
 * explicit `aria-label` states "Stage n of m: <label>", and rejection is
 * announced as text, not just a danger hue). Presentational; pass `stage`.
 */
exports.StatusPipeline = React.forwardRef(function StatusPipeline({ stage, rejected = false, variant = 'full', className, ...rest }, ref) {
    // Guard the lookup: an unknown stage resolves to the first step, never -1.
    const idx = Math.max(0, types_1.APPLICATION_STAGES.indexOf(stage));
    const total = types_1.APPLICATION_STAGES.length;
    const label = types_1.STAGE_LABEL[stage] ?? types_1.STAGE_LABEL.applied;
    const position = `${idx + 1} of ${total}`;
    const summary = rejected
        ? `Rejected at stage ${position}: ${label}`
        : `Stage ${position}: ${label}`;
    if (variant === 'compact') {
        const tone = rejected ? 'danger' : stage === 'hired' ? 'success' : 'primary';
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-status-pipeline": "compact", role: "text", "aria-label": summary, className: (0, cn_1.cn)('inline-flex items-center gap-sm', className), ...rest, children: [(0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: tone, children: rejected ? `${label} · Rejected` : label }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: position })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-status-pipeline": "full", "aria-label": summary, className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [(0, jsx_runtime_1.jsx)(primitives_1.Steps, { steps: types_1.APPLICATION_STAGES.map((s) => ({ title: types_1.STAGE_LABEL[s] })), current: idx }), rejected ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-danger", children: `✕ Rejected at ${label}` })) : null] }));
});
//# sourceMappingURL=StatusPipeline.js.map