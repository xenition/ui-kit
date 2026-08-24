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
exports.LegalAppointmentV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * LegalAppointment, redesigned (v3): a **dense schedule line**. The type glyph, the
 * client + date·time over a location subtitle, an inline status word, and a compact
 * Confirm — hairline-bordered for a list. The opposite of v2's card. Same props,
 * token-only.
 */
exports.LegalAppointmentV3 = React.forwardRef(function LegalAppointmentV3({ type, date, time, location, client, status = 'scheduled', variant, actionable = false, onClick, onConfirm, onCancel, testID, className, ...rest }, ref) {
    void variant;
    void onCancel;
    const interactive = typeof onClick === 'function';
    const showConfirm = actionable && status === 'scheduled' && typeof onConfirm === 'function';
    const t = internal_1.APPOINTMENT_TYPE_META[type];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-legal-appointment": "", "data-testid": testID, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${t.label} appointment`, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? (0, internal_1.activateOnKey)(() => onClick?.()) : undefined, className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: t.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("p", { className: "truncate text-sm font-semibold text-on-surface", children: [client ?? t.label, " \u00B7 ", (0, jsx_runtime_1.jsxs)("span", { className: "font-normal text-muted", children: [date, time ? ` ${time}` : ''] })] }), location ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: location }) : null] }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.APPOINTMENT_STATUS_META[status], variant: "inline", size: "sm" }), showConfirm ? (0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "ghost", onClick: (e) => { e.stopPropagation(); onConfirm(); }, children: "Confirm" }) : null] }));
});
//# sourceMappingURL=LegalAppointmentV3.js.map