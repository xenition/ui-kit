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
exports.PropertyFactsBar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * PropertyFactsBar — **V4** "listing" design. A key-facts stat strip for a
 * property: a responsive grid of fact cells, each a soft-primary tinted glyph
 * disc, a BIG bold value numeral and a muted label beneath, separated by
 * hairline rules. Editorial, single-accent (primary), 8-pt spacing inside a
 * rounded elevated card. Wraps on small widths; pass `columns` to pin a fixed
 * grid. Presentational only — all colors from `--xen-*` token classes, no
 * literals; dark-mode safe. Rendered as a semantic list for screen readers.
 */
exports.PropertyFactsBar = React.forwardRef(function PropertyFactsBar({ facts, columns, ariaLabel = 'Key facts', className, style, ...rest }, ref) {
    const cols = columns != null ? Math.max(1, Math.min(6, Math.round(columns))) : undefined;
    const gridStyle = {
        gridTemplateColumns: cols != null ? `repeat(${cols}, minmax(0, 1fr))` : 'repeat(auto-fit, minmax(112px, 1fr))',
        ...style,
    };
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] border border-border bg-surface p-2 text-on-surface shadow-md', className), ...rest, children: (0, jsx_runtime_1.jsx)("ul", { role: "list", "aria-label": ariaLabel, className: "grid gap-x-2 gap-y-3", style: gridStyle, children: facts.map((fact, i) => ((0, jsx_runtime_1.jsxs)("li", { className: (0, cn_1.cn)('flex flex-col items-center gap-1 px-2 py-1 text-center', 
                // Hairline separators between cells on the same row (skip the
                // first column start edge — the auto-fit grid handles wrapping).
                i > 0 && 'border-l border-border'), children: [fact.glyph ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-base leading-none text-primary", children: fact.glyph })) : null, (0, jsx_runtime_1.jsx)("span", { className: "text-xl font-bold leading-tight text-on-surface tabular-nums", children: fact.value }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-medium uppercase tracking-wide text-muted", children: fact.label })] }, `${fact.label}-${i}`))) }) }));
});
//# sourceMappingURL=PropertyFactsBar.js.map