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
exports.BookmarkButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
/**
 * A toggle for saving / bookmarking an article — the web (React DOM) mirror of
 * the native `BookmarkButton`. Controlled: it reflects the `bookmarked` prop and
 * calls `onToggle(!bookmarked)` on click — the parent owns the state. Filled
 * accent glyph when saved, muted outline glyph when not. Exposes
 * `aria-pressed`/label to screen readers. Two variants (`icon` / `labeled`).
 * All colors from `--xen-*` token classes.
 */
exports.BookmarkButton = React.forwardRef(function BookmarkButton({ bookmarked, onToggle, variant = 'icon', disabled = false, className, ...rest }, ref) {
    const labeled = variant === 'labeled';
    const glyph = bookmarked ? '★' : '☆';
    const label = bookmarked ? 'Saved' : 'Save';
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", "aria-label": bookmarked ? 'Remove bookmark' : 'Bookmark article', "aria-pressed": bookmarked, disabled: disabled, onClick: () => onToggle(!bookmarked), className: (0, cn_1.cn)('inline-flex items-center gap-[var(--xen-space-xs)] rounded-full py-[var(--xen-space-xs)] transition-opacity', labeled
            ? 'border border-border px-[var(--xen-space-sm)]'
            : 'px-[var(--xen-space-xs)]', 'disabled:opacity-50 hover:opacity-80', className), ...rest, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "lg", color: bookmarked ? 'primary' : 'muted' }), labeled ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-semibold', bookmarked ? 'text-accent' : 'text-on-surface'), children: label })) : null] }));
});
//# sourceMappingURL=BookmarkButton.js.map