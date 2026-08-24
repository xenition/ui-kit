"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meter = Meter;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../../primitives/cn");
const BAR_BG = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    success: 'bg-success',
    warn: 'bg-warn',
    danger: 'bg-danger',
    muted: 'bg-muted',
};
/**
 * A thin, token-bound horizontal progress bar — the DOM analog of the native
 * `MiniBar`. A `--xen-border` track holds a `bg-<color>` fill sized by `value`
 * (percent); every color traces to a token class, never a literal.
 */
function Meter({ value, color = 'primary', 'aria-label': ariaLabel, className, }) {
    const pct = Number.isFinite(value) ? Math.min(Math.max(value, 0), 100) : 0;
    return ((0, jsx_runtime_1.jsx)("div", { role: "progressbar", "aria-valuenow": Math.round(pct), "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": ariaLabel, className: (0, cn_1.cn)('h-2 w-full overflow-hidden rounded-[var(--xen-radius-full)] bg-border', className), children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full rounded-[var(--xen-radius-full)]', BAR_BG[color]), style: { width: `${pct}%` } }) }));
}
//# sourceMappingURL=Meter.js.map