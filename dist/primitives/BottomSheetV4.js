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
exports.BottomSheetV4 = BottomSheetV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_dom_1 = require("react-dom");
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const surface_v4_1 = require("./internal/surface-v4");
/**
 * `BottomSheet`, V4 — the same props, designed as a real sheet.
 *
 * ## What the depth is saying
 *
 * A bottom sheet is not a panel that happens to be at the bottom of the
 * viewport; it is a layer that has come up from below and is now sitting ON the
 * page. V4 spends exactly three tokens to say that, and nothing on decoration:
 *
 *   - **`--xen-elevation-sheet`** — the shadow. Its offset is *negative*: the
 *     sheet casts upward, onto the content it has covered, which is where a
 *     real object's shadow would fall. That contact shadow is the whole reason
 *     the scrim can be lighter than the base component's flat `bg-neutral-950/50`
 *     and the sheet still reads as separated.
 *   - **The scrim**, from `--xen-elevation-color`. `bg-neutral-950/50` inverts
 *     under `[data-theme="dark"]` — the dark block re-emits the ramp mirrored —
 *     so the base sheet paints a near-WHITE veil over a dark page. A shadow
 *     colour does not invert, because a shadow does not.
 *   - **`--xen-glass-*`**, but only when the seed asked for `depth: 'glass'`.
 *     That is the one depth check in the file, and it is necessary: the
 *     compiler's `flatten()` neutralises gradients and elevation and stops
 *     there, so glass is live even under `depth: 'flat'`. Elevation is consumed
 *     unconditionally, and flat falls out for free.
 *
 * What does NOT get depth is anything inside the sheet. §8 bans "cards inside
 * cards inside cards", and a translucent panel inside a translucent sheet is
 * that same mistake with a blur on it. The sheet is the layer; its contents are
 * flat.
 *
 * ## Motion
 *
 * The sheet rises from the bottom because that explains where it came from
 * (§36.1), inside §36.2's 220–320ms band, on a decelerating curve so it settles
 * rather than stops. Under `prefers-reduced-motion` the travel is replaced by a
 * fade rather than removed — an overlay that appears with no transition at all
 * reads as a glitch (§36.10).
 *
 * ## Layout
 *
 * The caller passes content, not padding. The grab handle, the title row and
 * the scrollable body each carry their own rhythm from the spacing scale.
 */
function BottomSheetV4({ open, onClose, title, children, snap = 0.5, className, }) {
    const panelRef = React.useRef(null);
    const kind = (0, surface_v4_1.panelKind)((0, surface_v4_1.useDepth)());
    const height = `${Math.round(Math.max(0.1, Math.min(1, snap)) * 100)}vh`;
    (0, inject_1.injectStyleOnce)('xen-surface-v4-styles', surface_v4_1.SURFACE_V4_CSS);
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
    return (0, react_dom_1.createPortal)((0, jsx_runtime_1.jsxs)("div", { className: "fixed inset-0 z-50 flex flex-col justify-end", role: "dialog", "aria-modal": "true", children: [(0, jsx_runtime_1.jsx)("div", { "data-xen-v4-scrim": "", className: "absolute inset-0", onClick: onClose }), (0, jsx_runtime_1.jsxs)("div", { ref: panelRef, "data-xen-v4-sheet": "", "data-xen-v4-panel": kind, tabIndex: -1, style: { height }, className: (0, cn_1.cn)('relative flex w-full flex-col overflow-hidden text-on-surface outline-none', 'rounded-t-[var(--xen-radius-lg)]', className), children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Close", onClick: onClose, className: "flex shrink-0 items-center justify-center py-sm", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "h-xs w-[calc(var(--xen-space-xl)_+_var(--xen-space-sm))] rounded-full bg-border" }) }), title != null && ((0, jsx_runtime_1.jsx)("div", { className: "shrink-0 border-b border-border px-lg pb-md", children: (0, jsx_runtime_1.jsx)("h2", { className: "font-heading text-xl font-semibold text-on-surface", children: title }) })), (0, jsx_runtime_1.jsx)("div", { className: "min-h-0 flex-1 overflow-auto px-lg pb-lg pt-md", children: children })] })] }), document.body);
}
//# sourceMappingURL=BottomSheetV4.js.map