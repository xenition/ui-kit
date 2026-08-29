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
exports.PermissionPromptV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const Text_1 = require("../primitives/Text");
const GetStartedButton_1 = require("./GetStartedButton");
/** §10: geometry only — 44 (`h-11`) is the minimum tap target and the badge size. */
const TAP_TARGET_CLASS = 'min-h-11';
const KIND_GLYPH = {
    notifications: '🔔',
    location: '📍',
    camera: '📷',
    microphone: '🎤',
    photos: '🖼️',
    contacts: '👥',
    generic: '🔒',
};
/**
 * Permission pre-prompt — V3, the compact line. No hero panel and no medallion
 * stage: a 44px badge sits beside a left-aligned headline, the rationale runs
 * underneath at the small step, and the benefit rows tighten to a single line
 * each. Sized for a sheet or a mid-flow nudge where a full hero would be
 * theatre.
 *
 * `illustration` is deliberately ignored — the compact line has nowhere to put a
 * hero.
 *
 * Like the base component it never fires a permission dialog itself — `onAllow`
 * is the host's cue to make the real request.
 *
 * Same props as {@link PermissionPrompt}. Token-pure.
 */
exports.PermissionPromptV3 = React.forwardRef(function PermissionPromptV3({ kind = 'generic', icon, title, rationale, allowLabel = 'Allow', denyLabel = 'Not now', onAllow, onDeny, state = 'idle', deniedMessage = 'You can enable this later in Settings.', fullScreen = false, illustration: _illustration, benefits = [], progress, onBack, onDismiss, grantedMessage = "You're all set.", className, ...rest }, ref) {
    const glyph = icon ?? KIND_GLYPH[kind];
    const granted = state === 'granted';
    const showHeader = fullScreen && (onBack != null || onDismiss != null || progress != null);
    const header = ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md text-left", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-11 w-11 shrink-0 items-center justify-center rounded-full', granted ? 'bg-success' : 'bg-primary-50'), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: granted ? '✓' : glyph, size: "lg", color: granted ? 'onSuccess' : 'primary' }) }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("h2", { children: (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "lg", weight: "bold", tone: "onSurface", numberOfLines: 2, className: "block", children: title }) }), (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "muted", children: rationale })] })] }));
    const rows = benefits.length > 0 ? ((0, jsx_runtime_1.jsx)("ul", { className: "flex flex-col gap-sm", children: benefits.map((benefit) => ((0, jsx_runtime_1.jsxs)("li", { className: "flex items-center gap-sm text-left", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: benefit.icon ?? '✓', size: "sm", color: "primary" }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col", children: [(0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", weight: "semibold", tone: "onSurface", numberOfLines: 1, children: benefit.title }), benefit.description ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "xs", tone: "muted", numberOfLines: 1, children: benefit.description })) : null] })] }, benefit.id))) })) : null;
    const grantedLine = ((0, jsx_runtime_1.jsxs)("p", { "aria-live": "polite", className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "check", size: "sm", color: "success" }), (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", weight: "semibold", tone: "successText", children: grantedMessage })] }));
    const actions = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: allowLabel, trailingArrow: false, loading: state === 'requesting', onClick: onAllow }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": denyLabel, onClick: onDeny, className: (0, cn_1.cn)('flex items-center justify-center text-center', TAP_TARGET_CLASS), children: (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", weight: "medium", tone: "muted", children: denyLabel }) }), state === 'denied' ? ((0, jsx_runtime_1.jsxs)("p", { "aria-live": "polite", className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "info", size: "sm", color: "muted" }), (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "xs", tone: "muted", children: deniedMessage })] })) : null] }));
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [showHeader ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [onBack ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Back", onClick: onBack, className: "flex h-11 w-11 items-center justify-center", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "chevron-left", size: "xl", color: "onSurface" }) })) : null, (0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: progress }), onDismiss ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Dismiss", onClick: onDismiss, className: "flex h-11 w-11 items-center justify-center", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "close", size: "lg", color: "muted" }) })) : null] })) : null, header, rows, (0, jsx_runtime_1.jsx)("div", { className: "mt-auto flex flex-col gap-xs border-t border-border bg-surface pb-lg pt-sm", children: granted ? grantedLine : actions })] }));
    if (!fullScreen) {
        return ((0, jsx_runtime_1.jsx)(Card_1.Card, { ref: ref, padding: "md", className: (0, cn_1.cn)('flex flex-col gap-md', className), ...rest, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('flex min-h-full flex-col gap-md bg-surface', className), ...rest, children: body }));
});
//# sourceMappingURL=PermissionPromptV3.js.map