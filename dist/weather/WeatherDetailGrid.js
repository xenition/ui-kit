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
exports.WeatherDetailGrid = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
/**
 * WeatherDetailGrid — weather detail metrics grouped into elevated cards (web
 * parity of the native `WeatherDetailGrid`). Items are chunked `perCard` at a
 * time (default 3) into clean list cards: each row is a gradient glyph badge +
 * label/caption on the left and a big value + unit on the right, separated by
 * hairline dividers. Every color comes from `--xen-*` Tailwind classes
 * (`surface`/`on-surface`/`muted`/`border`), so it adapts to light AND dark. No
 * literal colors.
 */
exports.WeatherDetailGrid = React.forwardRef(function WeatherDetailGrid({ items, perCard = 3, className, ...rest }, ref) {
    const size = Math.max(1, perCard);
    const groups = [];
    for (let i = 0; i < items.length; i += size)
        groups.push(items.slice(i, i + size));
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-3', className), ...rest, children: groups.map((group, gi) => ((0, jsx_runtime_1.jsx)("div", { className: "rounded-[var(--xen-radius-lg)] border border-border bg-surface px-4 shadow-md", children: group.map((item, ri) => {
                const hasValue = item.value != null;
                return ((0, jsx_runtime_1.jsxs)("div", { role: "group", "aria-label": `${item.label}, ${hasValue ? `${item.value}${item.unit ? ' ' + item.unit : ''}` : 'no data'}`, className: (0, cn_1.cn)('flex flex-row items-center justify-between gap-3 py-3', ri > 0 && 'border-t border-border'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-row items-center gap-3", children: [item.glyph ? ((0, jsx_runtime_1.jsx)("span", { className: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-primary-400 to-primary-700", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: item.glyph, size: "sm", "aria-hidden": true, color: "onPrimary" }) })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-semibold text-on-surface", children: item.label }), item.caption ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: item.caption }) : null] })] }), (0, jsx_runtime_1.jsxs)("p", { className: "flex shrink-0 flex-row items-baseline gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xl font-extrabold text-on-surface", children: hasValue ? item.value : '—' }), item.unit && hasValue ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: item.unit }) : null] })] }, `${item.label}-${ri}`));
            }) }, gi))) }));
});
//# sourceMappingURL=WeatherDetailGrid.js.map