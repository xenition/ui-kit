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
exports.CannedResponse = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Button_1 = require("../primitives/Button");
const internal_1 = require("./internal");
/**
 * A saved/canned reply card for agents — title, an optional shortcut + category
 * chip, a truncated body preview, and an "Insert" action that reports the full
 * response back to the composer via `onInsert`. Activating the body fires
 * `onClick` (e.g. to preview the whole thing) with click + keyboard support.
 * All colors/spacing come from the `--xen-*` token classes — no literal hex.
 */
exports.CannedResponse = React.forwardRef(function CannedResponse({ response, previewLines = 2, onInsert, onClick, insertLabel = 'Insert', className, ...rest }, ref) {
    const interactive = typeof onClick === 'function';
    const activate = interactive ? () => onClick(response) : undefined;
    const lines = Math.max(1, previewLines);
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, className: (0, cn_1.cn)('p-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `Canned response: ${response.title}` : undefined, onClick: activate, onKeyDown: activate ? (0, internal_1.activateOnKey)(activate) : undefined, className: (0, cn_1.cn)(interactive &&
                    'cursor-pointer rounded-[var(--xen-radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 shrink text-base font-bold text-on-surface", children: response.title }), response.shortcut ? ((0, jsx_runtime_1.jsx)("span", { className: "rounded-[var(--xen-radius-sm)] bg-primary-50 px-1.5 py-px font-mono text-xs font-semibold text-primary", children: response.shortcut })) : null, response.category ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: response.category })) : null] }), (0, jsx_runtime_1.jsx)("p", { className: "mt-1 overflow-hidden text-sm text-muted", style: { display: '-webkit-box', WebkitLineClamp: lines, WebkitBoxOrient: 'vertical' }, children: response.body })] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-2 flex justify-end", children: (0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "secondary", disabled: !onInsert, onClick: onInsert ? () => onInsert(response) : undefined, children: insertLabel }) })] }));
});
//# sourceMappingURL=CannedResponse.js.map