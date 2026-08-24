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
exports.ScheduleRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const Switch_1 = require("../primitives/Switch");
const Badge_1 = require("../primitives/Badge");
/**
 * A schedule / timer row — a clock glyph, the time (emphasized), a label, and a
 * row of weekday chips, closed by an enable {@link Switch}. Disabled schedules
 * dim to `muted`; the enabled state is carried by the switch's `aria-checked`
 * state (not color). `days` is mapped defensively (nothing renders when empty),
 * and a hairline divider separates rows unless `last`. Token-bound throughout.
 */
exports.ScheduleRow = React.forwardRef(function ScheduleRow({ label, time, days, icon = '⏰', enabled = false, onToggle, last = false, className, style }, ref) {
    const dayList = Array.isArray(days) ? days.filter((d) => d != null && d !== '') : [];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, style: style, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] py-[var(--xen-space-sm)]', !last && 'border-b border-border', !enabled && 'opacity-70', className), children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: icon, color: enabled ? 'primary' : 'muted', size: "lg" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-[var(--xen-space-xs)]", children: [time != null ? (0, jsx_runtime_1.jsx)("span", { className: "font-heading text-base font-bold text-on-surface", children: time }) : null, (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 shrink truncate text-sm text-muted", children: label })] }), dayList.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-1 flex flex-wrap gap-1", children: dayList.map((day, i) => ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "neutral", children: day }, `${day}-${i}`))) })) : null] }), (0, jsx_runtime_1.jsx)(Switch_1.Switch, { checked: enabled, onCheckedChange: onToggle, "aria-label": `${label} schedule` })] }));
});
//# sourceMappingURL=ScheduleRow.js.map