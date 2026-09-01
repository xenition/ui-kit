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
exports.TicketPriorityV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
// urgent → danger, high → warn, normal → primary, low → muted. Distinct glyph +
// bar count so priority is never conveyed by color alone.
const LEVEL = {
    low: { glyph: '▽', label: 'Low', rank: 1, pill: 'bg-muted/10 text-muted', textCls: 'text-muted', fillCls: 'bg-muted' },
    normal: { glyph: '▷', label: 'Normal', rank: 2, pill: 'bg-primary/10 text-primary', textCls: 'text-primary', fillCls: 'bg-primary' },
    high: { glyph: '△', label: 'High', rank: 3, pill: 'bg-warn/10 text-warn', textCls: 'text-warn', fillCls: 'bg-warn' },
    urgent: { glyph: '⚑', label: 'Urgent', rank: 4, pill: 'bg-danger/10 text-danger', textCls: 'text-danger', fillCls: 'bg-danger' },
};
const TOTAL_BARS = 4;
/**
 * TicketPriority — **V4** "calm console" design (drop-in for
 * {@link TicketPriorityProps}). A refined priority chip: glyph + label inside a
 * soft-tint pill colored by level (`bg-<slot>/10 text-<slot>`) rather than the
 * bordered chip of the base — cleaner and more legible in a busy queue. The
 * `bars` variant is preserved as a four-step signal indicator whose filled count
 * carries the level. Level is encoded by glyph **and** color (never color alone);
 * `size` variants and the `low`/`normal`/`high`/`urgent` mapping are unchanged.
 * All colors from `--xen-*` token classes (no literal hex). Presentational.
 */
exports.TicketPriorityV4 = React.forwardRef(function TicketPriorityV4({ level, variant = 'chip', size = 'md', hideLabel = false, className, ...rest }, ref) {
    const spec = LEVEL[level] ?? LEVEL.normal;
    const textSize = size === 'sm' ? 'text-xs' : 'text-sm';
    const a11y = `Priority ${spec.label}`;
    if (variant === 'bars') {
        const barMax = size === 'sm' ? 10 : 14;
        return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, role: "img", "aria-label": a11y, className: (0, cn_1.cn)('inline-flex items-center gap-1', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "inline-flex items-end gap-px", "aria-hidden": "true", children: Array.from({ length: TOTAL_BARS }, (_, i) => ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-block rounded-[1px]', size === 'sm' ? 'w-[3px]' : 'w-1', i < spec.rank ? spec.fillCls : 'bg-on-surface/15'), style: { height: Math.round((barMax * (i + 1)) / TOTAL_BARS) } }, i))) }), hideLabel ? null : ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('font-semibold', textSize, spec.textCls), children: spec.label }))] }));
    }
    return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, role: "img", "aria-label": a11y, className: (0, cn_1.cn)('inline-flex items-center gap-1 self-start rounded-full font-semibold', size === 'sm' ? 'px-2 py-px' : 'px-2.5 py-0.5', textSize, spec.pill, className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "font-normal", children: spec.glyph }), hideLabel ? null : (0, jsx_runtime_1.jsx)("span", { children: spec.label })] }));
});
//# sourceMappingURL=TicketPriorityV4.js.map