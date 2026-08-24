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
exports.AgentStatus = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const StatusDot_1 = require("../primitives/StatusDot");
const internal_1 = require("./internal");
const PRESENCE = {
    online: { label: 'Online', textCls: 'text-success' },
    away: { label: 'Away', textCls: 'text-warn' },
    offline: { label: 'Offline', textCls: 'text-muted' },
};
/** Presence dot — reuses `StatusDot` for online/away; a muted token dot offline. */
function PresenceDot({ presence, size }) {
    if (presence === 'offline') {
        return ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "inline-block rounded-full bg-muted", style: { width: size ?? 8, height: size ?? 8 } }));
    }
    return (0, jsx_runtime_1.jsx)(StatusDot_1.StatusDot, { tone: presence === 'online' ? 'success' : 'warn', pulse: presence === 'online' });
}
/**
 * Agent availability indicator (`online`/`away`/`offline`). The `dot` variant
 * is a status dot + text label; the `row` variant adds an avatar and an optional
 * detail line and can be activated (click / Enter / Space). Presence is
 * announced by text and dot, not color alone. Online reuses the pulsing
 * `StatusDot` (inert under reduced-motion); offline is a muted token dot. Token
 * classes only — no literal hex.
 */
exports.AgentStatus = React.forwardRef(function AgentStatus({ presence, name, avatar, detail, variant = 'row', onClick, className, ...rest }, ref) {
    const spec = PRESENCE[presence] ?? PRESENCE.offline;
    const a11y = `${name ? `${name}, ` : ''}${spec.label}${detail ? `, ${detail}` : ''}`;
    if (variant === 'dot') {
        return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, role: "img", "aria-label": a11y, className: (0, cn_1.cn)('inline-flex items-center gap-1', className), ...rest, children: [(0, jsx_runtime_1.jsx)(PresenceDot, { presence: presence }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-semibold', spec.textCls), children: spec.label })] }));
    }
    const interactive = typeof onClick === 'function';
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { size: "md", name: name, src: avatar }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [name ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-surface", children: name })) : null, (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(PresenceDot, { presence: presence, size: 7 }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', spec.textCls), children: spec.label }), detail ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["\u00B7 ", detail] }) : null] })] })] }));
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": a11y, onClick: onClick, onKeyDown: interactive ? (0, internal_1.activateOnKey)(onClick) : undefined, className: (0, cn_1.cn)('flex items-center gap-3', interactive &&
            'cursor-pointer rounded-[var(--xen-radius-md)] hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, children: body }));
});
//# sourceMappingURL=AgentStatus.js.map