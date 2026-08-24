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
exports.FolderRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * A navigation row for a mailbox / folder in the mail sidebar — leading glyph,
 * name, and an optional unread count. A real `<button>`. The `selected` state
 * tints the row with a token-derived primary wash and colors the label with the
 * primary slot, and reports `aria-current` so it isn't signalled by color
 * alone. Indents by `depth` for nested folders. No literal colors.
 */
exports.FolderRow = React.forwardRef(function FolderRow({ name, glyph, count = 0, selected = false, depth = 0, onClick, className }, ref) {
    const indent = Math.max(0, depth);
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", "aria-label": `${name}${count > 0 ? `, ${count} unread` : ''}`, "aria-current": selected ? 'page' : undefined, onClick: onClick, style: { paddingLeft: `calc(var(--xen-space-md) + ${indent} * var(--xen-space-lg))` }, className: (0, cn_1.cn)('flex w-full items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] py-[var(--xen-space-sm)] pr-[var(--xen-space-md)] text-left transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', selected ? 'bg-primary-50' : 'bg-transparent hover:bg-neutral-100', className), children: [glyph ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "base", color: selected ? 'primary' : 'muted' }) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('min-w-0 flex-1 truncate text-base', selected ? 'font-bold text-primary' : 'font-medium text-on-surface'), children: name }), count > 0 ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-flex min-w-[22px] items-center justify-center rounded-full px-[var(--xen-space-xs)] py-px text-xs font-bold', selected ? 'bg-primary text-on-primary' : 'bg-neutral-100 text-muted'), children: count > 999 ? '999+' : String(count) })) : null] }));
});
//# sourceMappingURL=FolderRow.js.map