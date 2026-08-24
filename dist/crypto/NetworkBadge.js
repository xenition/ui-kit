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
exports.NetworkBadge = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const STATUS_TEXT = {
    connected: 'text-success',
    congested: 'text-warn',
    disconnected: 'text-danger',
};
const STATUS_BG = {
    connected: 'bg-success',
    congested: 'bg-warn',
    disconnected: 'bg-danger',
};
const STATUS_LABEL = {
    connected: 'Connected',
    congested: 'Congested',
    disconnected: 'Offline',
};
const TONE_TEXT = {
    onSurface: 'text-on-surface',
    onPrimary: 'text-on-primary',
    primary: 'text-primary',
    muted: 'text-muted',
    success: 'text-success',
    onSuccess: 'text-on-success',
    warn: 'text-warn',
    onWarn: 'text-on-warn',
    danger: 'text-danger',
    onDanger: 'text-on-danger',
};
const TONE_BG = {
    onSurface: 'bg-on-surface',
    onPrimary: 'bg-on-primary',
    primary: 'bg-primary',
    muted: 'bg-muted',
    success: 'bg-success',
    onSuccess: 'bg-on-success',
    warn: 'bg-warn',
    onWarn: 'bg-on-warn',
    danger: 'bg-danger',
    onDanger: 'bg-on-danger',
};
/**
 * Compact chain identifier pill — a dot (accented by `tone`) or leading glyph
 * plus the network name, and, when `status` is set, a second health dot with a
 * text label so the connection state is read, not just colored. Token-bound
 * throughout; no literal colors. Web parity of the native `NetworkBadge`.
 */
exports.NetworkBadge = React.forwardRef(function NetworkBadge({ name, status, tone = 'primary', glyph, size = 'md', className, ...rest }, ref) {
    const textSize = size === 'sm' ? 'text-xs' : 'text-sm';
    const dot = size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2';
    const statusLabel = status ? STATUS_LABEL[status] : undefined;
    return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, "aria-label": statusLabel ? `${name}, ${statusLabel}` : name, className: (0, cn_1.cn)('inline-flex items-center gap-1 self-start rounded-full border border-border bg-neutral-100 px-2 py-0.5', className), ...rest, children: [glyph != null ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)(textSize, TONE_TEXT[tone]), children: glyph })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('inline-block rounded-full', dot, TONE_BG[tone]) })), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate font-semibold text-on-surface', textSize), children: name }), status != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('inline-block rounded-full', dot, STATUS_BG[status]) }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs', STATUS_TEXT[status]), children: statusLabel })] })) : null] }));
});
//# sourceMappingURL=NetworkBadge.js.map