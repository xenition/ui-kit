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
exports.MacroListV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const internal_1 = require("./internal");
/**
 * MacroList — **V4** "calm console" design (web parity of the native V4). A tidy
 * list of macro rows, each a ≥44px `menuitem` with a leading soft-tint glyph disc
 * (one accent = primary), the macro name + optional description, and an
 * action-count run hint. Hover/focus paints a soft-primary tint; `disabled`
 * macros dim and stop responding. Activating reports the macro via `onApply`
 * (click + keyboard). Same props/behavior as {@link MacroListProps}; all colors
 * from `--xen-*` token classes (no literal hex). Dark-mode safe.
 */
exports.MacroListV4 = React.forwardRef(function MacroListV4({ macros, onApply, loading = false, emptyText = 'No macros available.', className, ...rest }, ref) {
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": "Loading macros", "aria-busy": "true", className: (0, cn_1.cn)('flex animate-pulse flex-col gap-2', className), ...rest, children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-3", children: [(0, jsx_runtime_1.jsx)("span", { className: "h-9 w-9 shrink-0 rounded-full bg-on-surface/10" }), (0, jsx_runtime_1.jsx)("span", { className: "h-3 flex-1 rounded bg-on-surface/10" })] }, i))) }));
    }
    if (macros.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { title: emptyText, className: "border-0" }) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "menu", className: (0, cn_1.cn)('flex flex-col gap-2', className), ...rest, children: macros.map((macro) => {
            const isDisabled = macro.disabled === true;
            const count = typeof macro.actionCount === 'number' && macro.actionCount > 0 ? macro.actionCount : undefined;
            return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "menuitem", "aria-disabled": isDisabled, "aria-label": `Apply macro ${macro.name}`, disabled: isDisabled || !onApply, onClick: onApply ? () => onApply(macro) : undefined, onKeyDown: !isDisabled && onApply ? (0, internal_1.activateOnKey)(() => onApply(macro)) : undefined, className: (0, cn_1.cn)('flex min-h-[44px] w-full items-center gap-3 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-3 text-left shadow-sm', isDisabled
                    ? 'opacity-50'
                    : 'cursor-pointer hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base', isDisabled ? 'bg-muted/10 text-muted' : 'bg-primary/10 text-primary'), children: macro.glyph ?? '⚡' }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-base font-semibold', isDisabled ? 'text-muted' : 'text-on-surface'), children: macro.name }), macro.description ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: macro.description })) : null] }), count !== undefined ? ((0, jsx_runtime_1.jsxs)("span", { className: "shrink-0 text-xs text-muted", children: [count, " action", count === 1 ? '' : 's'] })) : null] }, macro.id));
        }) }));
});
//# sourceMappingURL=MacroListV4.js.map