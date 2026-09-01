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
exports.EmptyStateV4 = exports.COMMERCE_EMPTY_PRESETS = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const IconV4_1 = require("../primitives/IconV4");
const empty_v4_1 = require("./internal/empty-v4");
Object.defineProperty(exports, "COMMERCE_EMPTY_PRESETS", { enumerable: true, get: function () { return empty_v4_1.COMMERCE_EMPTY_PRESETS; } });
/**
 * **V4 commerce empty state** — composes `EmptyStateV4` from `primitives`
 * rather than re-drawing it, and adds the one thing a domain module can
 * usefully add: the words.
 *
 * ## Why it composes rather than redraws
 *
 * The base `commerce/EmptyState` predates `EmptyStateV4` and is a re-export of
 * an older primitive, so a store built on it gets the dashed placeholder
 * rectangle §11 and §8 both argue against, an icon that outranks the action,
 * and a headline at body size. All three of those are already fixed, once, in
 * `primitives/EmptyStateV4` — it reorders the emphasis so the action reads as
 * terminal, drops the dashed box, and moves the copy from `muted` to
 * `mutedText` because a sentence telling the user what to do next is text and
 * §46 puts its legibility first. Redrawing any of that here would be a second
 * empty state to keep in step with the first.
 *
 * So this file owns exactly two decisions, and no layout at all.
 *
 * ## 1. The copy
 *
 * §15's whole argument is that an empty state is made of its three sentences —
 * what belongs here, why it matters, what to do next — and the third is the
 * only one that changes anything. A kit that ships the layout and leaves the
 * sentences to the caller ships `title="No data"`, which is the failure mode
 * §15 names. `kind` names the five empty screens a store actually has and
 * supplies all three; every one of them is overridable.
 *
 * ## 2. The glyph
 *
 * A **categorical** leading mark — it names *a kind of thing* — which §4.7
 * says is a soft tinted circular badge. `IconV4 badge="soft"` already owns the
 * wash, the circle and the glyph's measured contrast against that wash, so
 * this file names an icon and nothing else. A caller's own `icon` is passed
 * straight through untouched: a store's illustration is the store's to colour.
 *
 * **Renders nothing when there is no headline** — no `title`, no `kind`. §4.5:
 * a component with nothing to say is not a box with nothing in it.
 */
exports.EmptyStateV4 = React.forwardRef(function EmptyStateV4({ kind, icon, title, description, action, ...rest }, ref) {
    const preset = kind ? empty_v4_1.COMMERCE_EMPTY_PRESETS[kind] : undefined;
    const resolvedTitle = title ?? preset?.title;
    if (resolvedTitle === undefined || resolvedTitle === null || resolvedTitle === '')
        return null;
    const resolvedIcon = icon ?? (preset ? (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: preset.icon, badge: "soft", color: "primary" }) : undefined);
    return ((0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { ref: ref, "data-xen-commerce-empty": kind ?? '', icon: resolvedIcon, title: resolvedTitle, description: description ?? preset?.description, action: action, ...rest }));
});
//# sourceMappingURL=EmptyStateV4.js.map