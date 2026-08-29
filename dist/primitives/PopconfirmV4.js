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
exports.PopconfirmV4 = PopconfirmV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const chrome_v4_1 = require("./internal/chrome-v4");
const nav_v4_1 = require("./internal/nav-v4");
const surface_v4_1 = require("./internal/surface-v4");
const useDismiss_1 = require("./useDismiss");
/**
 * `Popconfirm`, V4 — the same props, and the last thing between a user and a
 * mistake.
 *
 * ## What the depth is saying
 *
 * The bubble is a floating layer, so it takes the V4 panel skin —
 * `--xen-elevation-sheet`, and the glass treatment only when the seed asked for
 * `depth: 'glass'`. That is the same skin `MenuV4` and `PopoverV4` wear, on
 * purpose: a confirm bubble, a menu and a popover are one object at three
 * sizes, and the base line gave them `shadow-lg`, `shadow-lg` and `shadow-md`
 * respectively — three answers to one question, none of which knows what
 * scheme it is falling in.
 *
 * ## The trigger is the button
 *
 * Unchanged from the base, and deliberately so. Popconfirm clones the trigger
 * element and injects its own `onClick` rather than wrapping it in a
 * click-catching `<span>`. On native the deepest `Pressable` under the finger
 * wins the responder, so a wrapper made a `<Button>` trigger a silent no-op;
 * the DOM bubbles clicks so the wrapper did fire here, but it made `disabled`
 * a lie in the other direction — a caller who disabled a plain `<div>` trigger
 * still had the span open a dialog on a control the user was told was dead.
 * Cloning gives both platforms one rule: the trigger is the only thing that
 * handles the press, so whatever it says about being disabled is what happens.
 * A non-element trigger (a bare string) has nothing to clone onto, so it keeps
 * the transparent `<span>`.
 *
 * ## Reading the choice
 *
 * §25 asks for friction proportional to risk and §26 that a destructive
 * consequence be legible. So the destructive button is the **only** coloured
 * thing in the bubble — `danger` filled with `on-danger`, the compiler's paired
 * ink, not the `on-primary` the base painted on a red fill by mistake — and
 * Cancel is quiet text in `muted-text`, which is `muted` with an actual AA
 * promise rather than `muted`, which has none.
 *
 * Both buttons clear the 44px target the rest of the V4 line composes from the
 * spacing scale. A confirm bubble is the one place in a product where a
 * mis-tap is unrecoverable, and the base's `px-2 py-1` chips were roughly 24
 * tall.
 *
 * Cancel is listed first and is the one that gets focus by default: the safe
 * choice should be the one a user lands on without aiming.
 */
function PopconfirmV4({ trigger, message, onConfirm, confirmLabel = 'Confirm', cancelLabel = 'Cancel', }) {
    (0, inject_1.injectStyleOnce)('xen-v4-nav-styles', nav_v4_1.NAV_V4_CSS);
    (0, inject_1.injectStyleOnce)(chrome_v4_1.CHROME_V4_STYLE_ID, chrome_v4_1.CHROME_V4_CSS);
    const [open, setOpen] = React.useState(false);
    const ref = (0, useDismiss_1.useDismiss)(open, () => setOpen(false));
    const cancelRef = React.useRef(null);
    const kind = (0, surface_v4_1.panelKind)((0, surface_v4_1.useDepth)());
    React.useEffect(() => {
        if (open)
            cancelRef.current?.focus();
    }, [open]);
    const renderedTrigger = React.isValidElement(trigger) ? (React.cloneElement(trigger, {
        onClick: (event) => {
            trigger.props.onClick?.(event);
            setOpen((o) => !o);
        },
    })) : ((0, jsx_runtime_1.jsx)("span", { onClick: () => setOpen((o) => !o), children: trigger }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: "relative inline-block", children: [renderedTrigger, open && ((0, jsx_runtime_1.jsxs)("div", { role: "dialog", "aria-modal": "false", "data-xen-v4-nav-panel": kind, className: (0, cn_1.cn)('absolute z-50 mt-xs flex flex-col gap-md rounded-[var(--xen-radius-md)] p-md', nav_v4_1.PANEL_MIN_WIDTH_CLASS), children: [(0, jsx_runtime_1.jsx)("p", { className: "font-body text-sm leading-relaxed text-on-surface", children: message }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-end gap-sm", children: [(0, jsx_runtime_1.jsx)("button", { ref: cancelRef, type: "button", "data-xen-v4-chrome": "on-surface", onClick: () => setOpen(false), className: (0, cn_1.cn)('inline-flex items-center justify-center rounded-[var(--xen-radius-md)] px-md', 'font-body text-sm font-medium', 
                                // `muted-text`, not `muted`: the plain slot carries no contrast
                                // promise, and this is text.
                                'text-muted-text focus-visible:outline-none', chrome_v4_1.MIN_TAP_CLASS), children: cancelLabel }), (0, jsx_runtime_1.jsx)("button", { type: "button", "data-xen-v4-chrome": "filled-danger", onClick: () => {
                                    onConfirm();
                                    setOpen(false);
                                }, className: (0, cn_1.cn)('inline-flex items-center justify-center rounded-[var(--xen-radius-md)] bg-danger px-md', 'font-body text-sm font-semibold', 
                                // `on-danger`, the compiler's paired ink for the danger FILL.
                                // The base painted `on-primary` on a red ground, which is a
                                // contrast promise made against a different colour entirely.
                                'text-on-danger focus-visible:outline-none', chrome_v4_1.MIN_TAP_CLASS), children: confirmLabel })] })] }))] }));
}
//# sourceMappingURL=PopconfirmV4.js.map