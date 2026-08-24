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
exports.FolderRowV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * FolderRow — design **V3**. A **compact, indented list line** for a deep folder
 * tree: a leading accent rail, a small glyph, the name, and a plain right-aligned
 * count — no pill, no fill, tight vertical rhythm. The `selected` state lights the
 * rail + bolds the primary label and reports `aria-current` (never color-alone).
 * Indents by `depth`. Same props as `FolderRow`. No literal colors.
 */
exports.FolderRowV3 = React.forwardRef(function FolderRowV3({ name, glyph, count = 0, selected = false, depth = 0, onClick, className }, ref) {
    const indent = Math.max(0, depth);
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", "aria-label": `${name}${count > 0 ? `, ${count} unread` : ''}`, "aria-current": selected ? 'page' : undefined, onClick: onClick, style: { paddingLeft: `calc(var(--xen-space-sm) + ${indent} * var(--xen-space-md))` }, className: (0, cn_1.cn)('flex w-full items-center gap-[var(--xen-space-sm)] py-[var(--xen-space-xs)] pr-[var(--xen-space-md)] text-left transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', selected ? 'bg-neutral-100' : 'bg-transparent hover:bg-neutral-100', className), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('inline-block w-0.5 shrink-0 self-stretch rounded-full', selected ? 'bg-primary' : 'bg-transparent') }), glyph ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "sm", color: selected ? 'primary' : 'muted' }) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('min-w-0 flex-1 truncate text-sm', selected ? 'font-bold text-primary' : 'font-medium text-on-surface'), children: name }), count > 0 ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-bold', selected ? 'text-primary' : 'text-muted'), children: count > 999 ? '999+' : String(count) })) : null] }));
});
//# sourceMappingURL=FolderRowV3.js.map