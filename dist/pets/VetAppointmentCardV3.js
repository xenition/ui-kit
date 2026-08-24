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
exports.VetAppointmentCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const STATUS_DOT = {
    upcoming: 'bg-primary', today: 'bg-warn', completed: 'bg-neutral-400', cancelled: 'bg-danger',
};
const STATUS_LABEL = {
    upcoming: 'Upcoming', today: 'Today', completed: 'Completed', cancelled: 'Cancelled',
};
const REASON_GLYPH = {
    checkup: '🩺', vaccination: '💉', surgery: '🔪', dental: '🦷', emergency: '🚑', grooming: '✂️', other: '🐾',
};
/**
 * VetAppointmentCard, redesigned (v3): a **dense visit line**. A reason glyph
 * leads, the vet + date·time share a line over a status dot + word · pet
 * subtitle, and a compact action hugs the right — hairline-bordered for a
 * schedule. The opposite of v2's card. Status is dot + word, never color alone.
 * Same props, token-only.
 */
exports.VetAppointmentCardV3 = React.forwardRef(function VetAppointmentCardV3({ vetName, clinic, reason, date, time, status, petName, notes, actionLabel, onAction, onCancel, className }, ref) {
    void clinic;
    void notes;
    void onCancel;
    const closed = status === 'completed' || status === 'cancelled';
    const sub = [STATUS_LABEL[status], petName].filter((s) => !!s);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-vet-appointment-card": "", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', className), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "text-lg leading-none", children: REASON_GLYPH[reason] }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("p", { className: "truncate text-sm font-semibold text-on-surface", children: [vetName, " \u00B7 ", (0, jsx_runtime_1.jsxs)("span", { className: "font-normal text-muted", children: [date, time ? ` ${time}` : ''] })] }), (0, jsx_runtime_1.jsxs)("p", { className: "flex items-center gap-1.5 truncate text-xs text-muted", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-block h-2 w-2 rounded-full', STATUS_DOT[status]), "aria-hidden": true }), sub.join(' · ')] })] }), !closed && onAction ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "ghost", onClick: onAction, children: actionLabel ?? 'Confirm' })) : null] }));
});
//# sourceMappingURL=VetAppointmentCardV3.js.map