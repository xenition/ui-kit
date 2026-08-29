import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import { V4_CODE_CSS, V4_CODE_STYLE_ID } from './internal/v4-data';
import type { CodeBlockProps } from './CodeBlock';

export type { CodeBlockProps as CodeBlockV4Props };

/**
 * **V4 code block** — the web twin of the native `CodeBlockV4`, same props as
 * {@link CodeBlock}, a different design line.
 *
 * Code is the one content in this kit that is read character by character, so
 * the V4 answer is the opposite of decoration: a calmer surface and one more
 * piece of structure.
 *
 * Four changes:
 *
 * 1. **A calm, recessed ground.** The base painted the code on `bg-surface` —
 *    the same colour as the page — so a block sat on a page it could not be
 *    distinguished from except by its border. V4 sinks the `<pre>` by the same
 *    4% neutral step the V4 tables band with, mixed from `--xen-on-surface`
 *    into `--xen-surface` so it darkens a light page and lightens a dark one
 *    with no dark rule of its own.
 * 2. **A gutter with an edge.** A line number the reader is counting to needs
 *    something to stop at; with only `mr-3` the numbers read as a first column
 *    of code. That is the second and last rule on the surface — everything
 *    else is spacing (§9).
 * 3. **The header is chrome, the body is content.** The header stays on
 *    `surface` while the body sinks, so the two layers are told apart by
 *    ground rather than by another border.
 * 4. **The copy button stops using the wrong three tokens.** `text-primary` is
 *    a FILL colour with no contrast promise as ink on `surface` —
 *    `text-primary-text` is that promise. `hover:bg-neutral-100` is the
 *    light-oriented ramp and turns into a pale slab in dark mode.
 *    `ring-primary-300` is a ramp step where the semantic `primary` slot
 *    belongs. All three are the same mistake: reaching past the token that
 *    means the thing for one that merely looks like it.
 *
 * **No gradient, anywhere near this.** §35.11 keeps gradients for a hero and
 * one primary action; a brand sweep behind code is decoration laid over
 * something read one glyph at a time. **No syntax colours either** — the base
 * highlights nothing, and inventing a palette here would be a second colour
 * system living outside the seed.
 *
 * `font-mono` is a font family, not a colour. Monospace figures are tabular by
 * construction, so the gutter needs no numeral setting of its own.
 */
export const CodeBlockV4 = React.forwardRef<HTMLDivElement, CodeBlockProps>(function CodeBlockV4(
  { className, code, language, lineNumbers = true, onCopy, ...rest },
  ref
) {
  injectStyleOnce(V4_CODE_STYLE_ID, V4_CODE_CSS);
  const lines = code.replace(/\n$/, '').split('\n');
  const showHeader = language != null || onCopy != null;
  const [copied, setCopied] = React.useState(false);

  const handleCopy = (): void => {
    try {
      void navigator?.clipboard?.writeText?.(code);
    } catch {
      /* clipboard unavailable — the onCopy callback still fires */
    }
    onCopy?.(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      ref={ref}
      data-xen-v4-code=""
      className={cn(
        'overflow-hidden rounded-[var(--xen-radius-md)] border border-border bg-surface',
        className
      )}
      {...rest}
    >
      {showHeader ? (
        // Chrome, not content: it stays on `surface` while the body sinks.
        <div className="flex items-center justify-between border-b border-border px-[var(--xen-space-md)] py-[var(--xen-space-sm)]">
          <span className="text-xs font-semibold text-muted-text">{language ?? ''}</span>
          {onCopy != null ? (
            <button
              type="button"
              aria-label="Copy code"
              data-xen-v4-copy=""
              onClick={handleCopy}
              className={cn(
                'min-h-[var(--xen-space-xl)] rounded-[var(--xen-radius-sm)] px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]',
                'text-xs font-semibold text-primary-text transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
              )}
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          ) : null}
        </div>
      ) : null}

      <pre
        data-xen-v4-code-body=""
        className="overflow-x-auto p-[var(--xen-space-md)] font-mono text-sm leading-relaxed text-on-surface"
      >
        <code className="flex">
          {lineNumbers ? (
            // The gutter's one rule: a number the reader is counting to needs
            // an edge to stop at.
            <span
              aria-hidden="true"
              data-xen-v4-gutter=""
              className="mr-[var(--xen-space-md)] select-none pr-[var(--xen-space-md)] text-right text-muted-text"
            >
              {lines.map((_, i) => (
                <span key={i} className="block">
                  {i + 1}
                </span>
              ))}
            </span>
          ) : null}
          <span className="min-w-0">
            {lines.map((line, i) => (
              <span key={i} className="block whitespace-pre">
                {line.length > 0 ? line : ' '}
              </span>
            ))}
          </span>
        </code>
      </pre>
    </div>
  );
});
