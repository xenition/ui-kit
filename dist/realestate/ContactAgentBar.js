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
exports.ContactAgentBar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const Avatar_1 = require("../primitives/Avatar");
/** Shared min-height so every CTA clears the 44px tap target. */
const CTA = 'min-h-[44px]';
/**
 * ContactAgentBar — **V4** "listing" design. A sticky-style contact action bar
 * for a listing: an optional agent avatar + name/subtitle on the left, then the
 * secondary Call and Message actions and a primary Schedule-tour CTA on the
 * right. Editorial, single-accent (primary) with the tour as the only filled
 * button; every CTA is ≥44px. 8-pt spacing inside a rounded elevated bar.
 * Presentational only — data + callbacks; an action is only rendered when its
 * handler is supplied. All colors from `--xen-*` token classes, no literals;
 * dark-mode safe.
 */
exports.ContactAgentBar = React.forwardRef(function ContactAgentBar({ agentName, agentAvatarUrl, agentSubtitle, onCall, onMessage, onTour, callLabel = 'Call', messageLabel = 'Message', tourLabel = 'Tour', className, ...rest }, ref) {
    const showAgent = Boolean(agentName || agentAvatarUrl);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-wrap items-center gap-2 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-2 text-on-surface shadow-md', className), ...rest, children: [showAgent ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 items-center gap-2", children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: agentAvatarUrl, name: agentName, size: "md" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-col", children: [agentName ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-bold text-on-surface", children: agentName }) : null, agentSubtitle ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: agentSubtitle }) : null] })] })) : null, (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex items-center gap-2', showAgent ? 'ml-auto' : 'w-full'), children: [onCall ? ((0, jsx_runtime_1.jsxs)(primitives_1.Button, { variant: "secondary", size: "md", onClick: onCall, "aria-label": callLabel, className: (0, cn_1.cn)(CTA, 'gap-1.5'), children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "phone", "aria-hidden": true, size: "base" }), callLabel] })) : null, onMessage ? ((0, jsx_runtime_1.jsxs)(primitives_1.Button, { variant: "secondary", size: "md", onClick: onMessage, "aria-label": messageLabel, className: (0, cn_1.cn)(CTA, 'gap-1.5'), children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "mail", "aria-hidden": true, size: "base" }), messageLabel] })) : null, onTour ? ((0, jsx_runtime_1.jsxs)(primitives_1.Button, { variant: "primary", size: "md", onClick: onTour, "aria-label": tourLabel, className: (0, cn_1.cn)(CTA, 'flex-1 gap-1.5'), children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "calendar", "aria-hidden": true, size: "base" }), tourLabel] })) : null] })] }));
});
//# sourceMappingURL=ContactAgentBar.js.map