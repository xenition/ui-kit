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
exports.ReadUnreadToggleV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const mail_v4_1 = require("./internal/mail-v4");
/** 44 on both axes for the icon-only form, composed from the spacing scale. */
const TAP_SQUARE = 'min-w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]';
/**
 * **V4 read / unread toggle** — same props as {@link ReadUnreadToggle} plus
 * `readLabel` and `unreadLabel`.
 *
 * ## Five changes
 *
 * 1. **It announces what state the message is in.** The base named the
 *    *action* and stopped, so a reader tabbing a toolbar heard "Mark as read"
 *    with no way to learn whether the message was already read — and the twin
 *    announced a third thing again. Both twins now name the action and carry
 *    the state as the toggle state.
 * 2. **The zero-size `View` is gone.** It carried a comment claiming an
 *    accessibility guarantee, and the element was empty and explicitly hidden
 *    from assistive tech; it guaranteed nothing. (Native's; the web twin never
 *    had it, and this is the parity note.)
 * 3. **It clears 44.** The base was roughly 24px tall in its icon-only form —
 *    the form a compact toolbar actually uses.
 * 4. **The pill stops being a light-mode ramp step.** `bg-primary-50` is a
 *    ramp step oriented for a light page; on a dark one it painted a near-white
 *    slab. The labelled form wears `selected`/`on-selected`, the pair the
 *    theme ships for exactly this container.
 * 5. **Press is a state layer and disabled is 0.38** — `hover:opacity-70`
 *    dims the control's own content, which is how M3 draws *disabled*.
 */
exports.ReadUnreadToggleV4 = React.forwardRef(function ReadUnreadToggleV4({ read = false, onToggle, iconOnly = false, disabled = false, readLabel = 'Mark as read', unreadLabel = 'Mark as unread', className, }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    // Clicking flips the state; the name is the action that flip performs.
    const nextRead = !read;
    const actionLabel = read ? unreadLabel : readLabel;
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", "aria-label": actionLabel, "aria-pressed": read, disabled: disabled, onClick: () => onToggle?.(nextRead), "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)(iconOnly ? 'var(--xen-surface)' : 'var(--xen-selected)', 'currentColor'), className: (0, cn_1.cn)('inline-flex items-center justify-center gap-xs rounded-[var(--xen-radius-md)] py-xs', chrome_v4_1.MIN_TAP_CLASS, iconOnly ? (0, cn_1.cn)('bg-transparent px-xs', TAP_SQUARE) : (0, cn_1.cn)(mail_v4_1.ROW_SELECTED_CLASS, 'px-sm'), 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', v4_state_1.V4_DISABLED_CLASS, className), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-base leading-none', iconOnly && (read ? mail_v4_1.TONE_INK.muted : mail_v4_1.TONE_INK.primary)), children: read ? '✉️' : '📩' }), iconOnly ? null : (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold", children: actionLabel })] }));
});
//# sourceMappingURL=ReadUnreadToggleV4.js.map