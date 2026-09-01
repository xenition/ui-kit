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
exports.ContactTimelineV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const crm_v4_1 = require("./internal/crm-v4");
/** How many placeholder nodes a loading timeline draws. */
const SKELETON_NODES = 3;
/**
 * **V4 contact timeline** — the web twin of the native `ContactTimelineV4`,
 * same props as {@link ContactTimeline} plus `emptyDescription`.
 *
 * ## Six changes
 *
 * 1. **Making the timeline interactive no longer destroys the list.** The item
 *    set `role="listitem"` and then spread `activate()`, whose `role: 'button'`
 *    wins because a JSX spread after an explicit prop wins — so the moment
 *    `onItemClick` was supplied, the `role="list"` had zero list items and a
 *    reader announced an empty list. The button now lives **inside** the list
 *    item, which is where it always belonged.
 * 2. **The list is a real `<ul>`/`<li>`**, so the semantics survive without a
 *    `role` at all and cannot be overwritten by a spread.
 * 3. **The last node is still a target.** The row's bottom padding dropped to
 *    `0` on the last item, leaving a 28px tap area at the end of every
 *    timeline. Every node clears 44.
 * 4. **The node chip is the same object on both twins** — the compiler's
 *    opaque `selected` container under the tone's contrast-corrected ink, in
 *    place of web's flat `bg-neutral-100` ramp step. The kind goes neutral,
 *    because a kind is identity and `success` has to keep meaning "went well".
 * 5. **Literal radii and rail widths come from the tokens.** A `14` radius and
 *    a hand-typed `2` do not follow a re-scaled seed.
 * 6. **One accessible name per node, and a press is a state layer.**
 *
 * Empty is a real {@link EmptyStateV4} with a title and a sentence, not a lone
 * grey line centred in the void.
 */
exports.ContactTimelineV4 = React.forwardRef(function ContactTimelineV4({ items, onItemClick, loading = false, emptyLabel = 'No activity yet', emptyDescription, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const list = items?.filter((item) => item?.id != null) ?? [];
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "status", "aria-live": "polite", "aria-label": "Loading timeline", className: (0, cn_1.cn)('flex flex-col gap-md', className), ...rest, children: Array.from({ length: SKELETON_NODES }).map((_, i) => ((0, jsx_runtime_1.jsxs)("div", { "aria-hidden": "true", className: "flex gap-sm", children: [(0, jsx_runtime_1.jsx)("div", { style: { borderRadius: 'var(--xen-radius-full)' }, className: (0, cn_1.cn)('h-xl w-xl shrink-0', crm_v4_1.PLACEHOLDER_CLASS) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-xs pt-xs", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-sm w-[60%]', crm_v4_1.PLACEHOLDER_CLASS) }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-sm w-[35%]', crm_v4_1.PLACEHOLDER_CLASS) })] })] }, i))) }));
    }
    if (list.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: emptyLabel, description: emptyDescription }) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsx)("ul", { className: "flex flex-col", children: list.map((item, index) => {
                const meta = crm_v4_1.ACTIVITY_META_V4[item.kind];
                const isLast = index === list.length - 1;
                const caption = (0, crm_v4_1.metaLine)([item.actor, item.timestamp]);
                const label = (0, crm_v4_1.spokenLine)([
                    meta.label,
                    item.title,
                    item.detail,
                    item.actor,
                    item.timestamp,
                ]);
                const node = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex w-xl shrink-0 flex-col items-center self-stretch", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-xl w-xl shrink-0 items-center justify-center rounded-[var(--xen-radius-full)] border border-border bg-selected text-xs', (0, crm_v4_1.toneInkClass)(meta.tone)), children: meta.glyph }), isLast ? null : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "my-xs w-[1px] flex-1 bg-border" }))] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs text-left", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-surface", children: item.title }), item.detail ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: item.detail })) : null, caption ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs font-medium text-muted-text", children: caption })) : null] })] }));
                return ((0, jsx_runtime_1.jsx)("li", { className: "flex", children: onItemClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": label, onClick: () => onItemClick(item), "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)'), className: (0, cn_1.cn)('flex w-full items-stretch gap-sm rounded-[var(--xen-radius-md)] text-left', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', !isLast && 'pb-md', 
                        // The last node kept its 28px height because its bottom
                        // padding dropped to 0. A target is a target at the end
                        // of a list too.
                        chrome_v4_1.MIN_TAP_CLASS), children: node })) : ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex w-full items-stretch gap-sm', !isLast && 'pb-md'), children: node })) }, item.id));
            }) }) }));
});
//# sourceMappingURL=ContactTimelineV4.js.map