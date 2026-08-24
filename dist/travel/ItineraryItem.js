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
exports.ItineraryItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const KIND_GLYPH = {
    flight: '✈',
    hotel: '🏨',
    activity: '🎟',
    transfer: '🚕',
    meal: '🍽',
};
/** Token text/border class per status (mirrors the native semantic slot). */
const STATUS_CLASS = {
    upcoming: 'border-muted text-muted',
    active: 'border-primary text-primary',
    done: 'border-success text-success',
};
/**
 * Web parity of the native `ItineraryItem`: one entry in a day-by-day trip
 * timeline — a leading kind glyph on a token rail, a time, a title, and an
 * optional detail line. `status` tints the node and is also announced (never
 * color-alone). Set `showConnector={false}` on the final row. Token-only colors.
 */
exports.ItineraryItem = React.forwardRef(function ItineraryItem({ kind = 'activity', glyph, time, title, subtitle, status = 'upcoming', showConnector = true, onClick, className, ...rest }, ref) {
    const mark = glyph ?? KIND_GLYPH[kind];
    const interactive = typeof onClick === 'function';
    const a11yLabel = `${title}${time ? `, ${time}` : ''}, ${status}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-itinerary-item": "", "aria-label": a11yLabel, className: (0, cn_1.cn)('flex gap-[var(--xen-space-md)]', interactive &&
            'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, ...(interactive
            ? {
                role: 'button',
                tabIndex: 0,
                onClick,
                onKeyDown: (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onClick?.();
                    }
                },
            }
            : {}), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex w-8 flex-col items-center", children: [(0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-8 w-8 items-center justify-center rounded-full border bg-surface text-sm', STATUS_CLASS[status]), children: mark }), showConnector ? (0, jsx_runtime_1.jsx)("div", { className: "mt-[2px] w-[2px] flex-1 bg-border" }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex min-w-0 flex-1 flex-col gap-[2px]', showConnector ? 'pb-[var(--xen-space-lg)]' : ''), children: [time ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: time }) : null, (0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-surface", children: title }), subtitle ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: subtitle }) : null] })] }));
});
//# sourceMappingURL=ItineraryItem.js.map