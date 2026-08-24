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
exports.SnoozeRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * A single snooze-preset option row — glyph, preset name, and the resolved time
 * it maps to. A real `<button>` used to build the snooze picker sheet. The
 * `selected` state tints the row and shows a check, and reports `aria-pressed`
 * to assistive tech (not by color only). No literal colors.
 */
exports.SnoozeRow = React.forwardRef(function SnoozeRow({ label, when, glyph = '⏰', selected = false, onClick, className }, ref) {
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", "aria-label": `Snooze ${label}${when ? `, ${when}` : ''}`, "aria-pressed": selected, onClick: onClick, className: (0, cn_1.cn)('flex w-full items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] px-[var(--xen-space-md)] py-[var(--xen-space-md)] text-left transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', selected ? 'bg-primary-50' : 'bg-transparent hover:bg-neutral-100', className), children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "lg", color: selected ? 'primary' : 'muted' }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex-1 text-base text-on-surface', selected ? 'font-bold' : 'font-medium'), children: label }), when ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: when }) : null, selected ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2713", size: "base", color: "primary", "aria-label": "Selected" }) : null] }));
});
//# sourceMappingURL=SnoozeRow.js.map