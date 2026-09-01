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
exports.TableOfContentsV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const reading_v4_1 = require("./internal/reading-v4");
/**
 * The indent for a nesting level, from the spacing scale.
 *
 * Web hard-coded `depth * 16`. It is `md` per level on both twins now, so a
 * denser or roomier seed indents its outline with the rest of the product.
 */
function indentStyle(level) {
    const depth = Math.max(0, (level ?? 1) - 1);
    if (depth === 0)
        return undefined;
    return { paddingInlineStart: `calc(var(--xen-space-md) * ${depth})` };
}
/**
 * **V4 table of contents** — the web twin of the native `TableOfContentsV4`,
 * same props as {@link TableOfContents} plus `navLabel`.
 *
 * ## Six changes
 *
 * 1. **A read-only table of contents is a list of headings.** Both twins
 *    passed `disabled={!onSelect}`, and `onSelect` is optional — so a TOC
 *    rendered for reading, the ordinary case, turned every heading into a
 *    `<button disabled>`: greyed by the UA, out of the tab order, announced
 *    "unavailable". Without a handler it now renders plain list items.
 * 2. **Both twins say navigation.** Native said `menu`/`menuitem`, which
 *    promises a popup widget with menu keyboard semantics that neither twin
 *    implements.
 * 3. **The indent comes from the spacing scale**, not a typed `depth * 16`.
 * 4. **The active heading takes `accentText`** — the contrast-corrected slot —
 *    and is marked by weight and `aria-current` as well as by colour.
 * 5. **A selectable row clears 44 and presses with the state layer**, not
 *    `opacity: 0.6`, which reads as unavailable.
 * 6. **`navLabel` names the region** when `title` is hidden.
 */
exports.TableOfContentsV4 = React.forwardRef(function TableOfContentsV4({ items, activeId, onSelect, title = 'Contents', emptyLabel = 'No sections', navLabel = 'Contents', className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    return ((0, jsx_runtime_1.jsxs)("nav", { ref: ref, "aria-label": typeof title === 'string' ? title : navLabel, className: (0, cn_1.cn)('flex flex-col gap-xs rounded-[var(--xen-radius-lg)] border border-border bg-surface p-md', className), ...rest, children: [title != null ? ((0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('mb-xs text-xs font-bold uppercase tracking-wide', reading_v4_1.TONE_INK.muted), children: title })) : null, items.length === 0 ? ((0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-sm', reading_v4_1.TONE_INK.muted), children: emptyLabel })) : ((0, jsx_runtime_1.jsx)("ul", { className: "flex flex-col gap-xs", children: items.map((item) => {
                    const active = item.id === activeId;
                    const ink = active ? (0, cn_1.cn)('font-bold', reading_v4_1.TONE_INK.accent) : 'font-normal text-on-surface';
                    if (!onSelect) {
                        return ((0, jsx_runtime_1.jsx)("li", { "aria-current": active ? 'true' : undefined, style: indentStyle(item.level), className: (0, cn_1.cn)('line-clamp-2 py-xs text-sm', ink), children: item.label }, item.id));
                    }
                    return ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-current": active ? 'true' : undefined, onClick: () => onSelect(item.id), "data-xen-v4-state": "", style: {
                                ...(0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)'),
                                ...indentStyle(item.level),
                            }, className: (0, cn_1.cn)('flex w-full items-center rounded-[var(--xen-radius-sm)] px-xs text-left text-sm', 
                            // The HIG floor, composed from the spacing scale.
                            chrome_v4_1.MIN_TAP_CLASS, ink, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: (0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2", children: item.label }) }) }, item.id));
                }) }))] }));
});
//# sourceMappingURL=TableOfContentsV4.js.map