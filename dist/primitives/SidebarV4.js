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
exports.SidebarV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const chrome_v4_1 = require("./internal/chrome-v4");
/**
 * The row, minus the state.
 *
 * `MIN_TAP_CLASS` rather than `py-sm`: a nav row is the control a user hits
 * most often in a dashboard, and the base's padding put it at about 34 tall.
 */
const ROW_BASE = (0, cn_1.cn)('relative flex w-full items-center gap-sm rounded-[var(--xen-radius-md)]', 'pl-md pr-md text-left font-body text-sm', 'focus-visible:outline-none', chrome_v4_1.MIN_TAP_CLASS);
/**
 * The current destination, and the way it says so.
 *
 * Three signals, not one: a brand **tint** (not a brand fill), the brand text
 * colour, and a leading rail. §35.6 asks that colour create hierarchy rather
 * than noise — a row filled solid `primary`, which is what the native base
 * does, wins the "which one" question and loses the label, the icon and the
 * group structure under a brand bar. A tint plus a weight change plus an edge
 * marker says *this one* without shouting it, and the rail survives for a user
 * who cannot separate the tint from the surface at all.
 *
 * The tint is `color-mix()` of two custom properties rather than
 * `bg-primary-50`. The ramps carry the LIGHT orientation in both schemes, so
 * `primary-50` is the palest step on a dark page too — a near-white slab.
 */
function SidebarRow({ item }) {
    const active = item.active === true;
    const className = (0, cn_1.cn)(ROW_BASE, active
        ? 'bg-[color-mix(in_srgb,var(--xen-primary)_12%,var(--xen-surface))] font-semibold text-primary-text'
        : 'font-medium text-on-surface');
    const icon = item.icon !== undefined ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "inline-flex shrink-0 items-center justify-center", children: item.icon })) : null;
    const rail = active ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "absolute inset-y-sm left-0 w-[2px] rounded-[var(--xen-radius-full)] bg-primary" })) : null;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [rail, icon, (0, jsx_runtime_1.jsx)("span", { className: "truncate", children: item.label })] }));
    if (item.href !== undefined) {
        return ((0, jsx_runtime_1.jsx)("a", { href: item.href, "aria-current": active ? 'page' : undefined, onClick: item.onSelect, "data-xen-v4-chrome": active ? 'primary' : 'on-surface', className: className, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-current": active ? 'page' : undefined, onClick: item.onSelect, "data-xen-v4-chrome": active ? 'primary' : 'on-surface', className: className, children: body }));
}
/**
 * `Sidebar`, V4 — the same props, and a rail that answers "where am I?".
 *
 * ## No shadow, and that is the point
 *
 * A persistent nav rail is **not** a layer. It is attached to the edge of the
 * page and separated by a hairline, and §11 asks that a container earn its
 * existence rather than draw a box because that looks modern. So this component
 * spends no `elevation` at all: the only V4 primitive in the chrome family that
 * deliberately does not.
 *
 * The rail genuinely does become a layer in one situation — slid in over the
 * page on a narrow screen — and that is `AppShellV4`'s job, because the drawer
 * is the thing that is floating, not the sidebar inside it. Putting the shadow
 * here would make the persistent rail cast one onto the content beside it,
 * which is a shadow with nothing to fall from.
 *
 * ## Saying where the user is
 *
 * §29 gives navigation one job above every other: the user should always know
 * where they are, and §32 asks that they recognise it rather than recall it. So
 * the current row carries three signals — a brand tint, the brand text colour
 * and a leading rail — rather than the single solid `primary` fill the native
 * base paints, which repaints the row and takes the icon and the label with it.
 *
 * Group headings move from `muted` to `muted-text`: `muted` is a decorative
 * slot with no contrast promise, and a section heading is text.
 *
 * ## Feedback
 *
 * Hover and press are the M3 state layer — the row's own content colour at
 * 0.08 / 0.12 over `surface`. The base's `hover:bg-neutral-100` is a
 * light-oriented ramp step and paints a near-white slab across a dark rail.
 * Focus is `--xen-ring`, the one ring the kit shares, rather than
 * `ring-primary-300`, which is another ramp step and inverts the same way.
 */
exports.SidebarV4 = React.forwardRef(function SidebarV4({ brand, items, groups, footer, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(chrome_v4_1.CHROME_V4_STYLE_ID, chrome_v4_1.CHROME_V4_CSS);
    const resolvedGroups = groups ?? (items ? [{ items }] : []);
    return ((0, jsx_runtime_1.jsxs)("nav", { ref: ref, "aria-label": "Sidebar", className: (0, cn_1.cn)('flex h-full flex-col gap-md border-r border-border bg-surface text-on-surface', 'px-sm py-lg', className), ...rest, children: [brand !== undefined ? ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center px-sm font-heading text-lg font-bold", children: brand })) : null, (0, jsx_runtime_1.jsx)("div", { className: "flex flex-1 flex-col gap-lg overflow-y-auto", children: resolvedGroups.map((group, gi) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [group.label !== undefined ? ((0, jsx_runtime_1.jsx)("div", { className: "px-md pb-xs font-body text-xs font-semibold uppercase tracking-wide text-muted-text", children: group.label })) : null, group.items.map((item, ii) => ((0, jsx_runtime_1.jsx)(SidebarRow, { item: item }, ii)))] }, gi))) }), footer !== undefined ? ((0, jsx_runtime_1.jsx)("div", { className: "border-t border-border pt-md", children: footer })) : null] }));
});
//# sourceMappingURL=SidebarV4.js.map