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
exports.AgentStatusV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
const PRESENCE = {
    online: { label: 'Online', dot: 'bg-success' },
    away: { label: 'Away', dot: 'bg-warn' },
    offline: { label: 'Offline', dot: 'bg-neutral-400' },
};
/**
 * AgentStatus, redesigned (v3): an **inline presence tag**. A tiny status dot, the
 * name, and the presence word (with an optional detail) — all on one dense line,
 * no avatar. The opposite of v2's chip. Status is dot + word, never color alone.
 * Same props, token-only.
 */
exports.AgentStatusV3 = React.forwardRef(function AgentStatusV3({ presence, name, avatar, detail, variant, onClick, className, ...rest }, ref) {
    void variant;
    void avatar;
    const p = PRESENCE[presence];
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-agent-status": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${name ?? 'Agent'}, ${p.label}`, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? (0, internal_1.activateOnKey)(() => onClick?.()) : undefined, className: (0, cn_1.cn)('inline-flex items-center gap-2 text-sm', interactive && 'cursor-pointer', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-block h-2.5 w-2.5 rounded-full', p.dot), "aria-hidden": true }), name ? (0, jsx_runtime_1.jsx)("span", { className: "font-medium text-on-surface", children: name }) : null, (0, jsx_runtime_1.jsxs)("span", { className: "text-muted", children: [p.label, detail ? ` · ${detail}` : ''] })] }));
});
//# sourceMappingURL=AgentStatusV3.js.map