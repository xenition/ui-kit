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
exports.ParkingSpot = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
/** Status → text/border tone class + spelled-out word + glyph (never color alone). */
const STATUS = {
    available: { textClass: 'text-success', borderClass: 'border-success', word: 'Available', glyph: 'P' },
    occupied: { textClass: 'text-danger', borderClass: 'border-danger', word: 'Occupied', glyph: '✕' },
    reserved: { textClass: 'text-warn', borderClass: 'border-warn', word: 'Reserved', glyph: '★' },
    disabled: { textClass: 'text-muted', borderClass: 'border-border', word: 'Out of service', glyph: '—' },
};
/**
 * A single parking spot — its id, level, availability status, hourly price, and
 * an optional EV-charging marker. The status carries a glyph plus a spelled-out
 * word and an a11y label, so meaning never rests on color; only `available`
 * spots are selectable and non-selectable spots expose a disabled a11y state.
 * Data + `onSelect` only; nothing fetches. Colors come from `--xen-*` token
 * classes — no literal colors. `variant="row"` renders a list line. Web parity
 * of the native `ParkingSpot`.
 */
exports.ParkingSpot = React.forwardRef(function ParkingSpot({ spotId, level, status = 'available', priceCentsPerHour, currency = 'USD', distanceLabel, evCharging = false, variant = 'tile', onSelect, className, ...rest }, ref) {
    const s = STATUS[status] ?? STATUS.available;
    const selectable = status === 'available' && Boolean(onSelect);
    const row = variant === 'row';
    const a11y = `Spot ${spotId}${level ? `, ${level}` : ''}, ${s.word}${typeof priceCentsPerHour === 'number' ? `, ${(0, commerce_1.formatMoney)(priceCentsPerHour, currency)} per hour` : ''}${evCharging ? ', EV charging' : ''}`;
    const body = ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] border bg-neutral-100 text-lg font-extrabold', row ? 'h-10 w-10' : 'h-11 w-11', s.textClass, s.borderClass), children: s.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: spotId }), evCharging ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", children: "\u26A1 EV" }) : null] }), (0, jsx_runtime_1.jsx)("span", { className: "block text-xs text-muted", children: [level, s.word, distanceLabel].filter(Boolean).join(' · ') })] }), typeof priceCentsPerHour === 'number' ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-surface", children: (0, commerce_1.formatMoney)(priceCentsPerHour, currency) }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "/ hr" })] })) : null] }));
    const rootClass = (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] border bg-surface p-[var(--xen-space-md)]', selectable ? 'border-success' : 'border-border', className);
    if (!onSelect) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-parking-spot": "", "aria-label": a11y, className: rootClass, ...rest, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-parking-spot": "", role: "button", tabIndex: selectable ? 0 : -1, "aria-label": a11y, "aria-disabled": !selectable, onClick: selectable ? onSelect : undefined, onKeyDown: (e) => {
            if (selectable && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                onSelect();
            }
        }, className: (0, cn_1.cn)(rootClass, selectable
            ? 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
            : 'opacity-60'), ...rest, children: body }));
});
//# sourceMappingURL=ParkingSpot.js.map