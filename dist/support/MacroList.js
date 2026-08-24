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
exports.MacroList = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const commerce_1 = require("../commerce");
/**
 * A list of agent macros (bundled actions that mutate a ticket) rendered as a
 * `menu` of native `<button>` `menuitem`s (click + keyboard for free). Each row
 * shows a glyph, name, optional description, and an action-count hint; activating
 * reports the macro via `onApply`. Handles `loading` (placeholder rows) and empty
 * (`EmptyState`) states, and disables `disabled` macros. Indexing is guarded and
 * colors come from token classes only.
 */
exports.MacroList = React.forwardRef(function MacroList({ macros, onApply, loading = false, emptyText = 'No macros available.', className, ...rest }, ref) {
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": "Loading macros", "aria-busy": "true", className: (0, cn_1.cn)('animate-pulse', className), ...rest, children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3 border-b border-border p-3", children: [(0, jsx_runtime_1.jsx)("span", { className: "h-6 w-6 rounded-md bg-neutral-100" }), (0, jsx_runtime_1.jsx)("span", { className: "h-3 flex-1 rounded bg-neutral-100" })] }, i))) }));
    }
    if (macros.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { title: emptyText, className: "border-0" }) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "menu", className: className, ...rest, children: macros.map((macro) => {
            const isDisabled = macro.disabled === true;
            const count = typeof macro.actionCount === 'number' && macro.actionCount > 0 ? macro.actionCount : undefined;
            return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "menuitem", "aria-disabled": isDisabled, "aria-label": `Apply macro ${macro.name}`, disabled: isDisabled || !onApply, onClick: onApply ? () => onApply(macro) : undefined, className: (0, cn_1.cn)('flex w-full items-center gap-3 border-b border-border p-3 text-left', isDisabled
                    ? 'opacity-50'
                    : 'hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'), children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: macro.glyph ?? '⚡', size: "lg", color: isDisabled ? 'muted' : 'primary' }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-base font-semibold', isDisabled ? 'text-muted' : 'text-on-surface'), children: macro.name }), macro.description ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: macro.description })) : null] }), count !== undefined ? ((0, jsx_runtime_1.jsxs)("span", { className: "shrink-0 text-xs text-muted", children: [count, " action", count === 1 ? '' : 's'] })) : null] }, macro.id));
        }) }));
});
//# sourceMappingURL=MacroList.js.map