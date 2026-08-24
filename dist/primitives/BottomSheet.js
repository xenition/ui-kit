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
exports.BottomSheet = BottomSheet;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_dom_1 = require("react-dom");
const cn_1 = require("./cn");
/**
 * Bottom sheet — a bottom-anchored dialog panel with a top grabber handle,
 * sliding up over a scrim. Portals to `<body>`; closes on scrim click, the
 * grabber, or Escape. Distinct from the side `Drawer` by its bottom anchor +
 * grabber and `snap` height. Panel is `surface`, grabber the `border` token.
 * No literal colors.
 */
function BottomSheet({ open, onClose, title, children, snap = 0.5, className, }) {
    const panelRef = React.useRef(null);
    const height = `${Math.round(Math.max(0.1, Math.min(1, snap)) * 100)}vh`;
    React.useEffect(() => {
        if (!open)
            return;
        const onKey = (e) => {
            if (e.key === 'Escape')
                onClose();
        };
        document.addEventListener('keydown', onKey);
        panelRef.current?.focus();
        return () => document.removeEventListener('keydown', onKey);
    }, [open, onClose]);
    if (!open || typeof document === 'undefined')
        return null;
    return (0, react_dom_1.createPortal)((0, jsx_runtime_1.jsxs)("div", { className: "fixed inset-0 z-50 flex flex-col justify-end", role: "dialog", "aria-modal": "true", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 bg-neutral-950/50", onClick: onClose }), (0, jsx_runtime_1.jsxs)("div", { ref: panelRef, tabIndex: -1, style: { height }, className: (0, cn_1.cn)('relative flex w-full flex-col overflow-hidden bg-surface text-on-surface shadow-xl outline-none', 'rounded-t-[var(--xen-radius-lg)]', className), children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Close", onClick: onClose, className: "flex shrink-0 items-center justify-center py-3", children: (0, jsx_runtime_1.jsx)("span", { className: "h-1 w-10 rounded-full bg-border" }) }), title != null && ((0, jsx_runtime_1.jsx)("h2", { className: "mb-2 shrink-0 px-4 text-lg font-semibold text-on-surface", children: title })), (0, jsx_runtime_1.jsx)("div", { className: "min-h-0 flex-1 overflow-auto px-4 pb-4", children: children })] })] }), document.body);
}
//# sourceMappingURL=BottomSheet.js.map