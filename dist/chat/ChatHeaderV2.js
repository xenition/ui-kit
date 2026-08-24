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
exports.ChatHeaderV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const PresenceDot_1 = require("./PresenceDot");
/**
 * ChatHeader — **prominent** variant. A taller, elevated bar (drop shadow
 * instead of a divider) with a large `lg` avatar, a big extra-bold title, and
 * the presence/subtitle rendered as a colored status line — success-tinted when
 * online. Trailing actions read as real filled circular buttons in a
 * primary-tinted well rather than bare glyphs. Same props as `ChatHeader`. No
 * literal colors.
 */
exports.ChatHeaderV2 = React.forwardRef(function ChatHeaderV2({ title, subtitle, avatarUri, presence, typing = false, onBack, onPressTitle, actions, className, ...rest }, ref) {
    const online = presence === 'online';
    return ((0, jsx_runtime_1.jsxs)("header", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-3 bg-surface px-4 py-3 shadow-md', className), ...rest, children: [onBack ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Back", onClick: onBack, className: "shrink-0", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2039", color: "primary", size: "3xl" }) })) : null, (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": title, onClick: onPressTitle, disabled: !onPressTitle, className: "flex min-w-0 flex-1 items-center gap-3 text-left disabled:pointer-events-none", children: [(0, jsx_runtime_1.jsxs)("span", { className: "relative shrink-0", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "lg", src: avatarUri, name: title }), presence ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute bottom-0 right-0", children: (0, jsx_runtime_1.jsx)(PresenceDot_1.PresenceDot, { status: presence }) })) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "block truncate text-xl font-extrabold text-on-surface", children: title }), typing ? ((0, jsx_runtime_1.jsx)("span", { "aria-live": "polite", className: "block truncate text-sm font-semibold text-primary", children: "typing\u2026" })) : subtitle ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('block truncate text-sm', online ? 'font-semibold text-success' : 'text-muted'), children: subtitle })) : null] })] }), actions?.map((action) => ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": action.label, onClick: action.onClick, className: (0, cn_1.cn)('flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10', 'transition-colors hover:bg-primary/20 active:bg-primary/20', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: action.glyph, color: "primary" }) }, action.id)))] }));
});
//# sourceMappingURL=ChatHeaderV2.js.map