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
exports.Popover = Popover;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const useDismiss_1 = require("./useDismiss");
/** Click-triggered floating panel bound to the theme tokens. Closes on outside click / Escape. */
function Popover({ trigger, children, align = 'start', className }) {
    const [open, setOpen] = React.useState(false);
    const ref = (0, useDismiss_1.useDismiss)(open, () => setOpen(false));
    const alignCls = align === 'end' ? 'right-0' : align === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-0';
    /*
      The trigger IS the button. Popover does not wrap it in a click catcher.
  
      This mirrors the native twin, where the wrapper was an outright bug: on RN the
      deepest `Pressable` wins the touch responder, so a `<Button>` trigger swallowed
      the tap and the panel never opened. The DOM bubbles clicks, so the old
      `<span onClick>` did fire here — but it made `disabled` a lie in the other
      direction. A disabled `<button>` dispatches no click, yet a caller who instead
      disabled a plain `<div>` trigger, or blocked its pointer events, still had the
      span open the panel on a control the user was told was dead.
  
      Cloning the element and injecting `onClick` gives both platforms the same rule:
      the trigger is the only thing that handles the press, so whatever the trigger
      says about being disabled is what happens. Anything it already does on click
      runs first, then the panel toggles. A non-element trigger (a bare string) has
      nothing to clone onto, so it keeps the transparent `<span>`.
    */
    const renderedTrigger = React.isValidElement(trigger) ? (React.cloneElement(trigger, {
        onClick: (event) => {
            trigger.props.onClick?.(event);
            setOpen((o) => !o);
        },
    })) : ((0, jsx_runtime_1.jsx)("span", { onClick: () => setOpen((o) => !o), children: trigger }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: "relative inline-block", children: [renderedTrigger, open && ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('absolute z-50 mt-1 min-w-[12rem] rounded-[var(--xen-radius-md)] border border-border', 'bg-surface p-2 text-on-surface shadow-lg', alignCls, className), children: children }))] }));
}
//# sourceMappingURL=Popover.js.map