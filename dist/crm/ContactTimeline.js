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
exports.ContactTimeline = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * Vertical activity timeline for a contact / deal: each event is a glyph node
 * (kind → glyph + tone, matching {@link ACTIVITY_META}) on a connector rail,
 * with title, detail and an actor · timestamp meta line. The connector is
 * suppressed on the last node via guarded indexing. Renders a `loading` skeleton
 * and an `emptyLabel` placeholder. All colors are `--xen-*` token classes; node
 * glyphs are tone-colored over a `bg-neutral-100` chip.
 */
exports.ContactTimeline = React.forwardRef(function ContactTimeline({ items, onItemClick, loading = false, emptyLabel = 'No activity yet', className, ...rest }, ref) {
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": "Loading timeline", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)]', className), ...rest, children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-7 w-7 shrink-0 rounded-full bg-neutral-100" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-[var(--xen-space-xs)] pt-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-3 w-[60%] rounded-[var(--xen-radius-sm)] bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-2.5 w-[35%] rounded-[var(--xen-radius-sm)] bg-neutral-100" })] })] }, i))) }));
    }
    if (items.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "status", "aria-label": emptyLabel, className: (0, cn_1.cn)('py-[var(--xen-space-lg)] text-center text-sm text-muted', className), ...rest, children: emptyLabel }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "list", className: (0, cn_1.cn)('flex flex-col', className), ...rest, children: items.map((item, index) => {
            const meta = internal_1.ACTIVITY_META[item.kind];
            const isLast = index === items.length - 1;
            const metaLine = [item.actor, item.timestamp].filter(Boolean).join(' · ');
            const interactive = onItemClick ? (0, internal_1.activate)(() => onItemClick(item)) : {};
            return ((0, jsx_runtime_1.jsxs)("div", { role: "listitem", "aria-label": `${meta.label}: ${item.title}`, className: (0, cn_1.cn)('flex gap-[var(--xen-space-sm)]', onItemClick && 'cursor-pointer rounded-[var(--xen-radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'), ...interactive, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex w-7 flex-col items-center", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-7 w-7 items-center justify-center rounded-full border border-border bg-neutral-100 text-xs', (0, internal_1.toneTextClass)(meta.tone)), children: meta.glyph }), isLast ? null : (0, jsx_runtime_1.jsx)("span", { className: "my-0.5 w-0.5 flex-1 bg-border" })] }), (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('min-w-0 flex-1', isLast ? '' : 'pb-[var(--xen-space-md)]'), children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-semibold text-on-surface", children: item.title }), item.detail ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: item.detail }) : null, metaLine ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs font-medium text-muted", children: metaLine }) : null] })] }, item.id));
        }) }));
});
//# sourceMappingURL=ContactTimeline.js.map