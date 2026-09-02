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
exports.ManifestRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const STATE_META = {
    pending: { glyph: '○', label: 'Pending', text: 'text-muted', bg: 'bg-muted', on: 'text-on-surface' },
    checked: { glyph: '✓', label: 'Checked', text: 'text-success', bg: 'bg-success', on: 'text-on-success' },
    missing: { glyph: '✕', label: 'Missing', text: 'text-danger', bg: 'bg-danger', on: 'text-on-danger' },
};
/**
 * ManifestRow — **V4** "dispatch" design (web parity of the native V4). The
 * confident, operations-desk take on a load-verification line: an elevated
 * rounded row with a soft shadow, a large check control (`role="checkbox"`,
 * keyboard-operable, ≥44px tap target) whose meaning is carried by a
 * glyph + `aria-checked`, the item + SKU, a labelled state word (never color
 * alone), and a `scanned / quantity` counter that greens on completion and warns
 * when short. Pressing the control cycles pending → checked and fires
 * `onToggle`. Honors the V4 `variant` — `full` (default) and `compact` (a denser
 * single line that hides the SKU) — identical props/behavior to
 * {@link ManifestRowProps}. All colors from `--xen-*` token classes (no literals).
 */
exports.ManifestRowV4 = React.forwardRef(function ManifestRowV4({ item, sku, quantity, scanned, state = 'pending', variant = 'full', onToggle, className, ...rest }, ref) {
    const meta = STATE_META[state];
    const checked = state === 'checked';
    const complete = quantity != null && scanned != null ? scanned >= quantity : undefined;
    const countTone = complete === false ? 'text-warn' : complete ? 'text-success' : 'text-on-surface';
    const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';
    const compact = variant === 'compact';
    const control = ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "checkbox", "aria-checked": checked, "aria-label": `${meta.label}: ${item}`, disabled: !onToggle, onClick: () => onToggle?.(checked ? 'pending' : 'checked'), className: (0, cn_1.cn)('flex shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', compact ? 'h-8 w-8' : 'h-11 w-11', checked ? (0, cn_1.cn)(meta.bg, meta.on) : (0, cn_1.cn)('border-[1.5px] border-border bg-transparent', meta.text), onToggle ? 'cursor-pointer' : 'cursor-default'), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }) }));
    const counter = quantity != null ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-bold tabular-nums', countTone), children: scanned != null ? `${scanned}/${quantity}` : `×${quantity}` })) : null;
    if (compact) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-manifest-row": "", className: (0, cn_1.cn)(shell, 'flex min-h-[44px] items-center gap-[var(--xen-space-sm)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]', className), ...rest, children: [control, (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-sm font-semibold text-on-surface", children: item }), counter] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-manifest-row": "", className: (0, cn_1.cn)(shell, 'flex min-h-[56px] items-center gap-[var(--xen-space-md)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]', className), ...rest, children: [control, (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-surface", children: item }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-xs', meta.text), children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', meta.text), children: meta.label }), sku ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: `· ${sku}` }) : null] })] }), counter] }));
});
//# sourceMappingURL=ManifestRowV4.js.map