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
exports.MailSwipeActions = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const TONE_BG = {
    neutral: 'bg-muted',
    primary: 'bg-primary',
    success: 'bg-success',
    warn: 'bg-warn',
    danger: 'bg-danger',
};
const TONE_FG = {
    neutral: 'text-surface',
    primary: 'text-on-primary',
    success: 'text-on-success',
    warn: 'text-on-warn',
    danger: 'text-on-danger',
};
const TONE_ICON = {
    neutral: 'onSurface',
    primary: 'onPrimary',
    success: 'onSuccess',
    warn: 'onWarn',
    danger: 'onDanger',
};
/**
 * The revealed action panels behind a swipeable mail row (this is the static
 * action rail — the host supplies the gesture/animation). Each action is a
 * full-height, toned real `<button>` with a glyph + label; tones map to
 * semantic slots (danger for delete, warn for snooze, etc). The container is a
 * `role="toolbar"`. Renders nothing when `actions` is empty. No literal colors.
 */
exports.MailSwipeActions = React.forwardRef(function MailSwipeActions({ actions, side = 'trailing', className }, ref) {
    const safe = actions ?? [];
    if (safe.length === 0)
        return null;
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "toolbar", className: (0, cn_1.cn)('flex items-stretch', side === 'leading' ? 'flex-row' : 'flex-row-reverse', className), children: safe.map((a) => {
            const tone = a.tone ?? 'neutral';
            return ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": a.label, onClick: a.onClick, className: (0, cn_1.cn)('flex min-w-[72px] flex-col items-center justify-center gap-[var(--xen-space-xs)] px-[var(--xen-space-md)] py-[var(--xen-space-md)] transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', TONE_BG[tone]), children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: a.glyph, size: "lg", color: TONE_ICON[tone] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-xs font-semibold', TONE_FG[tone]), children: a.label })] }, a.id));
        }) }));
});
//# sourceMappingURL=MailSwipeActions.js.map