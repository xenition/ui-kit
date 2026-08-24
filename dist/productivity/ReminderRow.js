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
exports.ReminderRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const DueDatePill_1 = require("./DueDatePill");
/**
 * A reminder line: title, an optional time {@link DueDatePill}, and a bell toggle
 * that reads as primary (on) or muted (off) and exposes a `switch` role with a
 * stateful label. Web parity of the native `ReminderRow` (`onPress` → `onClick`).
 * No literal colors.
 */
exports.ReminderRow = React.forwardRef(function ReminderRow({ title, timeLabel, tone = 'upcoming', enabled = true, onToggle, onClick, className }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-2 rounded-[var(--xen-radius-md)] bg-surface p-2', className), children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": title, onClick: onClick, disabled: !onClick, className: "flex min-w-0 flex-1 flex-col items-start gap-0.5 text-left disabled:cursor-default", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-sm font-medium', enabled ? 'text-on-surface' : 'text-muted'), children: title }), timeLabel ? (0, jsx_runtime_1.jsx)(DueDatePill_1.DueDatePill, { label: timeLabel, tone: tone, glyph: "\u23F0" }) : null] }), (0, jsx_runtime_1.jsx)("button", { type: "button", role: "switch", "aria-checked": enabled, "aria-label": `${title} reminder`, onClick: () => onToggle?.(!enabled), className: (0, cn_1.cn)('p-1 text-lg transition-opacity hover:opacity-70', enabled ? 'text-primary' : 'text-muted'), children: enabled ? '🔔' : '🔕' })] }));
});
//# sourceMappingURL=ReminderRow.js.map