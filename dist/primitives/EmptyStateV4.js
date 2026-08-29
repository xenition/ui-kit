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
exports.EmptyStateV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
/**
 * The measure a line of explanation is allowed to run to.
 *
 * `2xl × 7` off the spacing scale rather than `max-w-sm`, so a seed that
 * re-scales its rhythm re-scales the measure with it. Both twins compose the
 * same expression, which is why the native one is 336 and not the base's
 * literal 320.
 */
const MEASURE = 'max-w-[calc(var(--xen-space-2xl)*7)]';
/**
 * `EmptyState`, V4 — the same props, and the action outranks the picture.
 *
 * ## §15: an empty state exists to move the user forward
 *
 * "No data." is the failure mode §15 names. The answer is three things in
 * order — what belongs here, why it matters, and what to do next — and the
 * third one is the only one that changes anything. So V4 reorders the emphasis:
 *
 * - The **illustration** keeps its familiar place at the top (§31 — use the
 *   established pattern) but loses the visual centre. It is `muted-text`,
 *   `aria-hidden`, and sits one `sm` step from the title, so it reads as a
 *   quiet mark on the heading rather than as the subject of the screen.
 * - The **title** carries the weight the icon gave up: the heading face at
 *   `lg`, which is §10's "typography before containers".
 * - The **action** is separated by the largest gap in the component. That
 *   separation is what makes it terminal — the one dominant thing §5 asks
 *   every screen to have — rather than a footnote under the copy.
 *
 * The honest limit: `icon` and `action` are caller slots, so this component
 * cannot resize what it is handed. What it can do is decide the order, the
 * colour of the slot it owns, and which element gets the room. It does all
 * three, and it does not pretend to more.
 *
 * ## The dashed box is gone
 *
 * The base draws a dashed rectangle around the whole thing. §11 asks that a
 * container earn its existence, and this one does not: an empty state already
 * occupies the region whose emptiness it is explaining, so the outline
 * describes a boundary the reader can already see. A dashed placeholder
 * rectangle is also one of §8's listed tells of generic generated UI. What
 * replaces it is space — §9, spacing as structure.
 *
 * ## Colour
 *
 * Both the icon and the description move from `muted` to `muted-text`. `muted`
 * is a decorative slot with no contrast promise; a sentence explaining what the
 * user should do next is text, and §46 puts its legibility ahead of its
 * quietness.
 */
exports.EmptyStateV4 = React.forwardRef(function EmptyStateV4({ icon, title, description, action, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-empty-state": "", className: (0, cn_1.cn)('flex flex-col items-center justify-center gap-xs px-lg py-2xl text-center', className), ...rest, children: [icon ? ((0, jsx_runtime_1.jsx)("div", { "data-xen-empty-icon": "", className: "mb-sm text-muted-text", "aria-hidden": "true", children: icon })) : null, (0, jsx_runtime_1.jsx)("p", { className: "font-heading text-lg font-semibold text-on-surface", children: title }), description ? ((0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('font-body text-sm leading-relaxed text-muted-text', MEASURE), children: description })) : null, action ? (0, jsx_runtime_1.jsx)("div", { className: "mt-lg", children: action }) : null] }));
});
//# sourceMappingURL=EmptyStateV4.js.map