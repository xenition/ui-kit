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
exports.VehicleCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/** Status → badge tone + spelled-out word + glyph (never color alone). */
const STATUS = {
    available: { tone: 'success', word: 'Available', glyph: '●' },
    'in-use': { tone: 'primary', word: 'In use', glyph: '▶' },
    maintenance: { tone: 'warn', word: 'Maintenance', glyph: '🔧' },
    offline: { tone: 'neutral', word: 'Offline', glyph: '○' },
};
/**
 * A fleet vehicle summary — make/model, plate, class, color, year, an
 * operational status, and optional spec chips. The status is shown with a glyph
 * plus a spelled-out word and an a11y label, so meaning never rests on color.
 * Data + `onClick` only; nothing fetches. Colors come from `--xen-*` token
 * classes — no literal colors. When `onClick` is set the card is a
 * keyboard-operable `role="button"`. `variant="compact"` renders a denser row.
 * Spec indexing is guarded against a missing array. Web parity of the native
 * `VehicleCard`.
 */
exports.VehicleCard = React.forwardRef(function VehicleCard({ name, plate, vehicleClass, color, year, status = 'available', specs, variant = 'default', onClick, loading = false, className, ...rest }, ref) {
    const compact = variant === 'compact';
    const pad = compact ? 'p-[var(--xen-space-md)]' : 'p-[var(--xen-space-lg)]';
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-vehicle-card": "", "aria-busy": "true", "aria-label": "Loading vehicle", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface', pad, className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-4 w-[55%] animate-pulse rounded bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3.5 w-[75%] animate-pulse rounded bg-neutral-100" })] }));
    }
    const s = STATUS[status] ?? STATUS.available;
    const subtitleParts = [year ? String(year) : null, color, vehicleClass].filter(Boolean);
    const specList = Array.isArray(specs) ? specs : [];
    const a11y = `Vehicle ${name}${plate ? `, plate ${plate}` : ''}, ${s.word}`;
    const interactive = Boolean(onClick);
    const body = ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col', compact ? 'gap-[var(--xen-space-sm)]' : 'gap-[var(--xen-space-md)]'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("span", { className: "block truncate text-base font-bold text-on-surface", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\uD83D\uDE97 " }), name] }), subtitleParts.length ? ((0, jsx_runtime_1.jsx)("span", { className: "block truncate text-xs text-muted", children: subtitleParts.join(' · ') })) : null] }), (0, jsx_runtime_1.jsxs)(primitives_1.Badge, { tone: s.tone, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: s.glyph }), " ", s.word] })] }), plate ? ((0, jsx_runtime_1.jsx)("div", { className: "flex", children: (0, jsx_runtime_1.jsx)("span", { className: "rounded-[var(--xen-radius-sm)] border border-border bg-neutral-100 px-[var(--xen-space-sm)] py-0.5 text-sm font-extrabold tracking-[0.15em] text-on-surface", children: plate }) })) : null, specList.length && !compact ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-[var(--xen-space-sm)]", children: specList.map((spec, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "rounded-[var(--xen-radius-sm)] bg-primary-50 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "block text-xs text-muted", children: spec.label }), (0, jsx_runtime_1.jsx)("span", { className: "block text-sm font-bold text-on-surface", children: spec.value })] }, `${spec.label}-${i}`))) })) : null] }));
    const rootClass = (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] border border-border bg-surface', pad, interactive && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className);
    if (!interactive) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-vehicle-card": "", "aria-label": a11y, className: rootClass, ...rest, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-vehicle-card": "", role: "button", tabIndex: 0, "aria-label": a11y, onClick: onClick, onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
            }
        }, className: rootClass, ...rest, children: body }));
});
//# sourceMappingURL=VehicleCard.js.map