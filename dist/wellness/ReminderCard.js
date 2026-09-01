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
exports.ReminderCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const Icon_1 = require("../primitives/Icon");
const _tokens_1 = require("./_tokens");
/**
 * ReminderCard — a single daily reminder on a clean card: a small gradient clock
 * badge (the one spot of color), the reminder label and its time, and a `Switch`
 * to arm or silence it. The card itself stays calm (surface + border); on/off is
 * carried by the switch's own state, not by color. Token-only colors.
 */
exports.ReminderCard = React.forwardRef(function ReminderCard({ label, time, enabled = false, onToggle, glyph = '⏰', className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)(_tokens_1.CARD_SHELL, 'flex items-center gap-[var(--xen-space-md)] p-5 shadow-sm', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-10 w-10 items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "lg", color: "onPrimary" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-on-surface", children: label }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: time })] }), (0, jsx_runtime_1.jsx)(primitives_1.Switch, { checked: enabled, onChange: (next) => onToggle?.(next), "aria-label": `${label} reminder at ${time}` })] }));
});
//# sourceMappingURL=ReminderCard.js.map