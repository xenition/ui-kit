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
exports.acceptHint = acceptHint;
exports.UploadV4 = UploadV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const picker_v4_1 = require("./internal/picker-v4");
/**
 * What this dropzone will accept, in a sentence — or `null` when there is
 * nothing worth saying.
 *
 * §15 asks an empty state to answer "what belongs here". `accept` and
 * `multiple` are the only two facts the component actually knows, so they are
 * the only two it claims. When it knows neither it says nothing rather than
 * filling the space with "Any file type", which is noise dressed as help
 * (§7 — reduce visual noise).
 */
function acceptHint(accept, multiple) {
    const parts = [];
    if (accept)
        parts.push(`Accepts ${accept}`);
    if (multiple)
        parts.push(parts.length ? 'more than one is fine' : 'More than one is fine');
    return parts.length ? parts.join(' · ') : null;
}
/**
 * **V4 upload** — the web twin of `UploadV4`, the same props as
 * {@link Upload}, a different design line.
 *
 * ## The empty state IS the component
 *
 * An upload control has no content of its own. Whatever it looks like before a
 * file exists is the whole thing, which makes §15 the entire brief: an empty
 * state has to say **what belongs here** and **what to do next**.
 *
 * The base says neither loudly. It renders one line of `text-sm text-muted-text`
 * inside a dashed box — the quietest type in the kit, used for the only thing
 * on screen. So the hierarchy is inverted here (§6):
 *
 *   - **A mark.** A brand-washed disc with an upward glyph, painted through
 *     `[data-xen-v4-wash]`.
 *   - **A headline that is not muted.** The caller's `label` at `text-base` in
 *     `text-on-surface`, semibold. It is the loudest thing in the box because
 *     it is the only thing in the box.
 *   - **A line about what fits**, derived from `accept` and `multiple` — the
 *     only two facts the component has. When it has neither it says nothing.
 *
 * ## The dark-mode bug it fixes
 *
 * The base paints its drag-over state `bg-primary-50`. That is a ramp step, and
 * the ramps carry the light orientation in BOTH schemes — so on a dark page,
 * the moment you drag a file over the zone it flashes near-white. V4 uses the
 * same `color-mix` wash the range band uses: brand over `--xen-surface`,
 * correct in both schemes.
 *
 * ## The zone
 *
 * Three tap targets tall, so it reads as a place rather than a button, with the
 * dashed edge that is the universal "drop here" convention (§31). Dragging over
 * it washes the whole ground and turns the edge `primary`, so the zone
 * acknowledges the file rather than only its text doing so. No shadow: a drop
 * target is a hole, not a raised object, and depth here would say the opposite
 * of what it means.
 */
function UploadV4({ onFiles, accept, multiple, label = 'Drag files here or click to browse', className, }) {
    (0, inject_1.injectStyleOnce)('xen-v4-picker-styles', picker_v4_1.PICKER_V4_CSS);
    const inputRef = React.useRef(null);
    const [drag, setDrag] = React.useState(false);
    const handle = (list) => {
        if (list && list.length)
            onFiles(Array.from(list));
    };
    const hint = acceptHint(accept, multiple);
    return ((0, jsx_runtime_1.jsxs)("div", { role: "button", tabIndex: 0, "aria-label": typeof label === 'string' ? label : undefined, onClick: () => inputRef.current?.click(), onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                inputRef.current?.click();
            }
        }, onDragOver: (e) => {
            e.preventDefault();
            setDrag(true);
        }, onDragLeave: () => setDrag(false), onDrop: (e) => {
            e.preventDefault();
            setDrag(false);
            handle(e.dataTransfer.files);
        }, "data-xen-v4-wash": drag ? '' : undefined, className: (0, cn_1.cn)('flex cursor-pointer flex-col items-center justify-center gap-sm p-lg text-center', 
        // Three tap targets tall: a place, not a button.
        'min-h-[calc(var(--xen-space-2xl)_*_3)]', 'rounded-[var(--xen-radius-lg)] border-2 border-dashed', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', drag ? 'border-primary' : 'border-border bg-surface', className), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", "data-xen-v4-wash": "", className: (0, cn_1.cn)('flex items-center justify-center rounded-[var(--xen-radius-full)] text-xl text-primary-text', 'h-[var(--xen-space-2xl)] w-[var(--xen-space-2xl)]'), children: "\u2191" }), typeof label === 'string' ? ((0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-surface", children: label })) : (label), hint !== null ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-text", children: hint }) : null, (0, jsx_runtime_1.jsx)("input", { ref: inputRef, type: "file", accept: accept, multiple: multiple, className: "hidden", onChange: (e) => handle(e.target.files) })] }));
}
//# sourceMappingURL=UploadV4.js.map