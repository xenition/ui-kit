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
exports.StoryBarV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const StoryRing_1 = require("./StoryRing");
/**
 * StoryBar — **V4** "feed" design (web parity of the native V4). A clean, airy
 * horizontally-scrolling rail of {@link StoryRing}s, optionally led by the
 * viewer's "add story" tile. In the feed line an unseen story wears the
 * accent→primary gradient ring while a seen one falls back to a muted ring;
 * the add tile carries a primary `⊕`. Ring state comes straight from each
 * story. Same props/behavior as {@link StoryBarProps}; all colors from
 * `--xen-*` token classes (no literals). Scrolls without a visible scrollbar.
 */
exports.StoryBarV4 = React.forwardRef(function StoryBarV4({ stories, onPressStory, showAdd = true, onPressAdd, addLabel = 'Your story', className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "list", className: (0, cn_1.cn)('flex gap-md overflow-x-auto px-sm py-xs', className), ...rest, children: [showAdd ? ((0, jsx_runtime_1.jsxs)("div", { role: "listitem", className: "relative", children: [(0, jsx_runtime_1.jsx)(StoryRing_1.StoryRing, { state: "add", label: addLabel, onClick: onPressAdd }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "pointer-events-none absolute right-1 top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-on-primary", children: "+" })] })) : null, stories.map((s) => {
                const state = s.state ?? 'unseen';
                const gradient = state === 'unseen';
                return ((0, jsx_runtime_1.jsxs)("div", { role: "listitem", className: "relative", children: [gradient ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "pointer-events-none absolute left-1/2 top-0 -z-10 h-14 w-14 -translate-x-1/2 rounded-full bg-gradient-to-br from-accent-400 to-primary-600" })) : null, (0, jsx_runtime_1.jsx)(StoryRing_1.StoryRing, { src: s.src, name: s.name, state: state, onClick: onPressStory ? () => onPressStory(s.id) : undefined })] }, s.id));
            })] }));
});
//# sourceMappingURL=StoryBarV4.js.map