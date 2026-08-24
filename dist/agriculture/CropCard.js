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
exports.CropCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const STAGE_META = {
    seeding: { label: 'Seeding', glyph: '🌱', tone: 'neutral' },
    growing: { label: 'Growing', glyph: '🌿', tone: 'primary' },
    flowering: { label: 'Flowering', glyph: '🌸', tone: 'primary' },
    mature: { label: 'Mature', glyph: '🌾', tone: 'success' },
    harvested: { label: 'Harvested', glyph: '📦', tone: 'neutral' },
};
const HEALTH_META = {
    healthy: { label: 'Healthy', text: 'text-success', tone: 'success' },
    stressed: { label: 'Stressed', text: 'text-warn', tone: 'warn' },
    critical: { label: 'Critical', text: 'text-danger', tone: 'danger' },
};
/**
 * A single crop / planting summary — glyph, name + variety, a growth-stage
 * {@link Badge}, an optional health chip (color is always paired with a text
 * label so an at-risk crop reads without color), and, in the `detailed`
 * variant, a maturity {@link Progress} bar plus field / harvest meta. When
 * `onClick` is set the card is an accessible `role="button"` with keyboard
 * activation; `loading` renders a muted placeholder. Token-bound throughout —
 * no literal colors.
 */
exports.CropCard = React.forwardRef(function CropCard({ name, variety, icon, stage = 'growing', health, progress, fieldLabel, harvestLabel, variant = 'detailed', loading = false, onClick, className, ...rest }, ref) {
    const stageMeta = STAGE_META[stage];
    const glyph = icon ?? stageMeta.glyph;
    const healthMeta = health ? HEALTH_META[health] : null;
    const detailed = variant === 'detailed';
    const clampedProgress = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : undefined;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, "data-xen-crop-card": "", className: className, ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-4 w-3/5 rounded bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "mt-2 h-3 w-2/5 rounded bg-neutral-200" })] }));
    }
    const interactive = typeof onClick === 'function';
    const handleKeyDown = (e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.();
        }
    };
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, "data-xen-crop-card": "", className: (0, cn_1.cn)(interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `${name}${variety ? `, ${variety}` : ''}, ${stageMeta.label}` : undefined, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? handleKeyDown : undefined, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: detailed ? '2xl' : 'xl', color: "primary" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate font-heading text-base font-bold text-on-surface", children: name }), variety != null ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted", children: variety }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-1", children: [(0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: stageMeta.tone, children: stageMeta.label }), healthMeta ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: healthMeta.tone, children: healthMeta.label }) : null] })] }), detailed && clampedProgress != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-1 flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "Maturity" }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-xs font-semibold', healthMeta ? healthMeta.text : 'text-on-surface'), children: [clampedProgress, "%"] })] }), (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: clampedProgress, tone: healthMeta ? healthMeta.tone : 'primary' })] })) : null, detailed && (fieldLabel != null || harvestLabel != null) ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-3 flex flex-wrap gap-3", children: [fieldLabel != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["\uD83D\uDCCD ", fieldLabel] })) : null, harvestLabel != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["\uD83D\uDDD3\uFE0F ", harvestLabel] })) : null] })) : null] }));
});
//# sourceMappingURL=CropCard.js.map