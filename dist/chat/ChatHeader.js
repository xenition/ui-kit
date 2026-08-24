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
exports.ChatHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const PresenceDot_1 = require("./PresenceDot");
/**
 * Top bar for a conversation screen — optional back button, clickable
 * avatar+title block with a presence badge and subtitle (or a "typing…"
 * caption), and trailing action buttons. Rendered as a `<header>` element. No
 * literal colors.
 */
exports.ChatHeader = React.forwardRef(function ChatHeader({ title, subtitle, avatarUri, presence, typing = false, onBack, onPressTitle, actions, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("header", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-2 border-b border-border bg-surface px-4 py-2', className), ...rest, children: [onBack ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Back", onClick: onBack, className: "shrink-0", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2039", color: "primary", size: "2xl" }) })) : null, (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": title, onClick: onPressTitle, disabled: !onPressTitle, className: "flex min-w-0 flex-1 items-center gap-2 text-left disabled:pointer-events-none", children: [(0, jsx_runtime_1.jsxs)("span", { className: "relative shrink-0", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "md", src: avatarUri, name: title }), presence ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute -bottom-px -right-px", children: (0, jsx_runtime_1.jsx)(PresenceDot_1.PresenceDot, { status: presence }) })) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "block truncate text-base font-semibold text-on-surface", children: title }), typing ? ((0, jsx_runtime_1.jsx)("span", { "aria-live": "polite", className: "block truncate text-xs text-primary", children: "typing\u2026" })) : subtitle ? ((0, jsx_runtime_1.jsx)("span", { className: "block truncate text-xs text-muted", children: subtitle })) : null] })] }), actions?.map((action) => ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": action.label, onClick: action.onClick, className: "shrink-0 p-1", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: action.glyph, color: "primary" }) }, action.id)))] }));
});
//# sourceMappingURL=ChatHeader.js.map