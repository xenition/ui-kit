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
exports.StatusBadgeV4 = exports.STATUS_ANATOMY = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const status_v4_1 = require("./internal/status-v4");
Object.defineProperty(exports, "STATUS_ANATOMY", { enumerable: true, get: function () { return status_v4_1.STATUS_ANATOMY; } });
/**
 * **V4 status badge** — the web twin of the native `StatusBadgeV4`, same props
 * as {@link StatusBadge} plus two, a different design line.
 *
 * Three changes.
 *
 * 1. **An icon and a word, never colour alone.** The status → tone / glyph /
 *    ink table is {@link STATUS_ANATOMY}, in `internal/status-v4.ts` so both
 *    twins read one copy of it; the argument for the rule is written out
 *    there. This is the whole reason the file exists.
 * 2. **It composes `BadgeV4`.** The base re-rolled a pill: its own radius, its
 *    own padding, its own `py-0.5` (a literal, and the only one in the file),
 *    its own tone table. All four are decisions `BadgeV4` already makes —
 *    including the one the base got wrong, that a badge's shape should follow
 *    the seed rather than defaulting to a capsule, so a `sharp` brand gets
 *    square tags instead of pills. §10.5: a V4 composite composes V4 children.
 * 3. **It says what it is.** "Paid" on its own is a word floating in a list.
 *    The badge now announces "Order status: Paid" through a visually-hidden
 *    prefix — the `LabelV4` spelling — rather than an `aria-label` on a bare
 *    `<span>`, which has no role for a name to attach to and is honoured
 *    inconsistently across screen readers. The glyph stays decorative, so
 *    nothing reads out "label" or "clock face" before the status.
 *
 * The badge variant is deliberately **not** a prop. `soft` and `outline` label
 * themselves with the contrast-corrected `*Text` slots, which the ten
 * `IconColor` slots do not include — a status badge offering a variant whose
 * glyph could not be tinted to match its own label would be an option that is
 * always the wrong one (§7: subtraction before addition).
 */
exports.StatusBadgeV4 = React.forwardRef(function StatusBadgeV4({ status, iconName, size = 'md', children, className, ...rest }, ref) {
    const anatomy = status_v4_1.STATUS_ANATOMY[status];
    const label = children ?? (0, status_v4_1.statusLabel)(status);
    return ((0, jsx_runtime_1.jsxs)(BadgeV4_1.BadgeV4, { ref: ref, "data-xen-status-badge": status, "data-xen-v4-status-badge": status, tone: anatomy.tone, variant: "solid", size: size, className: (0, cn_1.cn)('whitespace-nowrap', className), ...rest, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: iconName ?? anatomy.icon, size: "xs", color: anatomy.ink }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: status_v4_1.STATUS_PREFIX }), label] }));
});
//# sourceMappingURL=StatusBadgeV4.js.map