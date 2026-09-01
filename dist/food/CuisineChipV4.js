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
exports.CuisineChipV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const CARD_STATE = (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)');
const PRIMARY_STATE = (0, v4_state_1.stateGroundVars)('var(--xen-primary)', 'var(--xen-on-primary)');
/**
 * **V4 cuisine chip** — the web twin of the native `CuisineChipV4`, same props
 * as {@link CuisineChip} plus `defaultSelected`.
 *
 * ## Four changes
 *
 * 1. **A filter that can actually be turned on.** The chip held no state and
 *    `selected` defaulted to `false`, so an uncontrolled `CuisineChip` was a
 *    permanently unselected filter: it emitted on every tap and never moved.
 *    Passing `selected` still hands control to the caller; omitting it now
 *    means the chip owns its state, seeded from `defaultSelected`.
 * 2. **It clears 44.** `py-1` around a 12px label is about 24px — a third of
 *    a target on a control that exists to be tapped, and a horizontal strip of
 *    them is the hardest thing on a menu screen to hit.
 * 3. **Press is a state layer, disabled is 0.38.** `hover:bg-neutral-100` is a
 *    light-oriented ramp step that paints a near-white slab on a dark page,
 *    and `opacity-50` was a round number where M3 spends 0.38.
 * 4. **Focus rings on the `ring` token**, not `primary-300` — a ramp step
 *    inverts with the scheme, while `--xen-ring` is `primary` already
 *    corrected to 3:1 against the page.
 */
exports.CuisineChipV4 = React.forwardRef(function CuisineChipV4({ label, glyph, selected, defaultSelected = false, onClick, disabled = false, size = 'md', className, }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const controlled = selected !== undefined;
    const [internal, setInternal] = React.useState(defaultSelected);
    const active = controlled ? selected : internal;
    const sizeClass = size === 'sm' ? 'px-sm text-xs' : 'px-md text-sm';
    const chipClass = (0, cn_1.cn)('inline-flex items-center justify-center gap-xs self-start rounded-full border font-semibold', sizeClass, active ? 'border-primary bg-primary text-on-primary' : 'border-border bg-card text-on-card', className);
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [glyph ? (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: glyph }) : null, (0, jsx_runtime_1.jsx)("span", { children: label })] }));
    if (onClick) {
        return ((0, jsx_runtime_1.jsx)("button", { ref: ref, type: "button", "aria-pressed": active, disabled: disabled, onClick: () => {
                if (!controlled)
                    setInternal(!active);
                onClick();
            }, "data-xen-v4-state": "", style: active ? PRIMARY_STATE : CARD_STATE, className: (0, cn_1.cn)(chipClass, chrome_v4_1.MIN_TAP_CLASS, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', v4_state_1.V4_DISABLED_CLASS), children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)("span", { ref: ref, className: (0, cn_1.cn)(chipClass, 'py-xs', disabled && 'opacity-[0.38]'), children: inner }));
});
//# sourceMappingURL=CuisineChipV4.js.map