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
exports.ContextMenuV4 = ContextMenuV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const chrome_v4_1 = require("./internal/chrome-v4");
const nav_v4_1 = require("./internal/nav-v4");
const surface_v4_1 = require("./internal/surface-v4");
/**
 * How long a press has to be held before it counts as a long press.
 *
 * Unchanged from the base at 350ms: a gesture threshold is muscle memory, not
 * styling, and changing it would make every existing app's context menus feel
 * different for no design gain. §31 — use familiar interactions.
 */
const LONG_PRESS_MS = 350;
/**
 * `ContextMenu`, V4 — the same props, and a gesture that reaches the thing you
 * pressed.
 *
 * ## The child is the target
 *
 * The gesture handlers are cloned onto the child element rather than left on a
 * wrapping host, matching `Popconfirm` and `Menu`. This is a real bug on the
 * native twin — the deepest `Pressable` wins the responder there, so a wrapper
 * around anything pressable never fired — and on the web it is the `disabled`
 * asymmetry: a browser suppresses mouse events on a disabled form control, so a
 * host-level handler opens a menu on a control the user was told was dead only
 * when the caller disabled something that is *not* a form control. Cloning
 * gives both platforms one rule: the child is the only thing that handles the
 * gesture, so whatever it says about being disabled is what happens.
 *
 * A child that cannot take the props — a bare string, a fragment — has nothing
 * to clone onto, so the host keeps the handlers it has always had.
 *
 * The host `<div>` stays regardless, because the menu is positioned against the
 * viewport and `className` has to land somewhere.
 *
 * ## What the depth is saying
 *
 * The action list is a floating layer, so it takes the shared V4 panel skin —
 * `--xen-elevation-sheet`, glass only when the seed asked for
 * `depth: 'glass'` — the same skin `MenuV4` and `PopoverV4` wear. The base's
 * `shadow-lg` is a fixed black at a fixed alpha that knows nothing about the
 * scheme it is falling in.
 *
 * ## Reading the list
 *
 * The destructive row is `danger-text`, the compiler's contrast-corrected red,
 * not the `danger` FILL slot used as ink. That makes it the **only** coloured
 * thing in the menu, so it is unmistakable because it is different rather than
 * because it shouts (§32).
 *
 * Rows hover with the M3 state layer instead of `hover:bg-neutral-100` — a
 * LIGHT-oriented ramp step, so the base's hover paints a near-white slab across
 * a dark row. Every row clears 44px, composed from the spacing scale, and a
 * disabled row drops to M3's 0.38 rather than each component's own 0.5.
 */
function ContextMenuV4({ actions, children, className, 'aria-label': ariaLabel = 'Context menu', }) {
    (0, inject_1.injectStyleOnce)('xen-v4-nav-styles', nav_v4_1.NAV_V4_CSS);
    (0, inject_1.injectStyleOnce)(chrome_v4_1.CHROME_V4_STYLE_ID, chrome_v4_1.CHROME_V4_CSS);
    const [pos, setPos] = React.useState(null);
    const menuRef = React.useRef(null);
    const longPress = React.useRef(null);
    const kind = (0, surface_v4_1.panelKind)((0, surface_v4_1.useDepth)());
    const open = pos != null;
    const close = React.useCallback(() => setPos(null), []);
    React.useEffect(() => {
        if (!open)
            return;
        const onKey = (e) => {
            if (e.key === 'Escape')
                close();
        };
        const onDown = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target))
                close();
        };
        document.addEventListener('keydown', onKey);
        document.addEventListener('mousedown', onDown);
        return () => {
            document.removeEventListener('keydown', onKey);
            document.removeEventListener('mousedown', onDown);
        };
    }, [open, close]);
    // Clear a pending long press on unmount, so the timer never fires into a
    // torn-down tree.
    React.useEffect(() => () => {
        if (longPress.current)
            clearTimeout(longPress.current);
    }, []);
    const gestures = {
        onContextMenu: (e) => {
            e.preventDefault();
            setPos({ x: e.clientX, y: e.clientY });
        },
        onTouchStart: (e) => {
            const t = e.touches[0];
            if (!t)
                return;
            const { clientX, clientY } = t;
            longPress.current = setTimeout(() => setPos({ x: clientX, y: clientY }), LONG_PRESS_MS);
        },
        onTouchEnd: () => {
            if (longPress.current)
                clearTimeout(longPress.current);
        },
        onTouchMove: () => {
            if (longPress.current)
                clearTimeout(longPress.current);
        },
    };
    const isElement = React.isValidElement(children);
    const renderedChild = React.isValidElement(children)
        ? React.cloneElement(children, {
            onContextMenu: (e) => {
                children.props.onContextMenu?.(e);
                gestures.onContextMenu?.(e);
            },
            onTouchStart: (e) => {
                children.props.onTouchStart?.(e);
                gestures.onTouchStart?.(e);
            },
            onTouchEnd: (e) => {
                children.props.onTouchEnd?.(e);
                gestures.onTouchEnd?.(e);
            },
            onTouchMove: (e) => {
                children.props.onTouchMove?.(e);
                gestures.onTouchMove?.(e);
            },
        })
        : children;
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('relative inline-block', className), ...(isElement ? {} : gestures), children: [renderedChild, open && ((0, jsx_runtime_1.jsx)("div", { ref: menuRef, role: "menu", "aria-label": ariaLabel, "data-xen-v4-nav-panel": kind, className: (0, cn_1.cn)('fixed z-50 overflow-hidden rounded-[var(--xen-radius-md)] py-xs', nav_v4_1.PANEL_MIN_WIDTH_CLASS), style: { top: pos.y, left: pos.x }, children: actions.map((action, i) => ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "menuitem", "data-xen-v4-chrome": action.danger === true ? 'danger' : 'on-surface', disabled: action.disabled, onClick: () => {
                        action.onSelect?.();
                        close();
                    }, className: (0, cn_1.cn)('flex w-full items-center gap-sm px-lg py-sm text-left font-body text-base font-medium', 'focus-visible:outline-none', chrome_v4_1.MIN_TAP_CLASS, 
                    // `danger-text`, not `danger`: the plain slot is a FILL colour
                    // and carries no promise as text.
                    action.danger === true ? 'text-danger-text' : 'text-on-surface'), children: [action.icon != null && (0, jsx_runtime_1.jsx)("span", { className: "shrink-0", children: action.icon }), action.label] }, i))) }))] }));
}
//# sourceMappingURL=ContextMenuV4.js.map