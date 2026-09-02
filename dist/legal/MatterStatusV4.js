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
exports.MatterStatusV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * MatterStatus — **V4** "chambers" design (web parity of the native V4), and the
 * ONE reserved gradient moment of the legal V4 "chambers" line: the header
 * (matter title, current stage glyph + word, and a frosted "Stage N of 6" chip)
 * rides a brand-gradient ground (`bg-gradient-to-br from-primary-500 to-primary-700`)
 * in near-white ink (`text-primary-50` / `text-primary-100`). The body — the
 * segmented **intake → active → discovery → trial → settlement → closed** meter —
 * stays on the plain surface: segments up to the current stage fill with the
 * stage tone token, the rest use the border token. Status is carried by glyph +
 * stage word, never color alone; exposes an ARIA `progressbar`. Reuses the base
 * `variant` (`default` / `compact`). All colors from `--xen-*` token classes /
 * gradient utilities (no literals).
 */
exports.MatterStatusV4 = React.forwardRef(function MatterStatusV4({ title, stage, progressPct, opened, attorney, variant = 'default', onClick, testID, className, ...rest }, ref) {
    const compact = variant === 'compact';
    const currentIndex = Math.max(0, internal_1.MATTER_STAGE_ORDER.indexOf(stage));
    const total = internal_1.MATTER_STAGE_ORDER.length;
    const derivedPct = (0, internal_1.clampPct)(progressPct ?? Math.round(((currentIndex + 1) / total) * 100));
    const stageMeta = internal_1.MATTER_STAGE_META[stage];
    const fillClass = (0, internal_1.toneBgClass)(stageMeta.tone);
    const interactive = Boolean(onClick);
    const shell = 'flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-testid": testID, "data-xen-matter-status": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `Matter ${title ?? stageMeta.label}` : undefined, onClick: interactive ? onClick : undefined, onKeyDown: interactive ? (0, internal_1.activateOnKey)(onClick) : undefined, className: (0, cn_1.cn)(shell, interactive && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex items-center justify-between gap-[var(--xen-space-sm)] bg-gradient-to-br from-primary-500 to-primary-700 text-primary-50', compact ? 'px-[var(--xen-space-md)] py-[var(--xen-space-sm)]' : 'p-[var(--xen-space-lg)]'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-col gap-0.5", children: [title ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-primary-50", children: title }) : null, (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-[var(--xen-space-xs)] text-sm font-semibold text-primary-100", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: stageMeta.glyph }), stageMeta.label] }), !compact && (opened || attorney) ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-primary-100", children: [opened, attorney].filter(Boolean).join('  ·  ') })) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: "inline-flex shrink-0 items-center rounded-full border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-xs font-bold tabular-nums text-primary-50", children: ["Stage ", currentIndex + 1, " of ", total] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-lg)]", children: [(0, jsx_runtime_1.jsx)("div", { role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": derivedPct, "aria-label": `${stageMeta.label}, ${derivedPct}% complete`, className: "flex gap-[3px]", children: internal_1.MATTER_STAGE_ORDER.map((s, i) => ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-2 flex-1 rounded-full', i <= currentIndex ? fillClass : 'bg-border') }, s))) }), !compact ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs tabular-nums text-muted", children: ["Stage ", currentIndex + 1, " of ", total, " \u00B7 ", derivedPct, "%"] })) : null] })] }));
});
//# sourceMappingURL=MatterStatusV4.js.map