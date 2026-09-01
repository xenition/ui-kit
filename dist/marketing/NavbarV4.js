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
exports.NavbarV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * Navbar — **V4** "showcase" design (web parity of the native V4). NOT a
 * gradient surface: a crisp, refined marketing bar on a solid `surface` ground
 * with a clean bottom border, a bolder brand slot, and clear medium-weight
 * links. Sticky behavior + the passive scroll listener are preserved — once
 * scrolled past `scrollThreshold` the bar keeps its border and gains a subtle
 * backdrop blur. `children` are the nav links (collapsing behind a disclosure
 * menu on small screens). Honors every prop of {@link NavbarProps}
 * (`logo`/`actions`/`scrollThreshold`/`menuLabel`); token-only colors, no
 * literals.
 */
exports.NavbarV4 = React.forwardRef(function NavbarV4({ logo, actions, scrollThreshold = 8, menuLabel = 'Menu', className, children, ...rest }, ref) {
    const [scrolled, setScrolled] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const menuId = React.useId();
    React.useEffect(() => {
        if (typeof window === 'undefined')
            return undefined;
        const onScroll = () => setScrolled(window.scrollY > scrollThreshold);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, [scrollThreshold]);
    return ((0, jsx_runtime_1.jsxs)("header", { ref: ref, "data-xen-navbar": "", "data-scrolled": scrolled ? 'true' : 'false', className: (0, cn_1.cn)('sticky top-0 z-50 border-b border-border bg-surface transition-shadow', scrolled && 'shadow-sm backdrop-blur-md', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "mx-auto flex max-w-6xl items-center justify-between gap-[var(--xen-space-md)] px-[var(--xen-space-lg)] py-[var(--xen-space-sm)]", children: [logo !== undefined ? ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center font-heading text-lg font-extrabold tracking-tight text-on-surface", children: logo })) : null, (0, jsx_runtime_1.jsx)("nav", { className: "hidden items-center gap-[var(--xen-space-lg)] text-sm font-semibold text-on-surface md:flex", children: children }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [actions, (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-expanded": open, "aria-controls": menuId, "aria-label": menuLabel, onClick: () => setOpen((prev) => !prev), className: "inline-flex h-11 w-11 items-center justify-center rounded-[var(--xen-radius-sm)] p-2 text-on-surface hover:bg-neutral-100 md:hidden", children: (0, jsx_runtime_1.jsx)("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: open ? ((0, jsx_runtime_1.jsx)("path", { d: "M5 5l10 10M15 5L5 15" })) : ((0, jsx_runtime_1.jsx)("path", { d: "M3 5h14M3 10h14M3 15h14" })) }) })] })] }), open ? ((0, jsx_runtime_1.jsx)("nav", { id: menuId, "data-xen-navbar-menu": "", className: "flex flex-col gap-[var(--xen-space-sm)] border-t border-border bg-surface px-[var(--xen-space-lg)] py-[var(--xen-space-md)] text-sm font-semibold text-on-surface md:hidden", children: children })) : null] }));
});
//# sourceMappingURL=NavbarV4.js.map