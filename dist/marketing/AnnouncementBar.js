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
exports.AnnouncementBar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const TONE_CLASSES = {
    primary: 'bg-primary text-on-primary',
    accent: 'bg-accent text-on-accent',
    neutral: 'bg-neutral-100 text-on-surface border-b border-border',
};
/** Dismissible top banner with a message, optional action, and tone variants (session state only). */
exports.AnnouncementBar = React.forwardRef(function AnnouncementBar({ message, action, tone = 'primary', dismissible = true, closeLabel = 'Dismiss announcement', onDismiss, className, ...rest }, ref) {
    const [dismissed, setDismissed] = React.useState(false);
    if (dismissed)
        return null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-announcement-bar": "", role: "region", "aria-label": "Announcement", className: (0, cn_1.cn)('flex w-full items-center justify-center gap-[var(--xen-space-md)]', 'px-[var(--xen-space-lg)] py-[var(--xen-space-sm)] text-sm', TONE_CLASSES[tone], className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center justify-center gap-[var(--xen-space-sm)] text-center", children: [(0, jsx_runtime_1.jsx)("span", { children: message }), action !== undefined ? (0, jsx_runtime_1.jsx)("span", { className: "font-medium", children: action }) : null] }), dismissible ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": closeLabel, "data-xen-announcement-close": "", onClick: () => {
                    setDismissed(true);
                    onDismiss?.();
                }, className: "ml-auto inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--xen-radius-full)] leading-none opacity-80 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u2715" }) })) : null] }));
});
//# sourceMappingURL=AnnouncementBar.js.map