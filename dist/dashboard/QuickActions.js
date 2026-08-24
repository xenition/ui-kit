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
exports.QuickActions = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * A grid of labelled quick-action buttons — the shortcut launcher on a
 * dashboard home. Each tile is a square-ish token-bound button with an optional
 * icon above the label. Token-only.
 */
exports.QuickActions = React.forwardRef(function QuickActions({ actions, title, columns = 3, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [title ? (0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-bold text-on-surface", children: title }) : null, (0, jsx_runtime_1.jsx)("div", { className: "grid gap-sm", style: { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }, children: actions.map((action) => ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": action.label, disabled: action.disabled, onClick: action.onClick, className: (0, cn_1.cn)('flex flex-col items-center justify-center gap-xs rounded-[var(--xen-radius-md)] border border-border bg-surface px-sm py-lg', 'transition-colors hover:bg-neutral-100', 'disabled:pointer-events-none disabled:opacity-50'), children: [action.icon ? (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: action.icon }) : null, (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-surface", children: action.label })] }, action.key))) })] }));
});
//# sourceMappingURL=QuickActions.js.map