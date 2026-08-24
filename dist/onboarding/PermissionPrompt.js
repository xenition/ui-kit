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
exports.PermissionPrompt = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const GetStartedButton_1 = require("./GetStartedButton");
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
 * Contextual permission pre-prompt — the in-app "explain, then ask" screen that
 * precedes the real OS/browser dialog so the system prompt only fires once the
 * user has already said yes (design.md §17). Renders a rationale, an
 * `Allow`/`Not now` pair, and reflects `requesting`/`granted`/`denied` states
 * (granted shows a success line in a polite live region; denied shows a recovery
 * hint). Colors come from the success and primary tokens. No literal colors.
 */
exports.PermissionPrompt = React.forwardRef(function PermissionPrompt({ kind = 'generic', icon, title, rationale, allowLabel = 'Allow', denyLabel = 'Not now', onAllow, onDeny, state = 'idle', deniedMessage = 'You can enable this later in Settings.', className, ...rest }, ref) {
    const glyph = icon ?? KIND_GLYPH[kind];
    const granted = state === 'granted';
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, className: (0, cn_1.cn)('flex flex-col items-center gap-3 text-center', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex h-[72px] w-[72px] items-center justify-center rounded-full', granted ? 'bg-success' : 'bg-primary'), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: granted ? '✓' : glyph, size: "2xl", color: granted ? 'onSuccess' : 'onPrimary' }) }), (0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-bold text-on-surface", children: title }), (0, jsx_runtime_1.jsx)("p", { className: "text-base leading-relaxed text-muted", children: rationale }), granted ? ((0, jsx_runtime_1.jsx)("p", { "aria-live": "polite", className: "text-sm font-semibold text-success", children: "You're all set." })) : ((0, jsx_runtime_1.jsxs)("div", { className: "mt-1 flex w-full flex-col gap-2", children: [(0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: allowLabel, loading: state === 'requesting', onClick: onAllow }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": denyLabel, onClick: onDeny, className: "py-2 text-center text-base font-medium text-muted", children: denyLabel }), state === 'denied' ? ((0, jsx_runtime_1.jsx)("p", { "aria-live": "polite", className: "text-center text-sm text-muted", children: deniedMessage })) : null] }))] }));
});
//# sourceMappingURL=PermissionPrompt.js.map