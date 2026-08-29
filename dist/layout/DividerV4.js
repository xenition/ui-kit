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
exports.DividerV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const _tokens_1 = require("./_tokens");
/**
 * The leading inset: `44 + spacing.md`.
 *
 * 44 is the row's leading slot — the HIG tap-target floor and the house §8
 * badge size (BRIEF §4.3) — and it is one of the two bare numbers §1 allows in
 * this file. The other is the hairline's `1`, which `border-t` supplies. The
 * gap half is `spacing.md`, the row's leading-slot-to-text gap, so the sum
 * lands exactly on the row title's leading edge rather than near it.
 *
 * Both classes are written out in full rather than composed from a template,
 * so the Tailwind scanner finds them in the library source — the `_tokens.ts`
 * convention.
 */
const LEADING_ML = 'ml-[calc(44px+var(--xen-space-md))]';
const LEADING_MT = 'mt-[calc(44px+var(--xen-space-md))]';
/**
 * **V4 divider** — the web twin of the native `DividerV4`, at prop parity, in
 * the V4 design line.
 *
 * Visually it is the base: BRIEF §4.4 settles that a separator is **1px
 * `colors.border` and nothing else** — never two weights, never a tinted rule
 * — and the base already draws exactly that. So this file is structure plus
 * the one new capability the row family needs.
 *
 * **`inset="leading"`.** Where a list's rows carry a 44 leading slot, a flush
 * rule runs underneath the avatar or badge and makes the list read as a table.
 * Inset by `44 + spacing.md` it starts at the title, which is what turns a
 * stack of rows into one grouped container. Rows with no leading slot keep the
 * flush rule — that is the default, so every existing caller renders exactly
 * as it does today (§1.4).
 *
 * **Where a divider belongs.** Inside a grouped container only — between the
 * rows of a `SettingsSection`, or between a card header and a body that is a
 * list. Between free-standing blocks the separator is space, not a rule
 * (§4.4); a hairline under every block is admin styling and fights the airy
 * ground §3 asks for.
 *
 * Still an `<hr>`, for its implicit `separator` role. No label variant —
 * `AuthDividerV4` owns that.
 */
exports.DividerV4 = React.forwardRef(function DividerV4({ orientation = 'horizontal', inset, className, ...rest }, ref) {
    const horizontal = orientation === 'horizontal';
    const leading = inset === 'leading';
    let insetClass;
    if (leading) {
        // One end only: a leading inset is an alignment with the row's text, not a
        // margin off both edges.
        insetClass = horizontal ? LEADING_ML : LEADING_MT;
    }
    else if (inset !== undefined) {
        insetClass = horizontal ? _tokens_1.SPACE_MX[inset] : _tokens_1.SPACE_MY[inset];
    }
    return ((0, jsx_runtime_1.jsx)("hr", { ref: ref, "aria-orientation": orientation, className: (0, cn_1.cn)('border-0 border-solid border-border', horizontal ? 'w-full border-t' : 'self-stretch border-l', insetClass, className), ...rest }));
});
//# sourceMappingURL=DividerV4.js.map