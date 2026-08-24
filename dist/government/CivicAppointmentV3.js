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
exports.CivicAppointmentV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Button_1 = require("../primitives/Button");
const DOT = { scheduled: 'bg-primary', confirmed: 'bg-success', 'checked-in': 'bg-accent', completed: 'bg-neutral-400', cancelled: 'bg-danger', 'no-show': 'bg-warn' };
const LABEL = { scheduled: 'Scheduled', confirmed: 'Confirmed', 'checked-in': 'Checked in', completed: 'Completed', cancelled: 'Cancelled', 'no-show': 'No-show' };
const TERMINAL = new Set(['completed', 'cancelled', 'no-show']);
/**
 * CivicAppointment, redesigned (v3): a **dense appointment line**. A status dot,
 * the service + date·time over an office·status subtitle, and a compact Check in —
 * hairline-bordered for a list. The opposite of v2's card. Status is dot + word,
 * never color alone. Same props, token-only.
 */
exports.CivicAppointmentV3 = React.forwardRef(function CivicAppointmentV3({ service, office, date, time, status = 'scheduled', location, reference, onCheckIn, onReschedule, className, ...rest }, ref) {
    void location;
    void reference;
    void onReschedule;
    const sub = [LABEL[status], office].filter((s) => !!s).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-civic-appointment": "", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-block h-2.5 w-2.5 shrink-0 rounded-full', DOT[status]), "aria-hidden": true }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("p", { className: "truncate text-sm font-semibold text-on-surface", children: [service, " \u00B7 ", (0, jsx_runtime_1.jsxs)("span", { className: "font-normal text-muted", children: [date, " ", time] })] }), sub ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: sub }) : null] }), !TERMINAL.has(status) && onCheckIn ? (0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "ghost", onClick: onCheckIn, children: "Check in" }) : null] }));
});
//# sourceMappingURL=CivicAppointmentV3.js.map