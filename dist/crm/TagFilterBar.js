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
exports.TagFilterBar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * Horizontally scrolling filter bar of toggleable chips (segments, tags,
 * sources). Selection state is conveyed by a filled tone **and** the chip's
 * `aria-pressed` state plus a leading ✓ glyph (not color alone). Controlled via
 * `selected` + a per-key `onToggle`; an optional `onClear` chip appears while any
 * filter is active. Guards an empty `tags` array. All colors are `--xen-*` token
 * classes.
 */
exports.TagFilterBar = React.forwardRef(function TagFilterBar({ tags, selected, onToggle, onClear, tone = 'primary', emptyLabel = 'No filters', className, ...rest }, ref) {
    const hasActive = selected.length > 0;
    if (tags.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "status", "aria-label": emptyLabel, className: (0, cn_1.cn)('py-[var(--xen-space-sm)] text-sm text-muted', className), ...rest, children: emptyLabel }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex w-full items-center gap-[var(--xen-space-xs)] overflow-x-auto', className), ...rest, children: [tags.map((tag) => {
                const isOn = selected.includes(tag.key);
                return ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-pressed": isOn, "aria-label": `Filter ${tag.label}${isOn ? ', selected' : ''}`, onClick: () => onToggle(tag.key), className: (0, cn_1.cn)('inline-flex shrink-0 items-center gap-1 rounded-full border px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-sm transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', isOn ? (0, cn_1.cn)((0, internal_1.toneFillClass)(tone), 'font-bold') : 'border-border bg-neutral-100 text-on-surface font-medium'), children: [isOn ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xs font-bold", children: "\u2713" })) : null, (0, jsx_runtime_1.jsx)("span", { children: tag.label }), tag.count != null ? (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', isOn ? '' : 'text-muted'), children: tag.count }) : null] }, tag.key));
            }), onClear && hasActive ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Clear filters", onClick: onClear, className: "shrink-0 rounded-full px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-sm font-semibold text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", children: "Clear" })) : null] }));
});
//# sourceMappingURL=TagFilterBar.js.map