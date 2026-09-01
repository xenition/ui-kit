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
exports.FAQItemV4 = exports.FAQV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const reduced_motion_1 = require("../motion/internal/reduced-motion");
const cn_1 = require("../primitives/cn");
/**
 * FAQ — **V4** "showcase" design (web parity of the native V4). An elegant
 * accordion container: a clean vertical stack of `FAQItemV4` rows separated by
 * hairlines, on the page ground (NOT a gradient surface). Same props/behavior
 * as {@link FAQProps}; token-only colors, no literals.
 */
exports.FAQV4 = React.forwardRef(function FAQV4({ className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-faq": "", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', className), ...rest }));
});
/**
 * FAQItem — **V4** "showcase" design (web parity of the native V4). One clean
 * accordion row: an extra-bold question and a chevron on a full-width
 * `≥44px` toggle button, smooth grid `0fr → 1fr` expand (dropped under
 * `prefers-reduced-motion`), and — when open — a subtle soft-primary
 * (`bg-primary/5`) tint with a soft-primary chevron. `question` and
 * `defaultOpen` honored exactly. `aria-expanded`/`aria-controls` a11y
 * preserved. Same props/behavior as {@link FAQItemProps}; token-only colors,
 * no literals.
 */
exports.FAQItemV4 = React.forwardRef(function FAQItemV4({ question, defaultOpen = false, className, children, ...rest }, ref) {
    const [open, setOpen] = React.useState(defaultOpen);
    const reduced = (0, reduced_motion_1.usePrefersReducedMotion)();
    const panelId = React.useId();
    const buttonId = React.useId();
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-faq-item": "", className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] border border-border bg-surface px-[var(--xen-space-md)]', open && 'bg-primary/5', className), ...rest, children: [(0, jsx_runtime_1.jsx)("h3", { children: (0, jsx_runtime_1.jsxs)("button", { type: "button", id: buttonId, "aria-expanded": open, "aria-controls": panelId, onClick: () => setOpen((prev) => !prev), className: "flex min-h-[44px] w-full items-center justify-between gap-[var(--xen-space-md)] py-[var(--xen-space-md)] text-left font-heading text-base font-extrabold tracking-tight text-on-surface", children: [(0, jsx_runtime_1.jsx)("span", { children: question }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--xen-radius-full)] bg-primary/10 text-primary', !reduced && 'transition-transform duration-200'), style: { transform: open ? 'rotate(180deg)' : undefined }, children: (0, jsx_runtime_1.jsx)("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: (0, jsx_runtime_1.jsx)("path", { d: "M3 6l5 5 5-5" }) }) })] }) }), (0, jsx_runtime_1.jsx)("div", { style: {
                    display: 'grid',
                    gridTemplateRows: open ? '1fr' : '0fr',
                    transition: reduced ? undefined : 'grid-template-rows 250ms ease',
                }, children: (0, jsx_runtime_1.jsx)("div", { className: "overflow-hidden", children: (0, jsx_runtime_1.jsx)("div", { role: "region", id: panelId, "aria-labelledby": buttonId, className: "pb-[var(--xen-space-md)] text-sm leading-relaxed text-muted", children: children }) }) })] }));
});
//# sourceMappingURL=FAQV4.js.map