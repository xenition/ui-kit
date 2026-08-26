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
exports.ScrollableTabsV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const reduced_motion_1 = require("../motion/internal/reduced-motion");
const cn_1 = require("./cn");
const nav_v4_1 = require("./internal/nav-v4");
/**
 * **V4 scrollable tabs** — the web twin of the native `ScrollableTabsV4`, same
 * props as {@link ScrollableTabs}, a different design line.
 *
 * Everything `TabsV4` does, plus the two things that only matter once the row
 * is longer than its container.
 *
 * ## The selected tab comes to you
 *
 * A scrolling tab bar can put the answer to "where am I" out of view, which
 * makes §32 unsatisfiable: there is nothing to recognise. So the row scrolls
 * the selected tab into view whenever the selection changes — including when
 * it changes from somewhere else, which is the case the user cannot fix by
 * scrolling because they never saw it happen.
 *
 * The scroll is smooth for the same reason the underline slides (§36.5): the
 * bar moving under a stationary pointer explains where the content went, while
 * a jump replaces one view with another and leaves the reader to work out what
 * changed. `prefers-reduced-motion` switches it to an instant scroll (§36.10) —
 * the tab still arrives.
 *
 * ## The count chip owns its ground
 *
 * The base bar filled the active chip with `bg-primary` and labelled it
 * `text-surface` — two slots with no contrast relationship at all; on a pale
 * primary that is white on near-white. The idle chip was worse: `bg-muted` as
 * a FILL with `text-surface`, a contrast pair by coincidence in light and not
 * at all in dark.
 *
 * V4 gives each chip a ground it owns, mixed in the injected sheet rather than
 * borrowed: active is `primary` with its guaranteed `on-primary`, idle is
 * `on-surface` stirred OPAQUELY into `surface` at 12% — one expression that
 * moves correctly with the scheme instead of a light case and a dark one.
 */
exports.ScrollableTabsV4 = React.forwardRef(function ScrollableTabsV4({ className, items, value, onValueChange, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-v4-nav-styles', nav_v4_1.NAV_V4_CSS);
    const reduced = (0, reduced_motion_1.usePrefersReducedMotion)();
    const indicator = (0, nav_v4_1.useMovingIndicator)(value, items.length);
    const tabs = React.useRef(new Map()).current;
    React.useEffect(() => {
        const node = tabs.get(value);
        // `scrollIntoView` is absent in jsdom and in older engines; a tab bar
        // that cannot scroll itself is still a working tab bar.
        if (node === undefined || typeof node.scrollIntoView !== 'function')
            return;
        node.scrollIntoView({
            block: 'nearest',
            inline: 'nearest',
            behavior: reduced ? 'auto' : 'smooth',
        });
    }, [value, reduced, tabs]);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "tablist", className: (0, cn_1.cn)('relative flex overflow-x-auto border-b border-border', className), ...rest, children: [items.map((it) => {
                const active = it.value === value;
                return ((0, jsx_runtime_1.jsxs)("button", { ref: (node) => {
                        if (node === null)
                            tabs.delete(it.value);
                        else
                            tabs.set(it.value, node);
                        indicator.itemRef(it.value)(node);
                    }, type: "button", role: "tab", "data-xen-v4-nav-item": "", "aria-selected": active, onClick: () => onValueChange(it.value), className: (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center gap-sm whitespace-nowrap', 'px-lg py-sm font-body text-sm focus-visible:outline-none', nav_v4_1.MIN_TAP_CLASS, active ? 'font-semibold text-primary-text' : 'font-medium text-muted-text'), children: [it.label, it.badge != null ? ((0, jsx_runtime_1.jsx)("span", { "data-xen-v4-nav-badge": active ? 'on' : '', className: "inline-flex min-w-lg items-center justify-center rounded-[var(--xen-radius-full)] px-xs text-xs font-semibold", children: it.badge })) : null] }, it.value));
            }), indicator.style !== null && ((0, jsx_runtime_1.jsx)("span", { "data-xen-v4-nav-indicator": "", "aria-hidden": "true", className: "absolute bottom-[-1px] left-0 h-0.5 rounded-[var(--xen-radius-full)] bg-primary", style: indicator.style }))] }));
});
//# sourceMappingURL=ScrollableTabsV4.js.map