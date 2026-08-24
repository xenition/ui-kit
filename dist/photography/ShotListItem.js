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
exports.ShotListItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const PRIORITY_LABEL = {
    must: 'Must-have',
    nice: 'Nice-to-have',
    optional: 'Optional',
};
/**
 * A shot-list checklist row — a check affordance, the shot title (struck when
 * `done`), an optional notes line, and a priority `Badge`. The whole row is a
 * keyboard-operable `checkbox` when `onToggle` is provided: its captured state
 * is announced via `aria-checked` and a ✓ glyph, never color alone. Composes
 * `Icon` and `Badge`. Token-only colors.
 */
exports.ShotListItem = React.forwardRef(function ShotListItem({ title, notes, done = false, priority, onToggle, className, ...rest }, ref) {
    const toggleable = typeof onToggle === 'function';
    const checkbox = ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)]', done ? 'bg-success' : 'border border-border'), children: done ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2713", size: "sm", color: "onSuccess" }) : null }));
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [checkbox, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-base font-semibold', done ? 'text-muted line-through' : 'text-on-surface'), children: title }), notes ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: notes }) : null] }), priority ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: priority === 'must' ? 'danger' : 'neutral', children: PRIORITY_LABEL[priority] })) : null] }));
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-shot-list-item": "", role: toggleable ? 'checkbox' : undefined, "aria-checked": toggleable ? done : undefined, "aria-label": toggleable ? title : undefined, tabIndex: toggleable ? 0 : undefined, onClick: toggleable ? onToggle : undefined, onKeyDown: toggleable
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onToggle?.();
                }
            }
            : undefined, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)]', toggleable &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, children: inner }));
});
//# sourceMappingURL=ShotListItem.js.map