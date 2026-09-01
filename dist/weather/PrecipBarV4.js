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
exports.PrecipBarV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
function clamp(n, lo, hi) {
    return Math.min(hi, Math.max(lo, n));
}
/**
 * V4 design-line precipitation-probability bars — a polished elevated white
 * card. Same props, defaults and empty handling as the base `PrecipBar`: one
 * `bg-primary` column per period on a `bg-neutral-100` track, its height
 * proportional to the chance (0–100), with a droplet glyph header and muted
 * period labels. `showValues` prints the numeric % above each bar. All colors
 * flow through Tailwind token classes.
 */
exports.PrecipBarV4 = React.forwardRef(function PrecipBarV4({ slots, height = 96, showValues = false, emptyLabel = 'No precipitation data', className, ...rest }, ref) {
    const shell = 'rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5';
    if (slots.length === 0) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "img", "aria-label": emptyLabel, className: (0, cn_1.cn)(shell, 'flex flex-col items-center gap-2', className), ...rest, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDCA7", size: "2xl", color: "primary", "aria-hidden": true }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: emptyLabel })] }));
    }
    const track = clamp(height, 32, 320);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)(shell, 'flex flex-col', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row items-center gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-50", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDCA7", size: "lg", color: "primary", "aria-label": "Precipitation" }) }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "Precipitation" })] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-3 flex flex-row items-end justify-between gap-1", children: slots.map((slot, index) => {
                    const pct = clamp(slot.chance, 0, 100);
                    return ((0, jsx_runtime_1.jsxs)("div", { role: "img", "aria-label": `${slot.label}, ${pct} percent chance${slot.amount ? `, ${slot.amount}` : ''}`, className: "flex flex-1 flex-col items-center gap-1", children: [showValues ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [pct, "%"] }) : null, (0, jsx_runtime_1.jsx)("div", { className: "flex w-[70%] flex-col justify-end overflow-hidden rounded-full bg-neutral-100", style: { height: track }, children: (0, jsx_runtime_1.jsx)("div", { className: "rounded-full bg-primary", style: { height: `${pct}%` } }) }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: slot.label })] }, `${slot.label}-${index}`));
                }) })] }));
});
//# sourceMappingURL=PrecipBarV4.js.map