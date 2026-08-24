import * as React from 'react';
import { cn } from './cn';

export interface CodeBlockProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onCopy'> {
  /** Source text to render verbatim in a monospace face. */
  code: string;
  /** Language label shown in the header (display only — no highlighting). */
  language?: string;
  /** Show a left gutter of line numbers (default true). */
  lineNumbers?: boolean;
  /**
   * Fires when the copy button is clicked, with the full `code` string. The
   * component also attempts `navigator.clipboard.writeText` when available.
   * Omit to hide the copy button.
   */
  onCopy?: (code: string) => void;
}

/**
 * Web parity of the native `CodeBlock`: a monospace `<pre><code>` surface with an
 * optional header (language label + copy button) and an optional line-number
 * gutter. Horizontally scrollable for long lines. `font-mono` is a font family,
 * not a color. All colors/radii/spacing come from the `--xen-*` tokens via
 * Tailwind classes — no literal colors.
 */
export const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(function CodeBlock(
  { className, code, language, lineNumbers = true, onCopy, ...rest },
  ref
) {
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
      className={cn(
        'bg-surface overflow-hidden rounded-[var(--xen-radius-md)] border border-border',
        className
      )}
      {...rest}
    >
      {showHeader ? (
        <div className="flex items-center justify-between border-b border-border px-3 py-2">
          <span className="text-xs font-semibold text-muted">{language ?? ''}</span>
          {onCopy != null ? (
            <button
              type="button"
              aria-label="Copy code"
              onClick={handleCopy}
              className="rounded-[var(--xen-radius-sm)] px-2 py-1 text-xs font-semibold text-primary hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          ) : null}
        </div>
      ) : null}

      <pre className="overflow-x-auto p-3 font-mono text-sm leading-relaxed text-on-surface">
        <code className="flex">
          {lineNumbers ? (
            <span aria-hidden="true" className="mr-3 select-none text-right text-muted">
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
