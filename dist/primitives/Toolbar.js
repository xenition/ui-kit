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
exports.Toolbar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const useDismiss_1 = require("./useDismiss");
/**
 * Web parity of the native `Toolbar`: a horizontal action bar — an optional
 * title, a row of inline action buttons, and an optional `⋯` overflow that
 * reveals extra actions in a dropdown panel. Uses the ARIA `toolbar` role. All
 * colors/radii/spacing come from the `--xen-*` tokens via Tailwind classes — no
 * literal colors.
 */
exports.Toolbar = React.forwardRef(function Toolbar({ className, title, actions = [], overflowActions = [], ...rest }, ref) {
    const [overflowOpen, setOverflowOpen] = React.useState(false);
    const overflowRef = (0, useDismiss_1.useDismiss)(overflowOpen, () => setOverflowOpen(false));
    const actionClass = (action) => (0, cn_1.cn)('rounded-[var(--xen-radius-sm)] px-2 py-2 text-sm font-semibold transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', 'disabled:pointer-events-none disabled:text-muted', action.destructive ? 'text-danger hover:bg-neutral-100' : 'text-primary hover:bg-neutral-100');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "toolbar", className: (0, cn_1.cn)('bg-surface flex items-center gap-1 rounded-[var(--xen-radius-md)] border border-border px-2 py-1', className), ...rest, children: [title != null ? ((0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-base font-bold text-on-surface", children: title })) : ((0, jsx_runtime_1.jsx)("span", { className: "flex-1" })), actions.map((a) => ((0, jsx_runtime_1.jsx)("button", { type: "button", disabled: a.disabled, onClick: () => a.onClick?.(), className: actionClass(a), children: a.label }, a.key))), overflowActions.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { ref: overflowRef, className: "relative", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "More actions", "aria-expanded": overflowOpen, "aria-haspopup": "menu", onClick: () => setOverflowOpen((o) => !o), className: "rounded-[var(--xen-radius-sm)] px-2 py-2 text-lg font-bold leading-none text-on-surface hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: "\u22EF" }), overflowOpen ? ((0, jsx_runtime_1.jsx)("div", { role: "menu", className: "bg-surface absolute right-0 z-50 mt-1 min-w-[10rem] rounded-[var(--xen-radius-md)] border border-border py-1 shadow-lg", children: overflowActions.map((a) => ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "menuitem", disabled: a.disabled, onClick: () => {
                                setOverflowOpen(false);
                                a.onClick?.();
                            }, className: (0, cn_1.cn)('flex w-full items-center px-3 py-1.5 text-left text-sm transition-colors', 'hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-50', a.destructive ? 'text-danger' : 'text-on-surface'), children: a.label }, a.key))) })) : null] })) : null] }));
});
//# sourceMappingURL=Toolbar.js.map