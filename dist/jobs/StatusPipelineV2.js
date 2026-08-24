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
exports.StatusPipelineV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const types_1 = require("./types");
/**
 * StatusPipeline — design V2 (web). A big, celebratory funnel: large numbered
 * circles joined by connector rails, each with its stage word underneath.
 * Completed circles fill primary with a ✓, the current one is ringed, future
 * ones are muted. Rejection is spelled out as text (✕ glyph + danger word),
 * never color alone. `variant` is accepted for drop-in parity but the layout is
 * fixed — this file *is* the design. Token-pure.
 */
exports.StatusPipelineV2 = React.forwardRef(function StatusPipelineV2({ stage, rejected = false, variant: _variant, className, ...rest }, ref) {
    // Guarded indexing: an unknown stage resolves to the first step, never -1.
    const idx = Math.max(0, types_1.APPLICATION_STAGES.indexOf(stage));
    const total = types_1.APPLICATION_STAGES.length;
    const label = types_1.STAGE_LABEL[stage] ?? types_1.STAGE_LABEL[types_1.APPLICATION_STAGES[0]];
    const position = `${idx + 1} of ${total}`;
    const summary = rejected
        ? `Rejected at stage ${position}: ${label}`
        : `Stage ${position}: ${label}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-status-pipeline": "v2", "aria-label": summary, className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-start", children: types_1.APPLICATION_STAGES.map((s, i) => {
                    const done = i < idx;
                    const current = i === idx;
                    const rejectHere = rejected && current;
                    const glyph = done ? '✓' : rejectHere ? '✕' : String(i + 1);
                    const circleClass = done
                        ? 'bg-primary text-on-primary border-transparent'
                        : rejectHere
                            ? 'bg-danger text-on-danger border-transparent'
                            : current
                                ? 'border-primary text-primary'
                                : 'border-border text-muted';
                    const leftFilled = i > 0 && i <= idx;
                    const rightFilled = i < total - 1 && i < idx;
                    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col items-center gap-xs", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex w-full items-center", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('h-0.5 flex-1', i > 0 ? (leftFilled ? 'bg-primary' : 'bg-border') : 'bg-transparent') }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-bold', circleClass), children: glyph }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('h-0.5 flex-1', i < total - 1 ? (rightFilled ? 'bg-primary' : 'bg-border') : 'bg-transparent') })] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-xs', current ? 'font-bold text-on-surface' : done ? 'font-medium text-on-surface' : 'font-medium text-muted'), children: types_1.STAGE_LABEL[s] })] }, s));
                }) }), rejected ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-danger", children: `✕ Rejected at ${label}` })) : null] }));
});
//# sourceMappingURL=StatusPipelineV2.js.map