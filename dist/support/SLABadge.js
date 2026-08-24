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
exports.SLABadge = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
// breached → danger, at-risk → warn, on-track → success. Each also carries a
// distinct glyph so the state reads without color (a11y / colorblind).
const STATE = {
    'on-track': { glyph: '●', label: 'On track', cls: 'border-success text-success' },
    'at-risk': { glyph: '▲', label: 'At risk', cls: 'border-warn text-warn' },
    breached: { glyph: '■', label: 'Breached', cls: 'border-danger text-danger' },
};
const SIZE = {
    sm: 'gap-1 px-2 py-px text-xs',
    md: 'gap-1 px-2.5 py-0.5 text-sm',
};
/**
 * SLA health pill for a helpdesk ticket. Encodes `on-track` / `at-risk` /
 * `breached` with a semantic tone **and** a distinct glyph + text label, so the
 * state is legible without relying on color (colorblind-safe / screen-reader
 * announced). Colors come only from the `--xen-*` token classes
 * (`text-success`/`text-warn`/`text-danger`) — no literal hex. Presentational.
 */
exports.SLABadge = React.forwardRef(function SLABadge({ state, hint, size = 'md', label, className, ...rest }, ref) {
    const spec = STATE[state] ?? STATE['on-track'];
    const sz = SIZE[size] ?? SIZE.md;
    const text = label ?? spec.label;
    const a11y = hint ? `SLA ${text}, ${hint}` : `SLA ${text}`;
    return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, role: "img", "aria-label": a11y, className: (0, cn_1.cn)('inline-flex items-center rounded-full border font-semibold', sz, spec.cls, className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: spec.glyph }), (0, jsx_runtime_1.jsx)("span", { children: text }), hint ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "font-normal text-muted", children: hint })) : null] }));
});
//# sourceMappingURL=SLABadge.js.map