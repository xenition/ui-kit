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
exports.CheckInRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const Badge_1 = require("../primitives/Badge");
/**
 * A staff-facing check-in row: avatar, attendee name, ticket type, and a toggle
 * that flips the checked-in state. The state is shown with a check glyph, a text
 * badge (`Checked in` / `Not in`) and `aria-checked` on a `switch` — never color
 * alone. Colors come from the `--xen-*` tokens; no literal colors.
 */
exports.CheckInRow = React.forwardRef(function CheckInRow({ name, avatarUrl, ticketType, checkedInAt, checkedIn = false, onToggle, disabled = false, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-row items-center gap-md rounded-md border border-border bg-surface p-md', className), ...rest, children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: avatarUrl, name: name, size: "sm" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-semibold text-on-surface", children: name }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row flex-wrap items-center gap-sm", children: [ticketType ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: ticketType }) : null, checkedIn ? ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "success", children: checkedInAt ? `In · ${checkedInAt}` : 'Checked in' })) : ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "neutral", children: "Not in" }))] })] }), (0, jsx_runtime_1.jsxs)("button", { type: "button", role: "switch", "aria-checked": checkedIn, "aria-label": checkedIn ? `Undo check-in for ${name}` : `Check in ${name}`, disabled: disabled, onClick: () => onToggle?.(!checkedIn), className: (0, cn_1.cn)('inline-flex flex-row items-center gap-xs rounded-full px-md py-xs text-sm font-bold transition-opacity', checkedIn ? 'bg-success text-on-success' : 'bg-primary text-on-primary', 'disabled:pointer-events-none disabled:opacity-50 hover:opacity-90', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: checkedIn ? '✓' : '+' }), checkedIn ? 'In' : 'Check in'] })] }));
});
//# sourceMappingURL=CheckInRow.js.map