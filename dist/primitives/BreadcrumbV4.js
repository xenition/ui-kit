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
exports.BreadcrumbV4 = BreadcrumbV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const nav_v4_1 = require("./internal/nav-v4");
/**
 * **V4 breadcrumb** — the web twin of the native `BreadcrumbV4`, same props as
 * {@link Breadcrumb}, a different design line.
 *
 * ## What a breadcrumb is for
 *
 * §29 asks that the user always know three things: where they are, what they
 * are editing, and how to go back. A breadcrumb is the only component in the
 * kit that answers all three at once, so the whole design is about making the
 * answer separable at a glance (§33 — users scan before they read).
 *
 * The trail therefore has exactly two registers, not a gradient of them:
 *
 * - **Where you are** is the last item, in `on-surface` at weight 600, carrying
 *   `aria-current="page"`. It is the only full-contrast text in the row, so a
 *   scan finds it without counting separators.
 * - **How to go back** is everything before it, in `muted`, each one a real
 *   target that underlines on hover so it reads as a link before it is clicked.
 *
 * ## The separator is a chevron, not a slash
 *
 * The base default was `/`, which reads as a path — a filesystem string the
 * user is expected to parse. `›` reads as *direction*: this came from that.
 * Same prop, same type, a different default; pass `separator` to override it
 * exactly as before. It is `aria-hidden`, because a screen reader announcing a
 * chevron between every crumb is noise and the list order already carries the
 * nesting.
 *
 * ## A link you can reach with a keyboard
 *
 * The base rendered `<a onClick>` with no `href` for a click-only crumb. An
 * anchor without an `href` is not in the tab order and does not fire on Enter,
 * so a keyboard user could see the way back and not take it — §46 makes that a
 * defect, not a nicety. V4 renders an `<a>` only when there is somewhere to go
 * and a `<button>` when there is only a handler, which is what each element
 * actually means.
 *
 * ## Reach
 *
 * Each link is a full 44px target composed from the spacing scale. The base
 * trail had none — a 17px hit area on the one control whose entire job is
 * *getting out of here* (§30).
 */
function BreadcrumbV4({ items, separator = '›', className, }) {
    (0, inject_1.injectStyleOnce)('xen-v4-nav-styles', nav_v4_1.NAV_V4_CSS);
    const linkClass = (0, cn_1.cn)('inline-flex items-center rounded-[var(--xen-radius-sm)] px-xs font-body text-sm font-normal', 'text-muted-text hover:underline focus-visible:outline-none', nav_v4_1.MIN_TAP_CLASS);
    return ((0, jsx_runtime_1.jsx)("nav", { "aria-label": "Breadcrumb", className: (0, cn_1.cn)('flex flex-wrap items-center gap-xs', className), children: items.map((item, index) => {
            const last = index === items.length - 1;
            const interactive = (item.href !== undefined || item.onClick !== undefined) && !last;
            return ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [interactive ? (item.href !== undefined ? ((0, jsx_runtime_1.jsx)("a", { "data-xen-v4-nav-item": "", href: item.href, onClick: item.onClick, className: linkClass, children: item.label })) : (
                    // A handler with no destination is a button, not an anchor —
                    // and unlike a hrefless `<a>`, it is focusable and fires on Enter.
                    (0, jsx_runtime_1.jsx)("button", { type: "button", "data-xen-v4-nav-item": "", onClick: item.onClick, className: linkClass, children: item.label }))) : ((0, jsx_runtime_1.jsx)("span", { "aria-current": last ? 'page' : undefined, className: (0, cn_1.cn)('inline-flex items-center px-xs font-body text-sm', nav_v4_1.MIN_TAP_CLASS, 
                        // Two registers only: the page you are on, and the way back.
                        last ? 'font-semibold text-on-surface' : 'font-normal text-muted-text'), children: item.label })), !last && ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm text-muted-text", children: separator }))] }, index));
        }) }));
}
//# sourceMappingURL=BreadcrumbV4.js.map