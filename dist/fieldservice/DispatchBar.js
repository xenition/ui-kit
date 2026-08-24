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
exports.DispatchBar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const DISPATCH_STAGE = {
    unassigned: { label: 'Unassigned', glyph: '○', slot: 'muted', advance: 'Accept', next: 'accepted' },
    accepted: { label: 'Accepted', glyph: '✓', slot: 'primary', advance: 'Start driving', next: 'en-route' },
    'en-route': { label: 'En route', glyph: '→', slot: 'warn', advance: 'Arrive', next: 'on-site' },
    'on-site': { label: 'On site', glyph: '▶', slot: 'success', advance: 'Complete', next: 'complete' },
    complete: { label: 'Complete', glyph: '✓', slot: 'success', advance: undefined, next: undefined },
};
/**
 * A dispatch status/action bar for the tech's active job. Shows the current
 * stage as a tinted glyph disc + label (text + glyph + a color that traces to a
 * semantic token — never color alone) with an optional ETA and job label, plus
 * a primary button that advances the workflow (accept → en-route → on-site →
 * complete) firing `onAdvance(next)`. An optional Navigate action sits
 * alongside. Web `Button` has no loading spinner, so `loading` disables the
 * advance action. No literal colors.
 */
exports.DispatchBar = React.forwardRef(function DispatchBar({ stage, eta, jobLabel, onAdvance, onNavigate, loading = false, className, style }, ref) {
    const sd = DISPATCH_STAGE[stage] ?? DISPATCH_STAGE.unassigned;
    const iconColor = sd.slot === 'muted' ? 'muted' : sd.slot;
    const canAdvance = sd.advance != null && sd.next != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, style: style, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] border-t border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-md)]', className), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-10 w-10 shrink-0 items-center justify-center rounded-full', format_1.DISC_TINT[sd.slot]), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: sd.glyph, color: iconColor, "aria-label": sd.label }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: jobLabel ?? sd.label }), (0, jsx_runtime_1.jsxs)("span", { className: "truncate text-xs text-muted", children: [sd.glyph, " ", sd.label, eta != null ? ` · ${eta}` : ''] })] }), onNavigate ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", size: "sm", onClick: onNavigate, children: "Navigate" })) : null, canAdvance ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "sm", disabled: loading, onClick: () => onAdvance?.(sd.next), children: sd.advance })) : null] }));
});
//# sourceMappingURL=DispatchBar.js.map