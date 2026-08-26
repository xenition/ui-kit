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
exports.Tooltip = Tooltip;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const SIDE = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-1',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-1',
    left: 'right-full top-1/2 -translate-y-1/2 mr-1',
    right: 'left-full top-1/2 -translate-y-1/2 ml-1',
};
/** Hover/focus tooltip bound to the theme tokens. Wrap the trigger as children. */
function Tooltip({ label, side = 'top', children, className }) {
    const [open, setOpen] = React.useState(false);
    /*
      The one member of the Popover / Menu / Popconfirm / Tooltip family that keeps
      its wrapper — because the gesture it listens for cannot be swallowed.
  
      The other three had to stop wrapping the trigger and clone it instead: on
      native a `<Button>` trigger takes the touch responder from any wrapper, so
      the overlay never opened, and on web the wrapping `<span onClick>` made a
      trigger's `disabled` a lie. Neither applies here. This span listens for
      mouse-enter/leave and focus/blur, none of which a nested control intercepts —
      they reach the span whatever the child is — and none of which activate
      anything, so there is no handler to hand the child and nothing for the child's
      `disabled` to have an opinion about. The child stays exactly as passed.
  
      The native twin has no hover to lean on, so it injects an `onLongPress` into
      the child: the nearest gesture that likewise activates nothing, leaving the
      control's press to the control. Same rule, expressed in each platform's
      vocabulary.
    */
    return ((0, jsx_runtime_1.jsxs)("span", { className: "relative inline-flex", onMouseEnter: () => setOpen(true), onMouseLeave: () => setOpen(false), onFocus: () => setOpen(true), onBlur: () => setOpen(false), children: [children, open && ((0, jsx_runtime_1.jsx)("span", { role: "tooltip", className: (0, cn_1.cn)('pointer-events-none absolute z-50 whitespace-nowrap rounded-[var(--xen-radius-sm)]', 'bg-neutral-900 px-2 py-1 text-xs text-neutral-50 shadow', SIDE[side], className), children: label }))] }));
}
//# sourceMappingURL=Tooltip.js.map