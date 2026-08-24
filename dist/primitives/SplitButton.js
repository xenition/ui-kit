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
exports.SplitButton = SplitButton;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const useDismiss_1 = require("./useDismiss");
/**
 * Web parity of the native `SplitButton`: a primary action fused to a caret that
 * toggles a dropdown of secondary actions. `primary` fills with the `primary`
 * token; `secondary` is outlined. All colors/radii/spacing come from the
 * `--xen-*` tokens via Tailwind classes — no literal colors.
 */
function SplitButton({ label, onClick, actions, variant = 'primary', disabled = false, className, }) {
    const [open, setOpen] = React.useState(false);
    const ref = (0, useDismiss_1.useDismiss)(open, () => setOpen(false));
    const filled = variant === 'primary';
    const faceClass = filled
        ? 'bg-primary text-on-primary hover:opacity-90'
        : 'bg-transparent text-primary hover:bg-primary-50';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('relative inline-block', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('inline-flex overflow-hidden rounded-[var(--xen-radius-md)]', !filled && 'border border-primary', disabled && 'pointer-events-none opacity-50'), children: [(0, jsx_runtime_1.jsx)("button", { type: "button", disabled: disabled, onClick: () => onClick?.(), className: (0, cn_1.cn)('px-6 py-2 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-300', faceClass), children: label }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('w-px self-stretch', filled ? 'bg-on-primary opacity-40' : 'bg-primary opacity-40') }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "More actions", "aria-expanded": open, "aria-haspopup": "menu", disabled: disabled, onClick: () => setOpen((o) => !o), className: (0, cn_1.cn)('flex items-center justify-center px-2 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-300', faceClass), children: (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs transition-transform', open && 'rotate-180'), children: "\u25BE" }) })] }), open ? ((0, jsx_runtime_1.jsx)("div", { role: "menu", className: "bg-surface absolute left-0 z-50 mt-1 min-w-[10rem] rounded-[var(--xen-radius-md)] border border-border py-1 shadow-lg", children: actions.map((action) => ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "menuitem", disabled: action.disabled, onClick: () => {
                        setOpen(false);
                        action.onClick?.();
                    }, className: (0, cn_1.cn)('flex w-full items-center px-3 py-2 text-left text-sm transition-colors', 'hover:bg-neutral-100 disabled:pointer-events-none disabled:text-muted', action.destructive ? 'text-danger' : 'text-on-surface'), children: action.label }, action.key))) })) : null] }));
}
//# sourceMappingURL=SplitButton.js.map