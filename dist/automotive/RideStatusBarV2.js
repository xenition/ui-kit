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
exports.RideStatusBarV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const STAGES = [
    { key: 'requested', label: 'Requested', glyph: '📱' },
    { key: 'arriving', label: 'Arriving', glyph: '🚗' },
    { key: 'in-trip', label: 'In trip', glyph: '🛣️' },
    { key: 'completed', label: 'Completed', glyph: '✅' },
];
/**
 * RideStatusBar, redesigned (v2): a **big horizontal stepper**. Each stage is a
 * node with a connector; reached nodes fill primary, the active one is ringed, and
 * a detail line sits beneath — a prominent trip tracker. Distinct from v1. Same
 * props, token-only.
 */
exports.RideStatusBarV2 = React.forwardRef(function RideStatusBarV2({ stage, detail, cancelled = false, variant, className, ...rest }, ref) {
    void variant;
    const activeIndex = Math.max(0, STAGES.findIndex((s) => s.key === stage));
    if (cancelled) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-ride-status-bar": "", role: "status", className: (0, cn_1.cn)('flex items-center gap-2 rounded-lg border border-danger bg-danger/5 px-md py-2', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: "\u26A0\uFE0F" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm font-semibold text-danger", children: ["Ride cancelled", detail ? ` · ${detail}` : ''] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-ride-status-bar": "", role: "status", "aria-label": `Ride status: ${STAGES[activeIndex]?.label}`, className: (0, cn_1.cn)('flex flex-col gap-2', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center", children: STAGES.map((s, i) => {
                    const reached = i <= activeIndex;
                    const active = i === activeIndex;
                    return ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-8 w-8 items-center justify-center rounded-full text-sm', active ? 'bg-primary text-on-primary ring-2 ring-primary ring-offset-2' : reached ? 'bg-primary/20 text-primary' : 'bg-neutral-100 text-muted'), children: s.glyph }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-[10px]', reached ? 'text-on-surface' : 'text-muted'), children: s.label })] }), i < STAGES.length - 1 ? (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('mx-1 h-px flex-1', i < activeIndex ? 'bg-primary' : 'bg-border'), "aria-hidden": true }) : null] }, s.key));
                }) }), detail ? (0, jsx_runtime_1.jsx)("p", { className: "text-center text-xs text-muted", children: detail }) : null] }));
});
//# sourceMappingURL=RideStatusBarV2.js.map