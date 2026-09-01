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
exports.TripHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * TripHeader — a **V4** "journey" hero (web parity of the native twin). The trip
 * cover for an itinerary screen: a saturated brand-gradient ground carrying the
 * origin→destination route drawn as a rail with a small brand-gradient plane disc
 * at its midpoint (the signature FlightCardV4 motif) in near-white ink, an
 * optional subtitle, then the dates / travelers / nights as frosted glass tiles
 * and an optional manage CTA (a near-white pill). All colors from `--xen-*` token
 * classes and gradient utilities — no literal colors; dark-mode safe.
 */
exports.TripHeader = React.forwardRef(function TripHeader({ origin, destination, startDate, endDate, travelers, nights, subtitle, manageLabel = 'Manage trip', onManage, className, ...rest }, ref) {
    const dateRange = endDate ? `${startDate} – ${endDate}` : startDate;
    const a11yLabel = `Trip from ${origin.city} to ${destination.city}, ${dateRange}`;
    const Endpoint = ({ place, align }) => ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex min-w-0 flex-col', align === 'end' ? 'items-end text-right' : 'items-start'), children: [(0, jsx_runtime_1.jsx)("span", { className: "max-w-[8rem] truncate text-lg font-extrabold text-primary-50", children: place.city }), place.code ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold tracking-wide text-primary-100", children: place.code }) : null] }));
    const Tile = ({ label, value }) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-[72px] flex-1 flex-col gap-[2px] rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-primary-100", children: label }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-bold text-primary-50", children: value })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-trip-header": "", "aria-label": a11yLabel, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-lg)] overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)(Endpoint, { place: origin, align: "start" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-0.5 flex-1 rounded-full bg-primary-50/40" }), (0, jsx_runtime_1.jsx)("span", { className: "mx-1.5 flex h-[26px] w-[26px] items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-700 text-sm leading-none text-primary-50", children: "\u2708" }), (0, jsx_runtime_1.jsx)("div", { className: "h-0.5 flex-1 rounded-full bg-primary-50/40" })] }), (0, jsx_runtime_1.jsx)(Endpoint, { place: destination, align: "end" })] }), subtitle ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-primary-100", children: subtitle }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(Tile, { label: "Dates", value: dateRange }), typeof travelers === 'number' ? ((0, jsx_runtime_1.jsx)(Tile, { label: "Travelers", value: `${travelers} ${travelers === 1 ? 'traveler' : 'travelers'}` })) : null, typeof nights === 'number' ? ((0, jsx_runtime_1.jsx)(Tile, { label: "Nights", value: `${nights} ${nights === 1 ? 'night' : 'nights'}` })) : null] }), onManage ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": manageLabel, onClick: onManage, className: "flex w-full items-center justify-center rounded-[var(--xen-radius-md)] bg-on-primary py-[var(--xen-space-md)] text-base font-extrabold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: manageLabel })) : null] }));
});
//# sourceMappingURL=TripHeader.js.map