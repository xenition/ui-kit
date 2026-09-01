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
exports.TimeOfUseSchedule = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const format_1 = require("./internal/format");
const PERIOD_LABEL = {
    'off-peak': 'Off-peak',
    'mid-peak': 'Mid-peak',
    'on-peak': 'On-peak',
};
const PERIOD_ORDER = ['off-peak', 'mid-peak', 'on-peak'];
const PERIOD_FILL = {
    'off-peak': 'bg-success/85',
    'mid-peak': 'bg-warn/85',
    'on-peak': 'bg-danger/85',
};
const TICKS = [0, 6, 12, 18, 24];
/**
 * A clean-card time-of-use day bar (web parity). A 24-hour horizontal track is
 * split into rate blocks, each segment sized by its share of the day and colored
 * by rate period — off-peak → `success`, mid-peak → `warn`, on-peak → `danger` —
 * so the color is meaningful, not decorative. A thin `on-surface` "now" marker
 * locates the current hour, hour ticks anchor the axis, and a legend names each
 * period present with its dot + tone. Purely presentational; every color traces
 * to a token.
 */
exports.TimeOfUseSchedule = React.forwardRef(function TimeOfUseSchedule({ title = 'Time of use', blocks, nowHour, className, ...rest }, ref) {
    const present = PERIOD_ORDER.filter((p) => blocks.some((b) => b.period === p));
    const nowPct = nowHour != null ? (0, format_1.clamp)(nowHour, 0, 24) / 24 : null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": title, className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: title }), (0, jsx_runtime_1.jsxs)("div", { className: "relative mt-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "flex h-4 overflow-hidden rounded-full bg-neutral-100", children: blocks.map((b, i) => {
                            const span = (0, format_1.clamp)(b.endHour - b.startHour, 0, 24);
                            return ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full', PERIOD_FILL[b.period]), style: { flexGrow: span, flexShrink: 1, flexBasis: 0 } }, `${b.period}-${b.startHour}-${i}`));
                        }) }), nowPct != null ? ((0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "absolute top-0 h-4 w-0.5 bg-on-surface", style: { left: `${nowPct * 100}%` } })) : null] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-xs)] flex justify-between", children: TICKS.map((t) => ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: t }, t))) }), (0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-md)] flex flex-wrap gap-[var(--xen-space-md)]", children: present.map((p) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-2.5 w-2.5 rounded-full', PERIOD_FILL[p]) }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: PERIOD_LABEL[p] })] }, p))) })] }));
});
//# sourceMappingURL=TimeOfUseSchedule.js.map