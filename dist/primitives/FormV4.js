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
exports.FormV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
/**
 * `Form`, V4 — a structural primitive with exactly one number in it, and that
 * number is now a token.
 *
 * ## Why this is a component and `StackV4` is an alias
 *
 * `Form` is as thin as `Stack`: a `<form>` with a vertical gap. The difference
 * is that its one value was **not** a token. `gap-4` is Tailwind's own scale —
 * a fixed 16px that a re-scaled seed cannot move, sitting in a component whose
 * whole job is spacing. The native twin used `spacing.md`, which happens to be
 * 16 at today's scale, so the two agreed by coincidence rather than by
 * construction and would have drifted apart the first time a seed changed its
 * rhythm.
 *
 * ## The rhythm, and why it opened up
 *
 * `lg`, not `md`. Two reasons, and the first is the load-bearing one:
 *
 * - **A field's internal rhythm is `xs`.** `FieldV4` puts `spacing.xs` between
 *   its label, its control and its message. The gap *between* fields has to
 *   read as a different order of magnitude, or a three-part field and the next
 *   question look like one five-part thing. `lg` is six times the internal
 *   step; `md` is four.
 * - **V4 controls are `2xl` tall.** Two 48px boxes 16px apart read as a stack
 *   of blocks; at `lg` each question reads as one thing to answer, which is
 *   what §16's "forms should be minimal" is actually asking for — fewer things
 *   competing at once, not less space.
 *
 * Nothing else changes. There is no ground, no border and no radius here,
 * because a form is not a container (§11) — it is a sequence of questions, and
 * `Card` is what to reach for when the sequence genuinely needs a boundary.
 */
exports.FormV4 = React.forwardRef(function FormV4({ className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("form", { ref: ref, "data-xen-v4-form": "", 
        // `gap-lg`, off the token scale — `gap-4` is Tailwind's fixed 16px, in
        // the one component whose entire job is spacing.
        className: (0, cn_1.cn)('flex flex-col gap-lg', className), ...rest }));
});
//# sourceMappingURL=FormV4.js.map