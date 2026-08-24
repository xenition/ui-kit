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
exports.MatterStatus = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * Stage tracker for a legal matter: a segmented progress meter across the
 * intake → active → discovery → trial → settlement → closed workflow, with the
 * current stage as a glyph + word pill (never color alone). Segments up to and
 * including the current stage fill with the stage tone token; the rest use the
 * border token. Exposes an ARIA `progressbar`. All colors are `--xen-*` token
 * classes — no literals.
 */
exports.MatterStatus = React.forwardRef(function MatterStatus({ title, stage, progressPct, opened, attorney, variant = 'default', onClick, testID, className, ...rest }, ref) {
    const compact = variant === 'compact';
    const currentIndex = Math.max(0, internal_1.MATTER_STAGE_ORDER.indexOf(stage));
    const total = internal_1.MATTER_STAGE_ORDER.length;
    const derivedPct = (0, internal_1.clampPct)(progressPct ?? Math.round(((currentIndex + 1) / total) * 100));
    const stageMeta = internal_1.MATTER_STAGE_META[stage];
    const fillClass = (0, internal_1.toneBgClass)(stageMeta.tone);
    const interactive = Boolean(onClick);
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, "data-testid": testID, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `Matter ${title ?? stageMeta.label}` : undefined, onClick: interactive ? onClick : undefined, onKeyDown: interactive ? (0, internal_1.activateOnKey)(onClick) : undefined, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', compact && 'p-[var(--xen-space-md)]', interactive && 'cursor-pointer', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [title ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-bold text-on-surface", children: title })) : null, !compact && (opened || attorney) ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: [opened, attorney].filter(Boolean).join(' · ') })) : null] }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: stageMeta, size: "sm" })] }), (0, jsx_runtime_1.jsx)("div", { role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": derivedPct, "aria-label": `${stageMeta.label}, ${derivedPct}% complete`, className: "flex gap-[3px]", children: internal_1.MATTER_STAGE_ORDER.map((s, i) => ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-1.5 flex-1 rounded-full', i <= currentIndex ? fillClass : 'bg-border') }, s))) }), !compact ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["Stage ", currentIndex + 1, " of ", total, " \u00B7 ", derivedPct, "%"] })) : null] }));
});
//# sourceMappingURL=MatterStatus.js.map