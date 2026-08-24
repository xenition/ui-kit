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
exports.MentionText = void 0;
exports.parseMentions = parseMentions;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
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
/** Split a string into plain / @mention / #hashtag segments (order preserved). */
function parseMentions(text) {
    const segments = [];
    const re = /([@#][\w]+)/g;
    let lastIndex = 0;
    let match;
    while ((match = re.exec(text)) !== null) {
        const token = match[0] ?? '';
        if (match.index > lastIndex) {
            segments.push({ kind: 'text', value: text.slice(lastIndex, match.index) });
        }
        segments.push({
            kind: token.charAt(0) === '@' ? 'mention' : 'hashtag',
            value: token,
        });
        lastIndex = match.index + token.length;
    }
    if (lastIndex < text.length) {
        segments.push({ kind: 'text', value: text.slice(lastIndex) });
    }
    return segments;
}
/**
 * Rich body text that highlights `@mentions` and `#hashtags` in the theme's
 * link color and makes each clickable. Everything else renders in the base
 * color. Web parity of the native `MentionText` — token-only, no literal colors.
 * Mentions/hashtags become inline `<button>`s only when a handler is supplied,
 * otherwise plain (non-interactive) spans.
 */
exports.MentionText = React.forwardRef(function MentionText({ text, color = 'onSurface', linkColor = 'primary', size = 'base', numberOfLines, onPressMention, onPressHashtag, className, style, ...rest }, ref) {
    const segments = parseMentions(text);
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
//# sourceMappingURL=MentionText.js.map