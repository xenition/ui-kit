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
exports.TagList = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Tag_1 = require("../primitives/Tag");
/**
 * A wrapping row of keyword / topic tags for an article — the web (React DOM)
 * mirror of the native `TagList`. Composes the `Tag` primitive; an optional
 * `onTagClick` makes each tag a keyboard-activatable button (to open a topic
 * feed). Respects a `max` cap with a "+N" overflow chip and renders an
 * `emptyLabel` when there are no tags. All colors come from `--xen-*` tokens.
 */
exports.TagList = React.forwardRef(function TagList({ tags, onTagClick, max, emptyLabel = 'No tags', className, ...rest }, ref) {
    if (tags.length === 0) {
        if (emptyLabel == null)
            return null;
        return ((0, jsx_runtime_1.jsx)("p", { ref: ref, className: (0, cn_1.cn)('text-sm text-muted', className), children: emptyLabel }));
    }
    const visible = typeof max === 'number' && max >= 0 ? tags.slice(0, max) : tags;
    const overflow = tags.length - visible.length;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "list", className: (0, cn_1.cn)('flex flex-wrap gap-[var(--xen-space-xs)]', className), ...rest, children: [visible.map((tag, i) => onTagClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Tag ${tag}`, onClick: () => onTagClick(tag, i), className: "cursor-pointer", children: (0, jsx_runtime_1.jsx)(Tag_1.Tag, { tone: "neutral", children: `#${tag}` }) }, `${tag}-${i}`)) : ((0, jsx_runtime_1.jsx)(Tag_1.Tag, { tone: "neutral", children: `#${tag}` }, `${tag}-${i}`))), overflow > 0 ? (0, jsx_runtime_1.jsx)(Tag_1.Tag, { tone: "primary", children: `+${overflow}` }) : null] }));
});
//# sourceMappingURL=TagList.js.map