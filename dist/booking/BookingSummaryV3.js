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
exports.BookingSummaryV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const datetime_1 = require("./datetime");
/**
 * BookingSummary, redesigned (v3): a **compact confirmation line**. The resource ·
 * date · time fold onto a dense two-line block with the action pinned right — a
 * tight review row for a checkout footer. The opposite of v2's panel. Same props,
 * token-only.
 */
exports.BookingSummaryV3 = React.forwardRef(function BookingSummaryV3({ resource, slot, timeZone, formatDate, formatTime, action, title = 'Your booking', className, ...rest }, ref) {
    const tz = timeZone ?? resource?.timezone;
    const fmtTime = formatTime ?? ((iso) => (0, datetime_1.formatTimeInTz)(iso, tz));
    const fmtDate = formatDate ?? ((iso) => new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', timeZone: tz }).format(new Date(iso)));
    const line = [resource?.name, slot ? fmtDate(slot.startsAt) : null, slot ? `${fmtTime(slot.startsAt)}–${fmtTime(slot.endsAt)}` : null].filter(Boolean).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-booking-summary": "", className: (0, cn_1.cn)('flex items-center gap-3 rounded-lg border border-border p-3', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs uppercase tracking-wide text-muted", children: title }), (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: line || '—' })] }), action ? (0, jsx_runtime_1.jsx)("div", { className: "shrink-0", children: action }) : null] }));
});
//# sourceMappingURL=BookingSummaryV3.js.map