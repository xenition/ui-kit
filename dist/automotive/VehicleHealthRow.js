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
exports.VehicleHealthRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/** Status → tone classes + spelled-out word + glyph (never color alone). */
const HEALTH = {
    ok: { textClass: 'text-success', meterTone: 'success', word: 'OK', glyph: '✓' },
    attention: { textClass: 'text-warn', meterTone: 'warn', word: 'Attention', glyph: '!' },
    critical: { textClass: 'text-danger', meterTone: 'danger', word: 'Critical', glyph: '✕' },
    unknown: { textClass: 'text-muted', meterTone: 'primary', word: 'Unknown', glyph: '?' },
};
/**
 * One vehicle-health system row — its name, a reading, and a status conveyed by
 * a glyph plus a spelled-out word and an a11y label, so meaning never rests on
 * color; a `critical` status maps to the `danger` tone per contract. An optional
 * `percent` draws a token-tinted mini {@link Progress} meter (brake life, oil,
 * etc.). Presentational: shaped data only. Colors come from `--xen-*` token
 * classes — no literal colors. `percent` is clamped to 0–100. Web parity of the
 * native `VehicleHealthRow`.
 */
exports.VehicleHealthRow = React.forwardRef(function VehicleHealthRow({ system, status = 'ok', reading, glyph, percent, variant = 'default', className, ...rest }, ref) {
    const h = HEALTH[status] ?? HEALTH.unknown;
    const compact = variant === 'compact';
    const hasMeter = typeof percent === 'number';
    const clamped = hasMeter ? Math.max(0, Math.min(100, Math.round(percent))) : 0;
    const a11y = `${system}: ${h.word}${reading ? `, ${reading}` : ''}${hasMeter ? `, ${clamped} percent` : ''}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-vehicle-health": "", "aria-label": a11y, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-md)]', compact ? 'py-[var(--xen-space-sm)]' : 'py-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-neutral-100 text-sm font-extrabold', h.textClass), children: glyph ?? h.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "block truncate text-sm font-semibold text-on-surface", children: system }), hasMeter ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-1", children: (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: clamped, max: 100, tone: h.meterTone, size: "sm", "aria-hidden": "true" }) })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end", children: [reading ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-surface", children: reading }) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', h.textClass), children: h.word })] })] }));
});
//# sourceMappingURL=VehicleHealthRow.js.map