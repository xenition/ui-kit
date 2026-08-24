"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateRangePicker = DateRangePicker;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("./cn");
const DatePicker_1 = require("./DatePicker");
/**
 * Two-ended date range — composes two web {@link DatePicker}s (start + end) and
 * keeps them consistent: the start's `max` is bounded by the chosen end and the
 * end's `min` by the chosen start, so an invalid crossing can't be picked. Web
 * parity of the native `DateRangePicker`. No literal colors (kit lint rule).
 */
function DateRangePicker({ value = { start: null, end: null }, onChange, min, max, startLabel = 'Start', endLabel = 'End', invalid = false, disabled = false, className, }) {
    const setStart = (start) => {
        // Clear a now-invalid end (earlier than the new start).
        const end = value.end && start > value.end ? null : value.end;
        onChange?.({ start: start || null, end });
    };
    const setEnd = (end) => {
        const start = value.start && end < value.start ? null : value.start;
        onChange?.({ start, end: end || null });
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col gap-md', className), children: [(0, jsx_runtime_1.jsxs)("label", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-surface", children: startLabel }), (0, jsx_runtime_1.jsx)(DatePicker_1.DatePicker, { value: value.start ?? '', onChange: setStart, min: min, max: value.end ?? max, invalid: invalid, disabled: disabled })] }), (0, jsx_runtime_1.jsxs)("label", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-surface", children: endLabel }), (0, jsx_runtime_1.jsx)(DatePicker_1.DatePicker, { value: value.end ?? '', onChange: setEnd, min: value.start ?? min, max: max, invalid: invalid, disabled: disabled })] })] }));
}
//# sourceMappingURL=DateRangePicker.js.map