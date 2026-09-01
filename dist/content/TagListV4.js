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
exports.TagListV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const TagV4_1 = require("../primitives/TagV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const reading_v4_1 = require("./internal/reading-v4");
/**
 * **V4 tag list** — the web twin of the native `TagListV4`, same props as
 * {@link TagList} plus `formatTagLabel` and `formatOverflow`.
 *
 * ## Four changes
 *
 * 1. **The empty branch keeps the caller's props.** The populated branch
 *    spread `{...rest}` and the empty one did not, so every `id`, `data-*` and
 *    handler an app hung on the list vanished at exactly the moment the list
 *    was empty — the state hardest to notice in development and easiest to hit
 *    in production. Native dropped `style` the same way.
 * 2. **A list has list items.** `role="list"` with bare buttons under it has
 *    zero items, and a reader announces an empty list.
 * 3. **A tag button clears 44.** They were roughly 20px — the height of the
 *    word inside them.
 * 4. **The `+N` chip is reachable and says what the N are.** It was an
 *    unfocusable chip reading "plus three", with no way to learn which three.
 */
exports.TagListV4 = React.forwardRef(function TagListV4({ tags, onTagClick, max, emptyLabel = 'No tags', formatTagLabel = (label) => `Tag ${label}`, formatOverflow = (count) => `${count} more tags`, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    if (tags.length === 0) {
        if (emptyLabel == null)
            return null;
        // `{...rest}` here too — this is the whole first change.
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-sm', reading_v4_1.TONE_INK.muted), children: emptyLabel }) }));
    }
    const visible = typeof max === 'number' && max >= 0 ? tags.slice(0, max) : tags;
    const overflow = tags.length - visible.length;
    /*
      The root stays a `<div>`, because the base's props extend
      `HTMLAttributes<HTMLDivElement>` and its ref is one; the `<ul>` goes inside.
      Swapping the root for a list element would break every caller holding the
      ref or passing a div attribute.
    */
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsxs)("ul", { className: "flex flex-wrap gap-xs", children: [visible.map((tag, index) => ((0, jsx_runtime_1.jsx)("li", { className: "flex", children: onTagClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": formatTagLabel(tag), onClick: () => onTagClick(tag, index), "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)'), className: (0, cn_1.cn)('inline-flex items-center rounded-[var(--xen-radius-sm)] px-xs', 
                        // The HIG floor, composed from the spacing scale — not a typed 44.
                        chrome_v4_1.MIN_TAP_CLASS, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: (0, jsx_runtime_1.jsx)(TagV4_1.TagV4, { tone: "neutral", children: `#${tag}` }) })) : ((0, jsx_runtime_1.jsx)("span", { className: "inline-flex items-center px-xs", children: (0, jsx_runtime_1.jsx)(TagV4_1.TagV4, { tone: "neutral", children: `#${tag}` }) })) }, `${tag}-${index}`))), overflow > 0 ? ((0, jsx_runtime_1.jsx)("li", { className: "flex", children: (0, jsx_runtime_1.jsx)("span", { tabIndex: 0, role: "note", "aria-label": formatOverflow(overflow), className: (0, cn_1.cn)('inline-flex items-center rounded-[var(--xen-radius-sm)] px-xs', chrome_v4_1.MIN_TAP_CLASS, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: (0, jsx_runtime_1.jsx)(TagV4_1.TagV4, { tone: "primary", children: `+${overflow}` }) }) })) : null] }) }));
});
//# sourceMappingURL=TagListV4.js.map