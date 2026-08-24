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
exports.BookingSummaryV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const datetime_1 = require("./datetime");
/**
 * BookingSummary, redesigned (v2): an **elevated confirmation card**. The title
 * heads a stack of labelled rows — resource, date, and time range — over the
 * trailing action. A prominent review panel. Distinct from v1. Same props,
 * token-only.
 */
exports.BookingSummaryV2 = React.forwardRef(function BookingSummaryV2({ resource, slot, timeZone, formatDate, formatTime, action, title = 'Your booking', className, ...rest }, ref) {
    const tz = timeZone ?? resource?.timezone;
    const fmtTime = formatTime ?? ((iso) => (0, datetime_1.formatTimeInTz)(iso, tz));
    const fmtDate = formatDate ?? ((iso) => new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric', timeZone: tz }).format(new Date(iso)));
    const Row = ({ label, value }) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-3 border-t border-border py-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs uppercase tracking-wide text-muted", children: label }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-surface", children: value })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-booking-summary": "", className: (0, cn_1.cn)('flex flex-col gap-1 rounded-lg bg-surface p-md shadow-md', className), ...rest, children: [(0, jsx_runtime_1.jsx)("p", { className: "mb-1 text-base font-bold text-on-surface", children: title }), resource ? (0, jsx_runtime_1.jsx)(Row, { label: "With", value: resource.name }) : null, slot ? (0, jsx_runtime_1.jsx)(Row, { label: "Date", value: fmtDate(slot.startsAt) }) : null, slot ? (0, jsx_runtime_1.jsx)(Row, { label: "Time", value: `${fmtTime(slot.startsAt)} – ${fmtTime(slot.endsAt)}` }) : null, action ? (0, jsx_runtime_1.jsx)("div", { className: "mt-2", children: action }) : null] }));
});
//# sourceMappingURL=BookingSummaryV2.js.map