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
exports.TableOfContents = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/** Per-nesting-level indent in px (guards against undefined `level`). */
function indentFor(level) {
    const depth = Math.max(0, (level ?? 1) - 1);
    return depth * 16;
}
/**
 * An in-article table of contents — the jump-list of headings for a long read.
 * Web (React DOM) mirror of the native `TableOfContents`. Data-driven via
 * `items` (each a `{ id, label, level }` heading); indents by nesting `level`
 * and highlights the `activeId` in the accent color. Clicking a row fires
 * `onSelect(id)`. Renders an `emptyLabel` when there are no headings. All colors
 * from `--xen-*` token classes.
 */
exports.TableOfContents = React.forwardRef(function TableOfContents({ items, activeId, onSelect, title = 'Contents', emptyLabel = 'No sections', className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("nav", { ref: ref, "aria-label": typeof title === 'string' ? title : 'Contents', className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)]', className), ...rest, children: [title != null ? ((0, jsx_runtime_1.jsx)("p", { className: "mb-[var(--xen-space-xs)] text-xs font-bold uppercase tracking-wide text-muted", children: title })) : null, items.length === 0 ? ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: emptyLabel })) : (items.map((item) => {
                const active = item.id === activeId;
                return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-current": active ? 'true' : undefined, disabled: !onSelect, onClick: onSelect ? () => onSelect(item.id) : undefined, style: { paddingLeft: indentFor(item.level) }, className: (0, cn_1.cn)('py-[var(--xen-space-xs)] text-left text-sm line-clamp-2', active ? 'font-bold text-accent' : 'font-normal text-on-surface', onSelect && 'cursor-pointer'), children: item.label }, item.id));
            }))] }));
});
//# sourceMappingURL=TableOfContents.js.map