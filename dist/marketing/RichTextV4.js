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
exports.RichTextV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/** Collapse whitespace in a run of inline HTML, preserving inline tags (bold/links). */
function inlineHtml(html) {
    return html.replace(/\s+/g, ' ').trim();
}
/**
 * Parse trusted CMS HTML into ordered blocks — headings, paragraphs, list items
 * and blockquotes — preserving document order (the web mirror of the native
 * `parseRichText`, but keeping inline markup so bold/links render). Anything
 * outside a recognised block tag (bare inline/plain text) becomes a paragraph.
 */
function parseBlocks(html) {
    const blocks = [];
    const re = /<(h[1-6]|p|li|blockquote)[^>]*>([\s\S]*?)<\/\1>/gi;
    let lastIndex = 0;
    let m;
    const pushLoose = (chunk) => {
        const t = inlineHtml(chunk);
        if (t)
            blocks.push({ kind: 'paragraph', html: t });
    };
    while ((m = re.exec(html)) !== null) {
        if (m.index > lastIndex)
            pushLoose(html.slice(lastIndex, m.index));
        lastIndex = re.lastIndex;
        const tag = m[1].toLowerCase();
        const inner = inlineHtml(m[2]);
        if (!inner)
            continue;
        if (tag[0] === 'h')
            blocks.push({ kind: 'heading', level: Number(tag[1]), html: inner });
        else if (tag === 'li')
            blocks.push({ kind: 'listitem', html: inner });
        else if (tag === 'blockquote')
            blocks.push({ kind: 'quote', html: inner });
        else
            blocks.push({ kind: 'paragraph', html: inner });
    }
    if (lastIndex < html.length)
        pushLoose(html.slice(lastIndex));
    if (blocks.length === 0) {
        const t = inlineHtml(html);
        if (t)
            blocks.push({ kind: 'paragraph', html: t });
    }
    return blocks;
}
/**
 * RichText — **V4** "showcase" design (web parity of the native V4). Beautiful
 * long-form typography for a trusted CMS `html` body: a strong heading hierarchy
 * (extra-bold h2/h3), a comfortable reading measure (`max-w-prose`) with generous
 * leading, and styled lists, links (`text-primary`) and blockquotes (a
 * soft-primary left rule on a faint primary wash). Contiguous list items are
 * grouped into a single `<ul>`. The native base's plain-text blocks keep their
 * inline markup here (bold/links) since the web has a DOM. Same `html` contract as
 * the native `RichText`; token-only colors, no literals. For trusted,
 * seed-authored content only (it does not sanitise).
 */
exports.RichTextV4 = React.forwardRef(function RichTextV4({ html, className, ...rest }, ref) {
    const blocks = React.useMemo(() => parseBlocks(html), [html]);
    const rendered = [];
    let listBuffer = [];
    const flushList = (key) => {
        if (listBuffer.length === 0)
            return;
        rendered.push((0, jsx_runtime_1.jsx)("ul", { className: "flex list-none flex-col gap-[var(--xen-space-sm)]", children: listBuffer.map((li, j) => ((0, jsx_runtime_1.jsxs)("li", { className: "relative pl-[var(--xen-space-lg)] leading-relaxed text-on-surface", children: [(0, jsx_runtime_1.jsx)("span", { className: "absolute left-0 top-0 font-bold text-primary", "aria-hidden": "true", children: "\u2022" }), (0, jsx_runtime_1.jsx)("span", { dangerouslySetInnerHTML: { __html: li.html } })] }, j))) }, key));
        listBuffer = [];
    };
    blocks.forEach((b, i) => {
        if (b.kind === 'listitem') {
            listBuffer.push(b);
            return;
        }
        flushList(`list-${i}`);
        if (b.kind === 'heading') {
            const Tag = (b.level <= 2 ? 'h2' : 'h3');
            rendered.push((0, jsx_runtime_1.jsx)(Tag, { className: (0, cn_1.cn)('font-heading font-extrabold tracking-tight text-on-surface', b.level <= 2 ? 'text-3xl leading-tight' : 'text-xl leading-snug', i === 0 ? '' : 'mt-[var(--xen-space-md)]'), dangerouslySetInnerHTML: { __html: b.html } }, i));
        }
        else if (b.kind === 'quote') {
            rendered.push((0, jsx_runtime_1.jsx)("blockquote", { className: "rounded-r-[var(--xen-radius-md)] border-l-[3px] border-primary/40 bg-primary/[0.04] py-[var(--xen-space-sm)] pl-[var(--xen-space-md)] pr-[var(--xen-space-md)] italic leading-relaxed text-on-surface", dangerouslySetInnerHTML: { __html: b.html } }, i));
        }
        else {
            rendered.push((0, jsx_runtime_1.jsx)("p", { className: "leading-relaxed text-on-surface", dangerouslySetInnerHTML: { __html: b.html } }, i));
        }
    });
    flushList('list-end');
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-rich-text": "", className: (0, cn_1.cn)('flex max-w-prose flex-col gap-[var(--xen-space-md)] text-base', '[&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-primary-600', '[&_strong]:font-semibold [&_strong]:text-on-surface', className), ...rest, children: rendered }));
});
//# sourceMappingURL=RichTextV4.js.map