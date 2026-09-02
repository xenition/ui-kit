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
exports.FlashCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * FlashCard — **V4** "campus" design (web parity of the native V4). A
 * click-to-flip study card on an elevated rounded surface with a soft shadow:
 * shows the `front` (prompt) and flips to the `back` (answer). The flipped face
 * reads on a soft-primary ground with a "Definition" label; the face label and a
 * "Tap to flip" hint keep the state legible without color. Works controlled (via
 * `flipped` + `onFlip`) or uncontrolled. Rendered as a keyboard-operable
 * `role="button"`. Identical props/behavior to {@link FlashCardProps}. All colors
 * from `--xen-*` token classes (no literals).
 */
exports.FlashCardV4 = React.forwardRef(function FlashCardV4({ front, back, frontLabel = 'Term', backLabel = 'Definition', flipped, defaultFlipped = false, onFlip, className, ...rest }, ref) {
    const [internal, setInternal] = React.useState(defaultFlipped);
    const isControlled = flipped != null;
    const isFlipped = isControlled ? flipped : internal;
    const toggle = () => {
        const next = !isFlipped;
        if (!isControlled)
            setInternal(next);
        onFlip?.(next);
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
        }
    };
    const label = isFlipped ? backLabel : frontLabel;
    const content = isFlipped ? back : front;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "button", "data-xen-flash-card": "", tabIndex: 0, "aria-pressed": isFlipped, "aria-label": `Flashcard, ${label}: ${content}. Activate to flip.`, onClick: toggle, onKeyDown: handleKeyDown, className: (0, cn_1.cn)('flex min-h-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-[var(--xen-radius-lg)] border border-border p-[var(--xen-space-xl)] text-center shadow-sm transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', isFlipped ? 'bg-primary/10' : 'bg-surface', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('rounded-full px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-bold uppercase tracking-wide', isFlipped ? 'bg-primary/10 text-primary' : 'bg-neutral-100 text-muted'), children: label }), (0, jsx_runtime_1.jsx)("span", { className: "text-xl font-bold text-on-surface", children: content }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "Tap to flip" })] }));
});
//# sourceMappingURL=FlashCardV4.js.map