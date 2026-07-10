"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slider = Slider;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("./cn");
/** Range slider bound to the theme tokens (accent = primary). */
function Slider({ value, min = 0, max = 100, step = 1, onChange, disabled, className, }) {
    return ((0, jsx_runtime_1.jsx)("input", { type: "range", value: value, min: min, max: max, step: step, disabled: disabled, onChange: (e) => onChange(Number(e.target.value)), className: (0, cn_1.cn)('w-full accent-primary disabled:pointer-events-none disabled:opacity-50', className) }));
}
//# sourceMappingURL=Slider.js.map