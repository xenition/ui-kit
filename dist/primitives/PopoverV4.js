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
exports.PopoverV4 = PopoverV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const nav_v4_1 = require("./internal/nav-v4");
const surface_v4_1 = require("./internal/surface-v4");
const useDismiss_1 = require("./useDismiss");
/**
 * **V4 popover** — the web twin of the native `PopoverV4`, same props as
 * {@link Popover}, a different design line.
 *
 * ## What the depth is saying
 *
 * A popover is a layer above the page with nothing above it, so it takes
 * `--xen-elevation-sheet` — the same altitude as `MenuV4`, `ModalV4` and
 * `BottomSheetV4`. One rule for every floating panel in the kit: they are the
 * same kind of object at different sizes. The base used Tailwind's
 * `shadow-lg`, a fixed shadow that cannot know a dark page needs MORE opacity,
 * not less. Its content stays flat; a card inside a popover is §8's "cards
 * inside cards".
 *
 * Glass applies only when the seed asked for `depth: 'glass'`; elevation is
 * consumed unconditionally, so a `depth: 'flat'` seed gets a flat panel with no
 * branch in this file.
 *
 * ## Rhythm
 *
 * The base panel padded itself with `p-2`, which puts arbitrary content eight
 * pixels from a hard edge and reads as cramped next to every other surface in
 * the kit. V4 uses the `md` step, the same one `CardV4` and the V4 sheets use,
 * so a popover looks like it came from the same system as the thing that
 * opened it.
 *
 * ## The trigger is the button
 *
 * Unchanged from the base, and deliberately so. This mirrors the native twin,
 * where wrapping the trigger was an outright bug: on RN the deepest
 * `Pressable` wins the touch responder, so a `<Button>` trigger swallowed the
 * tap and the panel never opened. The DOM bubbles clicks, so a wrapping
 * `<span onClick>` did fire here — but it made `disabled` a lie in the other
 * direction, opening the panel from a control the user was told was dead.
 * Cloning the element and injecting `onClick` gives both platforms one rule:
 * the trigger is the only thing that handles the press. A non-element trigger
 * (a bare string) has nothing to clone onto, so it keeps the transparent
 * `<span>`.
 */
function PopoverV4({ trigger, children, align = 'start', className, }) {
    (0, inject_1.injectStyleOnce)('xen-v4-nav-styles', nav_v4_1.NAV_V4_CSS);
    const [open, setOpen] = React.useState(false);
    const ref = (0, useDismiss_1.useDismiss)(open, () => setOpen(false));
    const kind = (0, surface_v4_1.panelKind)((0, surface_v4_1.useDepth)());
    const alignCls = align === 'end' ? 'right-0' : align === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-0';
    const renderedTrigger = React.isValidElement(trigger) ? (React.cloneElement(trigger, {
        onClick: (event) => {
            trigger.props.onClick?.(event);
            setOpen((o) => !o);
        },
    })) : ((0, jsx_runtime_1.jsx)("span", { onClick: () => setOpen((o) => !o), children: trigger }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: "relative inline-block", children: [renderedTrigger, open && ((0, jsx_runtime_1.jsx)("div", { "data-xen-v4-nav-panel": kind, className: (0, cn_1.cn)('absolute z-50 mt-xs rounded-[var(--xen-radius-md)] p-md text-on-surface', nav_v4_1.PANEL_MIN_WIDTH_CLASS, alignCls, className), children: children }))] }));
}
//# sourceMappingURL=PopoverV4.js.map