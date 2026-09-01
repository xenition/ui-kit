import * as React from 'react';
import { cn } from '../primitives/cn';

/**
 * Drop-in props for the RichText **V4** "showcase" design. RichText is a
 * native-only base component (it has no web counterpart — the web app renders a
 * trusted CMS `bodyHtml` inline). This web V4 mirrors the native `RichTextProps`
 * contract so the two platforms are prop-compatible: a single trusted `html`
 * body string plus an optional `className`.
 */
export interface RichTextV4Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Trusted CMS body HTML (e.g. a cms page's `bodyHtml`). */
  html: string;
}

type Block =
  | { kind: 'heading'; level: number; html: string }
  | { kind: 'paragraph'; html: string }
  | { kind: 'listitem'; html: string }
  | { kind: 'quote'; html: string };

/** Collapse whitespace in a run of inline HTML, preserving inline tags (bold/links). */
function inlineHtml(html: string): string {
  return html.replace(/\s+/g, ' ').trim();
}

/**
 * Parse trusted CMS HTML into ordered blocks — headings, paragraphs, list items
 * and blockquotes — preserving document order (the web mirror of the native
 * `parseRichText`, but keeping inline markup so bold/links render). Anything
 * outside a recognised block tag (bare inline/plain text) becomes a paragraph.
 */
function parseBlocks(html: string): Block[] {
  const blocks: Block[] = [];
  const re = /<(h[1-6]|p|li|blockquote)[^>]*>([\s\S]*?)<\/\1>/gi;
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  const pushLoose = (chunk: string) => {
    const t = inlineHtml(chunk);
    if (t) blocks.push({ kind: 'paragraph', html: t });
  };
  while ((m = re.exec(html)) !== null) {
    if (m.index > lastIndex) pushLoose(html.slice(lastIndex, m.index));
    lastIndex = re.lastIndex;
    const tag = m[1]!.toLowerCase();
    const inner = inlineHtml(m[2]!);
    if (!inner) continue;
    if (tag[0] === 'h') blocks.push({ kind: 'heading', level: Number(tag[1]), html: inner });
    else if (tag === 'li') blocks.push({ kind: 'listitem', html: inner });
    else if (tag === 'blockquote') blocks.push({ kind: 'quote', html: inner });
    else blocks.push({ kind: 'paragraph', html: inner });
  }
  if (lastIndex < html.length) pushLoose(html.slice(lastIndex));
  if (blocks.length === 0) {
    const t = inlineHtml(html);
    if (t) blocks.push({ kind: 'paragraph', html: t });
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
export const RichTextV4 = React.forwardRef<HTMLDivElement, RichTextV4Props>(function RichTextV4(
  { html, className, ...rest },
  ref
) {
  const blocks = React.useMemo(() => parseBlocks(html), [html]);

  const rendered: React.ReactNode[] = [];
  let listBuffer: Block[] = [];
  const flushList = (key: string) => {
    if (listBuffer.length === 0) return;
    rendered.push(
      <ul key={key} className="flex list-none flex-col gap-[var(--xen-space-sm)]">
        {listBuffer.map((li, j) => (
          <li key={j} className="relative pl-[var(--xen-space-lg)] leading-relaxed text-on-surface">
            <span className="absolute left-0 top-0 font-bold text-primary" aria-hidden="true">
              •
            </span>
            <span dangerouslySetInnerHTML={{ __html: li.html }} />
          </li>
        ))}
      </ul>
    );
    listBuffer = [];
  };

  blocks.forEach((b, i) => {
    if (b.kind === 'listitem') {
      listBuffer.push(b);
      return;
    }
    flushList(`list-${i}`);
    if (b.kind === 'heading') {
      const Tag = (b.level <= 2 ? 'h2' : 'h3') as 'h2' | 'h3';
      rendered.push(
        <Tag
          key={i}
          className={cn(
            'font-heading font-extrabold tracking-tight text-on-surface',
            b.level <= 2 ? 'text-3xl leading-tight' : 'text-xl leading-snug',
            i === 0 ? '' : 'mt-[var(--xen-space-md)]'
          )}
          dangerouslySetInnerHTML={{ __html: b.html }}
        />
      );
    } else if (b.kind === 'quote') {
      rendered.push(
        <blockquote
          key={i}
          className="rounded-r-[var(--xen-radius-md)] border-l-[3px] border-primary/40 bg-primary/[0.04] py-[var(--xen-space-sm)] pl-[var(--xen-space-md)] pr-[var(--xen-space-md)] italic leading-relaxed text-on-surface"
          dangerouslySetInnerHTML={{ __html: b.html }}
        />
      );
    } else {
      rendered.push(
        <p
          key={i}
          className="leading-relaxed text-on-surface"
          dangerouslySetInnerHTML={{ __html: b.html }}
        />
      );
    }
  });
  flushList('list-end');

  return (
    <div
      ref={ref}
      data-xen-rich-text=""
      className={cn(
        'flex max-w-prose flex-col gap-[var(--xen-space-md)] text-base',
        '[&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-primary-600',
        '[&_strong]:font-semibold [&_strong]:text-on-surface',
        className
      )}
      {...rest}
    >
      {rendered}
    </div>
  );
});
