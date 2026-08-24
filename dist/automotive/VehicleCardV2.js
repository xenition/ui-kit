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
exports.VehicleCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const STATUS = {
    available: { label: 'Available', tone: 'success' }, 'in-use': { label: 'In use', tone: 'primary' }, maintenance: { label: 'Maintenance', tone: 'warn' }, offline: { label: 'Offline', tone: 'neutral' },
};
/**
 * VehicleCard, redesigned (v2): an **elevated vehicle card**. A big car glyph tile
 * leads the make/model and a year·class·color line, with a plate chip, a status
 * badge, and spec chips. Distinct from v1. Same props, token-only.
 */
exports.VehicleCardV2 = React.forwardRef(function VehicleCardV2({ name, plate, vehicleClass, color, year, status = 'available', specs, variant, onClick, loading = false, className, ...rest }, ref) {
    void variant;
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-vehicle-card": "", "aria-label": "Loading vehicle", className: (0, cn_1.cn)('h-28 animate-pulse rounded-lg bg-neutral-100', className), ...rest });
    }
    const st = STATUS[status];
    const interactive = typeof onClick === 'function';
    const sub = [typeof year === 'number' ? String(year) : null, vehicleClass, color].filter((s) => !!s).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-vehicle-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": name, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
        } } : undefined, className: (0, cn_1.cn)('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-sm', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-2xl", "aria-hidden": true, children: "\uD83D\uDE97" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: name }), sub ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: sub }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-1", children: [(0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: st.tone, children: st.label }), plate ? (0, jsx_runtime_1.jsx)("span", { className: "rounded-md bg-neutral-100 px-2 py-0.5 font-mono text-xs text-on-surface", children: plate }) : null] })] }), specs && specs.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-1.5", children: specs.map((s, i) => (0, jsx_runtime_1.jsxs)("span", { className: "rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-on-surface", children: [s.label, ": ", s.value] }, i)) })) : null] }));
});
//# sourceMappingURL=VehicleCardV2.js.map