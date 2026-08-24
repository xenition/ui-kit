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
exports.ChatHeaderV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const PresenceDot_1 = require("./PresenceDot");
/**
 * ChatHeader — **compact centered** variant. A slim iOS-style bar: the back
 * affordance pinned far-left and the trailing actions far-right (each in a
 * fixed-width cluster so the center stays optically centered), with a small
 * `xs` avatar stacked above a centered title + subtitle in the middle. Minimal
 * height, borderless-but-for a hairline rule — the counterpart to the roomy v2
 * header. Same props as `ChatHeader`. No literal colors.
 */
exports.ChatHeaderV3 = React.forwardRef(function ChatHeaderV3({ title, subtitle, avatarUri, presence, typing = false, onBack, onPressTitle, actions, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("header", { ref: ref, className: (0, cn_1.cn)('flex items-center border-b border-border bg-surface px-2 py-1', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "flex w-16 items-center", children: onBack ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Back", onClick: onBack, className: "shrink-0", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2039", color: "primary", size: "2xl" }) })) : null }), (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": title, onClick: onPressTitle, disabled: !onPressTitle, className: "flex min-w-0 flex-1 flex-col items-center gap-0.5 text-center disabled:pointer-events-none", children: [(0, jsx_runtime_1.jsxs)("span", { className: "relative", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "xs", src: avatarUri, name: title }), presence ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute -bottom-0.5 -right-0.5", children: (0, jsx_runtime_1.jsx)(PresenceDot_1.PresenceDot, { status: presence }) })) : null] }), (0, jsx_runtime_1.jsx)("span", { className: "max-w-full truncate text-sm font-bold text-on-surface", children: title }), typing ? ((0, jsx_runtime_1.jsx)("span", { "aria-live": "polite", className: "max-w-full truncate text-xs text-primary", children: "typing\u2026" })) : subtitle ? ((0, jsx_runtime_1.jsx)("span", { className: "max-w-full truncate text-xs text-muted", children: subtitle })) : null] }), (0, jsx_runtime_1.jsx)("span", { className: "flex w-16 items-center justify-end gap-1", children: actions?.map((action) => ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": action.label, onClick: action.onClick, className: "shrink-0 p-1", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: action.glyph, color: "primary", size: "lg" }) }, action.id))) })] }));
});
//# sourceMappingURL=ChatHeaderV3.js.map