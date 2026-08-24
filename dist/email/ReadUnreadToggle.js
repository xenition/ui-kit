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
exports.ReadUnreadToggle = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * A control that flips a message between read and unread. A real `<button>`
 * whose glyph (open vs. filled envelope) and word label both change with state,
 * and whose accessible label announces the *action* ("Mark as read" / "Mark as
 * unread") so it never relies on color alone. Controlled via `read` /
 * `onToggle`. No literal colors.
 */
exports.ReadUnreadToggle = React.forwardRef(function ReadUnreadToggle({ read = false, onToggle, iconOnly = false, disabled = false, className }, ref) {
    // Clicking toggles: if currently read → mark unread, and vice-versa.
    const nextRead = !read;
    const actionLabel = nextRead ? 'Mark as read' : 'Mark as unread';
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", "aria-label": actionLabel, disabled: disabled, onClick: () => onToggle?.(nextRead), className: (0, cn_1.cn)('inline-flex items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] py-[var(--xen-space-xs)] transition-opacity', iconOnly ? 'bg-transparent px-[var(--xen-space-xs)]' : 'bg-primary-50 px-[var(--xen-space-sm)]', 'hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', 'disabled:pointer-events-none disabled:opacity-50', className), children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: read ? '✉️' : '📩', size: "base", color: read ? 'muted' : 'primary' }), iconOnly ? null : ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-semibold', read ? 'text-muted' : 'text-primary'), children: actionLabel }))] }));
});
//# sourceMappingURL=ReadUnreadToggle.js.map