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
exports.FolderRowV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * FolderRow — design **V2**. A **tile**: a large folder glyph on a soft tinted
 * chip, the name beneath, and the unread count as a corner `Badge`. The
 * `selected` state raises the tile (shadow + primary border + primary label) and
 * reports `aria-current` so it isn't signalled by color alone. Lifts on hover.
 * The `depth` indent still applies. Same props as `FolderRow`. No literal colors.
 */
exports.FolderRowV2 = React.forwardRef(function FolderRowV2({ name, glyph, count = 0, selected = false, depth = 0, onClick, className }, ref) {
    const indent = Math.max(0, depth);
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", "aria-label": `${name}${count > 0 ? `, ${count} unread` : ''}`, "aria-current": selected ? 'page' : undefined, onClick: onClick, style: { marginLeft: `calc(var(--xen-space-xs) + ${indent} * var(--xen-space-lg))` }, className: (0, cn_1.cn)('flex w-full flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border p-[var(--xen-space-md)] text-left transition duration-200', 'hover:-translate-y-0.5 hover:shadow-md active:scale-[.98]', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', 'motion-reduce:transition-none motion-reduce:hover:transform-none', selected ? 'border-primary bg-primary/10 shadow-md' : 'border-border bg-surface', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-flex h-10 w-10 items-center justify-center rounded-[var(--xen-radius-md)]', selected ? 'bg-primary/20' : 'bg-neutral-100'), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph ?? '📁', size: "lg", color: selected ? 'primary' : 'muted' }) }), count > 0 ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: selected ? 'primary' : 'neutral', variant: selected ? 'solid' : 'soft', size: "sm", children: count > 999 ? '999+' : String(count) })) : null] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('min-w-0 truncate text-base', selected ? 'font-bold text-primary' : 'font-semibold text-on-surface'), children: name })] }));
});
//# sourceMappingURL=FolderRowV2.js.map