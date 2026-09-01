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
exports.SLABadgeV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
// breached → danger, at-risk → warn, on-track → success. Each also carries a
// distinct glyph so the state reads without color (a11y / colorblind).
const STATE = {
    'on-track': { glyph: '●', label: 'On track', pill: 'bg-success/10 text-success' },
    'at-risk': { glyph: '▲', label: 'At risk', pill: 'bg-warn/10 text-warn' },
    breached: { glyph: '■', label: 'Breached', pill: 'bg-danger/10 text-danger' },
};
const SIZE = {
    sm: { pad: 'gap-1.5 px-2 py-0.5', text: 'text-xs', hint: 'text-sm' },
    md: { pad: 'gap-1.5 px-2.5 py-1', text: 'text-sm', hint: 'text-base' },
};
/**
 * SLABadge — **V4** "calm console" design (drop-in for {@link SLABadgeProps}). An
 * SLA status badge rendered as a soft-tint pill (`bg-<slot>/10 text-<slot>`)
 * carrying a glyph + state label and, when supplied, a big legible remaining-time
 * `hint` set in `tabular-nums`. Encodes `on-track` → success, `at-risk` → warn,
 * `breached` → danger with a distinct glyph **and** color, so the state reads
 * without relying on color (colorblind-safe / screen-reader announced). Same
 * props/behavior as the base; colors only from `--xen-*` token classes (no
 * literal hex). Presentational.
 */
exports.SLABadgeV4 = React.forwardRef(function SLABadgeV4({ state, hint, size = 'md', label, className, ...rest }, ref) {
    const spec = STATE[state] ?? STATE['on-track'];
    const sz = SIZE[size] ?? SIZE.md;
    const text = label ?? spec.label;
    const a11y = hint ? `SLA ${text}, ${hint}` : `SLA ${text}`;
    return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, role: "img", "aria-label": a11y, className: (0, cn_1.cn)('inline-flex items-center rounded-full font-semibold', sz.pad, sz.text, spec.pill, className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: spec.glyph }), (0, jsx_runtime_1.jsx)("span", { children: text }), hint ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('font-bold leading-none tabular-nums', sz.hint), children: hint })) : null] }));
});
//# sourceMappingURL=SLABadgeV4.js.map