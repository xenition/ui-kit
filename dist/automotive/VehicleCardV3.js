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
exports.VehicleCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const STATUS_DOT = { available: 'bg-success', 'in-use': 'bg-primary', maintenance: 'bg-warn', offline: 'bg-neutral-400' };
const STATUS_LABEL = { available: 'Available', 'in-use': 'In use', maintenance: 'Maintenance', offline: 'Offline' };
/**
 * VehicleCard, redesigned (v3): a **dense fleet line**. A car glyph, the make/model
 * over a status·year·class·color subtitle with a status dot, and a plate chip on
 * the right — hairline-bordered for a fleet list. The opposite of v2's card.
 * Status is dot + word, never color alone. Same props, token-only.
 */
exports.VehicleCardV3 = React.forwardRef(function VehicleCardV3({ name, plate, vehicleClass, color, year, status = 'available', specs, variant, onClick, loading = false, className, ...rest }, ref) {
    void variant;
    void specs;
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-vehicle-card": "", "aria-label": "Loading vehicle", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', className), ...rest, children: (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" }) });
    }
    const interactive = typeof onClick === 'function';
    const sub = [STATUS_LABEL[status], typeof year === 'number' ? String(year) : null, vehicleClass, color].filter((s) => !!s).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-vehicle-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": name, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
        } } : undefined, className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-block h-2.5 w-2.5 shrink-0 rounded-full', STATUS_DOT[status]), "aria-hidden": true }), (0, jsx_runtime_1.jsx)("span", { className: "text-lg", "aria-hidden": true, children: "\uD83D\uDE97" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: name }), sub ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: sub }) : null] }), plate ? (0, jsx_runtime_1.jsx)("span", { className: "rounded-md bg-neutral-100 px-2 py-0.5 font-mono text-xs text-on-surface", children: plate }) : null] }));
});
//# sourceMappingURL=VehicleCardV3.js.map