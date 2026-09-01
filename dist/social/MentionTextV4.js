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
exports.MentionTextV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const MentionText_1 = require("./MentionText");
const COLOR_CLASS = {
    surface: 'text-surface',
    onSurface: 'text-on-surface',
    primary: 'text-primary',
    onPrimary: 'text-on-primary',
    accent: 'text-accent',
    onAccent: 'text-on-accent',
    muted: 'text-muted',
    border: 'text-border',
    success: 'text-success',
    onSuccess: 'text-on-success',
    warn: 'text-warn',
    onWarn: 'text-on-warn',
    danger: 'text-danger',
    onDanger: 'text-on-danger',
};
const SIZE_CLASS = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
};
/**
 * MentionText — **V4** "feed" design (web parity of the native V4). The clean,
 * airy mention-aware body: `@mentions` and `#hashtags` render in **primary**
 * and become tappable, everything else in the on-surface base color. Reuses the
 * shared {@link parseMentions} splitter. Same props/behavior as
 * {@link MentionTextProps}; token-only, no literal colors. Mentions/hashtags
 * become inline `<button>`s only when a handler is supplied, otherwise plain
 * (non-interactive) spans.
 */
exports.MentionTextV4 = React.forwardRef(function MentionTextV4({ text, color = 'onSurface', linkColor = 'primary', size = 'base', numberOfLines, onPressMention, onPressHashtag, className, style, ...rest }, ref) {
    const segments = (0, MentionText_1.parseMentions)(text);
    const clamp = numberOfLines != null
        ? {
            display: '-webkit-box',
            WebkitLineClamp: numberOfLines,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
        }
        : undefined;
    return ((0, jsx_runtime_1.jsx)("span", { ref: ref, className: (0, cn_1.cn)('leading-relaxed', SIZE_CLASS[size], COLOR_CLASS[color], className), style: clamp ? { ...clamp, ...style } : style, ...rest, children: segments.map((seg, i) => {
            if (seg.kind === 'text') {
                return (0, jsx_runtime_1.jsx)("span", { children: seg.value }, i);
            }
            const bare = seg.value.slice(1);
            const handler = seg.kind === 'mention'
                ? onPressMention
                    ? () => onPressMention(bare)
                    : undefined
                : onPressHashtag
                    ? () => onPressHashtag(bare)
                    : undefined;
            const linkClass = (0, cn_1.cn)('font-semibold', COLOR_CLASS[linkColor]);
            if (handler) {
                return ((0, jsx_runtime_1.jsx)("button", { type: "button", className: (0, cn_1.cn)(linkClass, 'hover:underline'), onClick: handler, children: seg.value }, i));
            }
            return ((0, jsx_runtime_1.jsx)("span", { className: linkClass, children: seg.value }, i));
        }) }));
});
//# sourceMappingURL=MentionTextV4.js.map