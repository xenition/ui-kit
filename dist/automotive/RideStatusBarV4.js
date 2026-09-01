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
exports.RideStatusBarV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const IconV4_1 = require("../primitives/IconV4");
const fleet_v4_1 = require("./internal/fleet-v4");
const STAGES = [
    { key: 'requested', label: 'Requested', glyph: '🔍' },
    { key: 'arriving', label: 'Arriving', glyph: '🚗' },
    { key: 'in-trip', label: 'In trip', glyph: '🧭' },
    { key: 'completed', label: 'Completed', glyph: '🏁' },
];
/**
 * **V4 ride status bar** — the web twin of the native `RideStatusBarV4`, same
 * props as {@link RideStatusBar} plus `stageLabels`, `cancelledLabel` and
 * `formatStep`.
 *
 * ## Four changes
 *
 * 1. **A walked stage stays filled.** The base marked only the current one, so
 *    the bar answered "which is selected" when the question is "how far
 *    through am I".
 * 2. **The cancelled band's ink is contrast-corrected**, at the one moment the
 *    user most needs to read it.
 * 3. **The stepper is a real `role="progressbar"`** with its value.
 * 4. **Every stage word is a prop**, and the step position is spoken.
 */
exports.RideStatusBarV4 = React.forwardRef(function RideStatusBarV4({ stage, detail, cancelled = false, variant = 'stepper', stageLabels, cancelledLabel = 'Cancelled', formatStep, className, style, ...rest }, ref) {
    if (cancelled) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "alert", "data-xen-ride-status": "cancelled", className: (0, cn_1.cn)('flex items-center gap-sm rounded-[var(--xen-radius-lg)] border border-border px-md py-sm', className), style: { background: (0, fleet_v4_1.toneGround)('danger'), ...style }, ...rest, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "close", size: "base", className: fleet_v4_1.TONE_INK.danger }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-bold text-danger-text", children: cancelledLabel }), detail ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted-text", children: detail }) : null] })] }));
    }
    const activeIndex = Math.max(0, STAGES.findIndex((s) => s.key === stage));
    const current = STAGES[activeIndex] ?? STAGES[0];
    const currentLabel = stageLabels?.[current.key] ?? current.label;
    const step = (formatStep ?? ((n, of) => `step ${n} of ${of}`))(activeIndex + 1, STAGES.length);
    const spoken = [currentLabel, step, detail].filter(Boolean).join(', ');
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "progressbar", "aria-valuemin": 1, "aria-valuemax": STAGES.length, "aria-valuenow": activeIndex + 1, "aria-label": spoken, "data-xen-ride-status": stage, className: (0, cn_1.cn)('flex items-center gap-sm', className), style: style, ...rest, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: current.glyph, size: "base" }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 text-sm font-semibold text-on-surface", children: currentLabel }), detail ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: detail }) : null] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "progressbar", "aria-valuemin": 1, "aria-valuemax": STAGES.length, "aria-valuenow": activeIndex + 1, "aria-label": spoken, "data-xen-ride-status": stage, className: (0, cn_1.cn)('flex flex-col gap-xs', className), style: style, ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center", children: STAGES.map((s, i) => {
                    const walked = i <= activeIndex;
                    return ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [i > 0 ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('h-0.5 flex-1 rounded-full', walked ? 'bg-primary' : 'bg-border') })) : null, (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('flex h-4 w-4 items-center justify-center rounded-full text-[10px]', walked ? (0, cn_1.cn)(fleet_v4_1.TONE_BG.primary, fleet_v4_1.TONE_ON.primary) : (0, cn_1.cn)('bg-muted', fleet_v4_1.TONE_ON.neutral)), children: s.glyph })] }, s.key));
                }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 text-sm font-semibold text-on-surface", children: currentLabel }), detail ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: detail }) : null] })] }));
});
//# sourceMappingURL=RideStatusBarV4.js.map