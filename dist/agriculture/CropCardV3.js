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
exports.CropCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const STAGE = {
    seeding: { glyph: '🌱', label: 'Seeding' }, growing: { glyph: '🌿', label: 'Growing' }, flowering: { glyph: '🌸', label: 'Flowering' }, mature: { glyph: '🌾', label: 'Mature' }, harvested: { glyph: '📦', label: 'Harvested' },
};
const HEALTH_DOT = { healthy: 'bg-success', stressed: 'bg-warn', critical: 'bg-danger' };
const HEALTH_LABEL = { healthy: 'Healthy', stressed: 'Stressed', critical: 'Critical' };
/**
 * CropCard, redesigned (v3): a **dense planting line**. The stage glyph leads, the
 * name over a stage·field·harvest line with a thin maturity underline, and a
 * health dot + word trail — hairline-bordered for a plot list. The opposite of
 * v2's hero. Health is dot + word, never color alone. Same props, token-only.
 */
exports.CropCardV3 = React.forwardRef(function CropCardV3({ name, variety, icon, stage = 'growing', health, progress, fieldLabel, harvestLabel, variant, loading = false, onClick, className, ...rest }, ref) {
    void variant;
    void variety;
    const st = STAGE[stage];
    const interactive = typeof onClick === 'function';
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-crop-card": "", "aria-label": "Loading crop", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', className), ...rest, children: (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" }) });
    }
    const meta = [st.label, fieldLabel, harvestLabel].filter((s) => !!s).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-crop-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": name, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
        } } : undefined, className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xl", "aria-hidden": true, children: icon ?? st.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: name }), (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: meta }), typeof progress === 'number' ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-1 h-0.5 w-full overflow-hidden rounded-full bg-neutral-100", children: (0, jsx_runtime_1.jsx)("div", { className: "h-full rounded-full bg-success", style: { width: `${Math.max(0, Math.min(100, progress))}%` } }) })) : null] }), health ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1 text-xs text-muted", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-block h-2 w-2 rounded-full', HEALTH_DOT[health]), "aria-hidden": true }), HEALTH_LABEL[health]] })) : null] }));
});
//# sourceMappingURL=CropCardV3.js.map