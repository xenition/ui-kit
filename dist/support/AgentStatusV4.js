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
exports.AgentStatusV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const internal_1 = require("./internal");
// online → success, away → warn, offline → muted. Each carries a distinct glyph
// so presence reads by shape as well as color.
const PRESENCE = {
    online: { glyph: '●', label: 'Online', pill: 'bg-success/10 text-success' },
    away: { glyph: '◐', label: 'Away', pill: 'bg-warn/10 text-warn' },
    offline: { glyph: '○', label: 'Offline', pill: 'bg-muted/10 text-muted' },
};
/**
 * AgentStatus — **V4** "calm console" design (web parity of the native V4). The
 * agent-workspace take on a presence indicator: an avatar + name with a soft-tint
 * presence pill carrying glyph + label (presence is encoded by glyph **and**
 * color, never color alone), plus an optional detail chip. The compact `dot`
 * variant is just the pill; the `row` variant is an elevated-friendly, tappable
 * ≥44px row (click / Enter / Space). Same props/behavior as
 * {@link AgentStatusProps}; all colors from `--xen-*` token classes (no literal
 * hex).
 */
exports.AgentStatusV4 = React.forwardRef(function AgentStatusV4({ presence, name, avatar, detail, variant = 'row', onClick, className, ...rest }, ref) {
    const spec = PRESENCE[presence] ?? PRESENCE.offline;
    const a11y = `${name ? `${name}, ` : ''}${spec.label}${detail ? `, ${detail}` : ''}`;
    const pill = ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold', spec.pill), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: spec.glyph }), spec.label] }));
    if (variant === 'dot') {
        return ((0, jsx_runtime_1.jsx)("span", { ref: ref, role: "img", "aria-label": a11y, className: (0, cn_1.cn)('inline-flex items-center', className), ...rest, children: pill }));
    }
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": a11y, onClick: onClick, onKeyDown: interactive ? (0, internal_1.activateOnKey)(onClick) : undefined, className: (0, cn_1.cn)('flex min-h-[44px] items-center gap-3 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-2 shadow-sm', interactive &&
            'cursor-pointer hover:bg-on-surface/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { size: "md", name: name, src: avatar }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-1", children: [name ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: name })) : null, (0, jsx_runtime_1.jsxs)("span", { className: "flex flex-wrap items-center gap-2", children: [pill, detail ? ((0, jsx_runtime_1.jsx)("span", { className: "rounded-full bg-on-surface/[0.05] px-2 py-0.5 text-xs font-semibold text-muted", children: detail })) : null] })] })] }));
});
//# sourceMappingURL=AgentStatusV4.js.map