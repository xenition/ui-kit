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
exports.RSVPButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const OPTIONS = [
    { status: 'going', label: 'Going', glyph: '✓', selectedBg: 'bg-success', selectedFg: 'text-on-success' },
    { status: 'maybe', label: 'Maybe', glyph: '?', selectedBg: 'bg-warn', selectedFg: 'text-on-warn' },
    { status: 'declined', label: "Can't go", glyph: '✕', selectedBg: 'bg-danger', selectedFg: 'text-on-danger' },
];
/**
 * Segmented RSVP control with `going` / `maybe` / `declined` states. The
 * selected state is communicated three ways — a filled token background, a
 * distinct glyph (✓ / ? / ✕), and `aria-checked` on a `radiogroup` — so it is
 * never conveyed by color alone (WCAG 1.4.1). `onChange` is renamed from the DOM
 * `onChange` and reports the chosen status. Colors come from the `--xen-*`
 * tokens; no literal colors.
 */
exports.RSVPButton = React.forwardRef(function RSVPButton({ value, onChange, size = 'md', disabled = false, className, ...rest }, ref) {
    const sizeCls = size === 'sm' ? 'px-sm py-xs text-xs' : 'px-sm py-sm text-sm';
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "radiogroup", className: (0, cn_1.cn)('inline-flex flex-row overflow-hidden rounded-md border border-border', disabled && 'opacity-50', className), ...rest, children: OPTIONS.map((opt, i) => {
            const selected = value === opt.status;
            return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "radio", "aria-checked": selected, "aria-label": opt.label, disabled: disabled, onClick: () => onChange?.(opt.status), className: (0, cn_1.cn)('inline-flex flex-1 items-center justify-center gap-xs font-medium transition-colors', sizeCls, i > 0 && 'border-l border-border', selected ? (0, cn_1.cn)(opt.selectedBg, opt.selectedFg, 'font-bold') : 'bg-surface text-on-surface hover:bg-neutral-100', 'disabled:pointer-events-none', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-300'), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('font-bold', selected ? opt.selectedFg : 'text-muted'), children: opt.glyph }), opt.label] }, opt.status));
        }) }));
});
//# sourceMappingURL=RSVPButton.js.map