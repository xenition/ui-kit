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
exports.CropCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const STAGE = {
    seeding: { glyph: '🌱', label: 'Seeding' }, growing: { glyph: '🌿', label: 'Growing' }, flowering: { glyph: '🌸', label: 'Flowering' }, mature: { glyph: '🌾', label: 'Mature' }, harvested: { glyph: '📦', label: 'Harvested' },
};
const HEALTH = {
    healthy: { label: 'Healthy', tone: 'success', tint: 'bg-success/10' }, stressed: { label: 'Stressed', tone: 'warn', tint: 'bg-warn/10' }, critical: { label: 'Critical', tone: 'danger', tint: 'bg-danger/10' },
};
/**
 * CropCard, redesigned (v2): a **hero planting card**. A big stage glyph sits in a
 * health-tinted disc; the name/variety, stage + health chips, a maturity bar, and
 * field/harvest hints follow. Elevated. Distinct from v1. Same props, token-only.
 */
exports.CropCardV2 = React.forwardRef(function CropCardV2({ name, variety, icon, stage = 'growing', health, progress, fieldLabel, harvestLabel, variant, loading = false, onClick, className, ...rest }, ref) {
    void variant;
    const st = STAGE[stage];
    const h = health ? HEALTH[health] : undefined;
    const interactive = typeof onClick === 'function';
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-crop-card": "", "aria-label": "Loading crop", className: (0, cn_1.cn)('h-32 animate-pulse rounded-lg bg-neutral-100', className), ...rest });
    }
    const meta = [fieldLabel, harvestLabel].filter((s) => !!s).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-crop-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": name, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
        } } : undefined, className: (0, cn_1.cn)('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-sm', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-14 w-14 items-center justify-center rounded-full text-2xl', h?.tint ?? 'bg-neutral-100'), "aria-hidden": true, children: icon ?? st.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: name }), variety ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: variety }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-1", children: [(0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "neutral", children: st.label }), h ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: h.tone, children: h.label }) : null] })] }), typeof progress === 'number' ? (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: Math.max(0, Math.min(100, progress)), tone: "success", size: "sm" }) : null, meta ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: meta }) : null] }));
});
//# sourceMappingURL=CropCardV2.js.map