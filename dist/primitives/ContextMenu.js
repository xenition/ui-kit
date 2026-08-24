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
exports.ContextMenu = ContextMenu;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
/**
 * Right-click / long-press context menu — wraps `children` in a positioned host
 * whose `onContextMenu` (and touch long-press) opens a token-bound action list
 * anchored at the pointer. Distinct from `Menu` (tap-to-open) by the gesture.
 * Selecting an action fires `onSelect` and dismisses; closes on outside click
 * or Escape. Danger actions use the `danger` token. No literal colors.
 */
function ContextMenu({ actions, children, className, 'aria-label': ariaLabel = 'Context menu', }) {
    const [pos, setPos] = React.useState(null);
    const menuRef = React.useRef(null);
    const longPress = React.useRef(null);
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
    const openAt = (x, y) => setPos({ x, y });
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('relative inline-block', className), onContextMenu: (e) => {
            e.preventDefault();
            openAt(e.clientX, e.clientY);
        }, onTouchStart: (e) => {
            const t = e.touches[0];
            if (!t)
                return;
            const { clientX, clientY } = t;
            longPress.current = setTimeout(() => openAt(clientX, clientY), 350);
        }, onTouchEnd: () => {
            if (longPress.current)
                clearTimeout(longPress.current);
        }, onTouchMove: () => {
            if (longPress.current)
                clearTimeout(longPress.current);
        }, children: [children, open && ((0, jsx_runtime_1.jsx)("div", { ref: menuRef, role: "menu", "aria-label": ariaLabel, className: (0, cn_1.cn)('fixed z-50 min-w-[12rem] overflow-hidden rounded-[var(--xen-radius-md)] border border-border', 'bg-surface py-1 shadow-lg'), style: { top: pos.y, left: pos.x }, children: actions.map((action, i) => ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "menuitem", disabled: action.disabled, onClick: () => {
                        action.onSelect?.();
                        close();
                    }, className: (0, cn_1.cn)('flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors', 'hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-50', action.danger ? 'text-danger' : 'text-on-surface'), children: [action.icon != null && (0, jsx_runtime_1.jsx)("span", { className: "shrink-0", children: action.icon }), action.label] }, i))) }))] }));
}
//# sourceMappingURL=ContextMenu.js.map