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
exports.ManifestRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const STATE_META = {
    pending: { glyph: '○', label: 'Pending', text: 'text-muted', bg: 'bg-muted', on: 'text-on-surface' },
    checked: { glyph: '✓', label: 'Checked', text: 'text-success', bg: 'bg-success', on: 'text-on-success' },
    missing: { glyph: '✕', label: 'Missing', text: 'text-danger', bg: 'bg-danger', on: 'text-on-danger' },
};
/**
 * A single manifest / checklist line for goods-in or load verification: item +
 * SKU, a `scanned / quantity` counter, and a clickable check control. State is
 * carried by a glyph + word (checkmark/cross/circle) and `aria-checked`, never
 * color alone. Pressing the control cycles pending → checked and fires
 * `onToggle`. All colors are theme tokens. Web parity of the native
 * `ManifestRow`.
 */
exports.ManifestRow = React.forwardRef(function ManifestRow({ item, sku, quantity, scanned, state = 'pending', onToggle, className, ...rest }, ref) {
    const meta = STATE_META[state];
    const checked = state === 'checked';
    const complete = quantity != null && scanned != null ? scanned >= quantity : undefined;
    const countTone = complete === false ? 'text-warn' : complete ? 'text-success' : 'text-on-surface';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-surface p-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", role: "checkbox", "aria-checked": checked, "aria-label": `${meta.label}: ${item}`, disabled: !onToggle, onClick: () => onToggle?.(checked ? 'pending' : 'checked'), className: (0, cn_1.cn)('flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', checked ? (0, cn_1.cn)(meta.bg, meta.on) : (0, cn_1.cn)('border-[1.5px] border-border bg-transparent', meta.text), onToggle ? 'cursor-pointer' : 'cursor-default'), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-surface", children: item }), sku ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: sku }) : null] }), quantity != null ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-bold', countTone), children: scanned != null ? `${scanned}/${quantity}` : `×${quantity}` })) : null] }));
});
//# sourceMappingURL=ManifestRow.js.map