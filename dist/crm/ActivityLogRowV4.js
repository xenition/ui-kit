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
exports.ActivityLogRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const crm_v4_1 = require("./internal/crm-v4");
/**
 * **V4 activity log row** — the web twin of the native `ActivityLogRowV4`,
 * same props as {@link ActivityLogRow} plus `pendingLabel`.
 *
 * ## Four changes
 *
 * 1. **A pending activity says so.** The base drew `pending` as
 *    `opacity: 0.6` and nothing else — a screen reader heard no difference at
 *    all, and everyone else read the row as *disabled*, because 0.6 sits inside
 *    the band M3 spends on unavailable. It now carries a word.
 * 2. **An activity kind is identity, not status.** `ACTIVITY_META` typed
 *    `task` and `deal` as `success`, so a log of completed calls came out a
 *    green feed and the tone stopped meaning anything. {@link ACTIVITY_META_V4}
 *    keeps the glyph, which is what actually names the kind, and goes neutral.
 * 3. **One accessible name.** `Call: Rang Ada` replaced the whole subtree, so
 *    the detail, the actor and the timestamp — the three things a feed exists
 *    to show — were never announced. Every part joins the name, comma-joined.
 * 4. **A press is a state layer on a real button**, not a `role="button"` div
 *    with a hand-written Enter/Space handler and no pressed treatment at all.
 *    A non-interactive row stays a plain, readable region rather than a
 *    focusable one.
 */
exports.ActivityLogRowV4 = React.forwardRef(function ActivityLogRowV4({ kind, title, detail, actor, timestamp, pending = false, pendingLabel = 'Pending', onClick, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    // A feed entry with nothing to say is the blank frame the line rules out.
    if (!title)
        return null;
    const meta = crm_v4_1.ACTIVITY_META_V4[kind];
    const caption = (0, crm_v4_1.metaLine)([actor, timestamp]);
    const label = (0, crm_v4_1.spokenLine)([
        meta.label,
        title,
        detail,
        actor,
        timestamp,
        pending ? pendingLabel : undefined,
    ]);
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-xl w-xl shrink-0 items-center justify-center rounded-[var(--xen-radius-full)] bg-selected text-sm', (0, crm_v4_1.toneInkClass)(meta.tone)), children: meta.glyph }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs text-left", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 truncate text-sm font-semibold text-on-surface", children: title }), pending ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...crm_v4_1.BADGE_V4, tone: "neutral", children: pendingLabel })) : null] }), detail ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: detail }) : null, caption ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs font-medium text-muted-text", children: caption })) : null] })] }));
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('flex w-full', className), ...rest, children: onClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": label, onClick: onClick, "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)'), className: (0, cn_1.cn)('flex w-full items-start gap-sm rounded-[var(--xen-radius-md)] px-sm py-sm text-left', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', chrome_v4_1.MIN_TAP_CLASS), children: body })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex w-full items-start gap-sm py-sm", children: body })) }));
});
//# sourceMappingURL=ActivityLogRowV4.js.map