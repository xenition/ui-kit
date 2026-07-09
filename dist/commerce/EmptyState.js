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
exports.EmptyState = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * Generic empty / no-results state — an empty cart, a filtered catalog with no
 * matches, an order list with nothing yet. Centered icon slot, muted copy, and
 * an optional action. Token-only and domain-agnostic.
 */
exports.EmptyState = React.forwardRef(function EmptyState({ icon, title, description, action, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-empty-state": "", className: (0, cn_1.cn)('flex flex-col items-center justify-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-dashed border-border bg-surface px-[var(--xen-space-lg)] py-[var(--xen-space-2xl)] text-center', className), ...rest, children: [icon ? ((0, jsx_runtime_1.jsx)("div", { "data-xen-empty-icon": "", className: "text-muted", "aria-hidden": "true", children: icon })) : null, (0, jsx_runtime_1.jsx)("p", { className: "font-heading text-base font-semibold text-on-surface", children: title }), description ? ((0, jsx_runtime_1.jsx)("p", { className: "max-w-sm text-sm leading-relaxed text-muted", children: description })) : null, action ? (0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-sm)]", children: action }) : null] }));
});
//# sourceMappingURL=EmptyState.js.map