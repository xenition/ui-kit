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
exports.AutomationRuleV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const Switch_1 = require("../primitives/Switch");
/**
 * AutomationRule — **V4** "ambient" design (web parity of the native V4). The
 * control-panel take on an automation row: an **enabled rule glows** — when
 * active the card takes a soft `primary`-tinted wash, a primary border, and a
 * glowing icon disc; disabled or `offline` rules stay calm and muted. The
 * "when → then" clause reads as a trigger glyph → action glyph line, and a text
 * `On`/`Off`/`Offline` label carries the state independent of color. The enable
 * {@link Switch} is blocked while `offline`. Same props/behavior as
 * {@link AutomationRuleProps}; all colors from `--xen-*` token classes (no literals).
 */
exports.AutomationRuleV4 = React.forwardRef(function AutomationRuleV4({ name, trigger, action, icon = '⚙️', enabled = false, offline = false, onToggle, className, style }, ref) {
    const active = enabled && !offline;
    const statusLabel = offline ? 'Offline' : enabled ? 'On' : 'Off';
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, style: style, className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] border', active ? 'border-primary/50 bg-primary/[0.08] shadow-md' : 'border-border bg-surface shadow-sm', offline && 'opacity-70', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-11 w-11 items-center justify-center rounded-[var(--xen-radius-md)] border', active ? 'border-primary/40 bg-primary/15' : 'border-border bg-on-surface/5'), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: icon, color: active ? 'primary' : 'muted', size: "lg" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-semibold text-on-surface", children: name }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: statusLabel })] }), (0, jsx_runtime_1.jsx)(Switch_1.Switch, { checked: enabled, disabled: offline, onCheckedChange: onToggle, "aria-label": `${name} enabled` })] }), trigger != null || action != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-sm)] flex flex-wrap items-center gap-1", children: [trigger != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-on-surface", children: trigger }) : null, trigger != null && action != null ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-bold', active ? 'text-primary' : 'text-muted'), children: "\u2192" })) : null, action != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: action }) : null] })) : null] }));
});
//# sourceMappingURL=AutomationRuleV4.js.map