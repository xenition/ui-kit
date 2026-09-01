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
exports.CategoryChipV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const reading_v4_1 = require("./internal/reading-v4");
/**
 * The chip's ground and ink, per variant.
 *
 * `soft` moves from `surface` to `card`. `ArticleCard` renders the chip inside
 * a `Card`, and a `Card` is `surface` — so the chip was exactly the colour of
 * the thing it sat on and there was no chip, only a word. `card` is the slot
 * the theme added for a surface that has to read as raised on both schemes.
 *
 * Every ink is `accentText`, never `accent`. That pairing was measured at
 * 1.32:1 and already corrected in `Tag`; `CategoryChip` never got the fix.
 *
 * The transparent border on `solid` is load-bearing: `active` adds a border on
 * every variant now (native drew it on `solid`, web did not), and without a
 * placeholder edge the chip would grow by two pixels the moment it is selected.
 */
const VARIANT_CLASS = {
    solid: (0, cn_1.cn)('border border-transparent bg-accent text-on-accent'),
    soft: (0, cn_1.cn)('border border-transparent bg-card', reading_v4_1.TONE_INK.accent),
    outline: (0, cn_1.cn)('border border-border bg-transparent', reading_v4_1.TONE_INK.accent),
};
/** The chip's own shape and type, shared by the static and pressable forms. */
const CHIP_CLASS = (0, cn_1.cn)('inline-flex select-none items-center justify-center', 'rounded-[var(--xen-radius-sm)] px-sm', 'text-xs uppercase tracking-wide');
/**
 * **V4 category chip** — the web twin of the native `CategoryChipV4`, same
 * props as {@link CategoryChip} plus `formatLabel`.
 *
 * ## Five changes
 *
 * 1. **The `soft` chip gets a chip.** It was `bg-surface`, the same token as
 *    the `Card` it is rendered inside, so a section label on an article card
 *    was a floating word with no container at all.
 * 2. **`accent` as ink becomes `accentText`.** The raw pairing measures
 *    1.32:1 — the kit already corrected it in `Tag` and never came back here.
 * 3. **`active` is not colour alone.** It gains weight as well as the border,
 *    and the border rule is now identical on both twins.
 * 4. **A pressable chip is a real `<button>`** that clears 44 and announces as
 *    a toggle, not a `<span>` with `role="button"`, a `tabIndex` and a
 *    hand-written Enter/Space handler.
 * 5. **Press is the state layer**, not `opacity: 0.7` — which is the band the
 *    kit spends on *disabled*.
 */
exports.CategoryChipV4 = React.forwardRef(function CategoryChipV4({ label, variant = 'solid', onClick, active = false, formatLabel = (value) => `Category ${value}`, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const skin = (0, cn_1.cn)(CHIP_CLASS, VARIANT_CLASS[variant], 
    // Weight AND border, so the selected filter survives greyscale and CVD.
    active ? 'border-accent font-bold' : 'font-semibold');
    if (!onClick) {
        return ((0, jsx_runtime_1.jsx)("span", { ref: ref, className: (0, cn_1.cn)(skin, 'self-start py-[var(--xen-space-xs)]', className), ...rest, children: label }));
    }
    /*
      The base's props extend `HTMLAttributes<HTMLSpanElement>` and its ref is a
      span, so the root stays a span and the button goes inside it. Turning the
      root into a `<button>` would silently break every caller passing a span
      attribute or holding the ref.
    */
    return ((0, jsx_runtime_1.jsx)("span", { ref: ref, className: (0, cn_1.cn)('inline-flex self-start', className), ...rest, children: (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": formatLabel(label), "aria-pressed": active, onClick: onClick, "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)(variant === 'solid' ? 'var(--xen-accent)' : 'var(--xen-card)', variant === 'solid' ? 'var(--xen-on-accent)' : 'var(--xen-on-card)'), className: (0, cn_1.cn)(skin, 
            // The HIG floor, composed from the spacing scale — not a typed 44.
            chrome_v4_1.MIN_TAP_CLASS, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: label }) }));
});
//# sourceMappingURL=CategoryChipV4.js.map