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
exports.AgentStatusV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const internal_1 = require("./internal");
const PRESENCE = {
    online: { label: 'Online', dot: 'bg-success', pill: 'bg-success/10 text-success' },
    away: { label: 'Away', dot: 'bg-warn', pill: 'bg-warn/10 text-warn' },
    offline: { label: 'Offline', dot: 'bg-neutral-400', pill: 'bg-neutral-100 text-muted' },
};
/**
 * AgentStatus, redesigned (v2): an **elevated agent chip**. The avatar carries a
 * presence dot, the name leads, and the presence renders as a tinted pill with
 * the detail beneath — a raised card row. Distinct from v1. Same props,
 * token-only.
 */
exports.AgentStatusV2 = React.forwardRef(function AgentStatusV2({ presence, name, avatar, detail, variant, onClick, className, ...rest }, ref) {
    void variant;
    const p = PRESENCE[presence];
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-agent-status": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${name ?? 'Agent'}, ${p.label}`, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? (0, internal_1.activateOnKey)(() => onClick?.()) : undefined, className: (0, cn_1.cn)('flex items-center gap-3 rounded-lg bg-surface p-2.5 shadow-sm', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: avatar, name: name, size: "md" }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface', p.dot), "aria-hidden": true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: name ?? 'Agent' }), detail ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: detail }) : null] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('rounded-full px-2 py-0.5 text-xs font-semibold', p.pill), children: p.label })] }));
});
//# sourceMappingURL=AgentStatusV2.js.map