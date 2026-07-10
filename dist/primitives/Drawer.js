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
exports.Drawer = Drawer;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_dom_1 = require("react-dom");
const cn_1 = require("./cn");
const POS = {
    left: 'inset-y-0 left-0 h-full w-80 max-w-[85vw]',
    right: 'inset-y-0 right-0 h-full w-80 max-w-[85vw]',
    top: 'inset-x-0 top-0 w-full max-h-[85vh]',
    bottom: 'inset-x-0 bottom-0 w-full max-h-[85vh]',
};
/** Side sheet / drawer bound to the theme tokens. Portals to <body>; closes on backdrop / Escape. */
function Drawer({ open, onClose, side = 'right', title, children, className, }) {
    React.useEffect(() => {
        if (!open)
            return;
        const onKey = (e) => {
            if (e.key === 'Escape')
                onClose();
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open, onClose]);
    if (!open || typeof document === 'undefined')
        return null;
    return (0, react_dom_1.createPortal)((0, jsx_runtime_1.jsxs)("div", { className: "fixed inset-0 z-50", role: "dialog", "aria-modal": "true", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 bg-neutral-950/50", onClick: onClose }), (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('absolute overflow-auto bg-surface p-4 text-on-surface shadow-xl', POS[side], className), children: [title != null && (0, jsx_runtime_1.jsx)("h2", { className: "mb-3 text-lg font-semibold text-on-surface", children: title }), children] })] }), document.body);
}
//# sourceMappingURL=Drawer.js.map