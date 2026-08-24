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
exports.WinLossBadge = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
/**
 * Outcome badge for a deal — `won` / `lost` / `open` / `pending`. The result is
 * carried by a glyph **and** a word (never color alone): won `✓`, lost `✕`,
 * open `◔`, pending `⋯`. Won maps to the `text-success` token, lost to
 * `text-danger`. Use `badge` on cards and `inline` inside dense rows. Every
 * color is a `--xen-*` token class — no literals.
 */
exports.WinLossBadge = React.forwardRef(function WinLossBadge({ outcome, variant = 'badge', size = 'md', hideLabel = false, className, ...rest }, ref) {
    const meta = internal_1.OUTCOME_META[outcome];
    const label = `${meta.label} deal`;
    if (variant === 'inline') {
        const sizeClass = size === 'sm' ? 'text-xs' : 'text-sm';
        return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, role: "img", "aria-label": label, className: (0, cn_1.cn)('inline-flex items-center gap-1', (0, internal_1.toneTextClass)(meta.tone), sizeClass, className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), hideLabel ? null : (0, jsx_runtime_1.jsx)("span", { className: "font-semibold", children: meta.label })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Badge, { ref: ref, tone: (0, internal_1.toneBadgeTone)(meta.tone), role: "img", "aria-label": label, className: (0, cn_1.cn)('align-middle', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), hideLabel ? null : (0, jsx_runtime_1.jsx)("span", { children: meta.label })] }));
});
//# sourceMappingURL=WinLossBadge.js.map