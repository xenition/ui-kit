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
exports.ToolbarV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const nav_v4_1 = require("./internal/nav-v4");
const surface_v4_1 = require("./internal/surface-v4");
const useDismiss_1 = require("./useDismiss");
/**
 * **V4 toolbar** — the web twin of the native `ToolbarV4`, same props as
 * {@link Toolbar}, a different design line.
 *
 * ## A toolbar is not a pill
 *
 * §8 lists excessive pill-shaped controls among the tells of generic AI UI. A
 * `Segmented` thumb is a pill because the capsule IS that control; a toolbar is
 * a bar, and it keeps `--xen-radius-md` — the seed's own corner, 0 on a `sharp`
 * brand. Nothing inside it is capsuled either.
 *
 * ## Actions that are legible as actions
 *
 * The base painted every action with `text-primary` — a FILL slot with no
 * contrast promise as text, so on a light-primary seed the toolbar's controls
 * were the least readable thing in it. V4 uses `text-primary-text`, the same
 * hue walked until it clears AA on the surface, and `text-danger-text` for a
 * destructive one. That leaves exactly two colours in the bar: the actions, and
 * the one that will delete something — different, not louder (§32).
 *
 * A disabled action drops to `muted` AND loses half its opacity, so the state
 * survives a reader who cannot separate the two colours. The hover ground is
 * mixed from `--xen-border` instead of `bg-neutral-100`, so it is a hairline's
 * worth of contrast in both schemes rather than a fixed grey that happens to
 * invert.
 *
 * ## Reach
 *
 * Every action and the `⋯` toggle are 44px targets composed from the spacing
 * scale. The base gave them `px-2 py-2` around a 14px label — about 30px, and
 * the `⋯` was the smallest target in the kit (§30).
 *
 * ## The overflow panel is a menu
 *
 * So it is skinned like one: `--xen-elevation-sheet` and the shared panel
 * attribute, the same altitude as `MenuV4` and the V4 sheets, because a kit
 * where an overflow menu and a dropdown menu look different has two answers to
 * one question. Glass applies only at `depth: 'glass'`; elevation is consumed
 * unconditionally, so a flat seed lands flat with no branch here.
 */
exports.ToolbarV4 = React.forwardRef(function ToolbarV4({ className, title, actions = [], overflowActions = [], ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-v4-nav-styles', nav_v4_1.NAV_V4_CSS);
    const [overflowOpen, setOverflowOpen] = React.useState(false);
    const overflowRef = (0, useDismiss_1.useDismiss)(overflowOpen, () => setOverflowOpen(false));
    const kind = (0, surface_v4_1.panelKind)((0, surface_v4_1.useDepth)());
    const actionClass = (action, inPanel) => (0, cn_1.cn)('inline-flex items-center rounded-[var(--xen-radius-sm)] px-md font-body text-sm font-semibold', 'focus-visible:outline-none disabled:pointer-events-none disabled:text-muted-text disabled:opacity-[0.38]', inPanel ? 'w-full justify-start text-left' : 'justify-center', nav_v4_1.MIN_TAP_CLASS, 
    // `primary-text` / `danger-text`, never the FILL slots: these are words on
    // a surface, and only the text forms carry a contrast promise there.
    action.destructive === true ? 'text-danger-text' : 'text-primary-text');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "toolbar", className: (0, cn_1.cn)('flex items-center gap-xs rounded-[var(--xen-radius-md)] border border-border', 'bg-surface px-xs py-xs', className), ...rest, children: [title != null ? ((0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate px-sm font-heading text-base font-semibold text-on-surface", children: title })) : ((0, jsx_runtime_1.jsx)("span", { className: "flex-1" })), actions.map((action) => ((0, jsx_runtime_1.jsx)("button", { type: "button", "data-xen-v4-nav-item": "", disabled: action.disabled, onClick: () => action.onClick?.(), className: actionClass(action, false), children: action.label }, action.key))), overflowActions.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { ref: overflowRef, className: "relative", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "data-xen-v4-nav-item": "", "aria-label": "More actions", "aria-expanded": overflowOpen, "aria-haspopup": "menu", onClick: () => setOverflowOpen((o) => !o), className: (0, cn_1.cn)('inline-flex items-center justify-center rounded-[var(--xen-radius-sm)]', 'text-lg font-bold leading-none text-on-surface focus-visible:outline-none', nav_v4_1.MIN_TAP_SQUARE_CLASS), children: "\u22EF" }), overflowOpen ? ((0, jsx_runtime_1.jsx)("div", { role: "menu", "data-xen-v4-nav-panel": kind, className: (0, cn_1.cn)('absolute right-0 z-50 mt-xs overflow-hidden rounded-[var(--xen-radius-md)] py-xs', nav_v4_1.PANEL_MIN_WIDTH_CLASS), children: overflowActions.map((action) => ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "menuitem", "data-xen-v4-nav-item": "", disabled: action.disabled, onClick: () => {
                                setOverflowOpen(false);
                                action.onClick?.();
                            }, className: actionClass(action, true), children: action.label }, action.key))) })) : null] })) : null] }));
});
//# sourceMappingURL=ToolbarV4.js.map