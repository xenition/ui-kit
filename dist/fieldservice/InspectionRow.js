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
exports.InspectionRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const INSPECTION_RESULT = {
    pass: { label: 'Pass', glyph: '✓', tone: 'success', slot: 'success' },
    fail: { label: 'Fail', glyph: '✕', tone: 'danger', slot: 'danger' },
    na: { label: 'N/A', glyph: '–', tone: 'neutral', slot: 'muted' },
    pending: { label: 'Pending', glyph: '○', tone: 'primary', slot: 'primary' },
};
/**
 * One line in an inspection checklist: a tinted result glyph disc, a
 * label/code/note stack, and a result pill. The result is conveyed redundantly
 * (glyph + label + a color that traces to a semantic token: pass → success,
 * fail → danger) so it is never color-alone. Becomes a `role="button"` surface
 * only when `onClick` is supplied. No literal colors.
 */
exports.InspectionRow = React.forwardRef(function InspectionRow({ label, result, code, note, onClick, className, style }, ref) {
    const rd = INSPECTION_RESULT[result] ?? INSPECTION_RESULT.pending;
    const iconColor = rd.slot === 'muted' ? 'muted' : rd.slot;
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, style: style, ...(interactive
            ? {
                role: 'button',
                tabIndex: 0,
                'aria-label': `${label}, ${rd.label}`,
                onClick,
                onKeyDown: (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onClick?.();
                    }
                },
            }
            : {}), className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]', interactive && 'cursor-pointer', className), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-9 w-9 items-center justify-center rounded-full', format_1.DISC_TINT[rd.slot]), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: rd.glyph, color: iconColor, "aria-label": rd.label }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 text-base font-semibold text-on-surface", children: label }), code != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: code }) : null, note != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: note }) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: rd.tone, children: `${rd.glyph} ${rd.label}` })] }));
});
//# sourceMappingURL=InspectionRow.js.map