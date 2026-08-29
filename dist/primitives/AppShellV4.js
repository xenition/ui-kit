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
exports.AppShellV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const chrome_v4_1 = require("./internal/chrome-v4");
const surface_v4_1 = require("./internal/surface-v4");
/**
 * `AppShell`, V4 — the same props, and exactly one layer.
 *
 * ## Which container earns depth, and which does not
 *
 * §11 asks that a container earn its existence. This shell has four candidates
 * and gives depth to one of them:
 *
 * - The **persistent rail** is attached to the page edge and separated by the
 *   `Sidebar`'s own hairline. It is not floating, so it casts nothing.
 * - The **top bar** is sticky, not raised. It stays flat with a hairline: a
 *   shadow under a bar that content scrolls beneath is the honest signal, but
 *   only once the content is actually under it, and a shell cannot know that
 *   without owning the scroll position of a region the caller fills. A hairline
 *   is true in every state, which §14 prefers to a decoration that is right
 *   half the time.
 * - The **content column** is the page. Pages do not float.
 * - The **slide-in drawer** genuinely is above the page, over a scrim, with the
 *   content still visible behind it. That one takes `--xen-elevation-sheet`,
 *   the same altitude as every other V4 overlay.
 *
 * The drawer wrapper is always `solid` rather than following the seed's glass
 * setting, and that is deliberate: it holds an opaque `Sidebar` that paints its
 * own surface, so a translucent wrapper would frost nothing. A component should
 * not claim a treatment it cannot deliver.
 *
 * ## The scrim
 *
 * `--xen-elevation-color` at a fixed alpha, shared with `ModalV4`, `DrawerV4`
 * and the rest. The base's `bg-neutral-900/50` is a LIGHT-oriented ramp step:
 * the dark block re-emits the ramps mirrored, so it paints a near-white veil
 * over a dark page.
 *
 * ## Motion
 *
 * The drawer travels the whole of itself from the left edge — §36.5's spatial
 * continuity, so the movement says where it came from and where dismissing it
 * sends it back — on the same keyframes and the same duration `DrawerV4` uses,
 * because they are the same object. Under `prefers-reduced-motion` the travel
 * becomes a fade.
 *
 * ## The menu button
 *
 * It hovers and presses with the M3 state layer rather than
 * `hover:bg-neutral-100`, rings with the shared `--xen-ring`, and clears the
 * 44px target composed from the spacing scale. The base's `p-2` around a 20px
 * glyph put it at 36 — under the target, on the control that is the only way
 * into navigation on a phone.
 */
exports.AppShellV4 = React.forwardRef(function AppShellV4({ sidebar, header, children, sidebarWidth = 260, menuLabel = 'Toggle navigation', className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(chrome_v4_1.CHROME_V4_STYLE_ID, chrome_v4_1.CHROME_V4_CSS);
    (0, inject_1.injectStyleOnce)('xen-surface-v4-styles', surface_v4_1.SURFACE_V4_CSS);
    (0, inject_1.injectStyleOnce)('xen-surface-v4-drawer-styles', surface_v4_1.SURFACE_V4_DRAWER_CSS);
    const [open, setOpen] = React.useState(false);
    const drawerId = React.useId();
    // Escape closes the drawer. A layer over a scrim that cannot be dismissed
    // from the keyboard is a trap (§46).
    React.useEffect(() => {
        if (!open)
            return;
        const onKey = (e) => {
            if (e.key === 'Escape')
                setOpen(false);
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open]);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex min-h-screen w-full bg-surface text-on-surface', className), ...rest, children: [(0, jsx_runtime_1.jsx)("aside", { className: "hidden shrink-0 md:block", style: { width: sidebarWidth }, children: (0, jsx_runtime_1.jsx)("div", { className: "sticky top-0 h-screen", children: sidebar }) }), open ? ((0, jsx_runtime_1.jsxs)("div", { className: "fixed inset-0 z-40 md:hidden", role: "dialog", "aria-modal": "true", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Close navigation", onClick: () => setOpen(false), "data-xen-v4-scrim": "", className: "absolute inset-0" }), (0, jsx_runtime_1.jsx)("div", { id: drawerId, "data-xen-v4-drawer": "left", "data-xen-v4-panel": "solid", className: "absolute inset-y-0 left-0 overflow-hidden", style: { width: sidebarWidth }, children: sidebar })] })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col", children: [header !== undefined ? ((0, jsx_runtime_1.jsxs)("header", { className: "sticky top-0 z-30 flex items-center gap-md border-b border-border bg-surface px-lg py-md", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": menuLabel, "aria-expanded": open, "aria-controls": drawerId, onClick: () => setOpen((prev) => !prev), "data-xen-v4-chrome": "on-surface", className: (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]', 'px-sm text-on-surface focus-visible:outline-none md:hidden', chrome_v4_1.MIN_TAP_CLASS), children: (0, jsx_runtime_1.jsx)("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: (0, jsx_runtime_1.jsx)("path", { d: "M3 5h14M3 10h14M3 15h14" }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-1 items-center justify-between gap-md", children: header })] })) : null, (0, jsx_runtime_1.jsx)("main", { className: "min-w-0 flex-1 overflow-y-auto p-lg", children: children })] })] }));
});
//# sourceMappingURL=AppShellV4.js.map