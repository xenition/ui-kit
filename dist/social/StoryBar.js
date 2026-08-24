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
exports.StoryBar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const StoryRing_1 = require("./StoryRing");
/**
 * A horizontally-scrolling rail of {@link StoryRing}s, optionally led by the
 * viewer's "add story" tile. Ring state (unseen/seen/live) comes straight from
 * each story. Web parity of the native `StoryBar`; token-only. Scrolls
 * horizontally without a visible scrollbar footprint on the page.
 */
exports.StoryBar = React.forwardRef(function StoryBar({ stories, onPressStory, showAdd = true, onPressAdd, addLabel = 'Your story', className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "list", className: (0, cn_1.cn)('flex gap-sm overflow-x-auto px-sm', className), ...rest, children: [showAdd ? ((0, jsx_runtime_1.jsx)("div", { role: "listitem", children: (0, jsx_runtime_1.jsx)(StoryRing_1.StoryRing, { state: "add", label: addLabel, onClick: onPressAdd }) })) : null, stories.map((s) => ((0, jsx_runtime_1.jsx)("div", { role: "listitem", children: (0, jsx_runtime_1.jsx)(StoryRing_1.StoryRing, { src: s.src, name: s.name, state: s.state ?? 'unseen', onClick: onPressStory ? () => onPressStory(s.id) : undefined }) }, s.id)))] }));
});
//# sourceMappingURL=StoryBar.js.map