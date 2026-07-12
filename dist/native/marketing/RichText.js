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
exports.parseRichText = parseRichText;
exports.RichText = RichText;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const ENTITIES = {
    '&nbsp;': ' ', '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"',
    '&#39;': "'", '&apos;': "'", '&rsquo;': '’', '&lsquo;': '‘',
    '&ldquo;': '“', '&rdquo;': '”', '&mdash;': '—', '&ndash;': '–',
    '&hellip;': '…',
};
function decodeEntities(input) {
    return input
        .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
        .replace(/&[a-z#0-9]+;/gi, (m) => ENTITIES[m.toLowerCase()] ?? m);
}
/** Strip inline tags to their text and normalise whitespace. */
function inlineText(html) {
    return decodeEntities(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}
/**
 * Parse trusted CMS HTML into ordered blocks — headings, paragraphs, list items
 * and blockquotes — preserving document order. Anything outside a recognised
 * block tag (bare inline/plain text) is captured as a trailing paragraph.
 */
function parseRichText(html) {
    const blocks = [];
    const re = /<(h[1-6]|p|li|blockquote)[^>]*>([\s\S]*?)<\/\1>/gi;
    let lastIndex = 0;
    let m;
    const pushLoose = (chunk) => {
        const t = inlineText(chunk);
        if (t)
            blocks.push({ kind: 'paragraph', text: t });
    };
    while ((m = re.exec(html)) !== null) {
        if (m.index > lastIndex)
            pushLoose(html.slice(lastIndex, m.index));
        lastIndex = re.lastIndex;
        const tag = m[1].toLowerCase();
        const text = inlineText(m[2]);
        if (!text)
            continue;
        if (tag[0] === 'h')
            blocks.push({ kind: 'heading', level: Number(tag[1]), text });
        else if (tag === 'li')
            blocks.push({ kind: 'listitem', text });
        else if (tag === 'blockquote')
            blocks.push({ kind: 'quote', text });
        else
            blocks.push({ kind: 'paragraph', text });
    }
    if (lastIndex < html.length)
        pushLoose(html.slice(lastIndex));
    // No block tags at all → treat the whole thing as one paragraph.
    if (blocks.length === 0) {
        const t = inlineText(html);
        if (t)
            blocks.push({ kind: 'paragraph', text: t });
    }
    return blocks;
}
/**
 * The native mirror of the web pattern of rendering a trusted CMS `bodyHtml`
 * (which the web does via `dangerouslySetInnerHTML`). React Native has no DOM,
 * so this dependency-free reader parses the HTML into ordered blocks and renders
 * each as a token-styled `Text`: headings larger/bold, list items with a bullet,
 * blockquotes muted/indented, paragraphs as body copy. Bold/links collapse to
 * their text. Token-only — colors + spacing from the active theme. For trusted,
 * seed-authored content only (it does not sanitise).
 */
function RichText({ html, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const blocks = React.useMemo(() => parseRichText(html), [html]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], children: blocks.map((b, i) => {
            if (b.kind === 'heading') {
                return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        fontSize: b.level <= 2 ? 22 : 18,
                        lineHeight: b.level <= 2 ? 28 : 24,
                        fontWeight: '700',
                        color: colors.onSurface,
                        marginTop: i === 0 ? 0 : tokens.spacing.sm,
                    }, children: b.text }, i));
            }
            if (b.kind === 'listitem') {
                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: 16, lineHeight: 26, color: colors.accent }, children: '•' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, fontSize: 16, lineHeight: 26, color: colors.onSurface }, children: b.text })] }, i));
            }
            if (b.kind === 'quote') {
                return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        borderLeftWidth: 3,
                        borderLeftColor: colors.border,
                        paddingLeft: tokens.spacing.md,
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: 16, lineHeight: 26, fontStyle: 'italic', color: colors.muted }, children: b.text }) }, i));
            }
            return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: 16, lineHeight: 26, color: colors.onSurface }, children: b.text }, i));
        }) }));
}
//# sourceMappingURL=RichText.js.map