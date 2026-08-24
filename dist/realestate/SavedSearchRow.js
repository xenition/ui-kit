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
exports.SavedSearchRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * Web parity of the native `SavedSearchRow`: a row in a saved-searches list —
 * name, filter summary, a "new matches" count badge, and an optional alerts
 * toggle. Data + callbacks only; nothing fetches. The alert switch renders only
 * when `onToggleAlerts` is provided and is kept out of the row's press target so
 * toggling never runs the search. Reuses the shared `Badge`, `Switch`, and
 * `Icon`; all colors come from the `--xen-*` tokens — no literal colors.
 *
 * The row-activation callback is `onRun` (not `onClick`) to avoid colliding with
 * the DOM `onClick` handler.
 */
exports.SavedSearchRow = React.forwardRef(function SavedSearchRow({ name, summary, newCount = 0, alertsOn = false, onToggleAlerts, onRun, className, ...rest }, ref) {
    const content = ((0, jsx_runtime_1.jsxs)("span", { className: "flex flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 shrink truncate text-base font-semibold text-on-surface", children: name }), newCount > 0 ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", children: `${newCount} new` }) : null] }), summary ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted", children: summary }) : null] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-3 border border-border bg-surface px-[var(--xen-space-lg)] py-[var(--xen-space-md)]', 'rounded-[var(--xen-radius-md)]', className), ...rest, children: [onRun ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": `${name}${newCount > 0 ? `, ${newCount} new matches` : ''}`, onClick: onRun, className: "flex flex-1 items-center gap-2 text-left transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[var(--xen-radius-sm)]", children: [content, (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u203A", size: "lg", color: "muted" })] })) : (content), onToggleAlerts ? ((0, jsx_runtime_1.jsx)(primitives_1.Switch, { checked: alertsOn, onCheckedChange: onToggleAlerts, "aria-label": `Alerts for ${name}, ${alertsOn ? 'on' : 'off'}` })) : null] }));
});
//# sourceMappingURL=SavedSearchRow.js.map