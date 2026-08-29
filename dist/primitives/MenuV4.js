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
exports.MenuV4 = MenuV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const nav_v4_1 = require("./internal/nav-v4");
const surface_v4_1 = require("./internal/surface-v4");
const useDismiss_1 = require("./useDismiss");
/**
 * **V4 menu** — the web twin of the native `MenuV4`, same props as
 * {@link Menu}, a different design line.
 *
 * ## What the depth is saying
 *
 * A menu is above the page and nothing is above it, so it takes
 * `--xen-elevation-sheet` — the same altitude as `ModalV4` and
 * `BottomSheetV4`, because a menu and a sheet are the same kind of object at
 * different sizes and a kit where they drift apart has two depth systems. The
 * base used Tailwind's `shadow-lg`, a fixed shadow that cannot know a dark page
 * needs MORE opacity, not less. The rows inside stay flat; §8's "cards inside
 * cards inside cards" is exactly what a menu becomes when every item gains its
 * own surface.
 *
 * Glass applies only when the seed asked for `depth: 'glass'`. Elevation is
 * consumed unconditionally, so a `depth: 'flat'` seed gets a flat menu with no
 * branch in this file — the compiler already zeroed the token.
 *
 * ## Reading the list
 *
 * Rows are `on-surface`, and the destructive one is `danger-text` — the
 * compiler's contrast-corrected red, not the `danger` FILL slot the base used
 * as text. That makes the destructive item **the only coloured thing in the
 * menu**, so it is unmistakable because it is different rather than because it
 * shouts (§32), and §25's friction-proportional-to-risk is paid in attention
 * rather than in an extra click.
 *
 * The hover ground is mixed from `--xen-border` instead of `bg-neutral-100`,
 * so it is a hairline's worth of contrast in both schemes rather than a fixed
 * grey that happens to invert. Every row is a 44px target composed from the
 * spacing scale.
 *
 * ## The trigger is the button
 *
 * Unchanged from the base, and deliberately so. This mirrors the native twin,
 * where wrapping the trigger was an outright bug: on RN the deepest
 * `Pressable` wins the touch responder, so a `<Button>` trigger swallowed the
 * tap and the menu never opened. The DOM bubbles clicks, so a wrapping
 * `<span onClick>` did fire here — but it made `disabled` a lie in the other
 * direction, opening the menu from a control the user was told was dead.
 * Cloning the element and injecting `onClick` gives both platforms one rule:
 * the trigger is the only thing that handles the press, so whatever it says
 * about being disabled is what happens. A non-element trigger (a bare string)
 * has nothing to clone onto, so it keeps the transparent `<span>`.
 */
function MenuV4({ trigger, items, align = 'start' }) {
    (0, inject_1.injectStyleOnce)('xen-v4-nav-styles', nav_v4_1.NAV_V4_CSS);
    const [open, setOpen] = React.useState(false);
    const ref = (0, useDismiss_1.useDismiss)(open, () => setOpen(false));
    const kind = (0, surface_v4_1.panelKind)((0, surface_v4_1.useDepth)());
    const renderedTrigger = React.isValidElement(trigger) ? (React.cloneElement(trigger, {
        onClick: (event) => {
            trigger.props.onClick?.(event);
            setOpen((o) => !o);
        },
    })) : ((0, jsx_runtime_1.jsx)("span", { onClick: () => setOpen((o) => !o), children: trigger }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: "relative inline-block", children: [renderedTrigger, open && ((0, jsx_runtime_1.jsx)("div", { role: "menu", "data-xen-v4-nav-panel": kind, className: (0, cn_1.cn)('absolute z-50 mt-xs overflow-hidden rounded-[var(--xen-radius-md)]', nav_v4_1.PANEL_MIN_WIDTH_CLASS, align === 'end' ? 'right-0' : 'left-0'), children: items.map((item, index) => ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "menuitem", "data-xen-v4-nav-item": "", disabled: item.disabled, onClick: () => {
                        item.onSelect?.();
                        setOpen(false);
                    }, className: (0, cn_1.cn)('flex w-full items-center gap-sm px-lg py-sm text-left font-body text-base font-medium', 'focus-visible:outline-none disabled:pointer-events-none disabled:opacity-[0.38]', nav_v4_1.MIN_TAP_CLASS, 
                    // `danger-text`, not `danger`: the plain slot is a FILL colour
                    // and carries no promise as text.
                    item.danger === true ? 'text-danger-text' : 'text-on-surface'), children: [item.icon != null && (0, jsx_runtime_1.jsx)("span", { className: "shrink-0", children: item.icon }), item.label] }, index))) }))] }));
}
//# sourceMappingURL=MenuV4.js.map