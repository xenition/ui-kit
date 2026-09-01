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
exports.DispatchBarV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const ButtonV4_1 = require("../primitives/ButtonV4");
const IconV4_1 = require("../primitives/IconV4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const job_v4_1 = require("./internal/job-v4");
/**
 * Stage → word, glyph, tone and the action that leaves it.
 *
 * The stages in the middle of the workflow take no status colour: a dispatch
 * stage is where a job sits in a queue, not how it turned out, and the base
 * painted "En route" amber and "On site" green — spending the two colours that
 * have to mean "look at this" and "this went well" on a position in a list.
 * Only `complete`, which really is an outcome, keeps `success`.
 */
const STAGE_V4 = {
    unassigned: { label: 'Unassigned', glyph: '○', tone: 'muted', advance: 'Accept', next: 'accepted' },
    accepted: { label: 'Accepted', glyph: '✓', tone: 'primary', advance: 'Start driving', next: 'en-route' },
    'en-route': { label: 'En route', glyph: '→', tone: 'primary', advance: 'Arrive', next: 'on-site' },
    'on-site': { label: 'On site', glyph: '▶', tone: 'primary', advance: 'Complete', next: 'complete' },
    complete: { label: 'Complete', glyph: '✓', tone: 'success', advance: undefined, next: undefined },
};
/**
 * **V4 dispatch bar** — the web twin of the native `DispatchBarV4`, same props
 * as {@link DispatchBar} plus `confirmAdvanceLabel` and `stageLabels`.
 *
 * ## Six changes
 *
 * 1. **No enabled button that does nothing.** `canAdvance` never consulted
 *    `onAdvance`, so `<DispatchBar stage="on-site" />` shipped a live
 *    "Complete" that swallowed every press in silence. The action now exists
 *    only when there is a handler to receive it.
 * 2. **Completing a visit takes a confirming press.** It is irreversible — the
 *    bar offers no action afterwards — and it was one tap on a phone held in a
 *    glove. The first press arms and renames the button through
 *    `confirmAdvanceLabel`; the second advances.
 * 3. **`loading` means the same thing on both twins.** The web bar only set
 *    `disabled`, so a caller who showed a spinner on the phone got a dead grey
 *    button on the tablet. It is now `aria-busy` as well as disabled.
 * 4. **The stage is not printed twice.** Without a `jobLabel` the bar drew the
 *    stage word as its title and then again underneath it.
 * 5. **The disc is decorative.** It carried an accessible label, so the stage
 *    was announced from the disc and then from the line under the title.
 * 6. **The primary action clears 44** and a dispatch stage stops wearing a
 *    status colour — see {@link STAGE_V4}.
 */
exports.DispatchBarV4 = React.forwardRef(function DispatchBarV4({ stage, eta, jobLabel, onAdvance, onNavigate, loading = false, confirmAdvanceLabel = (next) => `Confirm ${next}`, stageLabels, className, style, }, ref) {
    const [armed, setArmed] = React.useState(false);
    const sd = STAGE_V4[stage] ?? STAGE_V4.unassigned;
    const word = stageLabels?.[stage] ?? sd.label;
    // An action with no handler is not an action.
    const canAdvance = sd.advance != null && sd.next != null && onAdvance != null;
    // Only the last step is guarded: it is the one the bar cannot undo.
    const guarded = sd.next === 'complete';
    const advanceWord = armed ? confirmAdvanceLabel(sd.advance ?? word) : (sd.advance ?? word);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, style: style, className: (0, cn_1.cn)('flex items-center gap-md border-t border-border bg-surface px-md py-md', className), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "flex h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] shrink-0 items-center justify-center rounded-[var(--xen-radius-full)]", style: { background: (0, job_v4_1.discGround)(sd.tone) }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: sd.glyph, className: (0, job_v4_1.discInkClass)(sd.tone) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate font-heading text-base font-bold text-on-surface", children: jobLabel ?? word }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: jobLabel != null ? (0, tone_v4_1.metaLine)([word, eta]) : (eta ?? '') })] }), onNavigate ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "outline", size: "md", onClick: onNavigate, children: "Navigate" })) : null, canAdvance ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", size: "md", disabled: loading, "aria-busy": loading || undefined, onClick: () => {
                    if (guarded && !armed) {
                        setArmed(true);
                        return;
                    }
                    setArmed(false);
                    onAdvance?.(sd.next);
                }, 
                // Walking away from an armed Complete disarms it.
                onBlur: () => setArmed(false), children: advanceWord })) : null] }));
});
//# sourceMappingURL=DispatchBarV4.js.map