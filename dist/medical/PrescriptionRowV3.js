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
exports.PrescriptionRowV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const STATUS = {
    active: { glyph: '✓', label: 'Active', text: 'text-success' },
    'refill-due': { glyph: '⏰', label: 'Refill due', text: 'text-warn' },
    paused: { glyph: '⏸', label: 'Paused', text: 'text-muted' },
    expired: { glyph: '✕', label: 'Expired', text: 'text-danger' },
};
/**
 * PrescriptionRow, redesigned (v3): a **dense medication line**. The name + dose
 * share a line over a directions·refills subtitle, a status glyph + word marks
 * state (never color alone), and a quiet Refill link shows when due — a single
 * hairline row for a medication list. The opposite of v2's card. Same props,
 * token-only.
 */
exports.PrescriptionRowV3 = React.forwardRef(function PrescriptionRowV3({ name, dose, frequency, refillsLeft, status = 'active', onRefill, onClick, className, ...rest }, ref) {
    const st = STATUS[status];
    const interactive = typeof onClick === 'function';
    const handleKeyDown = (e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.();
        }
    };
    const sub = [
        frequency,
        typeof refillsLeft === 'number' ? `${refillsLeft} refill${refillsLeft === 1 ? '' : 's'} left` : null,
    ].filter((s) => !!s);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-prescription-row": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${name}${dose ? ` ${dose}` : ''}, ${st.label}`, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? handleKeyDown : undefined, className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm', st.text), "aria-hidden": true, children: st.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("p", { className: "truncate text-sm font-semibold text-on-surface", children: [name, " ", dose ? (0, jsx_runtime_1.jsx)("span", { className: "font-normal text-muted", children: dose }) : null] }), sub.length > 0 ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: sub.join(' · ') }) : null] }), status === 'refill-due' && onRefill ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "ghost", onClick: (e) => { e.stopPropagation(); onRefill(); }, children: "Refill" })) : null] }));
});
//# sourceMappingURL=PrescriptionRowV3.js.map