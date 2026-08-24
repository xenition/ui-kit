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
exports.AppShell = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
/**
 * Responsive dashboard layout: a fixed-width left `Sidebar` beside a main
 * column of an optional top bar (`header`) and a scrolling content area
 * (`children`). On narrow screens the rail collapses behind a hamburger and
 * slides in over a scrim. All colors/spacing come from `--xen-*` tokens — no
 * literal colors.
 */
exports.AppShell = React.forwardRef(function AppShell({ sidebar, header, children, sidebarWidth = 260, menuLabel = 'Toggle navigation', className, ...rest }, ref) {
    const [open, setOpen] = React.useState(false);
    const drawerId = React.useId();
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex min-h-screen w-full bg-surface text-on-surface', className), ...rest, children: [(0, jsx_runtime_1.jsx)("aside", { className: "hidden shrink-0 md:block", style: { width: sidebarWidth }, children: (0, jsx_runtime_1.jsx)("div", { className: "sticky top-0 h-screen", children: sidebar }) }), open ? ((0, jsx_runtime_1.jsxs)("div", { className: "fixed inset-0 z-40 md:hidden", role: "dialog", "aria-modal": "true", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Close navigation", onClick: () => setOpen(false), className: "absolute inset-0 bg-neutral-900/50" }), (0, jsx_runtime_1.jsx)("div", { id: drawerId, className: "absolute inset-y-0 left-0 shadow-lg", style: { width: sidebarWidth }, children: sidebar })] })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col", children: [header !== undefined ? ((0, jsx_runtime_1.jsxs)("header", { className: "sticky top-0 z-30 flex items-center gap-[var(--xen-space-md)] border-b border-border bg-surface px-[var(--xen-space-lg)] py-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": menuLabel, "aria-expanded": open, "aria-controls": drawerId, onClick: () => setOpen((prev) => !prev), className: "inline-flex items-center justify-center rounded-[var(--xen-radius-sm)] p-2 text-on-surface hover:bg-neutral-100 md:hidden", children: (0, jsx_runtime_1.jsx)("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: (0, jsx_runtime_1.jsx)("path", { d: "M3 5h14M3 10h14M3 15h14" }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-1 items-center justify-between gap-[var(--xen-space-md)]", children: header })] })) : null, (0, jsx_runtime_1.jsx)("main", { className: "min-w-0 flex-1 overflow-y-auto p-[var(--xen-space-lg)]", children: children })] })] }));
});
//# sourceMappingURL=AppShell.js.map