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
exports.StatusPipelineV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const types_1 = require("./types");
/**
 * StatusPipeline — design V3 (web). A minimal, dense read-out: the current stage
 * word (with a ✓/✕ glyph so meaning survives without color) and an `n of total`
 * position on one line, above a thin segmented bar that fills to the current
 * stage. Rejection tints the filled segments danger AND is stated as the word,
 * never color alone. `variant` is accepted for parity but ignored. Token-pure.
 */
exports.StatusPipelineV3 = React.forwardRef(function StatusPipelineV3({ stage, rejected = false, variant: _variant, className, ...rest }, ref) {
    // Guarded indexing: an unknown stage resolves to the first step, never -1.
    const idx = Math.max(0, types_1.APPLICATION_STAGES.indexOf(stage));
    const total = types_1.APPLICATION_STAGES.length;
    const label = types_1.STAGE_LABEL[stage] ?? types_1.STAGE_LABEL[types_1.APPLICATION_STAGES[0]];
    const position = `${idx + 1} of ${total}`;
    const summary = rejected
        ? `Rejected at stage ${position}: ${label}`
        : `Stage ${position}: ${label}`;
    const hired = stage === 'hired';
    const wordClass = rejected ? 'text-danger' : hired ? 'text-success' : 'text-primary';
    const word = rejected ? `✕ ${label} · Rejected` : hired ? `✓ ${label}` : label;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-status-pipeline": "v3", "aria-label": summary, className: (0, cn_1.cn)('flex flex-col gap-xs', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex-1 truncate text-sm font-bold', wordClass), children: word }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: position })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex gap-0.5", "aria-hidden": "true", children: types_1.APPLICATION_STAGES.map((s, i) => {
                    const filled = i <= idx;
                    const barClass = filled ? (rejected ? 'bg-danger' : 'bg-primary') : 'bg-border';
                    return (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-1.5 flex-1 rounded-full', barClass) }, s);
                }) })] }));
});
//# sourceMappingURL=StatusPipelineV3.js.map