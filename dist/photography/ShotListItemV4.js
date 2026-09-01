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
exports.ShotListItemV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const PRIORITY = {
    must: { label: 'Must-have', glyph: '★', tone: 'danger', color: 'text-danger' },
    nice: { label: 'Nice-to-have', glyph: '☆', tone: 'primary', color: 'text-primary' },
    optional: { label: 'Optional', glyph: '○', tone: 'neutral', color: 'text-muted' },
};
/**
 * ShotListItem — **V4** "studio" design (web parity of the native V4). A
 * checklist row on a clean, elevated studio surface: an elevated `shadow-md`
 * row, a check affordance, the shot title (struck when `done`), a muted notes
 * line, and the `priority` shown three ways — a leading glyph, a token color,
 * and a labelled `Badge` — so it never rides on color alone: `must` (★, danger),
 * `nice` (☆, primary), `optional` (○, muted). The whole row is a
 * keyboard-operable `checkbox` when `onToggle` is provided; its captured state
 * is announced via `aria-checked` and a ✓ glyph. Identical props/behavior to
 * {@link ShotListItemProps}. All colors from `--xen-*` token classes.
 */
exports.ShotListItemV4 = React.forwardRef(function ShotListItemV4({ title, notes, done = false, priority, onToggle, className, ...rest }, ref) {
    const toggleable = typeof onToggle === 'function';
    const meta = priority ? PRIORITY[priority] : null;
    const checkbox = ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)]', done ? 'bg-success' : 'border border-border'), children: done ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2713", size: "sm", color: "onSuccess" }) : null }));
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [checkbox, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-base font-bold', done ? 'text-muted line-through' : 'text-on-surface'), children: title }), notes ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: notes }) : null] }), meta ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-sm', meta.color), children: meta.glyph }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", children: meta.label })] })) : null] }));
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-shot-list-item": "", role: toggleable ? 'checkbox' : undefined, "aria-checked": toggleable ? done : undefined, "aria-label": toggleable ? title : undefined, tabIndex: toggleable ? 0 : undefined, onClick: toggleable ? onToggle : undefined, onKeyDown: toggleable
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onToggle?.();
                }
            }
            : undefined, className: (0, cn_1.cn)('flex min-h-[44px] items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-on-surface shadow-md', toggleable &&
            'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...rest, children: inner }));
});
//# sourceMappingURL=ShotListItemV4.js.map