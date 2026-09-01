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
exports.SavedSearchRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * SavedSearchRow — **V4** "listing" design (web parity of the native V4). The
 * editorial take on a saved-searches row: an elevated, rounded card with the
 * query name, a one-line filter summary, a soft-primary "new matches" count
 * pill, and an alerts toggle. Same props/behavior as {@link SavedSearchRowProps};
 * the alert switch renders only when `onToggleAlerts` is provided and is kept out
 * of the row's press target so toggling never runs the search. The
 * row-activation callback stays `onRun` (not the DOM `onClick`). Colors come
 * from the `--xen-*` tokens — no literal colors.
 */
exports.SavedSearchRowV4 = React.forwardRef(function SavedSearchRowV4({ name, summary, newCount = 0, alertsOn = false, onToggleAlerts, onRun, className, ...rest }, ref) {
    const content = ((0, jsx_runtime_1.jsxs)("span", { className: "flex flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 shrink truncate text-base font-bold text-on-surface", children: name }), newCount > 0 ? ((0, jsx_runtime_1.jsx)("span", { className: "inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary", children: `${newCount} new` })) : null] }), summary ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted", children: summary }) : null] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-3 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-2 pl-[var(--xen-space-lg)] text-on-surface shadow-md', className), ...rest, children: [onRun ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": `${name}${newCount > 0 ? `, ${newCount} new matches` : ''}`, onClick: onRun, className: "flex min-h-[44px] flex-1 items-center gap-2 rounded-[var(--xen-radius-md)] text-left transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary", children: [content, (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u203A", size: "lg", color: "muted" })] })) : (content), onToggleAlerts ? ((0, jsx_runtime_1.jsx)("span", { className: "flex min-h-[44px] items-center pr-2", children: (0, jsx_runtime_1.jsx)(primitives_1.Switch, { checked: alertsOn, onCheckedChange: onToggleAlerts, "aria-label": `Alerts for ${name}, ${alertsOn ? 'on' : 'off'}` }) })) : null] }));
});
//# sourceMappingURL=SavedSearchRowV4.js.map