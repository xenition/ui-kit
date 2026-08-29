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
exports.ActionSheetV4 = ActionSheetV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_dom_1 = require("react-dom");
const inject_1 = require("../motion/internal/inject");
const v4_state_1 = require("./internal/v4-state");
const cn_1 = require("./cn");
const surface_v4_1 = require("./internal/surface-v4");
/**
 * Split the actions into the ordinary ones and the destructive ones, keeping
 * relative order inside each group.
 *
 * The destructive actions become their own card at the bottom of the stack —
 * the "destructive slot". That is not decoration: §25 asks for friction
 * proportional to risk, and physical separation is the cheapest friction there
 * is. A Delete sitting flush against a Rename is one mis-scroll away from being
 * the thing your cursor lands on.
 */
function partition(actions) {
    const ordinary = [];
    const destructive = [];
    for (const action of actions) {
        (action.destructive === true ? destructive : ordinary).push(action);
    }
    return { ordinary, destructive };
}
/**
 * `ActionSheet`, V4 — the same props, grouped, with a destructive slot.
 *
 * ## What the depth is saying
 *
 * The groups are cards over a scrimmed page, all at ONE altitude: each carries
 * `--xen-elevation-sheet`, none is nested inside another. §8's "cards inside
 * cards inside cards" is about hierarchy invented for its own sake; three
 * siblings at the same height are three objects on one table, which is what an
 * action sheet literally is. The rows inside them are flat, and nothing in this
 * component is lifted twice.
 *
 * The scrim is `--xen-elevation-color`, not `bg-neutral-950/50` — which inverts
 * under `[data-theme="dark"]` and paints a near-WHITE veil over a dark page,
 * the bug the base component has. Glass applies only when the seed asked for
 * `depth: 'glass'`; elevation is consumed unconditionally, so `depth: 'flat'`
 * needs no branch and gets a flat sheet for free.
 *
 * ## The destructive slot
 *
 * The base component tints EVERY row with `primary` — the iOS convention — and
 * marks the destructive one by swapping that tint for red. Two problems: the
 * sheet then has no hierarchy at all (§5: one dominant thing), and `primary` is
 * a FILL colour with no contrast guarantee as text.
 *
 * So V4 does the opposite. Ordinary rows are plain `on-surface`, a
 * contrast-guaranteed pair that reads as what it is: a list of choices, not a
 * list of links. The destructive action is then **the only coloured text on the
 * sheet**, in `danger-text` — the compiler's contrast-corrected red — and it
 * sits in its own card. Unmistakable because it is the one thing that looks
 * different, rather than because it shouts.
 */
function ActionSheetV4({ open, onClose, title, actions, cancelLabel = 'Cancel', className, }) {
    const panelRef = React.useRef(null);
    const kind = (0, surface_v4_1.panelKind)((0, surface_v4_1.useDepth)());
    const { ordinary, destructive } = React.useMemo(() => partition(actions), [actions]);
    (0, inject_1.injectStyleOnce)('xen-surface-v4-styles', surface_v4_1.SURFACE_V4_CSS);
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    React.useEffect(() => {
        if (!open)
            return;
        const onKey = (e) => {
            if (e.key === 'Escape')
                onClose();
        };
        document.addEventListener('keydown', onKey);
        panelRef.current?.focus();
        return () => document.removeEventListener('keydown', onKey);
    }, [open, onClose]);
    if (!open || typeof document === 'undefined')
        return null;
    const row = (action, index, tone) => ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "menuitem", disabled: action.disabled, onClick: () => {
            action.onSelect?.();
            onClose();
        }, "data-xen-v4-state": "", className: (0, cn_1.cn)(
        // A comfortable tap target, from the scale rather than a remembered 44px.
        'min-h-[var(--xen-space-2xl)] w-full px-lg py-md text-center text-base font-medium', 
        // The pressed row is the only thing that changes colour, and it does it
        // with M3's state layer rather than a fill of `border` — a hairline
        // colour pressed into service as a surface, which is what it was.
        'disabled:pointer-events-none disabled:opacity-[0.38]', index === 0 ? '' : 'border-t border-border', tone), children: action.label }, index));
    const card = 'overflow-hidden rounded-[var(--xen-radius-lg)]';
    return (0, react_dom_1.createPortal)((0, jsx_runtime_1.jsxs)("div", { className: "fixed inset-0 z-50 flex flex-col justify-end", role: "dialog", "aria-modal": "true", "aria-label": title ?? 'Actions', children: [(0, jsx_runtime_1.jsx)("div", { "data-xen-v4-scrim": "", className: "absolute inset-0", onClick: onClose }), (0, jsx_runtime_1.jsxs)("div", { ref: panelRef, "data-xen-v4-sheet": "", tabIndex: -1, className: (0, cn_1.cn)('relative flex flex-col gap-sm p-md outline-none', className), children: [(0, jsx_runtime_1.jsxs)("div", { role: "menu", "data-xen-v4-panel": kind, className: card, children: [title && (
                            /*
                              `text-on-surface`, not `text-muted-text`: this card may be glass, and
                              `muted` measurably falls below AA there. Size does the
                              de-emphasis instead of colour.
                            */
                            (0, jsx_runtime_1.jsx)("div", { className: "border-b border-border px-lg py-md text-center text-sm text-on-surface", children: title })), ordinary.map((action, i) => row(action, title ? i + 1 : i, 'text-on-surface'))] }), destructive.length > 0 && ((0, jsx_runtime_1.jsx)("div", { role: "menu", "data-xen-v4-panel": kind, className: card, children: destructive.map((action, i) => row(action, i, 'text-danger-text')) })), (0, jsx_runtime_1.jsx)("button", { type: "button", "data-xen-v4-panel": kind, "data-xen-v4-state": "", onClick: onClose, className: (0, cn_1.cn)(card, 'min-h-[var(--xen-space-2xl)] w-full px-lg py-md text-base font-semibold text-on-surface'), children: cancelLabel })] })] }), document.body);
}
//# sourceMappingURL=ActionSheetV4.js.map