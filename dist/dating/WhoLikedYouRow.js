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
exports.WhoLikedYouRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const primitives_1 = require("../primitives");
/**
 * Horizontal "who liked you" strip — the web parity of the native likes row.
 * Shows a scrollable rail of liker avatars with a total count pill; when `locked`
 * (a premium gate) the faces sit behind a token scrim and each tile becomes an
 * unlock CTA instead of exposing identities. Handles loading and empty states.
 * Token classes only; lock state is announced in the a11y label, never by color.
 */
exports.WhoLikedYouRow = React.forwardRef(function WhoLikedYouRow({ likers, total, locked = true, title = 'Liked you', onClickLiker, onUnlock, loading = false, emptyLabel = 'No likes yet — keep swiping!', className, ...rest }, ref) {
    const list = likers ?? [];
    const count = total ?? list.length;
    const header = ((0, jsx_runtime_1.jsxs)("div", { className: "mb-sm flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: title }), count > 0 ? ((0, jsx_runtime_1.jsx)("span", { className: "rounded-full bg-danger px-sm py-0.5 text-xs font-bold text-on-danger", children: count })) : null] }));
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: className, ...rest, children: [header, (0, jsx_runtime_1.jsx)("div", { className: "flex gap-sm", children: [0, 1, 2, 3].map((i) => ((0, jsx_runtime_1.jsx)("span", { className: "h-16 w-16 rounded-full bg-neutral-200" }, i))) })] }));
    }
    if (count === 0) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: className, ...rest, children: [header, (0, jsx_runtime_1.jsx)("div", { "aria-label": emptyLabel, className: "flex items-center justify-center rounded-[var(--xen-radius-lg)] border border-border p-lg", children: (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: emptyLabel }) })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: className, ...rest, children: [header, (0, jsx_runtime_1.jsx)("div", { className: "flex gap-sm overflow-x-auto pb-1", children: list.map((liker, i) => {
                    const label = locked
                        ? `Locked like ${i + 1}`
                        : `${liker.name ?? 'Someone'}${liker.superLiked ? ', super liked you' : ''}`;
                    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": label, onClick: () => (locked ? onUnlock?.() : onClickLiker?.(liker.id)), className: "flex w-[72px] shrink-0 flex-col items-center gap-xs", children: [(0, jsx_runtime_1.jsxs)("span", { className: "relative", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: locked ? undefined : liker.photoUri, name: locked ? '?' : liker.name, size: "lg", className: liker.superLiked ? 'ring-2 ring-primary ring-offset-1' : undefined }), locked ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute inset-0 flex items-center justify-center rounded-full bg-neutral-900 text-lg text-neutral-50", "aria-hidden": "true", children: "\uD83D\uDD12" })) : null] }), !locked ? ((0, jsx_runtime_1.jsx)("span", { className: "max-w-[68px] truncate text-xs text-muted", children: liker.name ?? 'Someone' })) : null] }, liker.id));
                }) }), locked ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": `Unlock to see who liked you, ${count} total`, onClick: () => onUnlock?.(), className: "mt-sm w-full rounded-full bg-primary-50 py-sm text-sm font-bold text-primary transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: ["See all ", count, " likes"] })) : null] }));
});
//# sourceMappingURL=WhoLikedYouRow.js.map