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
exports.SplitButtonV4 = SplitButtonV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const v4_state_1 = require("./internal/v4-state");
const cn_1 = require("./cn");
const useDismiss_1 = require("./useDismiss");
const icon_names_1 = require("./icon-names");
const v4_depth_1 = require("./internal/v4-depth");
const v4_motion_1 = require("./internal/v4-motion");
/**
 * The seam has to be an opaque composite rather than a floated alpha, the menu
 * needs the seed's own elevation per scheme, and a disabled row needs a `muted`
 * that was actually measured. None of the three is a utility class bound to a
 * token; every colour here is a `--xen-*` custom property.
 *
 * §36.2 puts a micro-feedback at 100–180ms, and a caret turning is the small
 * end of that.
 */
const SPLIT_BUTTON_V4_CSS = `
[data-xen-v4-split-seam] { background-color: var(--xen-v4-seam); }
[data-xen-v4-split-caret] { transition: ${(0, v4_motion_1.transitionCss)(['transform'], v4_motion_1.V4_MOTION.quick)}; }
[data-xen-v4-split-caret][data-open="true"] { transform: rotate(180deg); }
[data-xen-v4-split-menu] { box-shadow: var(--xen-v4-shadow-l, none); }
[data-theme="dark"] [data-xen-v4-split-menu] { box-shadow: var(--xen-v4-shadow-d, none); }
[data-xen-v4-split-item]:disabled { color: var(--xen-muted-text); }
[data-xen-v4-split-face]:focus-visible {
  outline: 2px solid var(--xen-ring);
  outline-offset: -2px;
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-v4-split-caret] { transition: none; }
}
`;
/**
 * **V4 split button** — the web twin of the native `SplitButtonV4`, same props
 * as {@link SplitButton}, a different design line.
 *
 * A split button is two click targets fused into one shape, and both of them
 * were too small to hit.
 *
 * 1. **Both halves are real targets.** `py-2` around a 16px label is roughly
 *    40px and the caret's `px-2` made it about 28px wide — both under the 44 a
 *    finger needs, on the control a screen puts its *primary* action in. Both
 *    now have a 44px floor in both axes, and so does every row of the menu.
 * 2. **The colours are measured.** `secondary` labelled itself `text-primary`
 *    — the FILL slot, guaranteed against `on-primary` and against nothing else
 *    — and a destructive menu row took `text-danger` the same way. Both move to
 *    the compiler's `-text` forms, and a disabled row's `muted` is walked to AA
 *    per scheme, because none of the three carried a promise about the page.
 *    The outlined face also paints `surface` rather than `transparent`, so the
 *    ground its label was measured against is the ground it is printed on.
 * 3. **The seam is an opaque colour.** It was the face colour at 40% *opacity*,
 *    so on the outlined variant it was 40% of `primary` over whatever happened
 *    to be behind the button. `color-mix` composites the same 40% once, into
 *    the face, so the seam is a colour the control owns.
 * 4. **The menu floats on the seed's own shadow.** `shadow-lg` is a fixed
 *    utility that cannot know a shadow on a dark page needs MORE opacity;
 *    `elevation.card` does, and a `depth: 'flat'` seed zeroes it with no branch
 *    in this file.
 * 5. **The caret turns, and stops turning when asked.** Its
 *    `transition-transform` had no duration, no curve and no reduced-motion
 *    guard. It now runs on §36.2's micro-feedback clock and an ease-out, and
 *    drops the transition entirely under `prefers-reduced-motion` (§36.10).
 * 6. **The focus ring is the brand.** `ring-primary-300` is a pale tint nobody
 *    measured against the face it sits on.
 *
 * The caret glyph comes from the kit's named icon set rather than a `▾` typed
 * into this file, and the menu's minimum width and padding come from the
 * spacing scale rather than `10rem` and `px-3 py-2`.
 */
function SplitButtonV4({ label, onClick, actions, variant = 'primary', disabled = false, className, }) {
    (0, inject_1.injectStyleOnce)('xen-v4-split-button-styles', SPLIT_BUTTON_V4_CSS);
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const theme = (0, v4_depth_1.useOptionalCompiledTheme)();
    const [open, setOpen] = React.useState(false);
    const ref = (0, useDismiss_1.useDismiss)(open, () => setOpen(false));
    const filled = variant === 'primary';
    // `primary` is a fill slot: the compiler guarantees `on-primary` against it,
    // and nothing about it as ink on the page.
    const faceClass = filled ? 'bg-primary text-on-primary' : 'bg-surface text-primary-text';
    const faceVar = filled ? 'var(--xen-primary)' : 'var(--xen-surface)';
    const inkVar = filled ? 'var(--xen-on-primary)' : 'var(--xen-primary-text)';
    const vars = {
        // Composited once, into the face — not floated at 40% over whatever is
        // behind the button.
        '--xen-v4-seam': `color-mix(in srgb, ${inkVar} 40%, ${faceVar})`,
    };
    if (theme !== null) {
        vars['--xen-v4-shadow-l'] = (0, v4_depth_1.shadowCss)(theme.lightElevation.card);
        vars['--xen-v4-shadow-d'] = (0, v4_depth_1.shadowCss)(theme.darkElevation.card);
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-v4-split": "", className: (0, cn_1.cn)('relative inline-block', className), style: vars, children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('inline-flex items-stretch overflow-hidden rounded-[var(--xen-radius-md)]', !filled && 'border border-primary', disabled && 'pointer-events-none opacity-[0.38]'), children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "data-xen-v4-split-face": "", disabled: disabled, onClick: () => onClick?.(), className: (0, cn_1.cn)(
                        // Fusing two buttons into one shape does not shrink a finger.
                        'min-h-[44px] px-lg py-sm font-body text-base font-semibold', 'focus-visible:outline-none', faceClass), children: label }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, "data-xen-v4-split-seam": "", className: "w-px self-stretch" }), (0, jsx_runtime_1.jsx)("button", { type: "button", "data-xen-v4-split-face": "", "aria-label": "More actions", "aria-expanded": open, "aria-haspopup": "menu", disabled: disabled, onClick: () => setOpen((o) => !o), className: (0, cn_1.cn)(
                        // A caret is half a control, not half a target.
                        'flex min-h-[44px] min-w-[44px] items-center justify-center', 'focus-visible:outline-none', faceClass), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, "data-xen-v4-split-caret": "", "data-open": open ? 'true' : 'false', className: "text-xs", children: (0, icon_names_1.resolveIconGlyph)('chevron-down') }) })] }), open ? ((0, jsx_runtime_1.jsx)("div", { role: "menu", "data-xen-v4-split-menu": "", className: (0, cn_1.cn)('absolute left-0 z-50 mt-xs py-xs', 'min-w-[calc(var(--xen-space-2xl)_*_3_+_var(--xen-space-md))]', 'rounded-[var(--xen-radius-md)] border border-border bg-surface'), children: actions.map((action) => ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "menuitem", "data-xen-v4-split-item": "", disabled: action.disabled, onClick: () => {
                        setOpen(false);
                        action.onClick?.();
                    }, "data-xen-v4-state": "", className: (0, cn_1.cn)('flex min-h-[44px] w-full items-center px-md py-sm text-left', 'font-body text-sm', 'disabled:pointer-events-none', action.destructive ? 'text-danger-text' : 'text-on-surface'), children: action.label }, action.key))) })) : null] }));
}
//# sourceMappingURL=SplitButtonV4.js.map