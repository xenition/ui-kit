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
exports.ReactionBar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * A wrap of emoji reaction pills, each with a count and a selected state.
 * Selected pills fill with the primary color; the rest read on-surface. An
 * optional `+` opens a fuller picker upstream. Handles the empty tally too.
 * Web parity of the native `ReactionBar`; token-only, `aria-pressed` per pill.
 */
exports.ReactionBar = React.forwardRef(function ReactionBar({ reactions, onReact, onAddReaction, emptyLabel = 'No reactions yet', className, ...rest }, ref) {
    if (reactions.length === 0 && !onAddReaction) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('text-sm text-muted', className), ...rest, children: emptyLabel }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-wrap items-center gap-xs', className), ...rest, children: [reactions.map((r) => {
                const selected = !!r.reacted;
                return ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": `${r.label ?? r.key}${r.count != null ? `, ${r.count}` : ''}`, "aria-pressed": selected, disabled: !onReact, onClick: onReact ? () => onReact(r.key) : undefined, className: (0, cn_1.cn)('inline-flex items-center gap-xs rounded-full border px-sm py-0.5 transition-opacity hover:opacity-80', 'disabled:pointer-events-none', selected ? 'border-primary bg-primary' : 'border-border bg-surface'), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm leading-none", "aria-hidden": "true", children: r.emoji }), r.count != null ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', selected ? 'text-on-primary' : 'text-on-surface'), children: r.count })) : null] }, r.key));
            }), onAddReaction ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Add reaction", onClick: onAddReaction, className: "inline-flex items-center justify-center rounded-full border border-border bg-surface px-sm py-0.5 text-sm font-bold text-muted transition-opacity hover:opacity-80", children: "+" })) : null] }));
});
//# sourceMappingURL=ReactionBar.js.map