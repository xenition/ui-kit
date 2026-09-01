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
exports.TrendingCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * TrendingCard — **V4** "feed" design. A clean, airy trending-topic card: a
 * muted `#rank · category` context line, the bold `topic`, and the `postCount`
 * as a big muted numeral. An optional `⋯` menu sits at the top-right. Pressed
 * state uses a soft-primary tint. Presentational; token-only colors via
 * `--xen-*` classes. Web parity of the native `TrendingCard`. When `onPress`
 * is set the root is a keyboard-operable `role="button"`.
 */
exports.TrendingCard = React.forwardRef(function TrendingCard({ rank, category, topic, postCount, onPress, onMenu, className, ...rest }, ref) {
    const context = [rank != null ? `#${rank}` : null, category].filter(Boolean).join(' · ');
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [context ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs font-semibold text-muted", children: context }) : null, (0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-extrabold text-on-surface", children: topic }), postCount ? (0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-extrabold tabular-nums text-muted", children: postCount }) : null] }), onMenu ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "More options", onClick: (e) => {
                    e.stopPropagation();
                    onMenu();
                }, className: "-mr-xs -mt-xs flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg font-bold text-muted transition-colors hover:bg-primary/10", children: "\u22EF" })) : null] }));
    const cardClass = (0, cn_1.cn)('flex items-start gap-sm rounded-[var(--xen-radius-lg)] border border-border bg-surface p-lg shadow-sm', className);
    const a11yLabel = [context, topic, postCount].filter(Boolean).join(', ');
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "button", tabIndex: 0, "aria-label": a11yLabel, onClick: onPress, onKeyDown: (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onPress();
                }
            }, className: (0, cn_1.cn)(cardClass, 'min-h-[44px] cursor-pointer transition-colors hover:bg-primary/10'), ...rest, children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "listitem", "aria-label": a11yLabel, className: cardClass, ...rest, children: inner }));
});
//# sourceMappingURL=TrendingCard.js.map