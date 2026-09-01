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
exports.FolderRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const mail_v4_1 = require("./internal/mail-v4");
/** Above this the pill reads `999+` — four digits push the name off the row. */
const COUNT_CAP = 999;
/**
 * **V4 folder row** — same props as {@link FolderRow} plus `formatCount`.
 *
 * ## Four changes
 *
 * 1. **It stops saying "unread" for a number that is often not unread.** The
 *    prop's own doc defines `count` as "unread / item count", and the row
 *    announced "Drafts, 3 unread" — wrong for Drafts, wrong for Spam, wrong for
 *    any folder where the number is a total. `formatCount` names the unit and
 *    defaults to the honest one.
 * 2. **A hovered folder stops looking like the open one.** `bg-primary-50`
 *    selected against `bg-neutral-100` hover is two ramp steps a shade apart on
 *    a light page and two near-white slabs on a dark one, so running the mouse
 *    down the sidebar lit every folder as "the current one". Selected is the
 *    `selected` container; hover is the state layer over it.
 * 3. **The row clears 44.** `py-sm` on a `base` line left it near 32 — a
 *    sidebar target hit with a thumb while the other hand holds the phone.
 * 4. **The ink is the corrected slot and the pill has a guaranteed pair.**
 *    `text-primary` on the selected name and `bg-neutral-100 text-muted` on the
 *    pill were a fill used as ink and a ramp step used as a container.
 */
exports.FolderRowV4 = React.forwardRef(function FolderRowV4({ name, glyph, count = 0, selected = false, depth = 0, onClick, formatCount = (value) => `${value} items`, className, }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const indent = Math.max(0, depth);
    const shown = count > COUNT_CAP ? `${COUNT_CAP}+` : String(count);
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", "aria-label": (0, mail_v4_1.spokenLine)([name, count > 0 ? formatCount(count) : undefined]), "aria-current": selected ? 'page' : undefined, onClick: onClick, "data-xen-v4-state": "", style: {
            paddingLeft: `calc(var(--xen-space-md) + ${indent} * var(--xen-space-lg))`,
            ...(0, v4_state_1.stateGroundVars)(selected ? 'var(--xen-selected)' : 'var(--xen-surface)', selected ? 'var(--xen-on-selected)' : 'var(--xen-on-surface)'),
        }, className: (0, cn_1.cn)('flex w-full items-center gap-sm rounded-[var(--xen-radius-md)] py-sm pr-md text-left', chrome_v4_1.MIN_TAP_CLASS, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', selected ? mail_v4_1.ROW_SELECTED_CLASS : 'bg-transparent text-on-surface', className), children: [glyph ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-base leading-none', !selected && mail_v4_1.TONE_INK.muted), children: glyph })) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('min-w-0 flex-1 truncate text-base', selected ? 'font-bold' : 'font-medium'), children: name }), count > 0 ? (
            // The numeral is decorative here: the unit went into the row's name,
            // and a reader hearing "42" twice learns nothing the second time.
            (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center rounded-full px-xs text-xs font-bold', 'min-w-[calc(var(--xen-space-md)_+_var(--xen-space-xs))]', selected ? 'bg-primary text-on-primary' : 'bg-muted text-on-surface'), children: shown })) : null] }));
});
//# sourceMappingURL=FolderRowV4.js.map