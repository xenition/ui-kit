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
exports.Accordion = Accordion;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
/** Collapsible sections bound to the theme tokens. */
function Accordion({ items, type = 'single', defaultValue = [], className, }) {
    const [open, setOpen] = React.useState(defaultValue);
    const toggle = (v) => setOpen((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : type === 'single' ? [v] : [...prev, v]);
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('divide-y divide-border overflow-hidden rounded-[var(--xen-radius-md)] border border-border', className), children: items.map((it) => {
            const isOpen = open.includes(it.value);
            return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-expanded": isOpen, onClick: () => toggle(it.value), className: "flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm font-medium text-on-surface", children: [it.title, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('ml-2 shrink-0 text-muted transition-transform', isOpen && 'rotate-180'), children: "\u25BE" })] }), isOpen && (0, jsx_runtime_1.jsx)("div", { className: "px-4 pb-3 text-sm text-muted", children: it.content })] }, it.value));
        }) }));
}
//# sourceMappingURL=Accordion.js.map