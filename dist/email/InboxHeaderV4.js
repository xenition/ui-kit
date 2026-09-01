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
exports.InboxHeaderV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const mail_v4_1 = require("./internal/mail-v4");
/** Above this the count reads `999+` — four digits push the title out. */
const COUNT_CAP = 999;
/** 44 on both axes for a glyph action, composed from the spacing scale. */
const TAP_SQUARE = 'min-w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]';
/**
 * **V4 inbox header** — same props as {@link InboxHeader} plus `formatUnread`
 * and `syncingLabel`.
 *
 * ## Four changes
 *
 * 1. **The unread count says what it is counting.** A reader heard "Inbox"
 *    and then "42", with nothing anywhere saying 42 of what — the number was a
 *    bare numeral beside a title. The numeral stays on screen and the spoken
 *    form carries the unit.
 * 2. **Syncing is announced.** It was a caption that appeared and vanished
 *    with no role and no live region, so the one state the header exists to
 *    report was invisible to the only users who cannot see it happening.
 * 3. **The action buttons clear 44.** `p-xs` around a glyph is roughly a 28px
 *    target in the corner of the screen, which is where a thumb is least
 *    accurate.
 * 4. **Press is a state layer and the ink is the corrected slot** — the
 *    actions dimmed themselves on hover at M3's *disabled* band, and the count
 *    and caption were drawn in `muted`, a ramp step with no contrast promise.
 */
exports.InboxHeaderV4 = React.forwardRef(function InboxHeaderV4({ title, unreadCount = 0, onBack, actions, syncing = false, formatUnread = (value) => `${value} unread`, syncingLabel = 'Syncing…', className, }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const safeActions = actions ?? [];
    const shown = unreadCount > COUNT_CAP ? `${COUNT_CAP}+` : String(unreadCount);
    const actionClass = (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center rounded-full', chrome_v4_1.MIN_TAP_CLASS, TAP_SQUARE, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring');
    const actionStyle = (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)');
    return ((0, jsx_runtime_1.jsxs)("header", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-sm border-b border-border bg-surface px-md py-sm', className), children: [onBack ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Back", onClick: onBack, "data-xen-v4-state": "", style: actionStyle, className: actionClass, children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-2xl leading-none text-on-surface", children: "\u2039" }) })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("h1", { className: "truncate text-xl font-bold text-on-surface", children: title }), unreadCount > 0 ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-base font-semibold', mail_v4_1.TONE_INK.muted), children: shown }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: formatUnread(unreadCount) })] })) : null] }), syncing ? ((0, jsx_runtime_1.jsx)("p", { role: "status", "aria-live": "polite", className: (0, cn_1.cn)('text-xs', mail_v4_1.TONE_INK.muted), children: syncingLabel })) : null] }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-xs", children: safeActions.map((action) => ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": action.label, onClick: action.onClick, "data-xen-v4-state": "", style: actionStyle, className: actionClass, children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xl leading-none text-on-surface", children: action.glyph }) }, action.id))) })] }));
});
//# sourceMappingURL=InboxHeaderV4.js.map