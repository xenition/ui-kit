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
exports.RecurrenceRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const IconV4_1 = require("../primitives/IconV4");
const SegmentedV4_1 = require("../primitives/SegmentedV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const FREQ_LABEL = {
    none: 'Does not repeat',
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    yearly: 'Yearly',
};
const FREQ_ORDER = ['none', 'daily', 'weekly', 'monthly', 'yearly'];
/**
 * **V4 recurrence row** — the web twin of the native `RecurrenceRowV4`, same
 * props as {@link RecurrenceRow} plus `freqLabels`.
 *
 * ## Three changes
 *
 * 1. **The inline variant is `SegmentedV4`**, not five hand-rolled chips, so
 *    it announces itself as one control with a selection.
 * 2. **The summary variant is a row from the shared row line**, with a
 *    chevron that says it opens something.
 * 3. **All five words are props.**
 */
exports.RecurrenceRowV4 = React.forwardRef(function RecurrenceRowV4({ value, onChange, label = 'Repeats', variant = 'summary', onPress, options, freqLabels, className, ...rest }, ref) {
    const wordFor = (freq) => options?.find((o) => o.value === freq)?.label ?? freqLabels?.[freq] ?? FREQ_LABEL[freq];
    const choices = options?.map((o) => o.value) ?? FREQ_ORDER;
    const current = wordFor(value);
    if (variant === 'inline') {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-xs', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted-text", children: label }), (0, jsx_runtime_1.jsx)(SegmentedV4_1.SegmentedV4, { options: choices.map((f) => ({ label: wordFor(f), value: f })), value: value, onChange: (v) => onChange?.(v) })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-recurrence-row": value, "data-xen-v4-chrome": onPress ? 'on-surface' : undefined, role: onPress ? 'button' : undefined, onClick: onPress, "aria-label": `${label}, ${current}`, className: (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(false), className), ...rest, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "refresh", size: "lg", className: "text-muted-text" }), (0, jsx_runtime_1.jsx)("div", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: (0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-card", children: label }) }), (0, jsx_runtime_1.jsxs)("div", { className: row_v4_1.ROW_V4_TRAILING_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted-text", children: current }), onPress ? (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "chevron-right", size: "lg", className: "text-muted-text" }) : null] })] }));
});
//# sourceMappingURL=RecurrenceRowV4.js.map