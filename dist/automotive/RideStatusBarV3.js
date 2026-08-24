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
exports.RideStatusBarV3 = void 0;
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
 * RideStatusBar, redesigned (v3): a **compact status line**. The current stage's
 * glyph + label and the detail sit inline, with a tiny progress-dot strip on the
 * right showing position in the lifecycle. The opposite of v2's stepper. Same
 * props, token-only.
 */
exports.RideStatusBarV3 = React.forwardRef(function RideStatusBarV3({ stage, detail, cancelled = false, variant, className, ...rest }, ref) {
    void variant;
    const activeIndex = Math.max(0, STAGES.findIndex((s) => s.key === stage));
    if (cancelled) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-ride-status-bar": "", role: "status", className: (0, cn_1.cn)('flex items-center gap-2 border-b border-border py-2', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: "\u26A0\uFE0F" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm font-semibold text-danger", children: ["Cancelled", detail ? ` · ${detail}` : ''] })] }));
    }
    const current = STAGES[activeIndex] ?? STAGES[0];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-ride-status-bar": "", role: "status", "aria-label": `Ride status: ${current.label}`, className: (0, cn_1.cn)('flex items-center gap-2 border-b border-border py-2', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: current.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-surface", children: current.label }), detail ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [" \u00B7 ", detail] }) : null] }), (0, jsx_runtime_1.jsx)("div", { className: "flex gap-1", children: STAGES.map((s, i) => (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-1.5 w-1.5 rounded-full', i <= activeIndex ? 'bg-primary' : 'bg-neutral-200'), "aria-hidden": true }, s.key)) })] }));
});
//# sourceMappingURL=RideStatusBarV3.js.map