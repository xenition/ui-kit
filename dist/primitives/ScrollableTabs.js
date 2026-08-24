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
exports.ScrollableTabs = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
/**
 * Web parity of the native `ScrollableTabs`: a horizontally scrollable tab bar
 * for when there are more tabs than fit the viewport (the base `Tabs` is a fixed
 * non-scrolling row). Each tab has a token-bound active underline and an optional
 * trailing badge. Uses the ARIA `tablist`/`tab` roles. All colors/spacing come
 * from the `--xen-*` tokens via Tailwind classes — no literal colors.
 */
exports.ScrollableTabs = React.forwardRef(function ScrollableTabs({ className, items, value, onValueChange, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "tablist", className: (0, cn_1.cn)('flex gap-1 overflow-x-auto border-b border-border', className), ...rest, children: items.map((it) => {
            const active = it.value === value;
            return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "tab", "aria-selected": active, onClick: () => onValueChange(it.value), className: (0, cn_1.cn)('-mb-px flex shrink-0 items-center gap-1.5 whitespace-nowrap border-b-2 px-6 py-2 text-sm transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-300', active
                    ? 'border-primary font-semibold text-primary'
                    : 'border-transparent font-medium text-muted hover:text-on-surface'), children: [it.label, it.badge != null ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-flex min-w-4 items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-semibold text-surface', active ? 'bg-primary' : 'bg-muted'), children: it.badge })) : null] }, it.value));
        }) }));
});
//# sourceMappingURL=ScrollableTabs.js.map